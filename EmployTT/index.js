/*Sign up form handler */
auth.onAuthStateChanged(user => {
  if(user){
    const landingFormSubmit = document.querySelector('#signupform');
    landingFormSubmit.style.display="none";
  }else{
    const landingFormSubmit = document.querySelector('#signupform');
    landingFormSubmit.style.display="flex";
  }

})

const landingFormSubmit = document.querySelector('#landingImgSubmit');
const fieldValidity=[];
landingFormSubmit.addEventListener('click', e =>{
  e.preventDefault();
  console.log("Button clicked");
  const termAccept = document.querySelector('#termsAccept');
  function makeTextWhite(){
    
    let warning = document.querySelector('#agreement-clause');
    warning.style.color = "white";
    warning = document.querySelector('#agreement-word-1');
    warning.style.color = "white";
    warning = document.querySelector('#agreement-word-2');
    warning.style.color = "white";
  }

  function makeTextRed(){
    let warning = document.querySelector('#agreement-clause');
    warning.style.color = "red";
    warning = document.querySelector('#agreement-word-1');
    warning.style.color = "red";
    warning = document.querySelector('#agreement-word-2');
    warning.style.color = "red";
  }

  if(termAccept.checked===false){
    makeTextRed();
    setTimeout(makeTextWhite, 500);
  }else if(termAccept.checked===true){
    const civilianName = document.querySelector('#fullName');
    const emailAddress = document.querySelector('#emailAddress');
    const origPassword = document.querySelector('#origPassword');
    const dateOfBirth = document.querySelector('#dateofbirth');
    const nameArray = civilianName.value.split(" ");
    let formValid=false;
    signUpFields.forEach(field =>{
      formValid = fieldValidity[field] && fieldValidity["password"];
    });
    if(!formValid){
      console.log('Form not valid');
    }
    else if(formValid){
      console.log('Creating profile...');
      auth.createUserWithEmailAndPassword(emailAddress.value, origPassword.value).then(cred => {
        //After account has been created chain promises
        const civilianEmail = emailAddress.value; // gone

        const addCivilianRole = functions.httpsCallable("addCivilianRole");
        addCivilianRole({ email: civilianEmail}).then(result => {
          console.log(result);
        }); 


        firestore.collection("Users").doc(cred.user.uid).set({
            firstName: nameArray[0],
            lastName: nameArray[1],
            email: emailAddress.value,
            phoneNumber: "",
            dateOfBirth: dateOfBirth.value,
            addressOne: "",
            addressTwo: "",
            cityortown: "",
            disabilites: "",
            profileCreationDate: new Date(),
            lastUpdated: new Date(),
  

          }).then(()=>{
            console.log("Firestore updated");
            let user = auth.currentUser;
            user.updateProfile({
              displayName: nameArray[0], //Update profile data
            }).then(() => {
                console.log("Profile Updated!");
                let user = auth.currentUser;
                user.sendEmailVerification().then(() => {
                    //send verification email
                    console.log("Verification Email Sent!");
                    firestore.collection("Users").doc(cred.user.uid).collection("jobsAppliedFor").doc("myApplications").set({

                    }).then(()=>{
                      firestore.collection("Users").doc(cred.user.uid).collection("jobsPosted").doc("myPostings").set({
  

                      }).then(()=>{
                        window.location.assign("./pages/userprofileregister.html")
                      }).catch((error)=>{
                        console.log(error);
                      });
                    }).catch((error)=>{
                       console.log(error);
                    });
            
                    
                }).catch(error=>{
                  console.log(error);
                });
            }).catch(error=>{
              console.log(error);
              alert(error);
            });
          }).catch(error=>{
            console.log(error);
          });
    }).catch(error =>{
      console.log(error);
    });
    }
  }


});


/*Listen for password change and notify user if no match occurs before submission */
const origPswd = document.querySelector('#origPassword');
const cnfmPswd = document.querySelector('#cnfmPassword');
const warning  = document.querySelector('#warn');

origPswd.addEventListener("input", e => {
  e.preventDefault();
  const initPassword = origPswd.value;
   const cnfmdPassword = cnfmPswd.value;
  if(initPassword ===""){
    warning.innerHTML="Password";
    origPswd.style.borderBottomColor ="";
    cnfmPswd.style.borderBottomColor ="white";
  }else if (initPassword === cnfmdPassword && initPassword === "" && cnfmdPassword === ""){
    origPswd.style.borderBottomColor ="";
    warning.innerHTML ="Password";
  }
});

