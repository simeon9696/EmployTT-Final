/////////////START EMPLOYERJOBLIST/////////////////////////
const jobLists = document.querySelector('#job-table');
let fileBlobs = [];
let fileNames = [];

function fetchUser(job, user, c, contName, app_doc, status){
  var rowtwo;
  if(status == "Pending"){
    rowtwo = document.getElementById(job.data().jobName+"pend_div");
  }else if(status == "Declined"){
    rowtwo = document.getElementById(job.data().jobName+"decline_div");
  }else if(status == "Shortlisted"){
    rowtwo = document.getElementById(job.data().jobName+"sl_div");
  }
    var userid = user.id;

    //~~~~~~~~~~~~~~~~~~~Link to profiles
    // let profile = document.createElement('span');
    // let profile_icon = document.createElement('i');
    // let profile_text = document.createElement('strong');
    // profile.setAttribute("class","button");
    // profile_icon.setAttribute("class","material-icons");
    // profile_icon.setAttribute("style","font-size:14px;");
    // profile_text.textContent = "More Details";
    // profile_icon.textContent = "assignment";
    // // profile.setAttribute("class","profileButton");
    // // var profileText = document.createTextNode(">> More Details");
    // // profile.appendChild(profileText);
    // profile.setAttribute("id",c);    
    // profile.setAttribute("name",userid );
    // profile.setAttribute("onClick","clickedProfile(this.id, this.name)");
    // profile.appendChild(profile_icon);
    // profile.appendChild(profile_text);

  

    let files = document.createElement('div');
    files.setAttribute("id","files_div");
    let files_p = document.createElement('p');

    const fileInputIds = ["resume","transcript","birthCert","nationalID","driverLicense",
    "policeCert","videoCharacter","reference-one","reference-two","certificate-one",
    "certificate-two","certificate-three","certificate-four","certificate-five"];

    var fileTexts = '{"fields":[{"resume":"View Resume","transcript":"View Transcript","birthCert":"View BirthCertificate","nationalID":"View National ID","driversLicense":"View Drivers Lisence","reference-one":"View Reference"}]}';

    objs = JSON.parse(fileTexts);
  
    fileInputIds.forEach(fileid=>{
      let storageRef = firebase.storage().ref(`Users/${userid}/${fileid}`);

      storageRef.listAll().then(result=> { 
        result.items.forEach(fileRef=> {
          console.log(fileRef.name);
          //And then get the download url
          storage.ref(`Users/${userid}/${fileid}/${fileRef.name}`).getDownloadURL().then(urlFile=> {
            console.log("here : ref");
            // This can be downloaded directly:
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.open('GET', urlFile);
            xhr.send();
            xhr.onload = function(event) {
              let fileName = document.createElement('a');
              // let fileListing = document.querySelector("#list-container-files");
              var blob = xhr.response;
              fileBlobs.push(blob);
              fileNames.push(fileRef.name);
              //console.log(URL.createObjectURL(blob))

              fileName.href = URL.createObjectURL(blob);
              fileName.setAttribute("view", fileRef.name);
              fileName.target = "_blank";
              // fileName.setAttribute("rel","noopener noreferrer")
              // fileName.setAttribute("onclick","window.open(this.href,'_blank');");
              fileName.setAttribute("id",fileRef.name);
              fileName.setAttribute("class","file-name");
              var valueText = objs.fields[0][fileid];
              if(valueText){
                fileName.innerHTML = valueText;
              }else{
                fileName.innerHTML = fileid;
              }
              console.log(`${fileRef.name}`);

              files.appendChild(fileName);
            };
          }).catch(function(error) {
            console.log(error);
          });
        });
      });
    })
    // files.appendChild(fileListing)



    // files.setAttribute("class","file-list-container");
    // files_p.setAttribute("class","file-list-heading");
    // files_p.innerHTML = "User's Files: ";
    // files.appendChild(files_p);

    // const fileInputIds = ["resume","transcript","birthCert","nationalID","driverLicense",
    // "policeCert","videoCharacter","reference-one","reference-two","certificate-one",
    // "certificate-two","certificate-three","certificate-four","certificate-five"];
    // fileInputIds.forEach(fileid=>{
    //   let storageRef = storage.ref(`Users/${userid}/${fileid}`);
    //             // Now we get the references of these images
    // storageRef.listAll().then(result=> {
    //   result.items.forEach(fileRef=> {
    //     fileName.setAttribute("download", fileRef.name);
    //     fileName.setAttribute("id",fileRef.name);
    //     fileName.setAttribute("class","file-name");
    //     fileName.innerHTML = `${fileRef.name} <br>`;
    //     files.appendChild(fileName);
    //     });
    //   });
    // });
      
    //~~~~~~~~~~~~~~~~~~~Job and user info




    let bigger_div = document.createElement('div');
    let user_details_div = document.createElement('div');
    let user_div = document.createElement('div');
    let userfname= document.createElement('p');
    let userlname = document.createElement('p');
    let dob = document.createElement('p');
    let email = document.createElement('p');
    let applicant_head = document.createElement('p');
    let applicant_names = document.createElement('span');
    let applicant_icon_up = document.createElement('i');
    // let applicant_icon_down = document.createElement('i');

    files.setAttribute("class","grid-items");
    userfname.setAttribute("class","grid-items");
    userlname.setAttribute("class","grid-items");
    dob.setAttribute("class","grid-items");
    email.setAttribute("class","grid-items");

    userfname.textContent = " First Name: " + user.data().firstName;;
    userlname.textContent = " Last Name: " + user.data().lastName;;
    email.textContent = "Email: " + user.data().email;
    dob.textContent = "Date of Birth: " + user.data().dateOfBirth;
   
    //~~~~~~~~~~~~~~~~~~Header+icon
    applicant_icon_up.setAttribute("class","material-icons");  //~~~~~~~~~up
    applicant_icon_up.setAttribute("style","font-size:18px;");
    applicant_icon_up.textContent = "arrow_drop_down";  
    applicant_icon_up.setAttribute("id","icon_up");
    // applicant_icon_down.setAttribute("class","material-icons");  //~~~~~~~~~down
    // applicant_icon_down.setAttribute("style","font-size:16px;");
    // applicant_icon_down.textContent = "arrow_drop_up";
    // applicant_icon_down.setAttribute("id","icon_down");
    applicant_names.textContent = (user.data().firstName + " " + user.data().lastName);
    applicant_names.setAttribute("class","users_head");
    // applicant_head.setAttribute("id","head");
    applicant_head.appendChild(applicant_icon_up);
    applicant_head.appendChild(applicant_names);

    //~~~~~~~~~~~~~~~~~~~~Application update options

    let option_grid = document.createElement('div');
    let option_input_decline = document.createElement('input');
    let option_label_decline = document.createElement('label');
    let option_div_decline = document.createElement('div');

    let option_input_pending = document.createElement('input');
    let option_label_pending = document.createElement('label');
    let option_div_pending = document.createElement('div');

    let option_input_sl = document.createElement('input');
    let option_label_sl = document.createElement('label');
    let option_div_sl = document.createElement('div');
    
    var id = "decline"+c;
    option_input_decline.setAttribute("id",id);
    option_label_decline.setAttribute("for",id);
    id = "pending"+c;
    option_input_pending.setAttribute("id",id);
    option_label_pending.setAttribute("for",id);
    id = "sl"+c;
    option_input_sl.setAttribute("id",id);
    option_label_sl.setAttribute("for",id);


    option_input_decline.setAttribute("value","Decline");
    option_input_pending.setAttribute("value","Pending");
    option_input_sl.setAttribute("value","Shortlist");

    option_input_decline.setAttribute("type","radio");
    option_input_pending.setAttribute("type","radio");
    option_input_sl.setAttribute("type","radio");

    option_input_decline.setAttribute("name",c);
    option_input_pending.setAttribute("name", c);
    option_input_sl.setAttribute("name", c);

    option_label_decline.textContent = "Decline";
    option_label_pending.textContent = "Pending";
    option_label_sl.textContent = "Shortlist";



    option_div_sl.setAttribute("class","checkbox");
    option_div_pending.setAttribute("class","checkbox");
    option_div_decline.setAttribute("class","checkbox");

    option_div_decline.appendChild(option_input_decline);
    option_div_decline.appendChild(option_label_decline);
    option_div_pending.appendChild(option_input_pending);
    option_div_pending.appendChild(option_label_pending);
    option_div_sl.appendChild(option_input_sl);
    option_div_sl.appendChild(option_label_sl);
    
    option_grid.setAttribute("class","options");
    option_grid.setAttribute("id", app_doc+" "+ job.id);
    option_grid.appendChild(option_div_decline);
    option_grid.appendChild(option_div_pending);
    option_grid.appendChild(option_div_sl);

    var name = user.data().firstName + c;
    bigger_div.setAttribute("id","bigger_div"+name);
    bigger_div.setAttribute("class","bigger_users");
    bigger_div.setAttribute("style","display:none;");
    user_div.setAttribute("id","div"+name);
    user_div.setAttribute("class","users");

    applicant_head.setAttribute("id",name);
    applicant_head.setAttribute("onClick","clickedButton_head(this.id)");

    rowtwo.appendChild(applicant_head);
    user_div.appendChild(userfname);
    user_div.appendChild(userlname);
    user_div.appendChild(email);
    user_div.appendChild(dob);
    // user_div.appendChild(profile);
    user_div.appendChild(files);
    bigger_div.appendChild(user_div);
    rowtwo.appendChild(bigger_div);
    rowtwo.appendChild(option_grid);
    c = c+1;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NO APPLICANTS~~~~~~~~~~~~~~~~~~~~~~~~~~~

function fetchNoUser(job){
  let node = document.createElement('tr');
  let rowone = document.createElement('th');
  let rowtwo = document.createElement('th');
  let jobDiv = document.createElement('div');

  let jobname = document.createElement('h2');
  let apply = document.createElement('span');
  
  let profile = document.createElement('button');
  
  jobname.textContent = job.data().jobName;

  rowone.setAttribute("class","rowone");
  rowtwo.setAttribute("class","rowtwo");
 
  rowone.appendChild(jobname);
  jobDiv.appendChild(rowone);
  jobDiv.appendChild(rowtwo);
  node.appendChild(jobDiv);
  jobLists.append(node);

}

// var uncheck = function(){
//   $("input[type='radio']").click(function(){
//     var previousValue = $(this).attr('previousValue');
//     var name = $(this).attr('name');
//     if(previousValue == 'checked'){
//       $(this).removeAttr('checked');
//       $(this).attr('previousValue',false);
//     }else{
//       $("input[name = "+name+"]:radio").attr('previousValue',false);
//       $(this).attr('previousValue','checked')
//     }
//   });
// }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FETCH APPLICANTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var jobs = 0;
let c = 1;
//~~~~~~~~~~~~~~~~~~~FUNCTION THAT STARTS IT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

auth.onAuthStateChanged(user => {

  firestore.collection('Jobs').where("employerID","==",user.uid).get().then((snapshot)=>{
    // var c = 0;
    snapshot.docs.forEach(job =>{
      var docid = job.id;
      // doc.data().collection('applicants').get().then((snapshot)=>{
      firestore.collection(`Jobs/${docid}/applicants`).get().then((snapshot)=>{
        if(snapshot.docs.length == 1 && snapshot.docs[0].id == "applicantIDs"){
          fetchNoUser(job);
        }else if(snapshot.docs.length > 0){
          let len = snapshot.docs.length;
          //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Create first column
          let node = document.createElement('tr');
          let jobDiv = document.createElement('div');
          let appAmt = document.createElement('span');
          let apply = document.createElement('span');
          let apps_and_button = document.createElement('p');
          let spacer_and_button = document.createElement('span');
          let jobname = document.createElement('h2');
          let separator_1 = document.createElement('hr');

          jobDiv.setAttribute("class","jobDiv");
          jobname.textContent = job.data().jobName;
          //~~~~~~~~~~~~~~~~~~~Collapsig button

          let viewApps = document.createElement('button');
          var viewText = document.createTextNode("View Applicants");
          viewApps.appendChild(viewText);
          var name = job.data().jobName + c;
          viewApps.setAttribute("id",name);
          viewApps.setAttribute("onClick","clickedButton(this.id)");
          viewApps.setAttribute("class","collapse");
          appAmt.textContent = len + " Applicants";
          let jobs = document.createElement('div');
          jobs.setAttribute("class","jobs");
          var contName = "cont" + name;
          jobs.setAttribute("id",contName);
          spacer_and_button.textContent = "\u00A0\u00A0\u00A0\u00A0";
          apps_and_button.appendChild(appAmt);
          apps_and_button.appendChild(spacer_and_button);
          apps_and_button.appendChild(viewApps);
          // var userid = user.id;

          //~~~~~~~~~~~~~~~~~~~Sets classes of each column
          let rowone = document.createElement('th');
          let rowtwo = document.createElement('th');
          rowone.setAttribute("class","rowone");
          rowtwo.setAttribute("class","rowtwo");
          rowtwo.setAttribute("id",job.data().jobName+"row2");

          let sl_div_id = job.data().jobName+"sl_div";
          let decline_div_id = job.data().jobName+"decline_div";
          let pend_div_id = job.data().jobName+"pend_div";

          let sl_table = document.createElement('div');
          sl_table.setAttribute("id",sl_div_id);
          let pend_table = document.createElement('div');
          pend_table.setAttribute("id",pend_div_id);
          let decline_table = document.createElement('div');
          decline_table.setAttribute("id",decline_div_id);

          pend_table.setAttribute("class","statusDivs");
          decline_table.setAttribute("class","statusDivs");
          sl_table.setAttribute("class","statusDivs");

          pend_table.setAttribute("style","display:none;");
          sl_table.setAttribute("style","display:none;");
          decline_table.setAttribute("style","display:none;");

          let sl_p = document.createElement('p');
          let pend_p = document.createElement('p');
          let decline_p = document.createElement('p');

          sl_p.setAttribute("id",job.data().jobName+"sl_div_p");
          pend_p.setAttribute("id",job.data().jobName+"pend_div_p");
          decline_p.setAttribute("id",job.data().jobName+"decline_div_p");

          sl_p.setAttribute("class","statuses");
          pend_p.setAttribute("class","statuses");
          decline_p.setAttribute("class","statuses");


          let sl = document.createElement('span');
          let pend = document.createElement('span');
          let decline = document.createElement('span');

          sl.setAttribute("onClick","clickedStatus(this.id)");
          pend.setAttribute("onClick","clickedStatus(this.id)");
          decline.setAttribute("onClick","clickedStatus(this.id)");


          let sl_id = job.data().jobName+"sl";
          let decline_id = job.data().jobName+"decline";
          let pend_id = job.data().jobName+"pend";

          sl.setAttribute("id",sl_id);
          pend.setAttribute("id",pend_id);
          decline.setAttribute("id",decline_id);
          
          let sl_icon = document.createElement('i');
          let pend_icon = document.createElement('i');
          let decline_icon = document.createElement('i');

          sl_icon.setAttribute("class","material-icons");
          sl_icon.setAttribute("style","font-size:18px;");
          sl_icon.textContent = "add";
          pend_icon.setAttribute("class","material-icons");
          pend_icon.setAttribute("style","font-size:18px;");
          pend_icon.textContent = "add";
          decline_icon.setAttribute("class","material-icons");
          decline_icon.setAttribute("style","font-size:18px;");
          decline_icon.textContent = "add";



          sl.textContent = "Shortlisted  ";
          sl.setAttribute("style","font-size: 18px; font-weight: bold;");
      
          pend.textContent = "Pending  ";
          pend.setAttribute("style","font-size: 18px; font-weight: bold;");
      
          decline.textContent = "Declined  ";
          decline.setAttribute("style","font-size: 18px; font-weight: bold;");

          sl_p.appendChild(sl);
          sl_p.appendChild(sl_icon);
          pend_p.appendChild(pend);
          pend_p.appendChild(pend_icon);
          decline_p.appendChild(decline);
          decline_p.appendChild(decline_icon);


          rowone.appendChild(jobname);
          // rowtwo.appendChild(appAmt);
          // rowtwo.appendChild(viewApps);
          rowtwo.appendChild(apps_and_button);
          rowtwo.appendChild(separator_1);
          jobs.appendChild(pend_p);
          jobs.appendChild(pend_table);
          jobs.appendChild(sl_p);
          jobs.appendChild(sl_table);
          jobs.appendChild(decline_p);
          jobs.appendChild(decline_table);
          rowtwo.appendChild(jobs);


          jobDiv.appendChild(rowone);
          jobDiv.appendChild(rowtwo);
          node.appendChild(jobDiv);
          jobLists.append(node);
          
          snapshot.docs.forEach(doc3 =>{
          // var applicant_docid = doc3.id;
            firestore.collection('Users').doc(doc3.data().applicantID).get().then(snapshot=>{
                  fetchUser(job, snapshot, c, contName, doc3.id, doc3.data().applicationStatus);
                  c++;
                // }
                // });
              });
            });
        }else{
          fetchNoUser(job);
        }
      });
    });
  });
});

// var collapse = document.getElementsByClassName("collapse");
// var i;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PROFILE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function clickedProfile(id, name){

}

