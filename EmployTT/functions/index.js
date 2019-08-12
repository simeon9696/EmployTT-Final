"use strict";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
admin.initializeApp();
const db=admin.firestore();
const monthsInAYear= ["january","february","march","april","may","june","july","august","september","october","november","december"]; //declare all months in year
let year = new Date().getFullYear(); //get the year that is current
let currentYear = 2019;
let currentMonth = monthsInAYear[new Date().getMonth()]; //get the current month

function checkYearAndCreateDirectories(months){
    if (year > currentYear){  //if the new year is greater than the old year, all the directories for the new year must be created
        currentYear= year; 
        months.forEach(month =>{
            return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${month}`).set({ //create all the directories
                accountsCreated : 0, //number of accounts made for this month
                accountsDeleted : 0, //number of accounts deleted for this month
                totaljobsPosted : 0, //number of jobs posted for this month
                applicationsMade: 0, //number of applications made this month
                employersRegistered: 0, //number of employers added this month
                adminsRegistered: 0 //number of employers added this month
            });
        });
    } 
    else{
        return;
    }
}

exports.addAdminRole = functions.https.onCall((data,context)=>{
    //Check if user is an admin before allowing the creation of custom claim
   if(context.auth.token.admin !== true){
        return { error : 'You do not have the required permissions to perform this function!'}
    }
    
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        checkYearAndCreateDirectories(monthsInAYear);
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : true,
            mda : false,
            civilian: false
        });
    }).then(()=>{

        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).get();
    }).then(snapshot =>{
        let adminsCreated = snapshot.data().adminsRegistered +1;
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).update({ //update the number of applications made for that month
            adminsRegistered: adminsCreated
        });
    }).then(()=>{
        return{
            message: `Success! ${data.email} is now an admin`
        }
    }).catch(error=>{
        console.log(error);
        return error;
    });
})

exports.addMdaRole = functions.https.onCall((data,context)=>{
    //Check if user is an admin before allowing the creation of custom claim
    if(context.auth.token.admin !== true){
        return { error : 'You do not have the required permissions to perform this function!'}
    }
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        checkYearAndCreateDirectories(monthsInAYear);
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : false,
            mda : true,
            civilian: false
        });
    }).then(()=>{
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).get();
    }).then(snapshot =>{
        let employersCreated = snapshot.data().employersRegistered +1;
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).update({ //update the number of applications made for that month
            employersRegistered: employersCreated
        });
    }).then(()=>{
        return{
            message: `Success! ${data.email} is now an MDA`
        }
    }).catch(error=>{
        console.log(error);
        return error;
    });
})


/*
exports.adminDeleteUser = functions.https.onCall((data)=>{
    return admin.auth().getUserByEmail(data.email)
    .then(userRecord =>{
        console.log(userRecord);
      // See the UserRecord reference doc for the contents of userRecord.
       return { message: ('Successfully fetched user data:', userRecord.toJSON())};
    })
    .catch(error =>{
      return error;
    });
})

*/




exports.adminDeleteUser = functions.https.onCall((data,context)=>{
    if(context.auth.token.admin !== true){
        return { error : 'You do not have the required permissions to perform this function!'}
    }
    return admin.auth().getUserByEmail(data.email).then(userRecord =>{
        //const userInfo = userRecord.toJSON();
        
        // See the UserRecord reference doc for the contents of userRecord.
      return admin.auth().deleteUser(userRecord.uid)
    }).then(()=>{
        console.log('Successfully deleted user');
        return {message : 'Successfully deleted user'};
        
    }).catch(error =>{
        console.log(error);
      return error;
    });

})

exports.addCivilianRole = functions.https.onCall((data)=>{


    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : false,
            mda : false,
            civilian: true
        });
    }).then(()=>{
        return{
            message: `Success! ${data.email} is a civilian`
        }
    }).catch(error=>{
        console.log(error);
        return error;
    });
})

exports.writeNumberOfUsersToDatabase = functions.https.onCall(()=>{

    /*
          return  db.collection('DatabaseInfo').doc('numberOfAccounts').get().then(snapshot=>{

            return {
                message: snapshot.data()
            }
        }).catch(error =>{
            return {
                message: error
            }
        });
    */




})

exports.increaseUserCount = functions.firestore.document('Users/{userId}').onCreate(() => {
    return db.collection('DatabaseInfo').doc('numberOfAccounts').get().then(snapshot=>{
        let numberOfAccountsCreated = snapshot.data().totalNumberOfAccountCreations+1;
        let numberOfAccountsNow = snapshot.data().totalNumberOfAccounts+1;
        checkYearAndCreateDirectories(monthsInAYear);
        return db.collection('DatabaseInfo').doc('numberOfAccounts').update({
            totalNumberOfAccountCreations : numberOfAccountsCreated,
            totalNumberOfAccounts : numberOfAccountsNow
        });
    }).then(()=>{
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).get();
    }).then(snapshot =>{
        let numberOfAccountsCreate = snapshot.data().accountsCreated +1;
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).update({ //update the number of applications made for that month
            accountsCreated: numberOfAccountsCreate
        });
    }).catch(error=>{
        console.log(error);
        return error;
    });
})


exports.increaseJobCount= functions.firestore.document('Jobs/{userId}').onCreate(() => {
    return db.collection('DatabaseInfo').doc('jobsPosted').get().then(snapshot=>{
        let numberOfJobsCreated = snapshot.data().jobsPosted+1;
        checkYearAndCreateDirectories(monthsInAYear);
        return db.collection('DatabaseInfo').doc('jobsPosted').update({
            jobsPosted : numberOfJobsCreated
        });
    }).then(()=>{
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).get();
    }).then(snapshot =>{
        let jobCount = snapshot.data().totaljobsPosted +1;
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).update({ //update the number of applications made for that month
            totaljobsPosted: jobCount
        });
    }).catch(error=>{
        console.log(error);
        return error;
    });
})


exports.decreaseUserCount = functions.firestore.document('Users/{userID}').onDelete(() => {
    return db.collection('DatabaseInfo').doc('numberOfAccounts').get().then(snapshot=>{
        let numberOfAccountsDeleted = snapshot.data().totalNumberOfAccountDeletions+1;
        let numberOfAccountsNow = snapshot.data().totalNumberOfAccounts-1;
        checkYearAndCreateDirectories(monthsInAYear);
        return db.collection('DatabaseInfo').doc('numberOfAccounts').update({
            totalNumberOfAccountDeletions : numberOfAccountsDeleted,
            totalNumberOfAccounts : numberOfAccountsNow
        });
    }).then(()=>{
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).get();
    }).then(snapshot =>{
        let numberOfDeletions = snapshot.data().accountsDeleted +1;
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).update({ //update the number of account deletions made for that month
            accountsDeleted: numberOfDeletions
        });
    }).catch(error=>{
        console.log(error);
        return error;
    });
})


/* Log the amount of applications made for a particular month and the total number of applications*/

exports.numberOfApplicationsMadeThisMonth = functions.firestore.document('Applicants/{applicantID}').onCreate(() => {
    return db.collection('DatabaseInfo').doc('numberOfApplicationsMade').get().then(snapshot=>{
        let numberOfAppsMade = snapshot.data().numberOfApplications+1;
        checkYearAndCreateDirectories(monthsInAYear);
        return db.collection('DatabaseInfo').doc('numberOfApplicationsMade').update({
           numberOfApplications: numberOfAppsMade
        });
    }).then(()=>{
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).get();
    }).then(snapshot =>{
        let numberOfAppsMade = snapshot.data().applicationsMade +1;
        return db.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${currentMonth}`).update({ //update the number of applications made for that month
            applicationsMade: numberOfAppsMade
        });
    }).catch(error=>{
        console.log(error);
        return error;
    });
})

