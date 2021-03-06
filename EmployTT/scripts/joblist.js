const jobTable = document.querySelector('#job-table');
const url = new URLSearchParams(window.location.search);
function checkApplied(job_id, userid){
  var user = userid;
  var jobs = job_id
    auth.onAuthStateChanged(user => {
      if (user) {
          const docRef = firestore.collection('Users');
          docRef.doc(user.uid).get().then(function(doc) {
              var user_id = doc.id;
              firestore.collection('Applicants').where('user_id','==',user_id).where('job_id','==',job_id).get().then((snapshot)=>{
                  if(snapshot.docs.length > 0){
                    applyButton.setAttribute("class","applied");
                      return;
                  }
                  else{
                    applyButton.setAttribute("class","normalButton");
                    return;
                  }
                });
              });
            }
          else{  var texts = document.createTextNode("Apply");       //added this so "apply" shows up when no user is logged in
            applyButton.appendChild(texts);
            applyButton.setAttribute("class","normalButton");
          } 
            
          });       
  // });
}
// console.log(window.appliedJobs.length);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Start call to database to render jobs~~~~~~~~~~~~~~~~~~~~
firestore.collection('Jobs').get().then((snapshot)=>{
  var c = 1;
  /*   snapshot.forEach(doc =>{
    console.log(doc.data());
  })
  */
  
  auth.onAuthStateChanged(user => {
    snapshot.docs.forEach(doc =>{
        renderJobTable(doc, c, user);
        c++;
    });
    if(url){
      let search = url.get("search");
      let location = url.get("location");
      let category = url.get("category");
    
      let search_bar = document.getElementById("searchBar");
      let location_bar = document.getElementById("location-filter");
      let category_bar = document.getElementById("category-filter");
    
      if(search != ""){
       search_bar.value = search;
      }if(location != ""){
        location_bar.value = location;
      }if(category != ""){
        category_bar.value = category;
      }
      searchBarFN();
    }
  });
});

