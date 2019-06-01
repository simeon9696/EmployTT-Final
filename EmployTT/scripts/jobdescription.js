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
  //Grab reference to database
  const firestore = firebase.firestore(); 
  auth.onAuthStateChanged(user => {
    //let user = firebase.auth().currentUser; 
    if (user) {
      console.log('user logged in: ', user.email);
      console.log('user logged in: ', user.displayName);
     

      let display = document.querySelector('#username');
      display.innerHTML = user.displayName;
      display.style = "block ";

      let logOut= document.querySelector("#logged-in");
      logOut.innerHTML = "Log Out";
      display.style = "block";

      let logIn= document.querySelector("#logInBtn");
      logIn.innerHTML = "";
      logIn.style.display = "none";

      let registerBtn = document.querySelector("#regBtn");
      registerBtn.innerHTML ="";
      registerBtn.style.display = "none";

      auth.fetchSignInMethodsForEmail(user.email).then(providers =>{
        console.log(providers);
    }).catch(error=>{
      console.log(error);
    })
    } else {
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
     alert(error);
  });
})


const addJob = document.querySelector('#submitButton');
const jobDetails = document.querySelector('#job-form');
addJob.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('Firee..');
    var user = firebase.auth().currentUser;
    
    firestore.collection('Jobs').add({
        about     : jobDetails['aboutJob'].value,
        skills    : jobDetails['jobSkills'].value,
        gender    : jobDetails['jobGender'].value,
        levels    : jobDetails['jobLevel'].value,
        location  : jobDetails['jobLocation'].value,
        category  : jobDetails['jobCategory'].value,
        employer  : jobDetails['jobEmployer'].value,
        jobstatus : jobDetails['jobStatus'].value,
        age       : jobDetails['jobAge'].value,
        salary    : jobDetails['jobSalary'].value,
        opened    : jobDetails['jobOpened'].value,
        deadline  : jobDetails['jobClosed'].value,
        employerID: user.uid,
     
    }).then(function() {
      console.log('Job added successfully');

    }).catch(function(error) {
      console.log(error);
    });

});