/*
accountsCreated : '0', --
accountsDeleted : '0', --
jobsPosted      : '0', --
applicationsMade: '0', --
employersRegistered: '0' --
*/



/*

    return db.collection('DatabaseInfo').doc('NumberOfUsers').set({
        numberOfProfiles : '1000',
    }).then(()=>{
        return{
            message: `Success!` 
        }
    }).catch(error =>{
        return error;
    })
    */
 

/*
exports.sendJobEmailApplicationSuccess = functions.https.onCall((data)=>{

    return admin.auth().getUserByEmail(data.email).then(user => {
        const msg = {
            to: user.email,
            from: 'employTT@employtt.com',
            templateId: 'd-f3afd1440e5d4061993b83da6671209c',
            dynamic_template_data: {
              userName: user.displayName,
              jobName: data.jobName,
            },
          };
          return sgMail.send(msg);

    }).then(()=>{
        return{
            message: `Success! ${data.email} has been notified`
        }
    }).catch(err =>{
        return err;
    });

})
*/

function emailTransportConfiguration(userEmail){
    const gmailEmail = functions.config().gmail.email;
    const gmailPassword = functions.config().gmail.password;
    const emailTransport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: gmailEmail,
            pass: gmailPassword,
            },
    });

    const APP_NAME = 'EmployTT';
    const emailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: userEmail,
      };

    const mailConfig ={
        mailTransport : emailTransport,
        mailOptions : emailOptions,
    };

    return mailConfig;
}

