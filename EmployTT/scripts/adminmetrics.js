auth.onAuthStateChanged(user => {

    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            if (user.admin){
               
                firestore.collection('DatabaseInfo').doc('numberOfAccounts').get().then(doc =>{
                   
                   console.log(doc.data())
                    const totalNumOfAccounts =document.querySelector('#numberOfAccounts');
                    const totalNumOfDels=document.querySelector('#numberOfDeletions');
                    const totalNumOfCreations =document.querySelector('#numberOfCreations'); 
                    totalNumOfAccounts.innerHTML = DOMPurify.sanitize(doc.data().totalNumberOfAccounts);
                    totalNumOfDels.innerHTML= DOMPurify.sanitize(doc.data().totalNumberOfAccountDeletions);
                    totalNumOfCreations.innerHTML= DOMPurify.sanitize(doc.data().totalNumberOfAccountCreations);
                }).catch(error =>{
                    console.log(error);
                });
            }
            else{
                console.log('Bye bye');
            }
        })
    }else{
        console.log('Unauthorized access');
    }
})