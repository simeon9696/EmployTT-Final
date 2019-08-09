auth.onAuthStateChanged(user => {

    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            if (user.admin){
               
                firestore.collection('DatabaseInfo').doc('numberOfAccounts').get().then(doc =>{
                    const totalNumOfAccounts =document.querySelector('#numberOfAccounts');
                    const totalNumOfDels=document.querySelector('#numberOfDeletions');
                    const totalNumOfCreations =document.querySelector('#numberOfCreations'); 
                    totalNumOfAccounts.innerHTML = DOMPurify.sanitize(doc.data().totalNumberOfAccounts);
                    totalNumOfDels.innerHTML= DOMPurify.sanitize(doc.data().totalNumberOfAccountDeletions);
                    totalNumOfCreations.innerHTML= DOMPurify.sanitize(doc.data().totalNumberOfAccountCreations);
                }).catch(error =>{
                    console.log(error);
                });

                firestore.collection('DatabaseInfo').doc('numberOfApplicationsMade').get().then(doc =>{
                    const totalNumOfAppsMade =document.querySelector('#numberOfAppsMade');
                    totalNumOfAppsMade.innerHTML= DOMPurify.sanitize(doc.data().numberOfApplications);
                 }).catch(error =>{
                     console.log(error);
                 });

                 


                 const monthsInAYear= ["january","february","march","april","may","june","july","august","september","october","november","december"];
                 const monthsInAYearUpperCase= ["January","February","March","April","May","June","July","August","September","October","November","December"];
                 const axesLabels = ["No. of Account Creations","No. of Account Deletions","No. of Jobs Posted","No. of Applications made","No. of Employers Registered","No. of Administrators Created"]
                 const dataFields =["accountCreationChart","accountDeletionChart","jobPostingChart","jobApplicationChart","employersRegistered","adminsRegisteredChart"];
                 const dataNames =["accountCreations","accountDeletions","jobPostings","jobApplications","employerRegistrations","adminRegistrations",];
                 let currentYear = new Date().getFullYear();
                 let currentMonth = monthsInAYear[new Date().getMonth()];

                 let yearLabel = document.getElementsByClassName('currentYear');
                 let length =yearLabel.length;
                 for ( let i = 0; i < length; i++) { 
                    yearLabel = document.getElementsByClassName('currentYear')[i];
                    yearLabel.innerHTML = currentYear;
                  }
     
                  let accountCreations =[0,0,0,0,0,0,0,0,0,0,0,0];
                  let accountDeletions =[0,0,0,0,0,0,0,0,0,0,0,0];
                  let jobPostings =[0,0,0,0,0,0,0,0,0,0,0,0];
                  let jobApplications=[0,0,0,0,0,0,0,0,0,0,0,0];
                  let employerRegistrations=[0,0,0,0,0,0,0,0,0,0,0,0];
                  let adminRegistrations=[0,0,0,0,0,0,0,0,0,0,0,0];
    
                  let chartDataNames = {
                       dataNames: {
                        accountCreations,
                        accountDeletions,
                        jobPostings,
                        jobApplications,
                        employerRegistrations,
                        adminRegistrations
                       }
                  }
                  monthsInAYear.forEach(month=>{
                      firestore.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${month}`).get().then(snapshot =>{
                        //console.log(snapshot.data());
                        //console.log(monthsInAYear.indexOf(month));
                         accountCreations[monthsInAYear.indexOf(month)] =(snapshot.data().accountsCreated);
                          accountDeletions[monthsInAYear.indexOf(month)] =(snapshot.data().accountsDeleted);
                          jobPostings[monthsInAYear.indexOf(month)] =(snapshot.data().totaljobsPosted);
                          jobApplications[monthsInAYear.indexOf(month)] =(snapshot.data().applicationsMade);
                          employerRegistrations[monthsInAYear.indexOf(month)] =(snapshot.data().employersRegistered);
                          adminRegistrations[monthsInAYear.indexOf(month)] =(snapshot.data().adminsRegistered);
                      }).then(()=>{

                        let index =0;
                                dataNames.forEach(name=>{
                                   // console.log(dataFields[index])
                                   // console.log(chartDataNames.dataNames[name])
                                   Chart.defaults.global.animation.duration = 1000;
                                   console.log(chartDataNames.dataNames); 
                                    var ctx = document.getElementById(dataFields[index]).getContext('2d');
                                    var chart = new Chart(ctx, {
                                        // The type of chart we want to create
                                        type: 'line',
                                        
                                        // The data for our dataset
                                        data: {
                                            labels: monthsInAYearUpperCase,
                                            datasets: [{
                                                label: axesLabels[index],
                                                backgroundColor: 'transparent',
                                                borderColor: 'rgb(255, 99, 132)',
                                                data: [chartDataNames.dataNames[name][0],chartDataNames.dataNames[name][1],chartDataNames.dataNames[name][2],chartDataNames.dataNames[name][3],chartDataNames.dataNames[name][4],chartDataNames.dataNames[name][5],chartDataNames.dataNames[name][6],chartDataNames.dataNames[name][7],chartDataNames.dataNames[name][8],chartDataNames.dataNames[name][9],chartDataNames.dataNames[name][10],chartDataNames.dataNames[name][11]]
                                            }]
                                        },

                                        // Configuration options go here
                                        options: {
                                            animation :{
                                                easing:"easeOutCirc"
                                            }
                                        }
                                    });
                                    index++;

                                })
                                    
                                 
                                
                
                
                      }).catch(error =>{
                          console.log(error);
                      });
                  });
                  
  
                  //console.log(accountCreations);
                  //console.log(accountDeletions);
                //  console.log(jobPostings);
                 // console.log(jobApplications);
               //console.log(employerRegistrations);
                 // console.log(adminRegistrations);
                 
                /*
                accountCreationChart
                accountDeletionChart
                jobPostingChart
                jobApplicationChart
                employersRegistered
                adminsRegisteredChart
                */


            }
            else{
                console.log('Bye bye');
            }
        })
    }else{
        console.log('Unauthorized access');
    }
})

/*


const monthsInAYear= ["january","february","march","april","may","june","july","august","september","october","november","december"];
let year = new Date().getFullYear();
let month = monthsInAYear[new Date().getMonth()];
;

/*
if (year > currentYear){
    currentYear = year; 
    monthsInAYear.forEach(month =>{
        firestore.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${month}`).set({
            accountsCreated : '0',
            accountsDeleted : '0',
            jobsPosted      : '0',
            jobsAppliedFor  : '0',
            applicationsMade: '0',
            employersRegistered: '0'
        }).then(() =>{
            console.log('success!')
        }).catch(error =>{
            console.log(error);
        });
    });

}
else{
    //add 
}

*/







