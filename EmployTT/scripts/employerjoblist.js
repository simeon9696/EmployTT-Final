 var firebaseConfig = {
  apiKey: "AIzaSyD3rzcDvo74D7siPasdB6TyRFQtxsKgHSc",
  authDomain: "igovtt-employtt.firebaseapp.com",
  databaseURL: "https://igovtt-employtt.firebaseio.com",
  projectId: "igovtt-employtt",
  storageBucket: "igovtt-employtt.appspot.com",
  messagingSenderId: "583940496531",
  appId: "1:583940496531:web:52655eb0b4f3f53c"
};

const jobList = document.querySelector('#emp-job-list');
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
auth.onAuthStateChanged(user => {
    //let user = firebase.auth().currentUser; 
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        user.mda = idTokenResult.claims.admin;
        console.log(user.admin);
        console.log(user.mda);
      });
  
       if(user.admin){
        console.log('I am an admin');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "Employer";
        employArea.style.display = "block";
  
      } else if(user.mda){
        console.log('I am a mda');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "Employer";
        employArea.style.display  = "block";
      }else{
        console.log('I am neither mda nor admin');
        let employArea =document.querySelector('#employers');
        employArea.innerHTML = "";
        employArea.style.display  = "none";
      } 
     

      let display = document.querySelector('#username');
      //display.innerHTML = user.displayName;
      display.innerHTML = '<img src="../images/user-icon.png" width="13" height="auto">&nbsp;'+user.displayName;
      display.style = "block";

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
    // An error happened.
  });
});

/////////////START EMPLOYERJOBLIST/////////////////////////

function fetchUser(doc3, userid, about){
  if(doc3.id == userid){
    let node = document.createElement('li');
    let jobid = document.createElement('span');
    let app = document.createElement('span');
    let userfname= document.createElement('span');
    let userlname = document.createElement('span');
    let email = document.createElement('span');

    let profile = document.createElement('button');
    profile.setAttribute("id",c);
    var userid = doc3.id;
    profile.setAttribute("name",userid );
    profile.setAttribute("onClick","clickedButton(this.id, this.name)");
    jobid.textContent = " About Job: " + about;
    app.textContent = "Applicant: ";
    userfname.textContent = " First Name: " + doc3.data().firstName;;
    userlname.textContent = " Last Name: " + doc3.data().lastName;;
    email.textContent = "Email: " + doc3.data().email;
   
    node.appendChild(jobid);
    node.appendChild(app);
    node.appendChild(userfname);
    node.appendChild(userlname);
    node.appendChild(email);
    
    jobList.append(node);
    c = c+1;
  }
}

var jobs = 0;
function fetchApplicants(doc, docid,about){

      firestore.collection('Applicants').get().then((snapshot2)=>{
        snapshot2.docs.forEach(doc2 =>{
          if(docid == doc2.data().job_id){

            firestore.collection('Users').get().then((snapshot3)=>{
              snapshot3.docs.forEach(doc3 =>{
                  fetchUser(doc3, doc2.data().user_id, about);
                });
              });
          }      
      });
    });

}
var c = 1;

firestore.collection('Jobs').get().then((snapshot)=>{
    var c = 1;
    auth.onAuthStateChanged(user => {
    snapshot.docs.forEach(doc =>{
      if(user.uid == doc.data().employerID){
         fetchApplicants(doc,doc.id, doc.data().about);
        c++;
      }
    });
  });
});
