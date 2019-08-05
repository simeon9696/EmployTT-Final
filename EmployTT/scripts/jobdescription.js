const addJob = document.querySelector('#submitButton');
const jobDetails = document.querySelector('#job-form');
addJob.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('Firee..');
    var user = firebase.auth().currentUser;
    
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
        opened    : jobDetails['jobOpened'].value,
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
            applicantid: ""
          }).then(()=>{
            alert("Job added successfully");
            window.location.assign("./employerjoblist.html");
            added = document.querySelector('#invisible');
            added.classList.toggle("show");
          }).catch((error)=>{
            console.log(error);
          });

     }).catch(error=>{
      console.log(error);
     });




    }).catch(function(error) {
      console.log(error);
    });

});

var user = firebase.auth().currentUser;
var imageRef = firebase.storage().ref(user + '/jobPicture/' + file.name);
var upload = imageRef.put(file).then(function(snapshot){
  console.log("Image uploaded");
} );

