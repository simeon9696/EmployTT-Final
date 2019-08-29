
const monthsInAYear= ["january","february","march","april","may","june","july","august","september","october","november","december"];
const monthsInAYearUpperCase= ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dataFields = ["jobApplicationChart","jobRejectionChart","jobPendingChart","jobShortlistChart","jobPostedChart"];
const dataNames =["applicationToEmployersJobs","applicationsDeclined","applicationsPending","applicationsShortlisted","jobsPosted"];
const axesLabels = ["No. of Applied Jobs","No. of Declined Apps","No. of Pending Apps","No. of Shortlisted Apps","No. of Jobs Posted"];

let applicationToEmployersJobs =[0,0,0,0,0,0,0,0,0,0,0,0];
let applicationsDeclined =[0,0,0,0,0,0,0,0,0,0,0,0];
let applicationsPending =[0,0,0,0,0,0,0,0,0,0,0,0];
let applicationsShortlisted=[0,0,0,0,0,0,0,0,0,0,0,0];
let jobsPosted=[0,0,0,0,0,0,0,0,0,0,0,0];

let chartDataNames = {
     dataNames: {
        applicationToEmployersJobs,
        applicationsDeclined,
        applicationsPending,
        applicationsShortlisted,
        jobsPosted,
     
     }
}

let currentYear = new Date().getFullYear();
let currentMonth = monthsInAYear[new Date().getMonth()];

let yearLabel = document.getElementsByClassName('currentYear');
let length =yearLabel.length;
for ( let i = 0; i < length; i++) { 
   yearLabel = document.getElementsByClassName('currentYear')[i];
   yearLabel.innerHTML = currentYear;
 }
const totalAppsNumber = document.querySelector('#totalApplications');
const totalRejectNumber = document.querySelector('#totalrejections');
const totalPendingNumber = document.querySelector('#totalPending');
const totalShortlistNumner = document.querySelector('#totalShortlisted');
const totalJobNumber = document.querySelector('#totalJobs');

auth.onAuthStateChanged(user => {
    
    
    
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            user.mda =idTokenResult.claims.admin;
            if (user.admin || user.mda){
                firestore.doc(`DatabaseInfo/employers/employersLife/${user.uid}`).get().then(doc =>{
                  
                    totalAppsNumber.innerHTML=doc.data().applicationToEmployersJobs;
                    totalRejectNumber.innerHTML =doc.data().applicationsDeclined;
                    totalPendingNumber.innerHTML =doc.data().applicationsPending;
                    totalShortlistNumner.innerHTML =doc.data().applicationsShortlisted;
                    totalJobNumber.innerHTML =doc.data().jobsPosted;

              
                }).catch(error=>{
                    console.log(error);
                });

                monthsInAYear.forEach(month=>{
                    firestore.doc(`DatabaseInfo/eventsOverTime/${currentYear}/${month}/employers/${user.uid}`).get().then(snapshot =>{
                        console.log(snapshot);
                        applicationToEmployersJobs[monthsInAYear.indexOf(month)] =(snapshot.data().applicationToEmployersJobs);
                        applicationsDeclined[monthsInAYear.indexOf(month)] =(snapshot.data().applicationsDeclined);
                        applicationsPending[monthsInAYear.indexOf(month)] =(snapshot.data().applicationsPending);
                        applicationsShortlisted[monthsInAYear.indexOf(month)] =(snapshot.data().applicationsShortlisted);
                        jobsPosted[monthsInAYear.indexOf(month)] =(snapshot.data().jobsPosted);
                   
                    }).then(()=>{

                      let index =0;
                              dataNames.forEach(name=>{
                                 // console.log(dataFields[index])
                                 // console.log(chartDataNames.dataNames[name])
                                 Chart.defaults.global.animation.duration = 1000;
                                 //console.log(chartDataNames.dataNames); 
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
                
            }
        })
    }else{
        document.body = "Unauthorized access";
    }

})

