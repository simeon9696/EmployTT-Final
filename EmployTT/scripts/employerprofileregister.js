const subBtnRef = document.querySelector("#submitButton");
const signupForm = document.querySelector("#signup-form");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const phoneNumber = document.querySelector("#phoneNumber");

const addressOne = document.querySelector("#address1field");
const addressTwo = document.querySelector("#address2field");
const cityortown = document.querySelector("#town");
const disabilites = document.querySelector("#disabilites-field");

const fileDrop = document.querySelector("#drop_zone");
const fileNames = document.querySelector("#file-names");
let fileNameArr = [];

let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton');

const picDrop          = document.querySelector('#employer-picture');
const picNames         = document.querySelector('#employer-pic-words');
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

const submitBtn = document.querySelector("#submitButton");
submitBtn.addEventListener("click", e => {
  e.preventDefault();
  auth.createUserWithEmailAndPassword(signupForm["signup-email"].value, signupForm["cnfm-password"].value).then(cred => {
    //After account has been created chain promises
    const civilianEmail = signupForm["signup-email"].value; // gone

    const addCivilianRole = functions.httpsCallable("addCivilianRole");
    addCivilianRole({ email: civilianEmail}).then(result => {
      console.log(result);
    }); 

    const employerRequest = functions.httpsCallable("employerAccountRequest");
    employerRequest({ email: signupForm["signup-email"].value, 
                    companyname: signupForm["companyName"].value, 
                    address: `${signupForm["address1field"].value} ${signupForm["address2field"].value}`,
                    phonenumber: signupForm["phoneNumber"].value
    }).then(result => {
        console.log(result);
    }); 
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    firestore.collection("Users").doc(cred.user.uid).set({
        firstName: signupForm["companyName"].value,
        lastName: "",
        email: signupForm["signup-email"].value,
        phoneNumber: signupForm["phoneNumber"].value,
        dateOfBirth: new Date().toLocaleDateString("en-US", options),
        addressOne: signupForm["address1field"].value,
        addressTwo: signupForm["address2field"].value,
        cityortown: signupForm["town"].value,
        disabilites: "",
        profileCreationDate: new Date(),
        lastUpdated: new Date(),


      }).then(()=>{
        console.log("Firestore updated");
        let user = auth.currentUser;
        user.updateProfile({
          displayName: signupForm["companyName"].value, //Update profile data
        }).then(() => {
            console.log("Profile Updated!");
            let user = auth.currentUser;
            user.sendEmailVerification().then(() => {
                //send verification email
                console.log("Verification Email Sent!");
                firestore.collection("Users").doc(cred.user.uid).collection("jobsAppliedFor").doc("myApplications").set({

                }).then(()=>{
                  firestore.collection("Users").doc(cred.user.uid).collection("jobsPosted").doc("myPostings").set({


                  }).then(()=>{
                    window.location.assign("./userprofileinfo.html")
                  }).catch((error)=>{
                    console.log(error);
                  });
                }).catch((error)=>{
                   console.log(error);
                });
        
                
            }).catch(error=>{
              console.log(error);
            });
        }).catch(error=>{
          console.log(error);
          alert(error);
        });
      }).catch(error=>{
        console.log(error);
      });
}).catch(error =>{
  console.log(error);
});

});