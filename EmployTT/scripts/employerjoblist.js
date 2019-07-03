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
console.log('Hi');

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
