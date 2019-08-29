const subBtnRef = document.querySelector("#submitButton");


const fileDrop = document.querySelector("#drop_zone");
const fileNames = document.querySelector("#file-names");
let fileNameArr = [];

let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton');

const picDrop          = document.querySelector('#employer-picture');
const picNames         = document.querySelector('#employer-pic-words');
const fileInputIds = ["resume","transcript","birthCert","nationalID","driverLicense","policeCert","videoCharacter","reference-one","reference-two","certificate-one","certificate-two","certificate-three","certificate-four","certificate-five"];
const fileLabelIds=["resume-label","transcript-label","birthCert-label","nationalID-label","driverLicense-label","policeCert-label","videoCharacter-label","reference-one-label","reference-two-label","certificate-one-label","certificate-two-label","certificate-three-label","certificate-four-label","certificate-five-label"];
const fileResetInputIds = ["resume-reset","transcript-reset","birthCert-reset","nationalID-reset","driverLicense-reset","policeCert-reset","videoCharacter-reset","reference-one-reset","reference-two-reset","certificate-one-reset","certificate-two-reset","certificate-three-reset","certificate-four-reset","certificate-five-reset"];
const fileExtensionWhiteList = ["pdf","doc","docx","jpg","jpeg","mp4","mkv","application/msword","vnd.openxmlformats-officedocument.wordprocessingml.document","png","tiff"]
const textFieldInputIds = ["firstName","lastName","signup-email","phoneNumber","dateofbirth","address1field","address2field","town","disabilites-field"];
const documentFields = ["firstName","lastName","email","phoneNumber","dateOfBirth","addressOne","addressTwo","cityortown","disabilites"];
const checkboxes = ["checkbox-engineering","checkbox-clerical","checkbox-agriculture","checkbox-machine-learning"];
const checkNames=["engineeering","clerical","agricultture","machine-learning"];
let changedFiles=[];
let oldFiles=[];


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
      firstName.placeholder=snapshot.data().firstName;
      lastName.placeholder=snapshot.data().lastName;
      phoneNumber.placeholder=snapshot.data().phoneNumber;
      email.placeholder=snapshot.data().email;
      dateOfBirth.value=snapshot.data().dateOfBirth;
      addressOne.placeholder=snapshot.data().addressOne;
      addressTwo.placeholder=snapshot.data().addressTwo;
      cityortown.placeholder=snapshot.data().cityortown;
      disabilites.placeholder=snapshot.data().disabilites;
      
      firestore.doc(`Users/${user.uid}/jobPreferences/myPreferences`).get().then(preference=>{
        if(preference.exists){
          preference.data().jobPreferences.forEach(preference=>{
            checkNames.forEach(name=>{
              if(preference === name){
                let checkboxValue = document.querySelector(`#${checkboxes[checkNames.indexOf(name)]}`);
                checkboxValue.checked=true;
              }
            })
          })
        }else {
          console.log('No preferences yet')
        }
        

      }).catch(error=>{
        console.log(error);
      })
 


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




let textFieldParametersChanged =false;
let checkBoxesChanged = false;
textFieldInputIds.forEach(field=>{
  let textField = document.querySelector(`#${field}`);
  textField.addEventListener('change',e=>{
    textFieldParametersChanged=true;
    e.preventDefault();
    console.log(textField.value);
  })
})

