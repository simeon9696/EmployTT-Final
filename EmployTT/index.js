
// load google analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-142588895-1');


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