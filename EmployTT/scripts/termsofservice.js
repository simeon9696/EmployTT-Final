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
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    //let user = firebase.auth().currentUser; 
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        user.mda = idTokenResult.claims.mda;
        user.civilian = idTokenResult.claims.civilian;
        console.log(user.email+' is an admin: '+user.admin);
        console.log(user.email+' is an mda: '+user.mda);
        console.log(user.email+' is a civilian: '+user.civilian);

        if (user.admin){
          let display = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'../images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName; 
    
          let logOut= document.querySelector("#logged-in");
          logOut.innerHTML = "Log Out";
          display.style = "block";
    
          let logIn= document.querySelector("#logInBtn");
          logIn.innerHTML = "";
          logIn.style.display = "none";
    
          let registerBtn = document.querySelector("#regBtn");
          registerBtn.innerHTML ="";
          registerBtn.style.display = "none";

          let employArea =document.querySelector('#employers');
          employArea.innerHTML = "Employer";
          employArea.style.display  = "block";

        /*           
         auth.fetchSignInMethodsForEmail(user.email).then(providers =>{
            console.log(providers);
        }).catch(error=>{
          console.log(error);
        })*/

    
        }else if(user.mda){

          console.log("I am an MDA");
          let display = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'../images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName; 
    
          let logOut= document.querySelector("#logged-in");
          logOut.innerHTML = "Log Out";
          display.style = "block";
    
          let logIn= document.querySelector("#logInBtn");
          logIn.innerHTML = "";
          logIn.style.display = "none";
    
          let registerBtn = document.querySelector("#regBtn");
          registerBtn.innerHTML ="";
          registerBtn.style.display = "none";

          let employArea =document.querySelector('#employers');
          employArea.innerHTML = "Employers";
          employArea.style.display  = "block";

        }else if(user.civilian){
          console.log("I am a civilian");
          let display = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'../images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName; 
    
          let logOut= document.querySelector("#logged-in");
          logOut.innerHTML = "Log Out";
          display.style = "block";
    
          let logIn= document.querySelector("#logInBtn");
          logIn.innerHTML = "";
          logIn.style.display = "none";
    
          let registerBtn = document.querySelector("#regBtn");
          registerBtn.innerHTML ="";
          registerBtn.style.display = "none";

          let employArea =document.querySelector('#employers');
          employArea.innerHTML = "";
          employArea.style.display  = "none";
        }
      });
     
    } else {
      console.log('No user logged in');
      let employersBtn = document.querySelector('#employers');
      employersBtn.style.display = "none";

      let display = document.querySelector('#username');
      display.style.display = "none";

      let logOut= document.querySelector("#logged-in");
      logOut.style.display = "none";

      let logIn= document.querySelector("#logInBtn");
      logIn.innerHTML = "Log In";
      logIn.style.display = "block";

      let registerBtn = document.querySelector("#regBtn");
      registerBtn.innerHTML ="Register";
      registerBtn.style.display = "block";

    }
  })


const logout = document.querySelector('#logged-in');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


const logOutBtn = document.querySelector('#logged-in');
logOutBtn.addEventListener('click',(btnPressListener)=>{
  btnPressListener.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log('Sign out successful');
  }).catch(function(error) {
    // An error happened.
  });
})


console.log(window.performance.now());
