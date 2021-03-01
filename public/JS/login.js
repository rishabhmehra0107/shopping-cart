$('document').ready(() => {
  var btn = $('#btn');
  var email = $('#form19');
  var password = $('#form20');

  btn.click(() => {
    let emai = email.val();
    let pass = password.val();

    $.post("/login",{'email' : `${emai}`,'password' : `${pass}`},(response) => {
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
