const addJob = document.querySelector('#submitButton');
const jobDetails = document.querySelector('#job-form');
const incrementAppCountForEmployer = functions.httpsCallable('incrementApplicationCountForEmployer');
let dateToday = new Date();
let datePosted = `${dateToday.getDate()}-${dateToday.getMonth()}-${dateToday.getFullYear()}`;
let dateOnForm = document.querySelector('#jobOpened');
const checkboxes = ["checkbox-engineering","checkbox-clerical","checkbox-agriculture","checkbox-machine-learning"];
const checkNames=["engineeering","clerical","agricultture","machine-learning"];

dateOnForm.innerHTML=datePosted;

addJob.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('Firee..');
    var user = firebase.auth().currentUser;
    jobCheckBoxes =[];
    checkboxes.forEach(checkbox=>{
      let checkboxSelection = document.querySelector(`#${checkbox}`);
      if(checkboxSelection.checked===true){
        jobCheckBoxes.push(checkbox);
      }
      
    });
    console.log(jobCheckBoxes);

    firestore.collection('Jobs').add({
        jobName   : jobDetails['jobName'].value,
        about     : jobDetails['aboutJob'].value,
        skills    : jobDetails['jobSkills'].value,
        gender    : jobDetails['jobGender'].value,
        levels    : jobDetails['jobLevel'].value,
        location  : jobDetails['jobLocation'].value,
        category  : jobDetails['jobCategory'].value,
        employer  : jobDetails['jobEmployer'].value,
        jobstatus : jobDetails['jobStatus'].value,
        age       : jobDetails['jobAge'].value,
        salary    : jobDetails['jobSalary'].value,
        opened    : datePosted,
        deadline  : jobDetails['jobClosed'].value,
        employerID: user.uid,
    }).then(docRef =>{
      const jobid = docRef.id;
      console.log('adding to jobsPosted');
      firestore.collection("Users").doc(auth.currentUser.uid).collection("jobsPosted").add({
        job_id: docRef.id
      }).then((docRef)=>{
        console.log('adding to applicantLists');

          firestore.collection("Jobs").doc(jobid).collection("applicants").doc('applicantIDs').set({
            
          }).then(()=>{
            alert("Job added successfully");
            window.location.assign("./employerjoblist.html");
            added = document.querySelector('#invisible');
            added.classList.toggle("show");
            firestore.collection("Jobs").doc(jobid).collection("jobTags").doc('jobTags').set({
                jobTags : jobCheckBoxes
            });

          }).catch((error)=>{
            console.log(error);
          });

     }).catch(error=>{
      console.log(error);
     });
    }).then(()=>{
      var employers = jobDetails['jobEmployer'].value;
      incrementAppCountForEmployer({employer : employers});
    }).then(result=>{
          console.log(result);
        
        }).catch(error=>{
          console.log(error);
      }); 
});

/*
var user = firebase.auth().currentUser;
var imageRef = firebase.storage().ref(user + '/jobPicture/' + file.name);
var upload = imageRef.put(file).then(function(snapshot){
  console.log("Image uploaded");
} );
*/

firestore.doc(`Jobs/g1Nlb1beeUeI2mDrRpKZ/jobTags/jobTags`).get().then(snapshot=>{
  console.log(snapshot.data().jobTags);
  checkNames.forEach(name=>{
    firestore.collection(`DatabaseInfo/emailPreferenceLists/${name}`).get().then(snapshot=>{
      console.log(snapshot)
      console.log(snapshot.docs)
      snapshot.docs.forEach(doc=>{

        console.log(doc.data().email);
        //send email
      })
    });
  })
 
})