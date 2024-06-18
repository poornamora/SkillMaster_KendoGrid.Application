Globalvariable = {
    baseaddress: '#baseaddress',
    Emailid: "#id-email",
    emailicon: '#emailicon',
}
$(document).ready(function () {
    var isvalid = true;

    var baseadress = $(Globalvariable.baseaddress).attr('data');

    var emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    $(Globalvariable.Emailid).on("input", function () {
        var email_val = $(Globalvariable.Emailid).val();
        console.log(email_val);

        if (email_val == '') {
            $("#error").text('Please Enter Email').show();
            $(Globalvariable.emailicon).html('<i class="fas  fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        }
        else if (!emailregex.test(email_val)) {
            $('#error').text('Please Enter valid Email').show();
            $('#emailicon').html('<i class="fas  fa-exclamation-circle red"></i>').show();
            isvalid = false;
            return false;
        } else {
            $('#error').hide();
            $('#emailicon').html('<i class="fas  fa-exclamation-circle"></i>').hide();
            return true;
        }
    });

    $("#password-id").on("input", function () {
        var password_val = $("#password-id").val();
        console.log(password_val);

        if (password_val == '') {
            $("#error1").text('Please Enter password').show();
            $('#passwordicon').html('<i class="fas  fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        } else {
            $("#error1").hide();
            $("#passwordicon").html('<i class="fas  fa-exclamation-circle"></i>').hide();
            isvalid = true;
            return true;
        }
    });


    $("#id-submit").on("click",function () {

        var email_val = $("#id-email").val();
        var password_val = $("#password-id").val();

        console.log(password_val);

        if (email_val == '' && password_val != '') {
            $("#error").text('Please Enter Email').show();
            $("#emailicon").html('<i class="fas  fa-exclamation-circle"></i>').show();
            return false;
        }

        if (password_val == '' && email_val !== '') {
            $("#error1").text('Please Enter password').show();
            $("#passwordicon").html('<i class="fas  fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        }

        if (password_val === '' && email_val === '') {
            $("#error1").text('Please Enter password').show();
            $("#passwordicon").html('<i class="fas  fa-exclamation-circle"></i>').show();

            $("#error").text('Please Enter Email').show();
            $("#emailicon").html('<i class="fas  fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        }
       

        if (isvalid) {

            var email = $("#id-email").val();
            var password = $("#password-id").val();

            $.ajax({
                url: baseadress+"/api/Account/Login?email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password),
                type: "GET", 
                contentType: "application/json",
                success: function (data) {
                    if (data != null) {
                        alert("Login is successfully:");
                        window.location.href = "/Home/ListPage";
                    }
                },
                error: function (xhr) {
                    var message = $('#displaymessage');
                    if (xhr.status == 401) {
                        message.html('Sorry Invalid Credentials');
                    }
                    else
                    {
                        alert('An error occurred while processing your request.');
                    }
                }
            });
            
        }

    });
});