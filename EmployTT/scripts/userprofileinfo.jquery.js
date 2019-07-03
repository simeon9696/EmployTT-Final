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