const testButton = document.querySelector('#updateButton1');
testButton.addEventListener('click',e=>{
  e.preventDefault()
  let currentFiles=[];
  let prgBar = document.querySelector("#progress2-bar");
  let totalUploadSize = 0;
  let task = 0;
  let totalBytesTransferred = 0;

  fileInputIds.forEach(inputID=>{
    let fileID = document.getElementById(inputID).files[0];
    currentFiles.push(fileID);
  })
  let referencesToBeStripped = changedFiles.filter(n=>!currentFiles.includes(n))
  referencesToBeStripped.forEach(reference=>{
    var index = changedFiles.indexOf(reference);
    if (index > -1) {
      changedFiles.splice(index, 1);
    }
  })
  changedFiles.forEach(file=>{
    totalUploadSize += file.size;
  })
  console.log(totalUploadSize);


 if(totalUploadSize === 0 && textFieldParametersChanged===false && checkBoxesChanged===false){
  let cnfmRedirect = confirm('No changes detected. No updates made.\nYou will be redirected if you click "ok"');
  if(cnfmRedirect){
    window.location = "./userprofileinfo.html";
  }


 }else{
  
  let textUpdateFinish = false;
  let fileUpdateFinish = false;
  if(checkBoxesChanged){
    let firebaseObject ={};
    let jobPreferences=[];
    let user = auth.currentUser;
    checkboxes.forEach(box=>{
      let checkboxData =document.querySelector(`#${box}`);
      if(checkboxData.checked ===true){
        jobPreferences.push(`${checkNames[checkboxes.indexOf(checkboxData.id)]}`); 
      }
    })
    firestore.doc(`Users/${user.uid}/jobPreferences/myPreferences`).get().then(doc=>{
      if(doc.exists){
        firestore.doc(`Users/${user.uid}/jobPreferences/myPreferences`).update({
          jobPreferences : jobPreferences
      }).then(()=>{
        console.log('Job Preferences updated');
  
      }).catch(error =>{
        console.log(error);
      });
      }else{
        firestore.doc(`Users/${user.uid}/jobPreferences/myPreferences`).set({
          jobPreferences : jobPreferences
      }).then(()=>{
        console.log('Job Preferences created');
  
      }).catch(error =>{
        console.log(error);
      });
      }

  }).catch(error =>{
    console.log(error);
  });





  }
  if(textFieldParametersChanged){
    let firebaseObject ={};
    let user = auth.currentUser;

    textFieldInputIds.forEach(field=>{
      let textField = document.querySelector(`#${field}`)
      if(textField.value !== ""){
        console.log(textField.value);
        console.log( documentFields[textFieldInputIds.indexOf(field)]);
        firebaseObject[documentFields[textFieldInputIds.indexOf(field)]] = textField.value;
        if(providerID === "password"){
          if(field === "firstName"){
            user.updateProfile({ displayName : textField.value}).then(()=>console.log('Display name Updated')).catch(error =>console.log(error));
          }
        }
      }
     
      firebaseObject["lastUpdated"] = new Date();
    })
    firestore.doc(`Users/${user.uid}`).update(firebaseObject).then(()=>{
      console.log('User document updated');
      textUpdateFinish = true;
      if(totalUploadSize===0){fileUpdateFinish = true;}
      console.log(totalUploadSize)
      if(fileUpdateFinish){
        window.location = "./userprofileinfo.html";
      }
    }).catch(error =>{
      console.log(error);
    });
  }
  
  if(totalUploadSize !== 0){
    fileInputIds.forEach(inputID=>{
      let fileID = document.getElementById(inputID).files[0];
      changedFiles.forEach(file=>{
        if(file ===fileID){
          let user = auth.currentUser; //Grab current user
          let storageRef = storage.ref(`Users/${user.uid}/${inputID}/${file.name}`); //directory of file to be uploaded
          let deleteRef = storage.ref(`Users/${user.uid}/${inputID}`); //folder in which file would be deleted if file exists
          // Now we get the references of these files
          deleteRef.listAll().then( result=>{ //detect if directory is empty or not
            if(result.items.length === 0){ //if it is empty upload the file
              task = storageRef.put(file);
              task.on("state_changed",
                function progress(snapshot) {
                  totalBytesTransferred += snapshot.bytesTransferred;
                  let percentageTransferred =
                    (totalBytesTransferred / totalUploadSize) * 100;
                  prgBar.value = percentageTransferred;
                },
                function(error) {
                  console.log(error);
                  alert(error);
                },
                function complete() {
                  console.log("File uploaded successfully!");
                  fileUpdateFinish = true;
                  if(!textFieldParametersChanged){textUpdateFinish = true;}
                  if(textUpdateFinish){
                    window.location = "./userprofileinfo.html";
                  }
                }
                );
            }else{
              result.items.forEach(fileRef=> {
                        
                fileRef.delete().then(()=> { // If it's not, delete the existing files and upload the new file
                  console.log('Delete successful')
                  task = storageRef.put(file);
                  task.on("state_changed",
                    function progress(snapshot) {
                      totalBytesTransferred += snapshot.bytesTransferred;
                      let percentageTransferred =
                        (totalBytesTransferred / totalUploadSize) * 100;
                      prgBar.value = percentageTransferred;
                    },
                    function(error) {
                      console.log(error);
                      alert(error);
                    },
                    function complete() {
                      console.log("File uploaded successfully!");
                      fileUpdateFinish = true;
                      if(!textFieldParametersChanged){textUpdateFinish = true;}
                      console.log(textFieldParametersChanged)
                      if(textUpdateFinish){
                        window.location = "./userprofileinfo.html";
                      }
                    }
                    );
        
        
                }).catch(function(error) {
                  console.log(error);
                });
        
                })
            }
    
          }) 
        }
      })
    })
  }
  else{
    console.log('no file')
  }



 }


 

})

fileInputIds.forEach(inputID=>{
  const fileReferenceReset= document.querySelector(`#${inputID}-reset`);
  fileReferenceReset.addEventListener('click',e=>{
  e.preventDefault();
  let fileChosen =  document.getElementById(inputID);
  var index = changedFiles.indexOf(fileChosen.files[0]);
  if (index > -1) {
    changedFiles.splice(index, 1);
     fileChosen.value = "";
     let fileLabel = document.querySelector(`#${inputID}-label`);
     fileLabel.innerHTML = 'No File';
  }
});

const fileSelector = document.querySelector(`#${inputID}`);
fileSelector.addEventListener('change',e=>{
  e.preventDefault();

  const fileReference = document.getElementById(inputID).files[0];
  let fileReferenceLabel = document.querySelector(`#${inputID}-label`);
  fileReferenceLabel.innerHTML = fileReference.name;
  //check to see if file has a valid file extension
  if (fileExtensionWhiteList.indexOf((fileReference.type.split("/")[1])) > -1){
   // oldFiles = [...changedFiles];
    changedFiles.push(fileReference);

  } else {
    fileReference.value ="";
    fileReferenceLabel.style.color ="red";
    fileReferenceLabel.innerHTML = "Unsupported File Type";
     setTimeout(function(){
      fileReferenceLabel.style.color ="black";
      fileReferenceLabel.innerHTML = "No File";
    },1000)
  }
  });
})


checkboxes.forEach(checkbox =>{
  let boxSelector = document.querySelector(`#${checkbox}`);
  boxSelector.addEventListener('change',e=>{
    e.preventDefault();
    checkBoxesChanged=true;
  })
})