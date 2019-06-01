// Your web app's Firebase configuration


// TODO: Add SDKs for Firebase products that you want to use
    //https://firebase.google.com/docs/web/setup#config-web-app -->

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD3rzcDvo74D7siPasdB6TyRFQtxsKgHSc",
    authDomain: "igovtt-employtt.firebaseapp.com",
    databaseURL: "https://igovtt-employtt.firebaseio.com",
    projectId: "igovtt-employtt",
    storageBucket: "igovtt-employtt.appspot.com",
    messagingSenderId: "583940496531",
    appId: "1:583940496531:web:52655eb0b4f3f53c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  const functions = firebase.functions();
const firestore = firebase.firestore(); //Grab reference to database
const auth = firebase.auth(); //Grab reference to firebase objects
const prgBarRef = document.getElementById('resumeFile');
const fileBtnRef = document.getElementById('fileButton');
const userData = firestore.doc('/');

/*
cnfmPassword.addEventListener("change",(passwordChange)=>{
    const initPassword =passRef.value;
    const cnfmdPassword = cnfmPassword.value;

    if(initPassword !=cnfmdPassword){
        passwordChange.target.setCustomValidity('Passwords do not match. Ensure that the same password is in both fields');
        
    }
})

cnfmPassword.addEventListener("input",(emailChange)=>{
    emailChange.target.setCustomValidity('');
})

*/

const subBtnRef  = document.querySelector("#submitButton"); 
const signupForm = document.querySelector('#signup-form');

const firstName     = document.querySelector('#firstName');
const lastName      = document.querySelector('#lastName')
const cnfmPassword  = document.querySelector('#cnfmPassword')
const addressOne    = document.querySelector('#addressOne')
const addressTwo    = document.querySelector('#addressTwo')
const cityortown    = document.querySelector('#cityortown')
const phoneNumber   = document.querySelector('#phoneNumber')


const fileDrop          = document.querySelector('#drop_zone');
const fileNames         = document.querySelector('#file-names');
let   fileNameArr       = [];





fileDrop.addEventListener('drop',(dropListener)=>{
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    dropListener.preventDefault();
    fileNames.innerHTML="Files ready for upload:";
    

    if (dropListener.dataTransfer.items) {
        
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dropListener.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (dropListener.dataTransfer.items[i].kind === 'file') {
          let file = dropListener.dataTransfer.items[i].getAsFile();
          fileNameArr[i] =dropListener.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          let droppedFile = document.createElement("p"); 
          droppedFile.innerHTML=file.name;
          fileNames.appendChild(droppedFile);
          
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < dropListener.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + dropListener.dataTransfer.files[i].name);
      }
    }
})

fileDrop.addEventListener('dragover',(dragListener)=>{
    console.log('File(s) in drop zone'); 
    // Prevent default behavior (Prevent file from being opened)
    dragListener.preventDefault();
})


subBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();

    const email = signupForm['signup-email'].value;  // gone
    const password  = signupForm['signup-password'].value; //gone - don't give to firebase in plaintext
    let prgBar = document.querySelector('#progressBar');
    let totalUploadSize =0;
    let task =0;
    let totalBytesTransferred =0;
    //console.log(email);
    //console.log(password);

    auth.createUserWithEmailAndPassword(email, password)
    .then(cred =>{  	                                          //After account has been created chain promises

       firestore.collection('Users').doc(cred.user.uid).set({
        User : signupForm['signup-email'].value,
      }).then(()=>{                                             //Update firestore
        console.log("Firestore updated");
        let user=auth.currentUser;
        user.updateProfile({
          displayName: signupForm['firstName'].value,            //Update profile data
        }).then(()=>{                                          
           console.log("Profile Updated!");
           let user=auth.currentUser;
           user.sendEmailVerification()
           .then(()=> {                                         //send verification email
            console.log("Verification Email Sent!");


            for (let i = 0; i < fileNameArr.length; i++) {
              totalUploadSize+=fileNameArr[i].size;
              console.log(totalUploadSize);
            } 
            console.log(totalUploadSize);
            for (let i = 0; i < fileNameArr.length; i++) {
                      let user = firebase.auth().currentUser;  //Grab current user
                      let storageRef = firebase.storage().ref('Users/'+user.uid +'/'+fileNameArr[i].name); //Create path for new user in database
                      task = storageRef.put(fileNameArr[i]); 
                      console.log('Uploading: '+ i + totalUploadSize);
                      task.on('state_changed',function progress(snapshot){
                        totalBytesTransferred +=snapshot.bytesTransferred;
                        let percentageTransferred = (totalBytesTransferred/totalUploadSize)*100;
                        prgBar.value = percentageTransferred; 
                      },
                      function (error){
                        console.log(error);
                      },
                      function complete(){
                        console.log("File uploaded successfully!");
                        window.location = '../index.html';
                    })
        
              } 
           }).catch((error)=>{
            console.log(error);
           });
        }).catch((error)=>{
           console.log(error);
        });
      }).catch((error)=>{
        console.log(error);
      })
      
    })
    .catch((error)=>{
        console.log(error);

    });

    
});

/* 

*/

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

const googleBtnRef = document.querySelector("#googleSignIn"); 
googleBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if(result){
        console.log("We're here");
        window.location.assign("../index.html");  //USE DOUBLE QUOTES WHEN USING THIS FUNCTION
      }

        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken;
          // ...

        }
        // The signed-in user info.
        let user = result.user;
        //window.location.assign("../index.html");  //USE DOUBLE QUOTES WHEN USING THIS FUNCTION
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });

})

