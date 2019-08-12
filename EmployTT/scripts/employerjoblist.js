/////////////START EMPLOYERJOBLIST/////////////////////////
const jobLists = document.querySelector('#job-table');

function fetchUser(job, user, c, contName){
    var rowtwo = document.getElementById(contName);
    var userid = user.id;

    //~~~~~~~~~~~~~~~~~~~Link to profiles
    let profile = document.createElement('a');
    let profile_icon = document.createElement('i');
    let profile_text = document.createElement('strong');
    profile.setAttribute("class","button");
    profile_icon.setAttribute("class","material-icons");
    profile_icon.setAttribute("style","font-size:14px;");
    profile_text.textContent = "More Details";
    profile_icon.textContent = "assignment";
    // profile.setAttribute("class","profileButton");
    // var profileText = document.createTextNode(">> More Details");
    // profile.appendChild(profileText);
    profile.setAttribute("id",c);    
    profile.setAttribute("name",userid );
    profile.setAttribute("onClick","clickedProfile(this.id, this.name)");
    profile.appendChild(profile_icon);
    profile.appendChild(profile_text);
    
    //~~~~~~~~~~~~~~~~~~~Job and user info
    let user_div = document.createElement('div');
    let userfname= document.createElement('p');
    let userlname = document.createElement('p');
    let dob = document.createElement('p');
    let email = document.createElement('p');
    let applicant_head = document.createElement('p');
    let applicant_names = document.createElement('span');
    let applicant_icon_up = document.createElement('i');
    // let applicant_icon_down = document.createElement('i');


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

    option_input_decline.setAttribute("name", c);
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
    option_grid.appendChild(option_div_decline);
    option_grid.appendChild(option_div_pending);
    option_grid.appendChild(option_div_sl);

    var name = user.data().firstName + c;
    user_div.setAttribute("id","div"+name);
    user_div.setAttribute("class","users");
    user_div.setAttribute("style","display:none;");
    applicant_head.setAttribute("id",name);
    applicant_head.setAttribute("onClick","clickedButton_head(this.id)");

    rowtwo.appendChild(applicant_head);
    user_div.appendChild(userfname);
    user_div.appendChild(userlname);
    user_div.appendChild(email);
    user_div.appendChild(dob);
    user_div.appendChild(profile);
    rowtwo.appendChild(user_div);
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

var uncheck = function(){
  $("input[type='radio']").click(function(){
    var previousValue = $(this).attr('previousValue');
    var name = $(this).attr('name');
    if(previousValue == 'checked'){
      $(this).removeAttr('checked');
      $(this).attr('previousValue',false);
    }else{
      $("input[name = "+name+"]:radio").attr('previousValue',false);
      $(this).attr('previousValue','checked')
    }
  });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FETCH APPLICANTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var jobs = 0;
// function fetchApplicants(job, contName){

      // firestore.collection('Applicants').where("job_id","==",docid).get().then((snapshot)=>{
      //   console.log(docid);

      //   if(snapshot.docs.length > 0){
          
          // let len = snapshot.docs.length;
          
          // //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Create first column
          // let node = document.createElement('tr');
          // let jobDiv = document.createElement('div');
          // let appAmt = document.createElement('span');
          // let apply = document.createElement('span');
          // let apps_and_button = document.createElement('p');
          // let spacer_and_button = document.createElement('span');
          // let jobname = document.createElement('h2');
          // let separator_1 = document.createElement('hr');

          // jobDiv.setAttribute("class","jobDiv");
          // jobname.textContent = job.data().jobName;
          // //~~~~~~~~~~~~~~~~~~~Collapsig button

          // let viewApps = document.createElement('button');
          // var viewText = document.createTextNode("View Applicants");
          // viewApps.appendChild(viewText);
          // var name = job.data().jobName + c;
          // viewApps.setAttribute("id",name);
          // viewApps.setAttribute("onClick","clickedButton(this.id)");
          // viewApps.setAttribute("class","collapse");
          // appAmt.textContent = len + " Applicants";
          // let jobs = document.createElement('div');
          // jobs.setAttribute("class","jobs");
          // var contName = "cont" + name;
          // jobs.setAttribute("id",contName);
          // spacer_and_button.textContent = "\u00A0\u00A0\u00A0\u00A0";
          // apps_and_button.appendChild(appAmt);
          // apps_and_button.appendChild(spacer_and_button);
          // apps_and_button.appendChild(viewApps);
          // // var userid = user.id;

          // //~~~~~~~~~~~~~~~~~~~Sets classes of each column
          // let rowone = document.createElement('th');
          // let rowtwo = document.createElement('th');
          // rowone.setAttribute("class","rowone");
          // rowtwo.setAttribute("class","rowtwo");
          // rowtwo.setAttribute("id",job.data().jobName+"row2");

          // rowone.appendChild(jobname);
          // // rowtwo.appendChild(appAmt);
          // // rowtwo.appendChild(viewApps);
          // rowtwo.appendChild(apps_and_button);
          // rowtwo.appendChild(separator_1);
          // rowtwo.appendChild(jobs);
          // jobDiv.appendChild(rowone);
          // jobDiv.appendChild(rowtwo);
          // node.appendChild(jobDiv);
          // jobLists.append(node);
          // c = c+1;


          //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END
            
//       }else{
//         fetchNoUser(job, about, 0);
//       }
//     });
// }
      // }
var c = 1;

//~~~~~~~~~~~~~~~~~~~FUNCTION THAT STARTS IT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

auth.onAuthStateChanged(user => {
  firestore.collection('Jobs').where("employerID","==",user.uid).get().then((snapshot)=>{
    console.log('Hi');
    
    // var c = 0;
    snapshot.docs.forEach(job =>{
      var docid = job.id;
      console.log(job.id);
      // doc.data().collection('applicants').get().then((snapshot)=>{
      firestore.collection('Jobs').doc(docid).collection('applicants').get().then((snapshot)=>{
        if(snapshot.docs.length > 0){
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

          rowone.appendChild(jobname);
          // rowtwo.appendChild(appAmt);
          // rowtwo.appendChild(viewApps);
          rowtwo.appendChild(apps_and_button);
          rowtwo.appendChild(separator_1);
          rowtwo.appendChild(jobs);
          jobDiv.appendChild(rowone);
          jobDiv.appendChild(rowtwo);
          node.appendChild(jobDiv);
          jobLists.append(node);
          
          snapshot.docs.forEach(doc3 =>{

            firestore.collection('Users').doc(doc3.data().applicantID).get().then(snapshot=>{
            console.log(snapshot.id);
                  fetchUser(job, snapshot, c, contName);
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
uncheck('1');

// var collapse = document.getElementsByClassName("collapse");
// var i;

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
  content = document.getElementById("div"+name);
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
    content.style.display = "grid";
  }else if(content.style.display === "grid"){
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