cnfmPswd.addEventListener("input", e => {
  e.preventDefault();
   const cnfmdPassword = cnfmPswd.value;
  if(cnfmdPassword ===""){
    cnfmPswd.style.borderBottomColor ="";
  }
});

origPswd.addEventListener("change", e => {
  e.preventDefault();
  const initPassword = origPswd.value;
   const cnfmdPassword = cnfmPswd.value;
   if (initPassword === cnfmdPassword && initPassword === "" && cnfmdPassword === ""){
    origPswd.style.borderBottomColor ="";
    cnfmPswd.style.borderBottomColor ="";
    warning.innerHTML ="Password";
   }
});

cnfmPassword.addEventListener("change", e => {
  e.preventDefault();
  const initPassword = origPswd.value;
  const cnfmdPassword = cnfmPswd.value;
  
  if (initPassword != cnfmdPassword) {
    if(cnfmdPassword === ""){
      cnfmPswd.style.borderBottomColor ="";
      warning.innerHTML ="Passwords do not match";
      fieldValidity["password"]=false;
    }else{
      origPswd.style.borderBottomColor ="red";
      cnfmPswd.style.borderBottomColor ="red";
      warning.innerHTML ="Passwords do not match";
      fieldValidity["password"]=false;

    }
  } else if (initPassword === cnfmdPassword && initPassword != "" && cnfmdPassword != ""){
    origPswd.style.borderBottomColor ="#46C016";
    cnfmPswd.style.borderBottomColor ="#46C016";
    warning.innerHTML ="Passwords match!";
    fieldValidity["password"]=true;
  } else if (initPassword === cnfmdPassword && initPassword === "" && cnfmdPassword === ""){
  origPswd.style.borderBottomColor ="";
  cnfmPswd.style.borderBottomColor ="";
  warning.innerHTML ="Password";
  fieldValidity["password"]=false;

}
});

const signUpFields = ["fullName","emailAddress","dateofbirth"];

signUpFields.forEach(field =>{
  fieldValidity[field] = false;
  let fieldName =document.querySelector(`#${field}`);
  fieldName.addEventListener("focusin",e=>{
    e.preventDefault();
    fieldName.style.borderBottomColor ="#F7FF00";

    
  });
  
  fieldName.addEventListener("focusout",e=>{
    e.preventDefault();
    if(fieldName.value != ""){
      fieldName.style.borderBottomColor ="#46C016";
      fieldValidity[field] = true;
      console.log(fieldValidity[field]);
    }else if(fieldName.value ==""){
      fieldName.style.borderBottomColor ="#FFFFFF";
    }
  });
  
  fieldName.addEventListener("change",e=>{
    e.preventDefault();
    if(fieldName.value != ""){
      fieldName.style.borderBottomColor ="#46C016";
      fieldValidity[field] = true;
      console.log(fieldValidity[field]);
    }else if(fieldName.value ==""){
      fieldName.style.borderBottomColor ="#FFFFFF";
    }
  });
  
});

