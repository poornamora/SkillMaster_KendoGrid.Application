


$(document).ready(function () {

    var mode = $("#mode").val();
    var formreferences = {
        namedata: "#id-name",
        emaildata: "#id-email",
        passworddata: "#id-password",
        confirmpassworddata: "#id-cpassword",
        errordata1: "#error1",
        errordata2: "#error2",
        errordata3: "#error3",
        errordata4: "#error4",
        emailicon: "#emailicon",
        passwordicon: "#passwordicon",
        displayicons: "#icondisplay",
        displayicons1: "#icondisplay1",
        displayicons2: "#icondisplay2",
        displayicons3: "#icondisplay3",
        userform: "#user-form",
        registerbtnsubmit: "#btn-register"
    }

    $(formreferences.namedata).keyup(name_check);
    $(formreferences.emaildata).keyup(email_check);
    $(formreferences.passworddata).keyup(password_checkup);
    $(formreferences.confirmpassworddata).keyup(confirmpassword_checkup);

    $(formreferences.registerbtnsubmit).on("click", function () {

        $('.error').text('');

        var name_val = $(formreferences.namedata).val();
        var email_val = $(formreferences.emaildata).val();
        var password_val = $(formreferences.passworddata).val();
        var confirmpassword_val = $(formreferences.confirmpassworddata).val();

        var isvalid = true;

        var name_err = name_check();
        if (!name_err) {
            isvalid = false;
        }

        var email_err = email_check();
        if (!email_err) {
            isvalid = false;
        }

        var password_err = password_checkup();
        if (!password_err) {
            isvalid = false;
        }

        if (mode == "submit") {
            var confirmpassword_err = confirmpassword_checkup();
            if (!confirmpassword_err) {
                isvalid = false;
            }
        }
        else {
            isvalid = true;
        }

        if (isvalid) {

            var formdata = {
                Name: $(formreferences.namedata).val(),
                EmailId: $(formreferences.emaildata).val(),
                Password: $(formreferences.passworddata).val(),
                confirmPassword: $(formreferences.confirmpassworddata).val()
            };
            if (mode == 'submit') {
                $.ajax({
                    url: "https://localhost:44312/api/Account/Registration",
                    type: "POST",
                    data: formdata,
                    success: function (data) {
                        if (data != null) {
                            console.log(data);
                            alert('Form submitted successfully:');
                            window.location.href = "/api/MasterForm/ListDetails";
                        }
                        else {
                            alert("Form upload error:");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                        console.error(status);
                        console.error(error);
                        alert('An error occurred while processing your request.');
                    }
                });
            }
            else {

                var ID = $("#userid").val();
                $.ajax({
                    url: "UpdateUser",
                    type: "POST",
                    data: { id: ID , user: formdata },
                    success: function (data) {
                        if (data != null) {
                            console.log(data);
                            alert('Form updated '+ ID +' successfully:');
                            window.location.href = "/Home/ListPage";
                        }
                        else {
                            alert("Form upload error:");
                        }
                    },

                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                        console.error(status);
                        console.error(error);
                        alert('An error occurred while processing your request.');
                    }
                });
            }
        }
        
    });

    function name_check() {
        var regex_name = /^(?! )[a-zA-Z]+$/;
        var name_val = $(formreferences.namedata).val();
        console.log(name_val);
        if (name_val == '') {
            $(formreferences.errordata1).show().html('Please Enter the Name');
            $(formreferences.displayicons).html('<i class="fas  fa-exclamation-circle"></i>').show();
            return false;
        } else if (!regex_name.test(name_val)) {
            $(formreferences.errordata1).show().html('Please Enter alphabetic characters only ');
            return false;
        } else {
            $(formreferences.errordata1).hide();
            $(formreferences.displayicons).html('<i class="fas  fa-exclamation-circle"></i>').hide();
            return true;
        }
    }

    function email_check() {
        var emailpattern = /^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var email_val = $(formreferences.emaildata).val();
        console.log(email_val);
        if (email_val == '') {
            $(formreferences.errordata2).show().html('Please enter Email');
            $(formreferences.displayicons1).html('<i class="fas  fa-exclamation-circle"></i>').show();
            return false;
        } else if (!emailpattern.test(email_val)) {
            $(formreferences.errordata2).show().html('Please Enter valid Email');
            return false;
        } else {
            $(formreferences.errordata2).hide();
            $(formreferences.displayicons1).html('<i class="fas  fa-exclamation-circle"></i>').hide();
            return true;
        }
    }

    var password_val;

    function password_checkup()
    {
        password_val = $(formreferences.passworddata).val();
        console.log(password_val);
        if (password_val == '') {
            $(formreferences.errordata3).html('Please Enter Password').show();
            $(formreferences.displayicons2).html('<i class="fas  fa-exclamation-circle"></i>').show();
            return false;
        }
        if (password_val.length < 6) {
            $(formreferences.errordata3).html(' Please enter Password atleast 6 characters').show();
            return false;
        } else {
            $(formreferences.errordata3).hide();
            $(formreferences.displayicons2).html('<i class="fas  fa-exclamation-circle"></i>').hide();
            return true;
        }
    }
    
    function confirmpassword_checkup() {
        var confirmpassword_val = $(formreferences.confirmpassworddata).val();
        console.log(confirmpassword_val);
        if (confirmpassword_val == '') {
            $(formreferences.errordata4).html('Please Enter confirm Password');
            $(formreferences.displayicons3).html('<i class="fas  fa-exclamation-circle"></i>').show();
            return false;
        }
        if (password_val !== confirmpassword_val) {
            $(formreferences.errordata4).html('sorry! mismatch of password and confirm Password').show();
            return false;
        } else {
            $(formreferences.errordata4).hide();
            $(formreferences.displayicons3).html('<i class="fas  fa-exclamation-circle"></i>').hide();
            return true;
        }
    }
});
