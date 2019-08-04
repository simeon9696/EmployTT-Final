const subBtnRef = document.querySelector("#emailSubmitButton"); 
const signupForm = document.querySelector('#signup-form');

subBtnRef.addEventListener('click',(btnPressListener)=>{
    btnPressListener.preventDefault();
    const passID = document.querySelector('#invalid-password');  // gone
    passID.style.display="none";
    const email = signupForm['signup-email'].value;  // gone
    const password  = signupForm['signup-password'].value; //gone
    //console.log(email);
    //console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      window.location.assign("../index.html");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        
       
        passID.style.display="flex";
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
});




const googleBtnRef = document.querySelector("#googleSubmitButton"); 
googleBtnRef.addEventListener('click',(e)=>{
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
      });
    firebase.auth().signInWithPopup(provider).then((googleUser)=>{
          console.log(googleUser.additionalUserInfo.isNewUser);
          if(googleUser.additionalUserInfo.isNewUser === false){
            window.location.assign("../index.html");
          }else if(googleUser.additionalUserInfo.isNewUser === true){
            window.location.assign("./userprofileregister.html");
          }
              
   }).catch(error=>{
     console.log(error);
   });
})


const resetPasswordLink = document.querySelector('#forgotPassword');
resetPasswordLink.addEventListener('click', e =>{
  e.preventDefault();

  
  const email = signupForm['signup-email'].value;  // gone
  auth.sendPasswordResetEmail(email).then(function() {
    console.log('success');
  }).catch(function(error) {
    alert(error);
  });
  

})