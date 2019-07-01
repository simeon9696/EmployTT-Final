var firebaseConfig = {
  apiKey: "AIzaSyD3rzcDvo74D7siPasdB6TyRFQtxsKgHSc",
  authDomain: "igovtt-employtt.firebaseapp.com",
  databaseURL: "https://igovtt-employtt.firebaseio.com",
  projectId: "igovtt-employtt",
  storageBucket: "igovtt-employtt.appspot.com",
  messagingSenderId: "583940496531",
  appId: "1:583940496531:web:52655eb0b4f3f53c"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

const firestore = firebase.firestore(); //Grab reference to database
const auth = firebase.auth(); //Grab reference to firebase objects
const functions = firebase.functions();

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
auth.onAuthStateChanged(user => {
  if(user){
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      user.mda = idTokenResult.claims.mda;
      user.civilian = idTokenResult.claims.civilian;
      console.log(user.email+' is an admin: '+user.admin);
      console.log(user.email+' is an mda: '+user.mda);
      console.log(user.email+' is a civilian: '+user.civilian);

      if(user.admin){
        console.log('I am an admin');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "Employer";
        employArea.style.display = "block";
  
        let fieldLabelAdmin = document.querySelector('#profile-labels-admin');
        fieldLabelAdmin.innerHTML = "Enter desired Administrator email here:";
        fieldLabelAdmin.style = "block";
  
        let adminEmail = document.querySelector('#admin-email');
        adminEmail.innerHTML = "";
        adminEmail.style.display  = "block";
  
        let adminBtn = document.querySelector('#adminSubmitButton');
        adminBtn.innerHTML = "Make Administrator";
    

        let fieldLabelMda = document.querySelector('#profile-labels-mda');
        fieldLabelMda.innerHTML = "Enter desired MDA email here:";
        fieldLabelMda.style.display  = "block";
  
        let mdaEmail = document.querySelector('#mda-email');
        mdaEmail.innerHTML = "";
        mdaEmail.style.display  = "inline-block";
        
        let mdaBtn = document.querySelector('#mdaSubmitButton');
        mdaBtn.innerHTML = "Make MDA";
        
  
      } else if(user.mda){
        console.log('I am a mda');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "Employer";
 
  
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

      }else{
        console.log('I am neither mda nor admin');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "";
        employArea.style.display  = "none";
  
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


    const docRef = firestore.collection('Users');



    
    let display = document.querySelector('#username');
    userName.style.display = "block";
    userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'./images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName; 

    let logOut= document.querySelector("#logged-in");
    logOut.innerHTML = "Log Out";
    display.style = "inline-block";

    let logIn= document.querySelector("#logInBtn");
    logIn.innerHTML = "";
    logIn.style.display = "none";

    let registerBtn = document.querySelector("#regBtn");
    registerBtn.innerHTML ="";
    registerBtn.style.display = "none";


    docRef.doc(user.uid).get().then(function(doc) {
 
          //console.log(doc.data().firstName);
          //console.log(doc.id);
          console.log(doc.data().firstName);
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

    }).catch(function(error) {
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



const removeProfile = document.querySelector('#removeButton');
removeProfile.addEventListener('click',(e)=>{
  e.preventDefault();
  if (confirm("This will delete all your data. \nYou will need to re-enter your credentials. \nAre you sure you want to continue?")) {
    firebase.auth().currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(function(userCredential) {
      let user = firebase.auth().currentUser;
      firestore.collection('Users').doc(user.uid).delete().then(function() {
        console.log("Document successfully deleted!");
        user.delete().then(function() {
          console.log(`Profile deleted`);
          window.location.assign("../index.html");
        }).catch(function(error) {
          console.log('Error deleting profile',error)
          alert(error);
        });
      }).catch(function(error) {
          console.error("Error removing document: ", error);
          alert(error);
      });
      return firebase.auth().currentUser.delete();
    })
    .catch(function(error) {
      // Credential mismatch or some other error.
    });

  } else {
    //Do nothing
  }
})





const logOutBtn = document.querySelector('#logged-in');
logOutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log('Sign out successful');
    window.location.assign("../index.html");
  }).catch(function(error) {
    // An error happened.
  });
});


// add admin cloud function
const adminForm = document.querySelector('#adminSubmitButton');
adminForm.addEventListener('click', (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
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
  });
});


