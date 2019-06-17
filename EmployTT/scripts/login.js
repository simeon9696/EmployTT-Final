
  // Your web app's Firebase configuration
  const firebaseConfig = {
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



//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(user) {
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
        window.location.assign("../index.html");
      } else if(user.mda){
        console.log('I am a mda');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "Employer";
        employArea.style.display  = "block";
        window.location.assign("../index.html");
      }else if(user.civilian){
        console.log('I am a civilian');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "";
        employArea.style.display  = "none";
        window.location.assign("../index.html");
      } else if (!user.civilian || !user.mda || !user.admin){
        //window.location.assign("./userprofileinfo.html");
        console.log("You're not anything");
      }
      
    });



  }
});

const subBtnRef = document.querySelector("#emailSubmitButton"); 
const signupForm = document.querySelector('#signup-form');

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




const googleBtnRef = document.querySelector("#googleSubmitButton"); 
googleBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
      });
    firebase.auth().signInWithPopup(provider).then((googleUser)=>{
          console.log(googleUser.additionalUserInfo.isNewUser);
          if(googleUser.additionalUserInfo.isNewUser === false){
            //window.location.assign("../index.html");
          }else if(googleUser.additionalUserInfo.isNewUser === true){
            //window.location.assign("./userprofileinfo.html");
          }
              
   }).catch(error=>{
     console.log(error);
   });
})


