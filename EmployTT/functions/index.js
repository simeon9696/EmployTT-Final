const functions = require('firebase-functions');
const admin = require('firebase-admin');
 

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=>{
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : true,
            mda : false,
            civilian: false
        });
    }).then(()=>{
        return{
            message: `Success! ${data.email} is now an admin`
        }
    }).catch(err =>{
        return err;
    });
}) 


exports.addMdaRole = functions.https.onCall((data,context)=>{
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : false,
            mda : true,
            civilian: false
        });
    }).then(()=>{
        return{
            message: `Success! ${data.email} is now an MDA`
        }
    }).catch(err =>{
        return err;
    });
}) 


exports.addCivilianRole = functions.https.onCall((data,context)=>{
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : false,
            mda : false,
            civilian: true
        });
    }).then(()=>{
        return{
            message: `Success! ${data.email} is a civilian`
        }
    }).catch(err =>{
        return err;
    });
}) 






