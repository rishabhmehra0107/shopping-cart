$(document).ready(() => {
    var btn = $('#btn');
    var email = $('#form19');
    var password = $('#form20');

    btn.click(() => {
        let emai = email.val();
        let pass = password.val();

        $.post("/login_owner",{'email' : `${emai}`,'password' : `${pass}`},(response,status) => {
        if(response!="Either email or password is incorrect"){
            //Redirect //Set cookies for js
            sessionStorage.setItem("user",response);
            window.location = "http://localhost:9999/products_owner.html"
        }
        else{
            alert(response);
            email.val("");
            password.val("");
        }
    })
  })
})