function googleSignIn(){
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.useDeviceLanguage();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  auth.signInWithPopup(provider).then(googleUser => {
    console.log(googleUser.additionalUserInfo.isNewUser);
    if(googleUser.additionalUserInfo.isNewUser === false){
      
      window.location.assign("./index.html");
     
    }else if(googleUser.additionalUserInfo.isNewUser === true){
      
      let user = auth.currentUser; //Grab current user
      const civilianEmail = user.email;
      const addCivilianRole = functions.httpsCallable("addCivilianRole");
      addCivilianRole({ email: civilianEmail }).then(result => {
        console.log(result);
      });
      ;
      console.log(googleUser.user.uid);
      console.log(googleUser);
      firestore.collection("Users").doc(googleUser.user.uid).set({
        firstName: googleUser.additionalUserInfo.profile.given_name,
        lastName: googleUser.additionalUserInfo.profile.family_name,
        email: googleUser.additionalUserInfo.profile.email,
        phoneNumber: "",
        dateOfBirth: "",
        addressOne: "",
        addressTwo: "",
        cityortown: "",
        disabilites: "",
        profileCreationDate: new Date(),
        lastUpdated: new Date(),
      }).then(()=>{
        console.log("Firestore updated");
        let user = auth.currentUser;
        user.updateProfile({
          //displayName: nameArray[0], //Update profile data
        }).then(() => {
            console.log("Profile Updated!");
            let user = auth.currentUser;
            user.sendEmailVerification().then(() => {
                //send verification email
                console.log("Verification Email Sent!");
                firestore.collection("Users").doc(googleUser.user.uid).collection("jobsAppliedFor").doc("myApplications").set({

                }).then(()=>{
                  firestore.collection("Users").doc(googleUser.user.uid).collection("jobsPosted").doc("myPostings").set({

                  }).then(()=>{
                    window.location.assign("./pages/userprofileregister.html")
                  }).catch((error)=>{
                    console.log(error);
                  });
                }).catch((error)=>{
                   console.log(error);
                });
        
                
            }).catch(error=>{
              console.log(error);
            });
        }).catch(error=>{
          console.log(error);
          alert(error);
        });
      }).catch(error=>{
        console.log(error);
      });

    }
  });
}

const googleButton = document.querySelector('#landingImgGoogleSubmit');
googleButton.addEventListener('click',e =>{
  e.preventDefault();
  googleSignIn();
})



const mobileSubmitButton = document.querySelector('#mobile-reg-button');
mobileSubmitButton.addEventListener('click',e=>{
  e.preventDefault();


  fadeInRegistrationForm();
 
})





function fadeInRegistrationForm(){
  const landingSlogan = document.querySelector('#landing-words-id');
  landingSlogan.setAttribute("class","fade-landing-mobile");
  const registrationForm =document.querySelector('#reg-form');
  const fadeTime =2;
  registrationForm.style.WebkitAnimation =`fadein ${fadeTime}s`; 
  registrationForm.style.MozAnimation =`fadein ${fadeTime}s`; 
  registrationForm.style.MsAnimation =`fadein ${fadeTime}s`; 
  registrationForm.style.OAnimation =`fadein ${fadeTime}s`; 
  registrationForm.style.Animation =`fadein ${fadeTime}s`; 
  registrationForm.style.display="flex";
}






/////////////////////////add above/////////////////////////

function clickedButton(id, jobid){

  auth.onAuthStateChanged(user => {
      if (user) {
          const docRef = firestore.collection('Users');
          docRef.doc(user.uid).get().then(function(doc) {
              var userid = doc.id;
              firestore.collection('Applicants').where('user_id','==',userid).where('job_id','==',jobid).get().then((snapshot)=>{
                  if(snapshot.docs.length > 0){
                      alert("You are already applied for this job");
                  }
                  else{
                      firestore.collection('Applicants').add({
                          user_id: auth.currentUser.uid,
                          job_id: jobid 
                      });

                      alert("Applied")
                  }
              });


          });
      }else{
          alert("You must be logged in to apply");
      }
  });
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~EVENT LISTENER FOR FIND JOB BUTTON~~~~~~~~~~~~~~~~~~~~~~~~~~~
const findJobs = document.querySelector('#findJobs');

findJobs.addEventListener('click', (ee)=>{
  ee.preventDefault();
  var searchBar, locationBar, categoryBar;
  searchBar = ""; locationBar = ""; categoryBar = ""; params = "";
  
  if(document.getElementById('searchBar').value){
    searchBar += document.getElementById('searchBar').value;
  }if(document.getElementById('location-filter').value){
    locationBar += document.getElementById('location-filter').value;
  }if(document.getElementById('category-filter').value){
    categoryBar += document.getElementById('category-filter').value;
  }
   var fullPath = window.location.pathname;
  var path = fullPath.substring(0,fullPath.lastIndexOf("/"));
  var queryString = "search=" + searchBar + "&location=" + locationBar + "&category=" + categoryBar;
  var link = window.location.origin + path + "/pages/joblist.html?" + encodeURI(queryString);
  window.open(link,"_self");
});




if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope:',  registration.scope);
  }).catch(function(error) {
    console.log('ServiceWorker registration failed:', error);
  });
}

