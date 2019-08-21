const subBtnRef = document.querySelector("#submitButton");


const fileDrop = document.querySelector("#drop_zone");
const fileNames = document.querySelector("#file-names");
let fileNameArr = [];

let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton');

const picDrop          = document.querySelector('#employer-picture');
const picNames         = document.querySelector('#employer-pic-words');



auth.onAuthStateChanged(user => {
  if(user){
    const topOfPageMessage = document.querySelector('#message');
    topOfPageMessage.innerHTML="";
    const signupForm = document.querySelector("#signup-form");

    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const phoneNumber = document.querySelector("#phoneNumber");
    const dateOfBirth =document.querySelector("#dateofbirth");
    const email = document.querySelector('#signup-email');
    const addressOne = document.querySelector("#address1field");
    const addressTwo = document.querySelector("#address2field");
    const cityortown = document.querySelector("#town");
    const disabilites = document.querySelector("#disabilites-field");
    const cnfmPassword = document.querySelector("#cnfm-password");
    const origPassword = document.querySelector("#signup-password");
    const passwordLabel = document.querySelector('#profile-labels-password');
    console.log(origPassword.value)
    firestore.collection('Users').doc(user.uid).get().then(snapshot=>{
      console.log(snapshot.data());
      firstName.value=snapshot.data().firstName;
      lastName.value=snapshot.data().lastName;
      phoneNumber.value=snapshot.data().phoneNumber;
      email.value=snapshot.data().email;
      dateOfBirth.value=snapshot.data().dateOfBirth;
      addressOne.value=snapshot.data().addressOne;
      addressTwo.value=snapshot.data().addressTwo;
      cityortown.value=snapshot.data().cityortown;
      disabilites.value=snapshot.data().disabilites;



    }).catch(error=>{
      console.log(error);
    })
  }else if(!user.admin || !user.mda || !user.civilian){
    const topOfPageMessage = document.querySelector('#message');
    topOfPageMessage.innerHTML="";
  }else{
    document.body ="Unauthorized access to this page!"
  }
})


const cnfmPassword = document.querySelector("#cnfm-password");
const origPassword = document.querySelector("#signup-password");

cnfmPassword.addEventListener("change", e => {
  e.preventDefault();
  const initPassword = origPassword.value;
  const cnfmdPassword = cnfmPassword.value;

  if (initPassword != cnfmdPassword) {
    e.target.setCustomValidity(
      "Passwords do not match. Ensure that the same password is in both fields"
    );
    
  }
});

cnfmPassword.addEventListener("input", e => {
  e.preventDefault();
  e.target.setCustomValidity("");
});

/*
fileDrop.addEventListener("drop", dropListener => {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  dropListener.preventDefault();
  fileNames.innerHTML = "Files ready for upload:";

  if (dropListener.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < dropListener.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (dropListener.dataTransfer.items[i].kind === "file") {
        let file = dropListener.dataTransfer.items[i].getAsFile();

        fileNameArr[i] = dropListener.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);
        let droppedFile = document.createElement("p");
        droppedFile.innerHTML = file.name;
        fileNames.appendChild(droppedFile);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < dropListener.dataTransfer.files.length; i++) {
      console.log(
        "... file[" + i + "].name = " + dropListener.dataTransfer.files[i].name
      );
    }
  }
});

fileDrop.addEventListener("dragover", dragListener => {
  console.log("File(s) in drop zone");
  // Prevent default behavior (Prevent file from being opened)
  dragListener.preventDefault();
});
*/





