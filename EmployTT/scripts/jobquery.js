//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Render JOB~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const jobTable = document.querySelector('#job-table');
const url = new URLSearchParams(window.location.search);
if(url.get("job")){
    let jobid = url.get("job");
          auth.onAuthStateChanged(user => {
            if (user) {
          //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Start call to database to render jobs~~~~~~~~~~~~~~~~~~~~
      firestore.collection('Jobs/').doc(jobid).get().then((snapshot)=>{
        
    
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CREATE ELEMENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
          let node = document.createElement('tr');
          let tableElement = document.createElement('td');
          let box = document.createElement('div');
          let separator = document.createElement('h4');
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
          jobName.textContent = snapshot.data().jobName;
          // title.setAttribute("style","clear:all");
          title.append(jobName);
          title.append(applyButton);
          title.append(pdfButton);
          title.append(shareButton);
          titlediv.append(title);
          // title.append(title_align);
      
      //~~~~~~~~~~~~~~~~~~~~~~~~~~Dates~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
          date.textContent = ("Posted: "+snapshot.data().opened+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+"Deadline: "+snapshot.data().deadline);
      
      
      //~~~~~~~~~~~~~~~~~~~~~~~~~~employer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          separator_1.setAttribute("size",1);
          node.setAttribute('doc-id',jobid);
          employer.textContent = snapshot.data().employer;
          employer_icon.setAttribute("class","material-icons");
          employer_icon.setAttribute("style","font-size:15px;");
          employer_icon.textContent = ("business");
          employer.setAttribute("style","font-size:15px;");
      
      //~~~~~~~~~~~~~~~~~~~~~~~~~~Location~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          location_icon.setAttribute("class","material-icons");
          location_icon.setAttribute("style","font-size:15px;");
          location_icon.textContent = ("location_on");
          location_p.setAttribute("class","loca");
          location.textContent = (snapshot.data().location);
          location.setAttribute("style","font-size:15px;");
      
      //~~~~~~~~~~~~~~~~~~~~~~~~~~All_Info~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          jobStatus.textContent = snapshot.data().jobstatus;
          levels.textContent = snapshot.data().levels;
          category.textContent = snapshot.data().category;
      
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
          about.textContent = snapshot.data().about;
          bold5.textContent = "Description: ";
          about_p.append(bold5);
          about_p.append(about);
      
      //~~~~~~~~~~~~~~~~~~~~~~~~~~Skills~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          skills.textContent = snapshot.data().skills;
          bold4.textContent = "Required Skills: ";
          skills_p.append(bold4);
          skills_p.append(skills);
      
      
        
      //~~~~~~~~~~~~~~~~~~~~~~~~~~Append_to_node~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        separator.textContent="\xa0\xa0\ ";
        box.setAttribute("class","divclass");
        box.append(titlediv);
        // box.append(breakln);
        box.append(separator_1);
      
        employer_p.append(employer_icon);
        employer_p.append(employer);
        box.append(employer_p);
      
        location_p.appendChild(location_icon);
        location_p.appendChild(location);
        box.append(location_p);
        box.append(allinfo);
        box.append(date);
        box.append(skills_p);
        box.append(about_p);
        box.append(separator);
        node.append(box);
        jobTable.append(node);
        });   
      }
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
        const thirdRowHeadingAlign = 110;
        const fourthRowHeadingAlign = 150;
        const fifthRowHeadingAlign = 180;
        const sixthRowHeadingAlign = 210;
        const seventhRowHeadingAlign = 230;

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
        pdfFile.text(pdfFile.splitTextToSize(snapshot.data().jobName,170), 85, firstRowHeadingAlign);
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
        pdfFile.text('Happy Hunting!', 75,270);
        /*Save PDF to client*/
        pdfFile.save(`EmployTT-${snapshot.data().jobName} Description.pdf`);

    });

}