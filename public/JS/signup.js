$('document').ready(() => {
    var firstName = $('#firstName');
    var middleName = $('#middleName');
    var lastName = $('#lastName');
    var phone = $('#form18');
    var email = $('#form19');
    var password = $('#form20');
    var country = $('#selects');
    var address1 = $('#form14');
    var address2 = $('#form15');
    var address3 = $('#form16');
    var town = $('#form17');
    var btn = $('#btn');

    btn.click(() => {
        $.post("/login/signup",{'name' : `${firstName.val() + middleName.val() + lastName.val()}` 
        ,'email' : `${email.val()}`
        ,'password' : `${password.val()}`
        , 'address' : `${address1.val() + address2.val() + address3.val() + town.val() + country.val()}`
        , 'phone' : `${phone.val()}`
    },(response) => {
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