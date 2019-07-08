"use strict";


auth.onAuthStateChanged(user => {
  if(user){
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      user.mda = idTokenResult.claims.mda;
      user.civilian = idTokenResult.claims.civilian;
   

      if(user.admin){
 
  
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


  
    
    let display = document.querySelector('#username');
    display.innerHTML = user.displayName;
    display.style = "inline-block";

    let logOut= document.querySelector("#logged-in");
    logOut.innerHTML = "Log Out";
    display.style = "inline-block";

    let logIn= document.querySelector("#logInBtn");
    logIn.innerHTML = "";
    logIn.style.display = "none";

    let registerBtn = document.querySelector("#regBtn");
    registerBtn.innerHTML ="";
    registerBtn.style.display = "none";

    const docRef = firestore.collection('Users');
    docRef.doc(user.uid).get().then(function(doc) {
 
          //console.log(doc.data().firstName);
          //console.log(doc.id);
          console.log(doc.data().firstName);
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

          firstNameLabel.innerHTML = `First Name: ${doc.data().firstName}`;
          lastNameLabel.innerHTML = `Last Name: ${doc.data().lastName}`;
          dateOfBirth.innerHTML = `Date of birth: ${doc.data().dateOfBirth}`;
          signupEmail.innerHTML = `Email: ${doc.data().email}`;
          addressLineOne.innerHTML = `Address Line 1: ${doc.data().addressOne}`;
          addressLineTwo.innerHTML = `Address Line 2: ${doc.data().addressTwo}`;
          cityOrTown.innerHTML = `City or Town: ${doc.data().cityortown}`;
          phoneNumber.innerHTML = `Phone Number: ${doc.data().phoneNumber}`;
          disabilities.innerHTML = `Disabilites: ${doc.data().disabilites}`;

          setupAcc.innerHTML= "";
          firstNameLabel.style.display ="block"

    }).catch(error => {
        console.log("Error getting document:", error);
        setupAcc.innerHTML= `Hey there ${user.displayName}! Continue setting up your account! Click update to get started`;
        firstNameLabel.innerHTML = ""; 
        firstNameLabel.style.display ="none";
    });
  }else{
    console.log('No user logged in');

    let display = document.querySelector('#username');
    display.innerHTML = "";
    display.style = "none";

    let logOut= document.querySelector("#logged-in");
    logOut.innerHTML = "";
    logOut.style = "none";

    let logIn= document.querySelector("#logInBtn");
    logIn.innerHTML = "Log In";
    logIn.style.display = "block";

    let registerBtn = document.querySelector("#regBtn");
    registerBtn.innerHTML ="Register";
    registerBtn.style.display = "block";

    document.body.innerHTML ="Unauthorized Access. Please log in or sign up to view this page";
    console.log("You shouldn't be here!");
    window.location.assign("../index.html");
  }
});

const updateProfile = document.querySelector('#updateButton');
updateProfile.addEventListener('click',(e)=>{
  e.preventDefault();
  //Send confirmation email for user that they've applied for the job
  const userEmail = auth.currentUser.email;
  const sendJobEmail = functions.httpsCallable('sendJobEmailApplicationSuccess');
  sendJobEmail({ jobName: 'Potatoness', email : userEmail}).then(result => {
    console.log(result);
  }).catch(error=>{
    console.log(error);
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
    firestore.collection('Users').doc(user.uid).delete().then(function() {
      console.log("User document successfully deleted!");
      user.delete().then(function() {
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
  
}


// add admin cloud function
const adminForm = document.querySelector('#adminSubmitButton');
adminForm.addEventListener('click', (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    if(result.data.message !== undefined){
      $('#customClaimSuccess').modal('show');
      const successMessage = document.querySelector('#userSuccessMessage');
      successMessage.innerHTML = `${adminEmail} is now an administrator!`
    }else if (result.data.error !== undefined){
      $('#customClaimError').modal('show');
    }
  });
});


// add mda cloud function
const mdaForm = document.querySelector('#mdaSubmitButton');
mdaForm.addEventListener('click', (e) => {
  e.preventDefault();
  const mdaEmail = document.querySelector('#mda-email').value;
  const addMdaRole = functions.httpsCallable('addMdaRole');
  addMdaRole({ email: mdaEmail }).then(result => {
    console.log(result);
    console.log(result.message);
    console.log(result.data.error);
    if(result.data.message !== undefined){
      $('#customClaimSuccess').modal('show');
      const successMessage = document.querySelector('#userSuccessMessage');
      successMessage.innerHTML = `${mdaEmail} is now an MDA!`
    }else if (result.data.error !== undefined){
      $('#customClaimError').modal('show');
    }

  });
});


//-------------------------Testing a thing, ignore-------------------------------
/*

function storeStuff(){

  const emailTransport = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 

};

const APP_NAME = 'EmployTT';
const displayName = 'Simeon'; // The display name of the user.
const emailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: 'simeonramjit',
  };

const mailConfig ={
    mailTransport : emailTransport,
    mailOptions : emailOptions,
};

  return mailConfig;
}

function printStuff(){

  const info = storeStuff();

 
  const mailConfig = storeStuff();
  const APP_NAME = 'EmployTT';
  const displayName = 'Simeon'; // The display name of the user.
  mailConfig.mailOptions.subject = `${APP_NAME} - Application for ${displayName} succesful!`;
  mailConfig.mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;

  console.log(mailConfig.mailOptions.subject);
  console.log(mailConfig.mailTransport);
}

printStuff();

*/