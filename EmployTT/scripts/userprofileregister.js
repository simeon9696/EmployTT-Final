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

auth.onAuthStateChanged(user => {
  if (user) {
    if (providerID === "google.com") {
      signupForm["signup-password"].style.display = "none";
      signupForm["cnfm-password"].style.display = "none";
      signupForm["signup-email"].value = user.email;
      document.querySelector("#profile-labels-password").style.display = "none";
      document.querySelector("#profile-password-cnfm").style.display = "none";
      document.querySelector("#password-star").style.display = "none";
      document.querySelector("#cnfm-password-star").style.display = "none";
      document.querySelector("#submitButton").style.display = "none";
      document.querySelector("#googleSignIn").style.display = "none";



      let updateBtn = document.querySelector("#updateButton");
      updateBtn.innerHTML = "Update";
      updateBtn.style.display = "block";

      window.scrollTo({ top: 0, behavior: "smooth" });
      user.providerData.forEach(profile =>{
        console.log(profile);
      });
    }

    // User is signed in.
  } else {

    let updateBtn = document.querySelector("#updateButton");
    updateBtn.innerHTML = "";
    updateBtn.style.display = "none";
  }
});


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

subBtnRef.addEventListener("click", btnPressListener => {
  btnPressListener.preventDefault();

  const email = signupForm["signup-email"].value; // gone
  const password = signupForm["signup-password"].value; //gone - don't give to firebase in plaintext

  let prgBar = document.querySelector("#progress2-bar");
  let totalUploadSize = 0;
  let task = 0;
  let totalBytesTransferred = 0;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      //After account has been created chain promises
      const civilianEmail = signupForm["signup-email"].value; // gone
      const addCivilianRole = functions.httpsCallable("addCivilianRole");
      addCivilianRole({ email: civilianEmail }).then(result => {
        console.log(result);
      });
      firestore
        .collection("Users")
        .doc(cred.user.uid)
        .set({
          firstName: signupForm["firstName"].value,
          lastName: signupForm["lastName"].value,
          email: signupForm["signup-email"].value,
          phoneNumber: signupForm["phoneNumber"].value,
          dateOfBirth: signupForm["dateofbirth"].value,
          addressOne: signupForm["address1field"].value,
          addressTwo: signupForm["address2field"].value,
          cityortown: signupForm["town"].value,
          disabilites: signupForm["disabilites-field"].value,
          profileCreationDate: new Date(),
        })
        .then(() => {
          //Update firestore
          console.log("Firestore updated");
          let user = auth.currentUser;
          user
            .updateProfile({
              displayName: signupForm["firstName"].value, //Update profile data
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
                        console.log("Files uploaded successfully!");
                        setTimeout(locate, 1500);
                        function locate() {
                          window.location = "./userprofileinfo.html";
                        }
                      }
                    );
                  }
                })
                .catch(error => {
                  console.log(error);
                  alert(error);
                });
            })
            .catch(error => {
              console.log(error);
              alert(error);
            });
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
});

/* 

*/

const googleBtnRef = document.querySelector("#googleSignIn");
googleBtnRef.addEventListener("click", btnPressListener => {
  btnPressListener.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.useDeviceLanguage();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  auth.signInWithPopup(provider).then(googleUser => {
    console.log(googleUser.additionalUserInfo.isNewUser);
    if (googleUser.additionalUserInfo.isNewUser === false) {
      console.log(googleUser.isNewUser);
      alert("Email address in use. Please try logging in");
      auth
        .signOut()
        .then(() => {
          console.log("Sign out successful");
          window.location.assign("./login.html");
        })
        .catch(function(error) {
          // An error happened.
          alert(error);
        });
    } else {
      let user = auth.currentUser; //Grab current user
      const civilianEmail = user.email;
      const addCivilianRole = functions.httpsCallable("addCivilianRole");
      addCivilianRole({ email: civilianEmail }).then(result => {
        console.log(result);
      });
    }
  });
});



const updateButton = document.querySelector("#updateButton");
updateButton.addEventListener("click", e => {
  e.preventDefault();
  let prgBar = document.querySelector("#progress2-bar");
  let totalUploadSize = 0;
  let task = 0;
  let totalBytesTransferred = 0;

  const user = firebase.auth().currentUser;
  console.log("Update!");
  firestore.collection("Users").doc(user.uid).set({
      firstName: signupForm["firstName"].value,
      lastName: signupForm["lastName"].value,
      email: signupForm["signup-email"].value,
      phoneNumber: signupForm["phoneNumber"].value,
      dateOfBirth: signupForm["dateofbirth"].value,
      addressOne: signupForm["address1field"].value,
      addressTwo: signupForm["address2field"].value,
      cityortown: signupForm["town"].value,
      disabilites: signupForm["disabilites-field"].value,
      profileCreationDate: new Date(),
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
                    setTimeout(locate, 1500);
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
