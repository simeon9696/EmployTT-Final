// add admin cloud function
const adminForm = document.querySelector('#adminSubmitButton');
const emailFields = document.querySelector('#admin-form');
adminForm.addEventListener('click', (e) => {
  e.preventDefault();
  adminForm.value="Creating Admin...";
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
      console.log(result)
    if(result.data.message !== undefined){
      $('#customClaimSuccess').modal('show');
      const successMessage = document.querySelector('#userSuccessMessage');
      successMessage.innerHTML = `${adminEmail} is now an administrator!`
      adminForm.value="Make Administrator";
    }else if (result.data.error !== undefined){
      $('#customClaimError').modal('show');
      adminForm.value="Make Administrator";
    }else if (result.data.errorInfo.code ==="auth/user-not-found"){
      const errorMsg = document.querySelector('#errorMessage');
      errorMsg.innerHTML = 'Error creating administrator. This user does not exist'
      $('#customClaimError').modal('show');
      adminForm.value="Make Administrator";
    }else if (result.data.errorInfo.code ==="auth/invalid-email"){
      const errorMsg = document.querySelector('#errorMessage');
      errorMsg.innerHTML = 'Error creating administrator. The email address is badly formatted'
      $('#customClaimError').modal('show');
      adminForm.value="Make Administrator";
    }
  });
  emailFields['adminEmail'].value="";
});


// add mda cloud function
const mdaForm = document.querySelector('#mdaSubmitButton');
mdaForm.addEventListener('click', (e) => {
  e.preventDefault();
  mdaForm.value="Creating MDA...";
  const mdaEmail = document.querySelector('#mda-email').value;
  const addMdaRole = functions.httpsCallable('addMdaRole');
  addMdaRole({ email: mdaEmail }).then(result => {
    console.log(result);
    console.log(result);
    if(result.data.message !== undefined){
      $('#customClaimSuccess').modal('show');
      const successMessage = document.querySelector('#userSuccessMessage');
      successMessage.innerHTML = `${mdaEmail} is now an MDA!`
      mdaForm.value="Make MDA";
    }else if (result.data.error !== undefined){
      $('#customClaimError').modal('show');
      mdaForm.value="Make MDA";
    }else if (result.data.errorInfo.code ==="auth/invalid-email"){
      const errorMsg = document.querySelector('#errorMessage');
      errorMsg.innerHTML = 'Error creating MDA. The email address is badly formatted'
      $('#customClaimError').modal('show');
      mdaForm.value="Make MDA";
    }
  });
  emailFields['mdaEmail'].value="";
});

//delete
const deleteUserButton = document.querySelector('#deleteUser');
deleteUserButton.addEventListener('click',e=>{
  

    e.preventDefault();
    deleteUserButton.value="Deleting User...";

    const userToBeDeleted = document.querySelector('#delete-email');
    const confirmationButton = confirm(`You are about to delete the user account below:\n${userToBeDeleted.value} \nThis cannot be undone. \nAre you sure you want to continue?`);
    if(confirmationButton === true){

      const deleteuser = functions.httpsCallable('adminDeleteUser');
      console.log(userToBeDeleted.value);
      deleteuser({ email: userToBeDeleted.value }).then(result => {
        if(result.data.message !== undefined){
          $('#customClaimSuccess').modal('show');
          const successMessage = document.querySelector('#userSuccessMessage');
          successMessage.innerHTML = `User successfully deleted!`
          deleteUserButton.value="Delete User";

        }else if (result.data.error !== undefined){
          $('#customClaimError').modal('show');
          deleteUserButton.value="Delete User";

        }else if (result.data.errorInfo.code ==="auth/user-not-found"){
          const errorMsg = document.querySelector('#errorMessage');
          errorMsg.innerHTML = 'Error deleting user. This user does not exist'
          $('#customClaimError').modal('show');
          deleteUserButton.value="Delete User";
        }else if (result.data.errorInfo.code ==="auth/invalid-email"){
          const errorMsg = document.querySelector('#errorMessage');
          errorMsg.innerHTML = 'Error deleting user. The email address is badly formatted'
          $('#customClaimError').modal('show');
          deleteUserButton.value="Delete User";
        }
      })
    }
    else{
      alert("Operation cancelled");
    }
    emailFields['delete-email'].value="";
})