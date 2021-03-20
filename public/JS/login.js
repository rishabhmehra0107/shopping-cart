$('document').ready(() => {

  if(sessionStorage.getItem("user")!=null){
    window.location = 'http://localhost:9999/products.html';
  }

  var btn = $('#btn');
  var email = $('#form19');
  var password = $('#form20');

  btn.click(() => {
    let emai = email.val();
    let pass = password.val();

    $.post("/login",{'email' : `${emai}`,'password' : `${pass}`},(response) => {
      if(response!="Either email or password is incorrect"){
        //Redirect //Set cookies for js
        sessionStorage.setItem("user",response);
        console.log(sessionStorage.getItem("user"));
        window.location = 'http://localhost:9999/products.html';
      }
      else{
        alert(response);
        email.val("");
        password.val("");
      }
    })
  })
})
