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

// load google analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-142588895-1');

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const jobTable = document.querySelector('#job-table');
  let c = 0;
  let table = document.createElement('table');
  let body = document.createElement('tbody');
  const div = document.querySelector('#job-table');
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
          let userName = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" width="13" height="auto">&nbsp;'+user.displayName;
    
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
          let userName = document.querySelector('#username');
          userName.style.display = "block";
          userName.innerHTML = '<img src="../images/webpImages/user-icon.webp" width="13" height="auto">&nbsp;'+user.displayName;
    
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

    }
  })

const logOutBtn = document.querySelector('#logged-in');
logOutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log('Sign out successful');
  }).catch(function(error) {
    alert(error);
  });
});

/////////////////////////add above/////////////////////////

var tabs = document.querySelectorAll(".tabCont .butCont button");
var content = document.querySelectorAll(".tabCont .content");

function renderJobTable(doc, c){
  let node = document.createElement('tr');
  let employer = document.createElement('td');
  let category= document.createElement('td');
  let required = document.createElement('td');
  let status = document.createElement('td');
  let deadline = document.createElement('td');
  let about = document.createElement('td');
  let applyButton = document.createElement('button');
  applyButton.setAttribute("id",c);
  var jobid = doc.id;
  applyButton.setAttribute("name", jobid);
  applyButton.setAttribute("onClick","clickedButton(this.id, this.name)");

  node.setAttribute('doc-id',doc.id);
  employer.textContent = doc.data().employer;
  category.textContent = doc.data().category;
  required.textContent = doc.data().skills;
  status.textContent = doc.data().jobstatus;
  deadline.textContent = doc.data().deadline;
  about.textContent = doc.data().about;
  var texts = document.createTextNode("Apply");
  applyButton.appendChild(texts);

  node.append(category);
  node.append(employer);
  node.append(required);  
  node.append(status);
  node.append(deadline);
  node.append(about);
  node.append(applyButton);
  body.append(node);
  table.appendChild(body);
  div.append(table);
}

function clickedButton(id, jobid){

  auth.onAuthStateChanged(user => {
      if (user) {
          const docRef = firestore.collection('Users');
          docRef.doc(user.uid).get().then(function(doc) {
              var userid = doc.id;
              firestore.collection('Applicants').where('user_id','==',userid).where('job_id','==',jobid).get().then((snapshot)=>{
                  if(snapshot.docs.length > 0){
                      alert("You are already applied for this job");
                  }
                  else{
                      firestore.collection('Applicants').add({
                          user_id: auth.currentUser.uid,
                          job_id: jobid 
                      });

                      alert("Applied")
                  }
              });


          });
      }else{
          alert("You must be logged in to apply");
      }
  });
}

function searchDatabase(searchBar, locationBar, categoryBar){
  firestore.collection('Jobs').get().then((snapshot)=>{
    var c = 0;
    snapshot.docs.forEach(doc =>{
        var about = doc.data().about;
        searchBar.toLowerCase();
        about.toLowerCase();
        c++;
        var t = about.search(searchBar);

        var location = doc.data().location;
        locationBar.toLowerCase();
        location.toLowerCase();
        var u = location.search(locationBar);
        
        var category = doc.data().category;
        locationBar.toLowerCase();
        location.toLowerCase();
        var v = category.search(categoryBar);
        if(t >= 0 && u >= 0 && v >= 0){
          renderJobTable(doc);
        }
    });
  });
}

const findJobs = document.querySelector('#findJobs');

function makeTable(){

  let node = document.createElement('tr');
  let employer = document.createElement('td');
  let category= document.createElement('td');
  let required = document.createElement('td');
  let status = document.createElement('td');
  let deadline = document.createElement('td');
  let about = document.createElement('td');
  let apply = document.createElement('td');

  employer.textContent = "Employer";
  category.textContent = "Category";
  required.textContent = "Required Skills";
  status.textContent = "Jobstatus";
  deadline.textContent = "Deadline";
  about.textContent = "About";
  apply.textContent = "Press to Apply";
  
  node.append(category);
  node.append(employer);
  node.append(required);  
  node.append(status);
  node.append(deadline);
  node.append(about);
  node.append(apply);
  body.appendChild(node);
  table.appendChild(body);
  div.appendChild(table);
  c = c +1;
}


findJobs.addEventListener('click', (ee)=>{
  ee.preventDefault();
    if(c>0){
      var row = 0;
      while(row = table.rows.length > 0){
        table.deleteRow(0);
      }

    }
    table.setAttribute("class", "jobtable");
    table.setAttribute("id", "job-table");
    makeTable();
  let searchBar = document.getElementById('searchBar').value;
  let locationBar = document.getElementById('location-filter').value;
  let categoryBar = document.getElementById('category-filter').value;
  searchDatabase(searchBar, locationBar, categoryBar);
});




if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope:',  registration.scope);
  }).catch(function(error) {
    console.log('ServiceWorker registration failed:', error);
  });
}

$(document).ready(function() {
	
	// INITIATE THE FOOTER
  siteFooter();
	// COULD BE SIMPLIFIED FOR THIS PEN BUT I WANT TO MAKE IT AS EASY TO PUT INTO YOUR SITE AS POSSIBLE
	$(window).resize(function() {
		siteFooter();
	});
	
	function siteFooter() {
		var siteContent = $('#site-content');
		var siteContentHeight = siteContent.height();
		var siteContentWidth = siteContent.width();

		var siteFooter = $('#site-footer');
		var siteFooterHeight = siteFooter.height();
		var siteFooterWidth = siteFooter.width();

		console.log('Content Height = ' + siteContentHeight + 'px');
		console.log('Content Width = ' + siteContentWidth + 'px');
		console.log('Footer Height = ' + siteFooterHeight + 'px');
		console.log('Footer Width = ' + siteFooterWidth + 'px');

		siteContent.css({
			"margin-bottom" : siteFooterHeight + 50
		});
	};
});

console.log(window.performance.now());