function clickedButton(name){
    collapse = document.getElementById(name);
    content = document.getElementById("cont"+name);
    if(collapse.className == "collapse"){
      collapse.setAttribute("class","active");
      content.style.display = "block";
    }else if(collapse.className == "active"){
      collapse.setAttribute("class","collapse");
      content.style.display = "none";
    }
}

function clickedButton_head(name){
  content = document.getElementById("bigger_div"+name);
  head = document.getElementById(name);
  if(content.style.display === "none"){
    head.removeChild(head.firstElementChild);
    let applicant_icon_down = document.createElement('i');
    applicant_icon_down.setAttribute("class","material-icons");  //~~~~~~~~~down
    applicant_icon_down.setAttribute("style","font-size:18px;");
    applicant_icon_down.textContent = "arrow_drop_up";
    applicant_icon_down.setAttribute("id","icon_down");
    // icon = document.getElementById("icon_down");
    head.insertBefore(applicant_icon_down,head.firstElementChild);
    content.style.display = "flex";
  }else if(content.style.display === "flex"){
    head.removeChild(head.firstElementChild);
    let applicant_icon_up = document.createElement('i');
    applicant_icon_up.setAttribute("class","material-icons");  //~~~~~~~~~down
    applicant_icon_up.setAttribute("style","font-size:18px;");
    applicant_icon_up.textContent = "arrow_drop_down";
    applicant_icon_up.setAttribute("id","icon_down");
    // icon = document.getElementById("icon_down");
    head.insertBefore(applicant_icon_up,head.firstElementChild);
    content.style.display = "none";
  }
}

