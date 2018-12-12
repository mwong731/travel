// function checkPasswordMatch() {
//     var password = $("#password").val();
//     var confirm_password = $("#confirm_password").val();

//     if (password != confirm_password) {
//         $("#divCheckPasswordMatch").html("Passwords do not match!");
//     }
//     else {
//         $("#divCheckPasswordMatch").html("Passwords match.");
//     }
// }
let passwordMatch=false;


$('#confirm_password').focusout(function(){


    if ($('#password').val() != $("#confirm_password").val()) {
             $('#confirm_password').css('border-color','red')
                $("#divCheckPasswordMatch").html(`<p style="color:red">Passwords do not match!<p>`);
                passwordMatch=false;
            }
            else {
                $('#confirm_password').css('border-color','')
                $("#divCheckPasswordMatch").html("");
                passwordMatch=true;
            }

})

// $(document).ready(function () {
//     $("#confirm_password").keyup(checkPasswordMatch);
// });


// function validatePassword() {
//     var password = document.getElementById("password")
//     var confirm_password = document.getElementById("confirm_password");

//     if (password.value != confirm_password.value) {
//         confirm_password.setCustomValidity("Passwords Don't Match");
//     } else {
//         confirm_password.setCustomValidity('');
//     }
// }

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;