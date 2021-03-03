$(document).ready(() => {
    var btn = $('#btn');
    var email = $('#form19');
    var password = $('#form20');

    btn.click(() => {
        let emai = email.val();
        let pass = password.val();

        $.post("/login_owner",{'email' : `${emai}`,'password' : `${pass}`},(response,status) => {
        if(response=="Success"){
            //Redirect //Set cookies for js
        }
        else{
            alert(response);
            email.val("");
            password.val("");
        }
    })
  })
})