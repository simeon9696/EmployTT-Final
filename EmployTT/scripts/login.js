  /*
  Project Name: EmployTT Government Recruitment Application

  */
  
  
  // Your web app's Firebase configuration
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
  const functions = firebase.functions();

const firestore = firebase.firestore(); //Grab reference to database
const auth = firebase.auth();

//const email = document.querySelector("#email");  // gone
//const password  = document.querySelector("#password"); //gone
const subBtnRef = document.querySelector("#emailSubmitButton"); 
const signupForm = document.querySelector('#signup-form');

/*
auth.onAuthStateChanged(user => {
  //let user = firebase.auth().currentUser; 
  if (user) {
    window.location.assign("../index.html");
  } else {
    console.log('No user logged in');
  }
})
*/
//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = '../index.html';
  }
});


subBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    const email = signupForm['signup-email'].value;  // gone
    const password  = signupForm['signup-password'].value; //gone
    //console.log(email);
    //console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
});

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });


const googleBtnRef = document.querySelector("#googleSubmitButton"); 
googleBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    firebase.auth().signInWithPopup(provider).then(()=>{

          //console.log("We're here");
          window.location.assign("../index.html");  //USE DOUBLE QUOTES WHEN USING THIS FUNCTION
          
    })
})

