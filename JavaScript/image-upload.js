$('#fileup').change(function(){
    var res=$('#fileup').val();
    var arr = res.split("\\");
    var filename=arr.slice(-1)[0];
    filextension=filename.split(".");
    filext="."+filextension.slice(-1)[0];
    valid=[".jpg",".png",".jpeg",".bmp"];
    if (valid.indexOf(filext.toLowerCase())==-1){
        $( ".imgupload" ).hide("slow");
        $( ".imgupload.ok" ).hide("slow");
        $( ".imgupload.stop" ).show("slow");
      
        $('#namefile').css({"color":"red","font-weight":700});
        $('#namefile').html("File "+filename+" is not  pic!");
        
        $( "#submitbtn" ).hide();
        $( "#fakebtn" ).show();
    }else{
        $( ".imgupload" ).hide("slow");
        $( ".imgupload.stop" ).hide("slow");
        $( ".imgupload.ok" ).show("slow");
      
        $('#namefile').css({"color":"green","font-weight":700});
        $('#namefile').html(filename);
      
        $( "#submitbtn" ).show();
        $( "#fakebtn" ).hide();

        // New code to read the file and display it
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});