function renderJobTable(doc, c, user){

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CREATE ELEMENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
    let node = document.createElement('tr');
    let tableElement = document.createElement('td');
    let box = document.createElement('div');
    //let separator = document.createElement('h4');
    let separator_1 = document.createElement('hr');
    let separator_2 = document.createElement('span');
    let separator_3 = document.createElement('span');
    let breakln = document.createElement('br');

    let titlediv = document.createElement('span');
    let title = document.createElement('p');
    let jobName = document.createElement('h1');
    let title_align = document.createElement('hr');
    let employer = document.createElement('span');
    let employer_p = document.createElement('p');
    let employer_icon = document.createElement('i');
    
    let about_p = document.createElement('p');
    let about = document.createElement('span');
    let bold5 = document.createElement('strong');
    
    let date = document.createElement('p');

    let location = document.createElement('span');
    let location_p = document.createElement('p');
    let location_icon = document.createElement('i');

    let allinfo = document.createElement('p');
    let bold1 = document.createElement('strong');
    let bold2 = document.createElement('strong');
    let bold3 = document.createElement('strong');
    let jobStatus = document.createElement('span');
    let levels = document.createElement('span');
    let category = document.createElement('span');

    let skills_p = document.createElement('p');
    let bold4 = document.createElement('strong');
    let skills = document.createElement('span');

    let applyButton = document.createElement('button');
    let pdfButton = document.createElement('button');
    let shareButton = document.createElement('button');


  separator_2.textContent = "\u00A0\u00A0\u00A0\u00A0";
  separator_3.textContent = "\u00A0\u00A0\u00A0\u00A0";

//~~~~~~~~~~~~~~~~~~~~~~~~~~Buttons ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var jobid = doc.id;

    //!!!!!!!!!!!!!!!!!!!!APPLY BUTTON!!!!!!!!!!!!
    var applyButtonID = jobid + "applybutton";
//     applyButton.setAttribute("id",applyButtonID);
    applyButton.setAttribute("id","applyButton");
    applyButton.setAttribute("name",jobid);
    applyButton.setAttribute("onClick","clickedButton(this.id, this.name)");

    auth.onAuthStateChanged(user => {
      if (user) {
          const docRef = firestore.collection('Users');
          docRef.doc(user.uid).get().then(function(doc) {
              var user_id = doc.id;
              firestore.collection('Jobs').doc(jobid).collection('applicants').where('applicantID','==',user.uid).get().then((snapshot)=>{
                  if(snapshot.docs.length > 0){
                    var texts = document.createTextNode("Reapply?");
                    applyButton.appendChild(texts);
                    applyButton.setAttribute("class","applied");
                  }
                  else{
                    var texts = document.createTextNode("Apply");
                    applyButton.appendChild(texts);
                    applyButton.setAttribute("class","normalButton");
                  }
                });
              });
            }else{
              var texts = document.createTextNode("Apply");       //added this so "apply" shows up when no user is logged in
              applyButton.appendChild(texts);
              applyButton.setAttribute("class","normalButton");
            }
          });     

    //!!!!!!!!!!!!!!!!!!PDF BUTTON!!!!!!!!!!!!!!!!!
    pdfButton.setAttribute("id",c+1);
    pdfButton.setAttribute("name", jobid);
    pdfButton.setAttribute("id","pdfButton");
    pdfButton.setAttribute("class","normalButton");
    pdfButton.setAttribute("onClick","pdfDownload(this.id, this.name)");
    
    var downloadtext = document.createTextNode("Download");
    pdfButton.appendChild(downloadtext);

    //!!!!!!!!!!!!!!!!!SHARING BUTTON!!!!!!!!!!!!!!
    shareButton.setAttribute("name", jobid);
    shareButton.setAttribute("id","shareButton");
    shareButton.setAttribute("onClick","copyLink(this.id, this.name)");
    var linktext = document.createTextNode("Share");
    shareButton.appendChild(linktext);
    shareButton.setAttribute("class","normalButton");

//~~~~~~~~~~~~~~~~~~~~~~~~~~Jobname~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    jobName.innerHTML = DOMPurify.sanitize(doc.data().jobName);
    // title.setAttribute("style","clear:all");
      jobName.setAttribute("name","jobNames");
      jobName.addEventListener("click",function(){
      var fullPath = window.location.pathname;
      var path = fullPath.substring(0,fullPath.lastIndexOf("/"));
      // var query1 = name;
      var queryString = "?job=" + doc.id;
      var link = window.location.origin + path + "/jobpage.html" + queryString;
      window.open(link);
    });
    title.append(jobName);
    title.append(applyButton);
    title.append(pdfButton);
    title.append(shareButton);
    titlediv.append(title);
    // title.append(title_align);

//~~~~~~~~~~~~~~~~~~~~~~~~~~Dates~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
    date.innerHTML = ("Posted: "+DOMPurify.sanitize(doc.data().opened)+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+"Deadline: "+DOMPurify.sanitize(doc.data().deadline));


//~~~~~~~~~~~~~~~~~~~~~~~~~~employer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //separator_1.setAttribute("size",1);
    node.setAttribute('doc-id',doc.id);
    employer.innerHTML = DOMPurify.sanitize(doc.data().employer);
    // employer.setAttribute("name","testing");
    
    employer_icon.setAttribute("class","material-icons");
    employer_icon.setAttribute("style","font-size:15px;");
    employer_icon.textContent = ("business");
    employer.setAttribute("style","font-size:15px;");

//~~~~~~~~~~~~~~~~~~~~~~~~~~Location~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    location_icon.setAttribute("class","material-icons");
    location_icon.setAttribute("style","font-size:15px;");
    location_icon.textContent = ("location_on");
    location_p.setAttribute("class","loca");
    location.innerHTML = DOMPurify.sanitize(doc.data().location);
    location.setAttribute("name","location");
    location.setAttribute("style","font-size:15px;");

//~~~~~~~~~~~~~~~~~~~~~~~~~~All_Info~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    jobStatus.innerHTML = DOMPurify.sanitize(doc.data().jobstatus);
    levels.innerHTML = DOMPurify.sanitize(doc.data().levels);
    category.innerHTML = DOMPurify.sanitize(doc.data().category);
    category.setAttribute("name","category");

    bold1.textContent = "Status: ";
    bold2.textContent = "Level: ";
    bold3.textContent = "Category: ";
    // allinfo.textContent =  "Status: " + doc.data().jobstatus + "\xa0\xa0" + "Level: " + doc.data().levels + "\xa0\xa0" + "Category: " + doc.data().category;
    allinfo.append(bold1);
    allinfo.append(jobStatus);
    allinfo.append(separator_2);
    allinfo.append(bold2);
    allinfo.append(levels);
    allinfo.append(separator_3);
    allinfo.append(bold3);
    allinfo.append(category);
//~~~~~~~~~~~~~~~~~~~~~~~~~~About Job~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    about.innerHTML = DOMPurify.sanitize(doc.data().about);
    bold5.textContent = "Description: ";
    about_p.append(bold5);
    about_p.append(about);

//~~~~~~~~~~~~~~~~~~~~~~~~~~Skills~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    skills.innerHTML = DOMPurify.sanitize(doc.data().skills);
    bold4.textContent = "Required Skills: ";
    skills_p.append(bold4);
    skills_p.append(skills);


  
//~~~~~~~~~~~~~~~~~~~~~~~~~~Append_to_node~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //separator.textContent="\xa0\xa0\ ";
  box.setAttribute("class","divclass");
  box.setAttribute("name","jobs");
  box.append(titlediv);
  // box.append(breakln);
  box.append(separator_1);

  employer_p.append(employer_icon);
  employer_p.append(employer);
  box.append(employer_p);

  location_p.appendChild(location_icon);
  location_p.appendChild(location);
  box.appendChild(location_p);
  box.appendChild(allinfo);
  box.appendChild(date);
  box.appendChild(skills_p);
  box.appendChild(about_p);
 // box.appendChild(separator);
  node.appendChild(box);
  jobTable.appendChild(node);
}   

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sharing Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var modal = document.getElementById("modal");
var close = document.getElementsByClassName("close")[0];