/*
const updateButton = document.querySelector("#updateButton");
updateButton.addEventListener("click", e => {
  e.preventDefault();
  let prgBar = document.querySelector("#progress2-bar");
  let totalUploadSize = 0;
  let task = 0;
  let totalBytesTransferred = 0;

  const user = firebase.auth().currentUser;
  console.log("Update!");
  firestore.collection("Users").doc(user.uid).update({
      firstName: signupForm["firstName"].value,
      lastName: signupForm["lastName"].value,
      email: signupForm["signup-email"].value,
      phoneNumber: signupForm["phoneNumber"].value,
      dateOfBirth: signupForm["dateofbirth"].value,
      addressOne: signupForm["address1field"].value,
      addressTwo: signupForm["address2field"].value,
      cityortown: signupForm["town"].value,
      disabilites: signupForm["disabilites-field"].value,
      lastUpDated: new Date(),
    })
    .then(() => {
      //Update firestore
      console.log("Firestore updated");
      let user = auth.currentUser;
      user
        .updateProfile({
          // displayName: signupForm['firstName'].value,            //Update profile data
        })
        .then(() => {
          console.log("Profile Updated!");
          let user = auth.currentUser;
          user
            .sendEmailVerification()
            .then(() => {
              //send verification email
              console.log("Verification Email Sent!");

              for (let i = 0; i < fileNameArr.length; i++) {
                totalUploadSize += fileNameArr[i].size;
                console.log(totalUploadSize);
              }
              console.log(totalUploadSize);
              for (let i = 0; i < fileNameArr.length; i++) {
                let user = firebase.auth().currentUser; //Grab current user
                let storageRef = firebase
                  .storage()
                  .ref("Users/" + user.uid + "/" + fileNameArr[i].name); //Create path for new user in database
                task = storageRef.put(fileNameArr[i]);
                console.log("Uploading: " + i + totalUploadSize);
                task.on(
                  "state_changed",
                  function progress(snapshot) {
                    totalBytesTransferred += snapshot.bytesTransferred;
                    let percentageTransferred =
                      (totalBytesTransferred / totalUploadSize) * 100;
                    prgBar.value = percentageTransferred;
                  },
                  function(error) {
                    console.log(error);
                  },
                  function complete() {
                    console.log("File uploaded successfully!");
                    setTimeout(locate, 500);
                    function locate() {
                      window.location = "./userprofileinfo.html";
                    }
                  }
                );
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
  signupForm["firstName"].value = "";
  signupForm["lastName"].value = "";
  signupForm["signup-email"].value = "";
  signupForm["phoneNumber"].value = "";
  signupForm["dateofbirth"].value = "";
  signupForm["address1field"].value = "";
  signupForm["address2field"].value = "";
  signupForm["town"].value = "";
  signupForm["disabilites-field"].value = "";
});
*/



logOutBtn.addEventListener("click", e => {
  e.preventDefault();
  signupForm["firstName"].value = "";
  signupForm["lastName"].value = "";
  signupForm["signup-email"].value = "";
  signupForm["phoneNumber"].value = "";
  signupForm["dateofbirth"].value = "";
  signupForm["address1field"].value = "";
  signupForm["address2field"].value = "";
  signupForm["town"].value = "";
  signupForm["disabilites-field"].value = "";
});


const fileInputIds = ["resume","transcript","birthCert","nationalID","driverLicense","policeCert","videoCharacter","reference-one","reference-two","certificate-one","certificate-two","certificate-three","certificate-four","certificate-five"];
const fileLabelIds=["resume-label","transcript-label","birthCert-label","nationalID-label","driverLicense-label","policeCert-label","videoCharacter-label","reference-one-label","reference-two-label","certificate-one-label","certificate-two-label","certificate-three-label","certificate-four-label","certificate-five-label"];
const resumeLabel = document.querySelector('#resume-label')

const transcriptLabel = document.querySelector('#transcript-label')

const resetFile = document.querySelector('#resume-reset');
resetFile.addEventListener('click',e=>{
  e.preventDefault();
  let pot =  document.getElementById('resume');
  pot.value = ""
  let label = document.querySelector('#resume-label');
  label.innerHTML = 'No File Chosen'
})

const testButton = document.querySelector('#updateButton1');
testButton.addEventListener('click',e=>{
  e.preventDefault()

  fileInputIds.forEach(inputID=>{
    let fileID = document.getElementById(inputID).files[0];
    //console.log(fileID);
    if(fileID !== undefined){
      
      console.log(fileID.type.split("/")[1]);
    }
  })

  

 
})

fileInputIds.forEach(inputID=>{
  queryID = `#${inputID}`;
  const fileSelector = document.querySelector(queryID);
  fileSelector.addEventListener('change',e=>{
    e.preventDefault();
    const fileReference = document.getElementById(inputID).files[0];
    const fileReferenceLabel = document.querySelector(`#${inputID}-label`);
    fileReferenceLabel.innerHTML = fileReference.name;
  })
})


