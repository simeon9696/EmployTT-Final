const url = new URLSearchParams(window.location.search);
const jobTable = document.querySelector('#job-table');
if(url.get("job")){
    let jobid = url.get("job");
          //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Start call to database to render jobs~~~~~~~~~~~~~~~~~~~~
      firestore.collection('Jobs/').doc(jobid).get().then((snapshot)=>{
        
    
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CREATE ELEMENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
      let node = document.createElement('tr');
      let tableElement = document.createElement('td');
      let box = document.createElement('div');
      let box1 = document.createElement('div');
      let box2 = document.createElement('div');

      let separator = document.createElement('h4');
      //let separator_1 = document.createElement('hr');
      let separator_2 = document.createElement('span');
      let separator_3 = document.createElement('span');
      let breakln = document.createElement('br');

      let titlediv = document.createElement('span');
      let title = document.createElement('p');
      let jobName = document.createElement('h1');
      let title_align = document.createElement('hr');
      let employer = document.createElement('p');
      let employer_p = document.createElement('p');
      let employer_icon = document.createElement('i');
      let bold7 = document.createElement('strong');

      let about_p = document.createElement('p');
      let about = document.createElement('p');
      let bold5 = document.createElement('strong');

      let date = document.createElement('p');
      let dateo = document.createElement('p');
      let dated = document.createElement('p');
      let bold8 = document.createElement('strong');
      let bold9 = document.createElement('strong');

      let location = document.createElement('p');
      let location_p = document.createElement('p');
      let location_icon = document.createElement('i');
      let bold6 = document.createElement('strong');

      let allinfo = document.createElement('p');
      let bold1 = document.createElement('strong');
      let bold2 = document.createElement('strong');
      let bold3 = document.createElement('strong');
      let jobStatus = document.createElement('p');
      let levels = document.createElement('p');
      let category = document.createElement('p');

      let skills_p = document.createElement('p');
      let bold4 = document.createElement('strong');
      let skills = document.createElement('p');

      date.setAttribute("class","grid-items");
      dateo.setAttribute("class","grid-items");
      dated.setAttribute("class","grid-items");
      bold8.setAttribute("class","grid-items");
      bold9.setAttribute("class","grid-items");

      location.setAttribute("class","grid-items");
      location_p.setAttribute("class","grid-items");
      location_icon.setAttribute("class","grid-items");
      bold6.setAttribute("class","grid-items");
      allinfo.setAttribute("class","grid-items");
      bold1.setAttribute("class","grid-items");
      bold2.setAttribute("class","grid-items");
      bold3.setAttribute("class","grid-items");
      jobStatus.setAttribute("class","grid-items");
      levels.setAttribute("class","grid-items");
      category.setAttribute("class","grid-items");

      skills_p.setAttribute("class","grid-items");
      bold4.setAttribute("class","grid-items");
      skills.setAttribute("class","grid-items");

      let applyButton = document.createElement('button');
      let pdfButton = document.createElement('button');
      let shareButton = document.createElement('button');

    //   var grids = document.getElementsByTagName('p');
    //   var c;
    //   grids[2].setAttribute("class","grid-items");
    //   for(c = 0; c < grids.length; c++){
    //       grids[c].setAttribute("class","grid-items");
    //   }

    separator_2.textContent = "\u00A0\u00A0\u00A0\u00A0";
    separator_3.textContent = "\u00A0\u00A0\u00A0\u00A0";

  //~~~~~~~~~~~~~~~~~~~~~~~~~~Buttons ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


      var jobid = snapshot.id;

      //!!!!!!!!!!!!!!!!!!!!APPLY BUTTON!!!!!!!!!!!!
      var applyButtonID = jobid + "applybutton";
      applyButton.setAttribute("id",applyButtonID);

      applyButton.setAttribute("name",jobid);
      applyButton.setAttribute("onClick","clickedButton(this.id, this.name)");


      auth.onAuthStateChanged(user => {
        if (user) {
            const docRef = firestore.collection('Users');
            docRef.doc(user.uid).get().then(function(doc) {
                var user_id = doc.id;
                firestore.collection('Applicants').where('user_id','==',user.uid).where('job_id','==',jobid).get().then((snapshot)=>{
                  console.log(snapshot.docs.length);
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
              }
            });     
      //!!!!!!!!!!!!!!!!!!PDF BUTTON!!!!!!!!!!!!!!!!!
      pdfButton.setAttribute("id",1);
      pdfButton.setAttribute("name", jobid);
      pdfButton.setAttribute("class","normalButton");
      pdfButton.setAttribute("onClick","pdfDownload(this.name)");

      var downloadtext = document.createTextNode("Download as PDF");
      pdfButton.appendChild(downloadtext);

      //!!!!!!!!!!!!!!!!!SHARING BUTTON!!!!!!!!!!!!!!
      shareButton.setAttribute("name", jobid);
      shareButton.setAttribute("onClick","copyLink(this.name)");
      var linktext = document.createTextNode("Share");
      shareButton.appendChild(linktext);
      shareButton.setAttribute("class","normalButton");

  //~~~~~~~~~~~~~~~~~~~~~~~~~~Jobname~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      jobName.textContent = DOMPurify.sanitize(snapshot.data().jobName);
      title.setAttribute("class","job-name");
      title.setAttribute("style","text-align: left;");
      // title.setAttribute("style","clear:all");
      title.append(jobName);

      titlediv.append(title);


  //~~~~~~~~~~~~~~~~~~~~~~~~~~Dates~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
      date.textContent = ("Posted: "+DOMPurify.sanitize(snapshot.data()).opened+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+"Deadline: "+DOMPurify.sanitize(snapshot.data().deadline));
      dateo.textContent = (DOMPurify.sanitize(snapshot.data().opened));
      dateo.setAttribute("style","font-size:15px;");
      dated.textContent = (DOMPurify.sanitize(snapshot.data().deadline));
      dated.setAttribute("style","font-size:15px;");
      bold8.textContent = "Posted: ";
      bold9.textContent = "Deadline: ";


  //~~~~~~~~~~~~~~~~~~~~~~~~~~employer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      //separator_1.setAttribute("size",1);
      node.setAttribute('doc-id',jobid);
      employer.textContent = DOMPurify.sanitize(snapshot.data().employer);

      employer.setAttribute("style","font-size:15px;");
      bold7.textContent = "Employer: ";
      bold7.setAttribute("class","grid-items");


      location.textContent = (DOMPurify.sanitize(snapshot.data().location));
      location.setAttribute("style","font-size:15px;");
      bold6.textContent = "Location: ";

      location_p.appendChild(location_icon);
      location_p.appendChild(bold6);


  //~~~~~~~~~~~~~~~~~~~~~~~~~~All_Info~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      jobStatus.textContent = DOMPurify.sanitize(snapshot.data().jobstatus);
      jobStatus.setAttribute("style","font-size:15px;");
      levels.textContent = DOMPurify.sanitize(snapshot.data().levels);
      levels.setAttribute("style","font-size:15px;");
      category.textContent = DOMPurify.sanitize(snapshot.data().category);
      category.setAttribute("style","font-size:15px;");
      bold1.textContent = "Status: ";
      bold2.textContent = "Level: ";
      bold3.textContent = "Category: ";


  //~~~~~~~~~~~~~~~~~~~~~~~~~~About Job~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      about.textContent = DOMPurify.sanitize(snapshot.data().about);
      about.setAttribute("style","font-size:15px;");
      about.setAttribute("class","grid-items");
      bold5.textContent = "About: ";
      bold5.setAttribute("class","grid-items");


  //~~~~~~~~~~~~~~~~~~~~~~~~~~Skills~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      skills.textContent = DOMPurify.sanitize(snapshot.data().skills);
      skills.setAttribute("style","font-size:15px;");
      skills.setAttribute("class","grid-items");
      bold4.textContent = "Skills & Qualifications: ";
      bold4.setAttribute("id","skills-heading");
      bold4.setAttribute("class","grid-items");


  //~~~~~~~~~~~~~~~~~~~~~~~~~~Append_to_node~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    box1.setAttribute("class","grid1");
    box2.setAttribute("class","grid2");

    separator.textContent="\xa0\xa0\ ";
    box.setAttribute("class","divclass");
    box.appendChild(titlediv);
    //box.append(separator_1);

    box1.appendChild(bold5);
    box1.appendChild(about);
    box1.appendChild(bold4);
    box1.appendChild(skills);

    //~~~~~~~~~~~~~~~~~Row 1
    box2.appendChild(bold1);
    box2.appendChild(bold2);
    box2.appendChild(bold6);
    box2.appendChild(bold3);

    //~~~~~~~~~~~~~~~~~Row 2
    box2.appendChild(jobStatus);
    box2.appendChild(levels);
    box2.appendChild(location);
    box2.appendChild(category);

    //~~~~~~~~~~~~~~~~Row 3
    box2.appendChild(bold7);
    box2.appendChild(bold8);
    box2.appendChild(bold9);
    let emptdiv1 = document.createElement('span');
    box2.appendChild(emptdiv1);

    //~~~~~~~~~~~~~~~~Row 4

    box2.appendChild(employer);
    box2.appendChild(dateo);
    box2.appendChild(dated);


    box.appendChild(separator);
    node.appendChild(box);
    node.appendChild(box1);
    node.appendChild(box2);
    jobTable.appendChild(node);
    });   
}

function checkIfApplied(jobid, userID){
  
    // if( firestore.collection('Applicants').where("job_id","==",jobid).get()){
      // firestore.collection('Applicants').where("job_id","==",jobid).get().then((snapshot)=>{
      firestore.collection('Applicants').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
          let user__id = doc.data().user_id; 
          if(user__id == userID){
              return(1);
          }else{
            return(0);
          }
        });
        
      });
    // }
    
}

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
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sharing Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
function copyLink(name){
    // var hostname = window.location.origin;
    var query1 = name;
    var queryString = "?job=" + query1;
    var link = window.location.hostname + "/jobquery.html" + queryString;
    // alert(link);
    var modal = document.getElementById("modal");
    // var close = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    var modal_content = document.getElementsByClassName("modal_content")[0];
    let thelink = document.createElement('p');
    thelink.setAttribute("id","link");
    thelink.textContent = link;
    modal_content.appendChild(thelink);
    
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Application Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
                        alert("Applied for job");
                        var classChange = document.getElementById(jobid+"applybutton");
                        if(classChange.textContent == "Apply"){
                          classChange.textContent = "Reapply?";
                        }
                        classChange.classList.toggle("applied");
                        var template_params = {
                            "user_email": user.email,
                            "reply_to": "noreply",
                            "to_name": user.displayName
                         }

                        var service_id = "default_service";
                        var template_id = "template_FNuLCybl";
                    
                        
                        emailjs.send(service_id, template_id, template_params)
                        .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        }, function(error) {
                        console.log('FAILED...', error);
                        });
                    }
                });
            });
        }else{
            alert("You must be logged in to apply");
        }
    });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PDF Function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