exports.sendJobEmailApplicationSuccess = functions.https.onCall((data)=>{



    const APP_NAME = 'EmployTT';
    const displayName = data.displayName; // The display name of the user.
    const mailConfig = emailTransportConfiguration(data.email);
    const congratulationMessageList= ["Look at you!<br>Doing great things.",
                                      "Whoa, the first step in many,<br>toward your future.", 
                                      "Dreams don't work unless you do<br>and you definitely are!",
                                      "A brighter future awaits!",
                                      "What you did today,<br>will improve your tomorrow"];
    let congratulationMessage = congratulationMessageList[Math.floor(Math.random() * congratulationMessageList.length)];

    mailConfig.mailOptions.subject = `${APP_NAME} - Application for ${data.jobName} succesful!`;
    mailConfig.mailOptions.html= `<!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Email Layout</title>
            <meta name="description" content="">
            <!--Footer CSS Dependencies-->
    
            <style>
                @charset "UTF-8";
    
                footer{
                    height:100%;
                    font-weight:400;
                    position:relative;
                    height:auto;
                    /* Set a specific height */
                    background-image: url("https://employtt.netlify.com/images/webpImages/landingimage-copy.webp"),url("https://employtt.netlify.com/images/landingimage-copy.jpg") ;
                    /* Create the parallax scrolling effect */
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .footer-distributed{
    
                    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
                    box-sizing: border-box;
                    width: 100%;
                    text-align: left;
                    font: bold 16px sans-serif;
                    padding: 55px 50px;
                    margin-top: 80px;
                }
                
                .footer-distributed .footer-left,
                .footer-distributed .footer-center,
                .footer-distributed .footer-right{
                    display: inline-block;
                    vertical-align: top;
                }
                
                /* Footer left */
                
                .footer-distributed .footer-left{
                    width: 40%;
                }
                
                /* The company logo */
                
                .footer-distributed h3{
                    color:  #ffffff;
                    font: normal 36px 'Cookie', cursive;
                    margin: 0;
                }
                
                .footer-distributed h3 span{
                    color:  #5383d3;
                }
                
                /* Footer links */
                
                .footer-distributed .footer-links{
                    color:  #ffffff;
                    margin: 20px 0 12px;
                    padding: 0;
                }
                
                .footer-distributed .footer-links a{
                    display:inline-block;
                    line-height: 1.8;
                    text-decoration: none;
                    color:  inherit;
                    font-size:17px;
                }
                
                .footer-distributed .footer-links a:hover{
                    color:  #ff3300;
                
                }
                
                .footer-distributed .footer-company-name{
                    color:  #8f9296;
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                }
                
                /* Footer Center */
                
                .footer-distributed .footer-center{
                    width: 35%;
                    font-weight:500;
                    font-size:13px;
                }
                
                .footer-distributed .footer-center i{
                    background-color: #ff3300;
                    color:  #ffffff;
                    font-size: 25px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 42px;
                    margin: 10px 15px;
                    vertical-align: middle;
                }
                
                .footer-distributed .footer-center i.fa-envelope{
                    font-size: 17px;
                    line-height: 38px;
                }
                
                .footer-distributed .footer-center p{
                    display: inline-block;
                    color: #ffffff;
                    vertical-align: middle;
                    margin:0;
                }
                
                .footer-distributed .footer-center p span{
                    display:block;
                    font-weight: normal;
                    font-size:14px;
                    line-height:2;
                }
                
                .footer-distributed .footer-center p a{
                    color:  #90b1eb;
                
                    text-decoration: none;;
                }
                
                
                /* Footer Right */
                
                .footer-distributed .footer-right{
                    width: 20%;
                }
                
                .footer-distributed .footer-company-about{
                    line-height: 20px;
                    color:  #ffffff;
                    font-size: 13px;
                    font-weight: normal;
                    margin: 0;
                }
                
                .footer-distributed .footer-company-about span{
                    display: block;
                    color:  #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                
                .footer-distributed .footer-icons{
                    margin-top: 25px;
                }
                
                .footer-distributed .footer-icons a{
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                    background-color:  #ff3300;
                    border-radius: 2px;
                    font-size: 20px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 3px;
                    margin-bottom: 5px;
                }
                
                .footer-distributed .footer-icons a:hover{
                
                    color: #ff3300;
                    width: 40px;
                    height: 40px;
                
                }
                
                /* If you don't want the footer to be responsive, remove these media queries */
                
                @media (max-width: 880px) {
                
                    .footer-distributed{
                        font: bold 14px sans-serif;
                        bottom:-370px;
                        text-align: center;
                    }
                
                    .footer-distributed .footer-links{
                        font-size:15px;
                        text-align: center;
                    }
                
                    .footer-distributed .footer-left,
                    .footer-distributed .footer-center,
                    .footer-distributed .footer-right{
                        display: block;
                        width: 100%;
                        margin-bottom: 40px;
                        text-align: center;
                        font-size:12px;
                    }
                    .footer-distributed .footer-company-name{
                        text-align:center;
                    }
                    .footer-distributed .footer-center i{
                        margin-left: 0;
                    }
                    .footer-distributed .footer-company-about{
                        text-align:center;
                    }
                    
                    .footer-distributed .footer-company-about span{
                        text-align:center;
                    }
                }
            </style>
     
        </head>
        <body>
              <div style="
                height: 6vh;
                background-color:#ff3300;
                border-radius: 20px;
            ">
            </div><br>
            <div style="
                text-align: center;
                font-family:Arial, Helvetica, sans-serif;
                font-size : 3vh;
             
            ">
            <a href="https://employtt.netlify.com">
            <img src="https://i.ibb.co/3R08V5L/logo.png" alt="company logo"
                style="
                display: block;
                height:auto; 
                max-width: 100%; 
                margin-left: auto;
                margin-right: auto;
            "></a>
            <h1 style="
                color:#ff3300;
                font-size: 6vh;
                ">
            ${
                congratulationMessage
            }</h1>
            <p style="
                color:#000000;
                font-face
            ">
            You've just applied for the position of </p>
            <p>${data.jobName}</p>
            <p>Thanks for using EmployTT! We wish you the best for this application.</p>
            <p>Warm regards,<br></br> The EmployTT Team</p>
            </div>
            
        </body>
    
        <footer class="footer-distributed">
    
            <div class="footer-left">
        
                
                <img src="https://i.ibb.co/GMQkxhP/footer-logo.png" height="100px" width="auto" style="margin-left:auto;margin-right: auto;">
        
                <p class="footer-links">
                    <a href="https://employtt.netlify.com">Home</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/termsofservice.html">Terms Of Service</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/privacypolicy.html">Privacy Policy</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/aboutus.html">About</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/aboutus.html">Contact</a>
                </p>
        
                <p class="footer-company-name">EmployTT &copy; 2019</p>
            </div>
        
            <div class="footer-center">
        
                <div>
                    <br><br>
                    <i class="fa fa-map-marker"></i>
                    <p>&nbsp;   <span>Address: </span>Pembroke St, Port of Spain<br>Trinidad and Tobago</p>
                </div>
        
                <div>
                    <i class="fa fa-phone"></i>
                    <p>Phone: +1 (868) 627-5600</p>
                </div>
        
                <div>
                    <i class="fa fa-envelope"></i>
                    <p>Email: &nbsp;</p><p><a href="mailto:support@company.com"> hackttdecepticons@gmail.com</a></p>
                </div>
        
            </div>
        
            <div class="footer-right">
        
                <p class="footer-company-about">
                    <br><br><br>
                    <span>About the company</span>
                    Dedicated to helping you become employed as fast as possible
                </p>
        
            </div>
        </footer>
    
    </html>`
     return mailConfig.mailTransport.sendMail(mailConfig.mailOptions).then(()=>{
        return{
            message: `Email sent successfully`
        }
     }).catch(error=>{
        return {
            message : `${error}`
        }
     })
})


