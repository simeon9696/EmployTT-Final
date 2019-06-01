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
    const docRef = firestore.collection('Users');
    
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


    docRef.doc(user.uid).get().then(function(doc) {
 
          //console.log(doc.data().firstName);
          //console.log(doc.id);
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
  }
});




const removeProfile = document.querySelector('#removeButton');
removeProfile.addEventListener('click',(e)=>{
  e.preventDefault();
  alert('This will delete all your data. Are you sure you want to continue?');
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
})
  /*
    // Create a reference to the file to delete
  let storage = firebase.storage(); 
  var storageRef = storage.ref();
  var userRef = storageRef.child('Users/'+user.uid);

  // Delete the file
  userRef.delete().then(function() {
    console.log("All user files removed");
  }).catch(function(error) {
    console.error("Error removing files: ", error);
  });
  */


 const submitButton = document.querySelector('#submitButton');
 submitButton.addEventListener('click',(e)=>{
      e.preventDefault();
      window.location.assign("../index.html");
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


