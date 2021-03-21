$(document).ready(() => {
    if(sessionStorage.getItem("user")==null){
        window.location = "http://localhost:9999/owner.html";
    }

    var logout_time = $('#logout_time');
    
    $('#logout_time').click(() => {
        //Unset the session
        sessionStorage.removeItem("user");
        $.get('http://localhost:9999/login_owner/logout',(response) => {
            if(response=="Success"){
                window.location = "http://localhost:9999/owner.html";
            }
        })
    })

})