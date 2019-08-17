"use strict";

let fileBlobs = [];
let fileNames = [];
auth.onAuthStateChanged(user => {
  if(user){

    let metric= document.querySelector("#metricButton");
    metric.innerHTML = "";
    metric.style.display = "none";

    /*Change tab title*/
    if(providerID === "password"){
      let userTitle = user.displayName;
      let pageTitle = document.querySelector('#user-title');
      pageTitle.innerHTML = `${DOMPurify.sanitize(userTitle)} | EmployTT`;
    }else if (providerID ==="google.com"){
      let userTitle = user.displayName.split(" ");
      let pageTitle = document.querySelector('#user-title');
      pageTitle.innerHTML = `${DOMPurify.sanitize(userTitle[0])} | EmployTT`;
      
    }

    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      user.mda = idTokenResult.claims.mda;
      user.civilian = idTokenResult.claims.civilian;
   
      

      if(user.admin){
 
        let metric= document.querySelector("#metricButton");
        metric.innerHTML = "Metrics";
        metric.style.display = "inline-block";

        let fieldLabelAdmin = document.querySelector('#profile-labels-admin');
        fieldLabelAdmin.innerHTML = "Enter desired Administrator email here:";
        fieldLabelAdmin.style.display = "inline-block";
  
        let adminEmail = document.querySelector('#admin-email');
        adminEmail.innerHTML = "";
        adminEmail.style.display  = "block";
  
        let adminBtn = document.querySelector('#adminSubmitButton');
        adminBtn.innerHTML = "Make Administrator";
        adminBtn.style.display  = "inline-block";

        let fieldLabelMda = document.querySelector('#profile-labels-mda');
        fieldLabelMda.innerHTML = "Enter desired MDA email here:";
        fieldLabelMda.style.display  = "block";
  
        let mdaEmail = document.querySelector('#mda-email');
        mdaEmail.innerHTML = "";
        mdaEmail.style.display  = "inline-block";
        
        let mdaBtn = document.querySelector('#mdaSubmitButton');
        mdaBtn.innerHTML = "Make MDA";
        mdaBtn.style.display  = "inline-block"
  
      } else if(user.mda){
 

 
        let fieldLabelAdmin = document.querySelector('#profile-labels-admin');
        fieldLabelAdmin.innerHTML = "";
        fieldLabelAdmin.style.display  = "none";
  
        let adminEmail = document.querySelector('#admin-email');
        adminEmail.innerHTML = "";
        adminEmail.style.display  = "none";
  
        let adminBtn = document.querySelector('#adminSubmitButton');
        adminBtn.innerHTML = "";
        adminBtn.style.display  = "none";
  
  
        let fieldLabelMda = document.querySelector('#profile-labels-mda');
        fieldLabelMda.innerHTML = "";
        fieldLabelMda.style.display  = "none";
  
        let mdaEmail = document.querySelector('#mda-email');
        mdaEmail.innerHTML = "";
        mdaEmail.style.display  = "none";
        
        let mdaBtn = document.querySelector('#mdaSubmitButton');
        mdaBtn.innerHTML = "";
        mdaBtn.style.display  = "none";

      }else if(user.civilian){
   

        let fieldLabelAdmin = document.querySelector('#profile-labels-admin');
        fieldLabelAdmin.innerHTML = "";
        fieldLabelAdmin.style.display  = "none";
  
        let adminEmail = document.querySelector('#admin-email');
        adminEmail.innerHTML = "";
        adminEmail.style.display  = "none";
  
        let adminBtn = document.querySelector('#adminSubmitButton');
        adminBtn.innerHTML = "";
        adminBtn.style.display  = "none";
  
  
        let fieldLabelMda = document.querySelector('#profile-labels-mda');
        fieldLabelMda.innerHTML = "";
        fieldLabelMda.style.display  = "none";
  
        let mdaEmail = document.querySelector('#mda-email');
        mdaEmail.innerHTML = "";
        mdaEmail.style.display  = "none";
        
        let mdaBtn = document.querySelector('#mdaSubmitButton');
        mdaBtn.innerHTML = "";
        mdaBtn.style.display  = "none";
      } else {

  
        let fieldLabelAdmin = document.querySelector('#profile-labels-admin');
        fieldLabelAdmin.innerHTML = "";
        fieldLabelAdmin.style.display  = "none";
  
        let adminEmail = document.querySelector('#admin-email');
        adminEmail.innerHTML = "";
        adminEmail.style.display  = "none";
  
        let adminBtn = document.querySelector('#adminSubmitButton');
        adminBtn.innerHTML = "";
        adminBtn.style.display  = "none";
  
  
        let fieldLabelMda = document.querySelector('#profile-labels-mda');
        fieldLabelMda.innerHTML = "";
        fieldLabelMda.style.display  = "none";
  
        let mdaEmail = document.querySelector('#mda-email');
        mdaEmail.innerHTML = "";
        mdaEmail.style.display  = "none";
        
        let mdaBtn = document.querySelector('#mdaSubmitButton');
        mdaBtn.innerHTML = "";
        mdaBtn.style.display  = "none";
      }
    });

    let registerBtn = document.querySelector("#regBtn");
    registerBtn.innerHTML ="";
    registerBtn.style.display = "none";

    const docRef = firestore.collection('Users');
    docRef.doc(user.uid).get().then(function(doc) {
 

          const firstNameLabel = document.querySelector('#firstNameLabel');
          const lastNameLabel = document.querySelector('#lastNameLabel');
          const dateOfBirth = document.querySelector('#dateOfBirth');
          const signupEmail = document.querySelector('#signup-email');
          const addressLineOne = document.querySelector('#addressLineOne');
          const addressLineTwo = document.querySelector('#addressLineTwo');
          const disabilities = document.querySelector('#disabilities');
          const phoneNumber = document.querySelector('#phonenumber');
          const cityOrTown = document.querySelector('#cityOrTown');
          const setupAcc = document.querySelector('#setup-continue');

          firstNameLabel.innerHTML = `First Name: ${DOMPurify.sanitize(doc.data().firstName)}`;
          lastNameLabel.innerHTML = `Last Name: ${DOMPurify.sanitize(doc.data().lastName)}`;
          dateOfBirth.innerHTML = `Date of birth: ${DOMPurify.sanitize(doc.data().dateOfBirth)}`;
          signupEmail.innerHTML = `Email: ${DOMPurify.sanitize(doc.data().email)}`;
          addressLineOne.innerHTML = `Address Line 1: ${DOMPurify.sanitize(doc.data().addressOne)}`;
          addressLineTwo.innerHTML = `Address Line 2: ${DOMPurify.sanitize(doc.data().addressTwo)}`;
          cityOrTown.innerHTML = `City or Town: ${DOMPurify.sanitize(doc.data().cityortown)}`;
          phoneNumber.innerHTML = `Phone Number: ${DOMPurify.sanitize(doc.data().phoneNumber)}`;
          disabilities.innerHTML = `Disabilites: ${DOMPurify.sanitize(doc.data().disabilites)}`;

          setupAcc.innerHTML= "";
          firstNameLabel.style.display ="block"
          //Get uploaded files
          let storageRef = firebase.storage().ref(`Users/${user.uid}`);
          // Now we get the references of these images
          storageRef.listAll().then(result=> {
            result.items.forEach(fileRef=> {
              //And then get the download url
              firebase.storage().ref(`Users/${user.uid}/${fileRef.name}`).getDownloadURL().then(urlFile=> {
                // This can be downloaded directly:
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.open('GET', urlFile);
                xhr.send();
                xhr.onload = function(event) {
                  var blob = xhr.response;
                  fileBlobs.push(blob);
                  fileNames.push(fileRef.name);
                  //console.log(URL.createObjectURL(blob))
                  let fileListing = document.querySelector("#list-container");
                  let fileName = document.createElement('a');
                  fileName.href = URL.createObjectURL(blob);
                  fileName.setAttribute("download", fileRef.name);
                  fileName.setAttribute("id",fileRef.name);
                  fileName.setAttribute("class","file-name");
                  fileName.innerHTML = `${fileRef.name} <br>`;
                  fileListing.appendChild(fileName);
                };
      
              }).catch(function(error) {
                console.log(error);
              });
            })
          });
    }).catch(error => {
        console.log("Error getting document:", error);
        firstNameLabel.innerHTML = ""; 
        firstNameLabel.style.display ="none";
    });
  }else{
    console.log('No user logged in');


    let registerBtn = document.querySelector("#regBtn");
    registerBtn.innerHTML ="Register";
    registerBtn.style.display = "block";

    document.body.innerHTML ="Unauthorized Access. Please log in or sign up to view this page";
    console.log("You shouldn't be here!");
    window.location.assign("../index.html");
  }
});