close.onclick = function(){
  modal.style.display = "none";
  var link = document.getElementById("link");
  var content = document.getElementsByClassName("modal_content")[0];
  content.removeChild(link);
  while(document.getElementById("link")){
    link = document.getElementById("link");
    content.removeChild(link);
  }
}
window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none";
    var link = document.getElementById("link");
    var content = document.getElementsByClassName("modal_content")[0];

    content.removeChild(link);
    while(document.getElementById("link")){
      link = document.getElementById("link");
      content.removeChild(link);
    }
  }
}

function copyLink(id, name){
    // var hostname = window.location.origin;
    var fullPath = window.location.pathname;
    var path = fullPath.substring(0,fullPath.lastIndexOf("/"));
    // var query1 = name;
    var queryString = "?job=" + name;
    var link = window.location.origin + path + "/jobquery.html" + queryString;

    var modal = document.getElementById("modal");
    // var close = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    var modal_content = document.getElementsByClassName("modal_content")[0];
    let thelink = document.createElement('p');

    thelink.setAttribute("id","link");
    thelink.textContent = link;
    modal_content.appendChild(thelink);
   

    // alert(link);

    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = link;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Application Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function clickedButton(id, jobid){
  const updateApplicationsandPendingStatus = functions.httpsCallable('updateApplicationAndPending');
    auth.onAuthStateChanged(user => {
        if (user) {
            const docRef = firestore.collection('Users');
            docRef.doc(user.uid).get().then(function(doc) {
                var userid = doc.id;
                firestore.collection('Jobs').doc(jobid).collection("applicants").where('applicantID','==',userid).get().then((snapshot)=>{
                    if(snapshot.docs.length > 0){
                        alert("You are already applied for this job");
                    }
                    else{
                          firestore.collection("Jobs").doc(jobid).collection("applicants").add({
                            applicantID : auth.currentUser.uid,
                            applicationStatus : "Pending"
                          }).then(()=>{
                            firestore.collection("Jobs/").doc(jobid).get().then(snapshot=>{
                              updateApplicationsandPendingStatus({
                                  employer: snapshot.data().employer
                                });
                          }).then(result=>{
                                console.log(result);
                          }).catch(error=>{
                                console.log(error);
                          });
                          }).catch((error)=>{
                            console.log(error);
                          });

                            firestore.collection("Users").doc(auth.currentUser.uid).collection("jobsAppliedFor").add({
                              job_id: jobid
                            }).catch((error)=>{
                              console.log(error);
                            });
                        alert("Applied for job");
                        var classChange = document.getElementById('applyButton');
                        if(classChange.innerHTML == "Apply"){
                          classChange.innerHTML = "Reapply?";
                        }
                        classChange.classList.toggle("applied");
                            const userEmail = auth.currentUser.email;

                            firestore.collection("Jobs").doc(jobid).get().then(snapshot=>{
                              const sendJobEmail = functions.httpsCallable('sendJobEmailApplicationSuccess');
                              sendJobEmail({ jobName: snapshot.data().jobName, email : userEmail}).then(result => {
                                console.log(result);
                              }).catch(error=>{
                                console.log(error);
                              });
                            }).catch((error)=>{
                              console.log(error);
                            });
 
                    }
                });
            });
        }else{
            alert("You must be logged in to apply");
        }
    });
}

function searchBarFN(){
  let search_bar = document.getElementById("searchBar");
  let location_bar = document.getElementById("location-filter");
  let category_bar = document.getElementById("category-filter");
  var search = search_bar.value.toLowerCase();
  var location = location_bar.value.toLowerCase();
  var category = category_bar.value.toLowerCase();


  let divs = document.getElementsByName('jobs');
  for(var i = 0; i < divs.length; i++){
    var hide_keyword = 1;
    var hide_location = 1;
    var hide_category = 1;

    if(!search){
      hide_keyword = 0;
    }if(!category){
      hide_category = 0;
    }if(!location){
      hide_location = 0;
    }
    if(location == "all"){
      hide_location = 0;
    }if(category == "all"){
      hide_category = 0;
    }


    let p = divs[i].getElementsByTagName('p');
    for(var j = 0; j <p.length; j++){
      var spans = p[j].getElementsByTagName('span');
      for(var k = 0; k <spans.length; k++){
        
        if(spans[k].innerText){
          if(spans[k].getAttribute("name") == 'location'){
            var text_l =spans[k].innerText;
            if(text_l.toLowerCase().lastIndexOf(location)>-1 || text_l.toLowerCase() == "all"){
              hide_location = 0;
            }
          }else if(spans[k].getAttribute("name") == 'category'){
            var text_c =spans[k].innerText;
            if(text_c.toLowerCase().lastIndexOf(category)>-1){
              hide_category = 0;
            }
          }    
          var text_k = spans[k].innerText;
          if(text_k.toLowerCase().lastIndexOf(search)> -1){
            hide_keyword = 0;
          }
        }
      }
    }
        let jobNames = divs[i].getElementsByTagName('h1');
    for(var l = 0; l < jobNames.length; l++){
      var text_k_j = jobNames[l].innerText;
      if(text_k_j.toLowerCase().lastIndexOf(search)>-1){
        hide_keyword = 0;
      }
    }
    if(hide_keyword == 0 && hide_category == 0 && hide_location == 0){
      divs[i].style.display = "";
      }else{
      divs[i].style.display = "none";
    }
  }
}


function pdfDownload(id, jobid){
    
    let pdfFile = new jsPDF();
    
    firestore.collection('Jobs/').doc(jobid).get().then((snapshot)=>{

            
        /*Define offset constants for page layout */
        const firstColumnOffset = 10;
        const secondColumnOffset = 55;
        const thirdColumnOffset = 110;
        const fourthColumnOffset = 165;
        
        const firstRowHeadingAlign = 65;
        const secondRowHeadingAlign = 80;
        const thirdRowHeadingAlign = 120;
        const fourthRowHeadingAlign = 160;
        const fifthRowHeadingAlign = 190;
        const sixthRowHeadingAlign = 230;
        const seventhRowHeadingAlign = 260;

        const rowSpace=10;
        const firstRowValueAlign = firstRowHeadingAlign + rowSpace;
        const secondRowValueAlign = secondRowHeadingAlign + rowSpace;
        const thirdRowValueAlign = thirdRowHeadingAlign + rowSpace;
        const fourthRowValueAlign = fourthRowHeadingAlign + rowSpace;
        const fifthRowValueAlign = fifthRowHeadingAlign + rowSpace;
        const sixthRowValueAlign = sixthRowHeadingAlign + rowSpace;
        const seventhRowValueAlign = seventhRowHeadingAlign + rowSpace;


        //Base64 string 'imgData' in authui.js
        pdfFile.addImage(imgData, 'JPEG', 0, 0, 215, 0)  //right offset, top offset,image expand value, image compress value

        //Headings
        pdfFile.setFont("AvenirLTStd-Heavy","bold");
        pdfFile.setFontSize(25);
        /*First Row */
  
        pdfFile.text(snapshot.data().jobName, pdfFile.internal.pageSize.getWidth() / 2, firstRowHeadingAlign, null, null, 'center');


        pdfFile.setFontSize(14);
        /*Second Row */
        pdfFile.text('About Job', firstColumnOffset, secondRowHeadingAlign); 
        /*Third Row */
        pdfFile.text('Job Skills or Qualifications', firstColumnOffset, thirdRowHeadingAlign);
        /*Fourth Row */
        pdfFile.text('Job Status',firstColumnOffset ,fourthRowHeadingAlign);
        pdfFile.text('Job Level', secondColumnOffset, fourthRowHeadingAlign);
        pdfFile.text('Job Location', thirdColumnOffset,fourthRowHeadingAlign);
        pdfFile.text('Job Category',fourthColumnOffset,fourthRowHeadingAlign);
        /*Fifth Row */
        pdfFile.text('Employer',firstColumnOffset,fifthRowHeadingAlign);
        pdfFile.text('Date Opened',secondColumnOffset,fifthRowHeadingAlign);
        pdfFile.text('Date Closed',thirdColumnOffset,fifthRowHeadingAlign);
        /*Sixth Row */
        pdfFile.text('Age',firstColumnOffset,sixthRowHeadingAlign);
        pdfFile.text('Gender',secondColumnOffset,sixthRowHeadingAlign);
        pdfFile.text('Salary',thirdColumnOffset,sixthRowHeadingAlign);
        /*Seventh Row */
        pdfFile.text('Date of description download',firstColumnOffset,seventhRowHeadingAlign);

        //Values
        pdfFile.setFontSize(12);
        pdfFile.setFont("AvenirLTStd-Light","normal");
        /*Second Row */
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().about,170), firstColumnOffset, secondRowValueAlign);
        /*Third Row */
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().skills,170), firstColumnOffset, thirdRowValueAlign);
            /*Fourth Row */ 
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().jobstatus,40), firstColumnOffset, fourthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().levels,30),   secondColumnOffset, fourthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().location,30), thirdColumnOffset, fourthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().category,30), fourthColumnOffset, fourthRowValueAlign);
            /*Fifth Row */
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().employer,30), firstColumnOffset, fifthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().opened,30), secondColumnOffset, fifthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().deadline,30),thirdColumnOffset, fifthRowValueAlign);
        /*Sixth Row */
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().age,30),firstColumnOffset, sixthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().gender,30),secondColumnOffset, sixthRowValueAlign);
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().salary,30),thirdColumnOffset, sixthRowValueAlign);
        /*Seventh Row */
        pdfFile.text((new Date()).toString(),10,seventhRowValueAlign);

        pdfFile.setFont("AvenirLTStd-Heavy","bold");
        pdfFile.setFontSize(25);
        pdfFile.text('Happy Hunting!', pdfFile.internal.pageSize.getWidth() / 2, 285, null, null, 'center');
  
        /*Save PDF to client*/
        pdfFile.save(`EmployTT-${snapshot.data().jobName} Description.pdf`);

    });

}
