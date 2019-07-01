
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
   
  
  const firestore = firebase.firestore(); //Grab reference to database
  const auth = firebase.auth(); //Grab reference to firebase objects
  const functions = firebase.functions();
  
function readURL(input) {
    if (input.files && input.files[0]) {
        var file = input.files[0];
        console.log("hello img");
        console.log(input.files[0]);
        var user = firebase.auth().currentUser;
        //var storageRef = firebase.storage().ref(user + '/profilePicture/' + file.name);
        let storageRef = firebase.storage().ref('Profile Pictures/'+user.uid +'/'+file.name); //Create path for new user in database
        var task = storageRef.put(file).then(function(snapshot){
          console.log("Image uploaded");
          console.log(file.name);
        } );
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function(e) {
            $('#imgPreview').css('background-image', 'url('+e.target.result +')');
            $('#imgPreview').hide();
            $('#imgPreview').fadeIn(650);
        }
   
    }
   }
  
  $("#imageUpload").change(function() {
    $("#imageUpload").change(function() {
      readURL(this);
  });});