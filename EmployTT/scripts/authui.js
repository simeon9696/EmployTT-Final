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

firebase.initializeApp(firebaseConfig); // Initialize Firebase
const auth = firebase.auth();            //Grab refernce to authentication services
const functions = firebase.functions(); //Grab reference to cloud functions
const firestore = firebase.firestore(); //Grab reference to database
let   providerID = null;
auth.onAuthStateChanged(user => {
    
 

    if (user) {
    user.providerData.forEach(myFunction);
    function myFunction(item) {
        providerID =item.providerId;
        console.log(`Provider service is: ${providerID}`);
    }

      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        user.mda = idTokenResult.claims.mda;
        user.civilian = idTokenResult.claims.civilian;
        console.log(user.email+' is an admin: '+user.admin);
        console.log(user.email+' is an mda: '+user.mda);
        console.log(user.email+' is a civilian: '+user.civilian);

        if (user.admin){
          let userName = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'../images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName;

          let logOut= document.querySelector("#logged-in");
          logOut.innerHTML = "Log Out";
          logOut.style.display = "block";
    
          let logIn= document.querySelector("#logInBtn");
          logIn.innerHTML = "";
          logIn.style.display = "none";
    
          let registerBtn = document.querySelector("#regBtn");
          registerBtn.innerHTML ="";
          registerBtn.style.display = "none";

          let employArea =document.querySelector('#employers');
          employArea.innerHTML = "Employer";
          employArea.style.display  = "block";

             

    
        }else if(user.mda){

          console.log("I am an MDA");
          let userName = document.querySelector('#username');
          userName.style.display = "block";
userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'../images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName;    
          let logOut= document.querySelector("#logged-in");
          logOut.innerHTML = "Log Out";
          logOut.style.display = "block";
    
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
          let userName = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" onerror="this.onerror=null; this.src=\'../images/user-icon.png\'" width="13" height="auto">&nbsp;'+user.displayName;    
          let logOut= document.querySelector("#logged-in");
          logOut.innerHTML = "Log Out";
          logOut.style.display = "block";
    
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
        else if(!user.admin || !user.mda || !user.civilian){
            console.log('New user!');
            let userName = document.querySelector('#username');
            userName.style.display = "block";
            userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" width="13" height="auto">&nbsp;'+user.displayName;
      
            let logOut= document.querySelector("#logged-in");
            logOut.innerHTML = "Log Out";
            logOut.style.display = "block";
      
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

      let userName = document.querySelector('#username');
      userName.style.display = "none";

      let logOut= document.querySelector("#logged-in");
      logOut.style.display = "none";

      let logIn= document.querySelector("#logInBtn");
      logIn.innerHTML = "Log In";
      logIn.style.display = "block";

      let registerBtn = document.querySelector("#regBtn");
      registerBtn.innerHTML ="Register";
      registerBtn.style.display = "block";

      let employArea =document.querySelector('#employers');
      employArea.innerHTML = "";
      employArea.style.display  = "none";

    }
  })

const logout = document.querySelector('#logged-in');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


const logOutBtn = document.querySelector('#logged-in');
logOutBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(() =>{
    console.log('Sign out successful');
    window.location.assign("../index.html");
  }).catch(error => {
    // An error happened.
    console.log(error);
  });
})