//~~~~~~~~~~~~~~~~~~ACCEPT CHANGES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function acceptChanges(){
  const updateApplicationNumbers = functions.httpsCallable('updateApplicationNumbersForEmployers'); 
  let radio_buttons = document.getElementsByTagName("input");
  var num_of_applicants = radio_buttons.length/3;
  var employers;
  for(var c = 1;c < num_of_applicants+1; c++){
    var options = document.getElementsByName(c);
    let optionsParentID = options[1].parentNode.parentNode.parentNode.id;
    var optionSliced = optionsParentID.slice(-5);
    if(optionSliced == "l_div"){
      optionsParentID = "Shortlisted";
    }else if(optionSliced == "e_div"){
      optionsParentID = "Declined";
    }else if(optionSliced == "d_div"){
      optionsParentID = "Pending";
    }
    if(options[0].checked == true && optionsParentID == "Declined"){
      continue;
    }
    if(options[1].checked == true && optionsParentID == "Pending"){
      continue;
    }   
    if(options[2].checked == true && optionsParentID == "Shortlisted"){
      continue;
    }
    if(options[0].checked == true){
      var id = options[0].parentNode.parentNode.id;
      var ids = id.split(" ");
      await firestore.collection("Jobs").doc(ids[1]).collection("applicants").doc(ids[0]).update({
        applicationStatus : "Declined"
      }).then(()=>{
        firestore.collection("Jobs").doc(ids[1]).get().then(snapshot=>{
           employers = snapshot.data().employer;
           updateApplicationNumbers({
             employer: employers, 
             statusBefore : optionsParentID,
              statusAfter : "Declined"
             });
           }).then(result=>{
             console.log(result);
           }).catch(error=>{
             console.log(error);         
           });
        });

    }else if(options[1].checked == true){
      var id = options[0].parentNode.parentNode.id;
      var ids = id.split(" ");
      await firestore.collection("Jobs").doc(ids[1]).collection("applicants").doc(ids[0]).update({
        applicationStatus : "Pending"
      }).then(()=>{
        firestore.collection("Jobs").doc(ids[1]).get().then(snapshot=>{
          employers = snapshot.data().employer;
          updateApplicationNumbers({
            employer: employers,
             statusBefore : optionsParentID,
              statusAfter : "Pending"
            });
        }).then(result=>{
          console.log(result);
        }).catch(error=>{
          console.log(error);
      });
    });
    }else if(options[2].checked == true){
      var id = options[0].parentNode.parentNode.id;
      var ids = id.split(" ");
      await firestore.collection("Jobs").doc(ids[1]).collection("applicants").doc(ids[0]).update({
        applicationStatus : "Shortlisted"
      }).then(()=>{
        firestore.collection("Jobs").doc(ids[1]).get().then(snapshot=>{
          employers = snapshot.data().employer;
          updateApplicationNumbers({
            employer: employers, 
            statusBefore : optionsParentID, 
            statusAfter : "Shortlisted"
          });
      }).then(result=>{
          console.log(result);
        }).catch(error=>{
          console.log(error);
      });
    });
    }
  }
  location.reload();
}

function cancelChanges(){
  location.reload();
}

function clickedStatus(id){
  let collapse = document.getElementById(id+"_div");
  let title = document.getElementById(id+"_div_p");

  if(collapse.style.display == "none"){
    collapse.style.display = "block";
    title.removeChild(title.lastElementChild);
    let title_icon = document.createElement('i');
    title_icon.setAttribute("class","material-icons");
    title_icon.setAttribute("style","font-size:18px;");
    title_icon.setAttribute("id",id+"_p");
    title_icon.textContent = "remove";
    title.appendChild(title_icon);
  }else if(collapse.style.display == "block"){
    collapse.style.display = "none";
    title.removeChild(title.lastElementChild);
    let title_icon = document.createElement('i');
    title_icon.setAttribute("class","material-icons");
    title_icon.setAttribute("style","font-size:18px;");
    title_icon.setAttribute("id",id+"_p");
    title_icon.textContent = "add";
    title.appendChild(title_icon);
  }
}
