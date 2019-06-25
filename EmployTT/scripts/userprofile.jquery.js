$(document).ready(function () {
    $("#signup-form input").keyup(function(){
    
    var inputforms=0;
    
    $("#signup-form input[required]").each(function(){
        if (this.validity.valid){
            inputforms++;
        }
    });
    
    var id = "#drop_zone";
    var progress=$("#progress-bar")
    var progress2=$("#progress2-bar")
    //Logic that runs after counting every time
    if (inputforms == 0) {
        progress.attr("value", "0");
        progress2.attr("value", "0");
    }
    if (inputforms == 1) {
        progress.attr("value", "10");
        progress2.attr("value", "10");
    }
    if (inputforms == 2) {
        progress.attr("value", "20");
        progress2.attr("value", "20");
    }
    if (inputforms == 3) {
        progress.attr("value", "30");
        progress2.attr("value", "30");
    }
    if (inputforms == 4) {
        progress.attr("value", "40");
        progress2.attr("value", "40");
    }
    if (inputforms == 5) {
        progress.attr("value", "50");
        progress2.attr("value", "50");

    }
    if (inputforms == 6) {
        progress.attr("value", "60");
        progress2.attr("value", "60");

    }
    if (inputforms == 7) {
        progress.attr("value", "70");
        progress2.attr("value", "70");

    }
    if (inputforms == 8) {
        progress.attr("value", "80");
        progress2.attr("value", "80");

    }
    if (inputforms == 9) {
        progress.attr("value", "90");
        progress2.attr("value", "90");
    
    }
    if (inputforms == 10) {
        progress.attr("value", "100");
        progress2.attr("value", "100");
        
    }
    });
    
    var filedrop=0;
    var progress=$("#progress-bar")
    var progress2=$("#progress2-bar")
    
    
    $("#drop_zone").on("drop",function(){	
        filedrop++;
        progress.attr("value", "100");
        progress2.attr("value", "100");
   
    });
    $("#phoneNumber").keypress(function(e){
        var key = e.key || e.keyCode;
        if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers   
            key == "1" || key == "2" ||key == "3" || key == "4" ||
            key == "5" || key == "6" || key == "7" || key == "8" ||
            key == "9" || key == "0" ||
        // Backspace and Tab and Enter
           key == 8 || key == 9 || key == 13 ||
        // Home and End
           key == 35 || key == 36 ||
        // left and right arrows
           key == 37 || key == 39 ||
        // open and close brackets 
           key == "(" || key == ")"||
        // Del and Ins
           key == 46 || key == 45 ||
        //space and .
            key ==" " || key == "Period")
            {return true;}
        else
        {   
            alert("Please use format: (868) 123 4567")
            return false;}});
        
    $("#dateofbirth").keypress(function(e){
            var key = e.key || e.keyCode;
            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
                key == "1" || key == "2" ||key == "3" || key == "4" ||
                key == "5" || key == "6" || key == "7" || key == "8" ||
                key == "9" || key == "0" ||
            // Backspace and Tab and Enter
               key == 8 || key == 9 || key == 13 ||
            // Home and End
               key == 35 || key == 36 ||
            // left and right arrows
               key == 37 || key == 39 ||
            // open and close brackets 
               key == "/" || 
            // Del and Ins
               key == 46 || key == 45 ||
            //space 
                key ==" " )
                {return true;}
            else
            {   
                alert("Please use format: dd/mm/yyyy")
                return false;}
    });
    
    $("#firstName").keypress(function(e){
        var key = e.which || e.keyCode;
        if ((!e.altKey && !e.ctrlKey) &&
            (key >=65 && key<=95) || 
        // Backspace and Tab and Enter
           key == 8 || key == 9 || key == 13 ||
        // Home and End
           key == 35 || key == 36 ||
        // left and right arrows
           key == 37 || key == 39 ||
        // Del and Ins
           key == 46 || key == 45 ||
        //space 
            key ==32 )
            {return true;}
        
        else if  (key >=97 && key<=122) {return true;}
        
        else
        {  
            alert("Please use letters to fill out your name.");
            return false;}
    });
    
    $("#lastName").keypress(function(e){
        var key = e.which || e.keyCode;
        if ((!e.altKey && !e.ctrlKey) &&
            (key >=65 && key<=95) || 
        // Backspace and Tab and Enter
           key == 8 || key == 9 || key == 13 ||
        // Home and End
           key == 35 || key == 36 ||
        // left and right arrows
           key == 37 || key == 39 ||
        // Del and Ins
           key == 46 || key == 45 ||
        //space 
            key ==32 )
            {return true;}
        
        else if  (key >=97 && key<=122) {return true;}
        
        else
        {  
            alert("Please use letters to fill out your name.");
            return false;}
    });
    
    $('#signup-password').bind("cut copy paste", function(e){
        e.preventDefault();
    });
    
    $('#cnfm-password').bind("cut copy paste", function(e){
        e.preventDefault();
    });
    
    });