const firstNameEdit = document.querySelector('#addressLineTwo');
firstNameEdit.addEventListener('focusout',(e)=>{
  e.preventDefault();
  let newFirstName = firstNameEdit.innerHTML.split(": ");
  console.log(newFirstName);
});

const downloadZipFile = document.querySelector('#downloadZip');
downloadZipFile.addEventListener('click',e=>{
  e.preventDefault();
  console.log(fileBlobs);
  var zip = new JSZip();
  const folderName =`${auth.currentUser.displayName} User Files - EmployTT`
  let index =0;
  fileBlobs.forEach(blob=>{
    zip.file(fileNames[index], blob);
    index++;
  });
  
  zip.generateAsync({type:"blob"})
  .then(function (blob) {
      saveAs(blob, folderName);
  });
  
})


//Update data on user profile
const updateProfile = document.querySelector('#updateButton');
updateProfile.addEventListener('click',(e)=>{
  e.preventDefault();
  const elementsToBeHidden =["#metricButton","#removeButton","#findButton","#mdaSubmitButton","#mda-email","#profile-labels-mda","#adminSubmitButton","#admin-email","#profile-labels-admin","#list-container","#file-list"];
  elementsToBeHidden.forEach(element =>{
    let elementSelect = document.querySelector(element);
    elementSelect.style.display = "none";
  })
  const updateProfile = document.querySelector('#updateButton');
  updateProfile.value="Save";
  //window.scrollTo({ top: 10, behavior: "smooth" });
  var body = document.body; // Safari
  var html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the <html> level, unless else is specified. Therefore, we use the documentElement property for these browsers


  body.scrollTo({
    top: 100,
    left:100,
    behavior: 'smooth'
  });

  html.scrollTo({
    top: 100,
  
    behavior: 'smooth'
  });

})