exports.employerAccountRequest = functions.https.onCall((data)=>{



    const APP_NAME = 'EmployTT';
    const mailConfig = emailTransportConfiguration('hackttdecepticons@gmail.com');


    mailConfig.mailOptions.subject = `Employer Registration Request`;
    mailConfig.mailOptions.html= `<!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Email Layout</title>
            <meta name="description" content="">
            <!--Footer CSS Dependencies-->
    
            <style>
                @charset "UTF-8";
    
                footer{
                    height:100%;
                    font-weight:400;
                    position:relative;
                    height:auto;
                    /* Set a specific height */
                    background-image: url("https://employtt.netlify.com/images/webpImages/landingimage-copy.webp"),url("https://employtt.netlify.com/images/landingimage-copy.jpg") ;
                    /* Create the parallax scrolling effect */
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .footer-distributed{
    
                    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
                    box-sizing: border-box;
                    width: 100%;
                    text-align: left;
                    font: bold 16px sans-serif;
                    padding: 55px 50px;
                    margin-top: 80px;
                }
                
                .footer-distributed .footer-left,
                .footer-distributed .footer-center,
                .footer-distributed .footer-right{
                    display: inline-block;
                    vertical-align: top;
                }
                
                /* Footer left */
                
                .footer-distributed .footer-left{
                    width: 40%;
                }
                
                /* The company logo */
                
                .footer-distributed h3{
                    color:  #ffffff;
                    font: normal 36px 'Cookie', cursive;
                    margin: 0;
                }
                
                .footer-distributed h3 span{
                    color:  #5383d3;
                }
                
                /* Footer links */
                
                .footer-distributed .footer-links{
                    color:  #ffffff;
                    margin: 20px 0 12px;
                    padding: 0;
                }
                
                .footer-distributed .footer-links a{
                    display:inline-block;
                    line-height: 1.8;
                    text-decoration: none;
                    color:  inherit;
                    font-size:17px;
                }
                
                .footer-distributed .footer-links a:hover{
                    color:  #ff3300;
                
                }
                
                .footer-distributed .footer-company-name{
                    color:  #8f9296;
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                }
                
                /* Footer Center */
                
                .footer-distributed .footer-center{
                    width: 35%;
                    font-weight:500;
                    font-size:13px;
                }
                
                .footer-distributed .footer-center i{
                    background-color: #ff3300;
                    color:  #ffffff;
                    font-size: 25px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 42px;
                    margin: 10px 15px;
                    vertical-align: middle;
                }
                
                .footer-distributed .footer-center i.fa-envelope{
                    font-size: 17px;
                    line-height: 38px;
                }
                
                .footer-distributed .footer-center p{
                    display: inline-block;
                    color: #ffffff;
                    vertical-align: middle;
                    margin:0;
                }
                
                .footer-distributed .footer-center p span{
                    display:block;
                    font-weight: normal;
                    font-size:14px;
                    line-height:2;
                }
                
                .footer-distributed .footer-center p a{
                    color:  #90b1eb;
                
                    text-decoration: none;;
                }
                
                
                /* Footer Right */
                
                .footer-distributed .footer-right{
                    width: 20%;
                }
                
                .footer-distributed .footer-company-about{
                    line-height: 20px;
                    color:  #ffffff;
                    font-size: 13px;
                    font-weight: normal;
                    margin: 0;
                }
                
                .footer-distributed .footer-company-about span{
                    display: block;
                    color:  #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                
                .footer-distributed .footer-icons{
                    margin-top: 25px;
                }
                
                .footer-distributed .footer-icons a{
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                    background-color:  #ff3300;
                    border-radius: 2px;
                    font-size: 20px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 3px;
                    margin-bottom: 5px;
                }
                
                .footer-distributed .footer-icons a:hover{
                
                    color: #ff3300;
                    width: 40px;
                    height: 40px;
                
                }
                
                /* If you don't want the footer to be responsive, remove these media queries */
                
                @media (max-width: 880px) {
                
                    .footer-distributed{
                        font: bold 14px sans-serif;
                        bottom:-370px;
                        text-align: center;
                    }
                
                    .footer-distributed .footer-links{
                        font-size:15px;
                        text-align: center;
                    }
                
                    .footer-distributed .footer-left,
                    .footer-distributed .footer-center,
                    .footer-distributed .footer-right{
                        display: block;
                        width: 100%;
                        margin-bottom: 40px;
                        text-align: center;
                        font-size:12px;
                    }
                    .footer-distributed .footer-company-name{
                        text-align:center;
                    }
                    .footer-distributed .footer-center i{
                        margin-left: 0;
                    }
                    .footer-distributed .footer-company-about{
                        text-align:center;
                    }
                    
                    .footer-distributed .footer-company-about span{
                        text-align:center;
                    }
                }
            </style>
     
        </head>
        <body>
              <div style="
                height: 6vh;
                background-color:#ff3300;
                border-radius: 20px;
            ">
            </div><br>
            <div style="
                text-align: center;
                font-family:Arial, Helvetica, sans-serif;
                font-size : 3vh;
             
            ">
            <a href="https://employtt.netlify.com">
            <img src="https://i.ibb.co/3R08V5L/logo.png" alt="company logo"
                style="
                display: block;
                height:auto; 
                max-width: 100%; 
                margin-left: auto;
                margin-right: auto;
            "></a>
            <h1 style="
                color:#ff3300;
                font-size: 4vh;
                "> Employer Registration Request</h1>
            <p style="
                color:#000000;
                font-face
            ">The company ${data.companyname} with email ${data.email} has made a request to become registered on the website EmployTT </p>
            <p>Address: ${data.address} <p>
            <p>Phone Number: ${data.phonenumber} <p>
            </div>
            
        </body>
    
        <footer class="footer-distributed">
    
            <div class="footer-left">
        
                
                <img src="https://i.ibb.co/GMQkxhP/footer-logo.png" height="100px" width="auto" style="margin-left:auto;margin-right: auto;">
        
                <p class="footer-links">
                    <a href="https://employtt.netlify.com">Home</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/termsofservice.html">Terms Of Service</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/privacypolicy.html">Privacy Policy</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/aboutus.html">About</a>
                    ·
                    <a href="https://employtt.netlify.com/pages/aboutus.html">Contact</a>
                </p>
        
                <p class="footer-company-name">EmployTT &copy; 2019</p>
            </div>
        
            <div class="footer-center">
        
                <div>
                    <br><br>
                    <i class="fa fa-map-marker"></i>
                    <p>&nbsp;   <span>Address: </span>Pembroke St, Port of Spain<br>Trinidad and Tobago</p>
                </div>
        
                <div>
                    <i class="fa fa-phone"></i>
                    <p>Phone: +1 (868) 627-5600</p>
                </div>
        
                <div>
                    <i class="fa fa-envelope"></i>
                    <p>Email: &nbsp;</p><p><a href="mailto:support@company.com"> hackttdecepticons@gmail.com</a></p>
                </div>
        
            </div>
        
            <div class="footer-right">
        
                <p class="footer-company-about">
                    <br><br><br>
                    <span>About the company</span>
                    Dedicated to helping you become employed as fast as possible
                </p>
        
            </div>
        </footer>
    
    </html>`
     return mailConfig.mailTransport.sendMail(mailConfig.mailOptions).then(()=>{
        return{
            message: `Request sent successfully`
        }
     }).catch(error=>{
        return {
            message : `${error}`
        }
     })
})


exports.getJobInformation = functions.https.onCall(()=>{

    return db.collection('Jobs/').get().then(snapshot=>{
        
        /*        let cache = {}
        snapshot.forEach(doc=>{
           cache[doc.id] = {
               data :doc.data()
           }
        })
     */
       // const data = snapshot.data();
        return (snapshot);

       
        
     
    }).catch(error =>{
        return {
            message : `${error}`
        }
    });
})