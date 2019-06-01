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


const firestore = firebase.firestore(); //Grab reference to database
const auth = firebase.auth();

//const email = document.querySelector("#email");  // gone
//const password  = document.querySelector("#password"); //gone
const subBtnRef = document.querySelector("#submitButton"); 
const signupForm = document.querySelector('#signup-form');

subBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    const email = signupForm['signup-email'].value;  // gone
    const password  = signupForm['signup-password'].value; //gone
    console.log(email);
    console.log(password);
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

});

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

const googleBtnRef = document.querySelector("#googleSignIn"); 
googleBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

})


firebase.auth().signOut().then(function() {
    console.log('Sign out successful');
  }).catch(function(error) {
    // An error happened.
  });