const removeProfile = document.querySelector('#removeButton');
removeProfile.addEventListener('click',(e)=>{
  e.preventDefault();
  if (confirm("This will delete all your data. \nYou will need to re-enter your credentials. \nAre you sure you want to continue?")) {
    if(providerID === 'google.com'){
      console.log("You're signed in with google!");
      firebase.auth().currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(()=> {
        deleteUser();
      })
      .catch(error => {
        // Credential mismatch or some other error.
        console.log(error);
      });
    }else if(providerID === 'password'){
      console.log("Email and password sign in");
      $('#exampleModal').modal('show');
      let email = document.querySelector('#staticEmail2');
      email.setAttribute('value', `User: ${auth.currentUser.email}`);

      const confirmDelete = document.querySelector('#confirm-delete-btn');
      confirmDelete.addEventListener('click', (e) => {
        e.preventDefault();
        const password = document.querySelector('#inputPassword2').value;
        auth.signInWithEmailAndPassword(auth.currentUser.email, password).then(()=>{
          deleteUser();
        })
        .catch(error => {
          // Handle Errors here.
          const errormessage = document.querySelector('#error-message');
          
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            errormessage.innerHTML = `That's not the right password :(`;
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      }); 
    }
  } else {
    alert('Profile deletion canceleed');
  }
})

function deleteUser (){
    let user = auth.currentUser;
    firestore.collection("Users").doc(user.uid).collection("jobsAppliedFor").doc("myApplications").delete().then(()=>{
      firestore.collection("Users").doc(user.uid).collection("jobsPosted").doc("myPostings").delete().then(()=>{
        firestore.collection('Users').doc(user.uid).delete().then(()=>{
          console.log("User document successfully deleted!");
          user.delete().then(()=> {
            console.log(`Profile deleted`);
            //window.location.assign("../index.html");
          }).catch(function(error) {
            console.log('Error deleting profile',error)
            alert(error);
          });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
            alert(error);
        });
       
      }).catch((error)=>{
        console.log(error);
      });
    }).catch((error)=>{
       console.log(error);
    });

  
}




//Go to metric page
const metricButton = document.querySelector('#metricButton')
metricButton.addEventListener('click', e =>{
  e.preventDefault();
  window.location.href='./adminmetrics.html';
})

const adminFuncButton = document.querySelector('#admin-functions')
adminFuncButton.addEventListener('click', e =>{
  e.preventDefault();
  window.location.href='./adminfunctions.html';
})

//var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
//saveAs(file);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Render jobs user has applied for~~~~~~~~~~~~~~~~~~~~
              
const applications = document.querySelector('#list-container');
auth.onAuthStateChanged(user => {
  if(user){ 
    firestore.collection('Users').doc(user.uid).collection('jobsAppliedFor').get().then(snapshot=>{
      // console.log("here");
      if(snapshot.docs.length > 0){
        snapshot.docs.forEach(doc=>{
          // console.log(doc.data().job_id);
          firestore.collection('Jobs').doc(doc.data().job_id).get().then(snapshot=>{
            renderJobs(snapshot);
          });
        });
      }else{
        let nothing = document.createElement('h2');
        nothing.textContent = "You have not applied for any Jobs";
        applications.appendChild(nothing);
      }
    });

    function renderJobs(job){
      firestore.collection('Jobs').doc(job.id).collection('applicants').where("applicantID","==",user.uid).get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
          let job_div = document.createElement('div');
          let jobs_p = document.createElement('p')
          let job_name = document.createElement('span');
          let job_status = document.createElement('span');
          let separator_1 = document.createElement('hr');
  
          job_name.textContent = job.data().jobName + ":  ";
          job_name.setAttribute("class","jobNames");
          job_name.addEventListener("click",function(){
            var fullPath = window.location.pathname;
            var path = fullPath.substring(0,fullPath.lastIndexOf("/"));
            // var query1 = name;
            var queryString = "?job=" + job.id;
            var link = window.location.origin + path + "/jobpage.html" + queryString;
            window.open(link);
          });
          job_status.textContent = doc.data().applicationStatus;
          if(job_status.textContent == "Shortlisted"){
            job_status.setAttribute("style","color: #23ac23");
          }else if(job_status.textContent == "Declined"){
            job_status.setAttribute("style","color: #ac2323");
          }
          jobs_p.appendChild(job_name);
          jobs_p.appendChild(job_status);
          job_div.setAttribute("style","padding-left: 20px;")
          job_div.appendChild(jobs_p);
          job_div.appendChild(separator_1);
          applications.appendChild(job_div);
        });

      });
    }
  }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END RENDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

