//Load Google Analytics on Team Email
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-143704383-1');


/*Sign up form handler */
const landingFormSubmit = document.querySelector('#landingImgSubmit');
const fieldValidity=[];
landingFormSubmit.addEventListener('click', e =>{
  e.preventDefault();
  console.log("Button clicked");
  const termAccept = document.querySelector('#termsAccept');
  function makeTextWhite(){
    
    let warning = document.querySelector('#agreement-clause');
    warning.style.color = "white";
    warning = document.querySelector('#agreement-word-1');
    warning.style.color = "white";
    warning = document.querySelector('#agreement-word-2');
    warning.style.color = "white";
  }

  if(termAccept.checked===false){
    let warning = document.querySelector('#agreement-clause');
    warning.style.color = "red";
    warning = document.querySelector('#agreement-word-1');
    warning.style.color = "red";
    warning = document.querySelector('#agreement-word-2');
    warning.style.color = "red";
    setTimeout(makeTextWhite, 1000);
    
  }else if(termAccept.checked===true){
    console.log("let it through");
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const emailAddress = document.querySelector('#emailAddress');
    const origPassword = document.querySelector('#origPassword');
    const cnfmPassword = document.querySelector('#cnfmPassword');
    const dateOfBirth = document.querySelector('#dateofbirth');

    console.log(firstName.value);
    console.log(lastName.value);
    console.log(emailAddress.value);
    console.log(origPassword.value);
    console.log(cnfmPassword.value);
    console.log(dateOfBirth.value);
    console.log(fieldValidity);
    let formValid=false;
    signUpFields.forEach(field =>{
      console.log(fieldValidity[field]);
      formValid = fieldValidity[field] && fieldValidity["password"];
    });
    console.log(formValid);

  }
});


/*Listen for password change and notify user if no match occurs before submission */
const origPswd = document.querySelector('#origPassword');
const cnfmPswd = document.querySelector('#cnfmPassword');
const warning  = document.querySelector('#warn');

origPswd.addEventListener("input", e => {
  e.preventDefault();
  const initPassword = origPswd.value;
   const cnfmdPassword = cnfmPswd.value;
  if(initPassword ===""){
    warning.innerHTML="Password";
    origPswd.style.borderBottomColor ="";
    cnfmPswd.style.borderBottomColor ="white";
  }else if (initPassword === cnfmdPassword && initPassword === "" && cnfmdPassword === ""){
    origPswd.style.borderBottomColor ="";
    warning.innerHTML ="Password";
  }
});

cnfmPswd.addEventListener("input", e => {
  e.preventDefault();
   const cnfmdPassword = cnfmPswd.value;
  if(cnfmdPassword ===""){
    cnfmPswd.style.borderBottomColor ="";
  }
});

origPswd.addEventListener("change", e => {
  e.preventDefault();
  const initPassword = origPswd.value;
   const cnfmdPassword = cnfmPswd.value;
   if (initPassword === cnfmdPassword && initPassword === "" && cnfmdPassword === ""){
    origPswd.style.borderBottomColor ="";
    cnfmPswd.style.borderBottomColor ="";
    warning.innerHTML ="Password";
   }
});

cnfmPassword.addEventListener("change", e => {
  e.preventDefault();
  const initPassword = origPswd.value;
  const cnfmdPassword = cnfmPswd.value;
  
  if (initPassword != cnfmdPassword) {
    if(cnfmdPassword === ""){
      cnfmPswd.style.borderBottomColor ="";
      warning.innerHTML ="Passwords do not match";
      fieldValidity["password"]=false;
    }else{
      origPswd.style.borderBottomColor ="red";
      cnfmPswd.style.borderBottomColor ="red";
      warning.innerHTML ="Passwords do not match";
      fieldValidity["password"]=false;

    }
  } else if (initPassword === cnfmdPassword && initPassword != "" && cnfmdPassword != ""){
    origPswd.style.borderBottomColor ="#46C016";
    cnfmPswd.style.borderBottomColor ="#46C016";
    warning.innerHTML ="Passwords match!";
    fieldValidity["password"]=true;
  } else if (initPassword === cnfmdPassword && initPassword === "" && cnfmdPassword === ""){
  origPswd.style.borderBottomColor ="";
  cnfmPswd.style.borderBottomColor ="";
  warning.innerHTML ="Password";
  fieldValidity["password"]=false;

}
});

const signUpFields = ["firstName","lastName","emailAddress","dateofbirth"];
signUpFields.forEach(field =>{
  fieldValidity[field] = false;
  let fieldName =document.querySelector(`#${field}`);
  fieldName.addEventListener("focusin",e=>{
    e.preventDefault();
    fieldName.style.borderBottomColor ="#F7FF00";
  });
  
  fieldName.addEventListener("focusout",e=>{
    e.preventDefault();
    if(fieldName.value != ""){
      fieldName.style.borderBottomColor ="#46C016";
      fieldValidity[field] = true;
      console.log(fieldValidity[field]);
    }else if(fieldName.value ==""){
      fieldName.style.borderBottomColor ="#FFFFFF";
    }
  });
  
  fieldName.addEventListener("change",e=>{
    e.preventDefault();
    if(fieldName.value != ""){
      fieldName.style.borderBottomColor ="#46C016";
      fieldValidity[field] = true;
      console.log(fieldValidity[field]);
    }else if(fieldName.value ==""){
      fieldName.style.borderBottomColor ="#FFFFFF";
    }
  });
  
});


const jobTable = document.querySelector('#job-table');
let c = 0;
let table = document.createElement('table');
let body = document.createElement('tbody');
const div = document.querySelector('#job-table');



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



console.log(window.performance.now());

/*
//Check for webp support for browsers that do not support it

async function supportsWebp() {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

(async () => {
  if(await supportsWebp()) {
    console.log('does support');
  }
  else {
    console.log('does not support');
  }
})();

*/