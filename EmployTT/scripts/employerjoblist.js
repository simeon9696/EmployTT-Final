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
    // An error happened.
  });
});

/////////////START EMPLOYERJOBLIST/////////////////////////

function fetchUser(doc3, userid, about){
  if(doc3.id == userid){
    let mainNode = document.createElement('tr');
    let info = document.createElement('td');
    let button = document.createElement('td');
    let acceptButton = document.createElement('button');
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let node = document.createElement('li');
    let jobid = document.createElement('span');
    let app = document.createElement('span');
    let userfname= document.createElement('span');
    let userlname = document.createElement('span');

    acceptButton.setAttribute("id",c);
    // var userid = doc3.id;
    acceptButton.setAttribute("name",userid );
    acceptButton.setAttribute("onClick","clickedButton(this.id, this.name)");
    div.setAttribute("class", "empJobList");
    ul.setAttribute("id", "emp-job-list");
    var texts = document.createTextNode("Accept");
    acceptButton.appendChild(texts);

    jobid.textContent = " About Job: " + about;
    app.textContent = "Applicant: ";
    userfname.textContent = " First Name: " + doc3.data().firstName;;
    userlname.textContent = " Last Name: " + doc3.data().lastName;;
    jobid.appendChild(app);
    jobid.appendChild(userfname);
    jobid.appendChild(userlname);
    node.appendChild(jobid);
    button.appendChild(acceptButton);
    ul.appendChild(node);
    div.appendChild(ul);
    info.appendChild(div)
    mainNode.appendChild(info);
    mainNode.appendChild(button);

    jobTable.append(mainNode);
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
