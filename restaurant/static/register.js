$("#registerPhone")
    .focusin(() => {
        $("#registerFormPhone").css("background-image", "url(../../media/img/register/inputempty.png)");
    })
    .blur(() => {
        if (document.getElementById("registerPhone").value == "") {
            $("#registerFormPhone").css("background-image", "url(../../media/img/register/phone.png)")
        } else {
            $("#registerFormPhone").css("background-image", "url(../../media/img/register/inputempty.png)")
        }
    });
$("#registerEmail")
    .focusin(() => {
        $("#registerFormEmail").css("background-image", "url(../../media/img/register/inputempty.png)");
    })
    .blur(() => {
        if (document.getElementById("registerEmail").value == "") {
            $("#registerFormEmail").css("background-image", "url(../../media/img/register/mail.png)");
        } else {
            $("#registerFormEmail").css("background-image", "url(../../media/img/register/inputempty.png)");
        }
    });
$("#registerPWrd")
    .focusin(() => {
        $("#registerFormPWrd").css("background-image", "url(../../media/img/register/inputempty.png)");
    })
    .blur(() => {
        if (document.getElementById("registerPWrd").value == "") {
            $("#registerFormPWrd").css("background-image", "url(../../media/img/register/password.png)");
        } else {
            $("#registerFormPWrd").css("background-image", "url(../../media/img/register/inputempty.png)");
        }
    });
$("#registerPWrdCk")
    .focusin(() => {
        $("#registerFormPWrdCk").css("background-image", "url(../../media/img/register/inputempty.png)");
    })
    .blur(() => {
        if (document.getElementById("registerPWrdCk").value == "") {
            $("#registerFormPWrdCk").css("background-image", "url(../../media/img/register/passwordcheck.png)");
        } else {
            $("#registerFormPWrdCk").css("background-image", "url(../../media/img/register/inputempty.png)");
        }
    });
let registerBtnHammer = new Hammer(document.getElementById("signupBtn"));
registerBtnHammer.on("tap", (e) => {
    $.ajax({
        type: 'POST',
        url: '',
        data: {
            phone: document.getElementById("registerPhone").value, // phone = username
            email: document.getElementById("registerEmail").value,
            password: document.getElementById("registerPWrd").value,
            passwordcheck: document.getElementById("registerPWrdCk").value,
        },
        success: (data) => {
            console.log(data);
        }
    })
});