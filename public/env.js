$(document).ready(function(){
    console.log("Document ready")

    //Posting messages
    $("#btnMessage").click(()=>{ 
        let message  = $('#messageBox').val();
       
        let text  = {
            message
        }
        $.get( "/addMessage",text, function( data ) {});
    })
    
    
    //retriving messages
    setInterval(()=>{
        $.get("/getAllMessage",function( data ) {
            $('#message').empty();
            data.forEach((element) => {
                $('#message').append('<div class="row">'+element.message+'</div>')    
            })
        });     
    },1000);
})