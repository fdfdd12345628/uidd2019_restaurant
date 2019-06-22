$("#loginUsername")
    .focusin(() => {
        $("#loginFormUser").css("background-image", "url(../media/img/login/inputempty.png)");
    })
    .blur(() => {
        if (document.getElementById("loginUsername").value == "") {
            $("#loginFormUser").css("background-image", "url(../media/img/login/user.png)");
        } else {
            $("#loginFormUser").css("background-image", "url(../media/img/login/inputempty.png)");
        }
    });
$("#loginPassword")
    .focusin(() => {
        $("#loginFormPWrd").css("background-image", "url(../media/img/login/inputempty.png)");
    })
    .blur(() => {
        if (document.getElementById("loginPassword").value == "") {
            $("#loginFormPWrd").css("background-image", "url(../media/img/login/password.png)");
        } else {
            $("#loginFormPWrd").css("background-image", "url(../media/img/login/inputempty.png)");
        }
    });
let loginBtnHammer = new Hammer(document.getElementById("loginFormBtn"));
let signupBtnHammer = new Hammer(document.getElementById("signupBtn"));
let forgotBtnHammer = new Hammer(document.getElementById("forgotBtn"));
let fingerBtnHammer = new Hammer(document.getElementById("fingerBtn"));
loginBtnHammer.on("tap", (e) => {
    $.ajax({
        type: 'POST',
        url: '',
        data: {
            username: document.getElementById("loginUsername").value,
            password: document.getElementById("loginPassword").value,
        },
        success: (data) => {
            console.log(data);
        }
    })
});
signupBtnHammer.on("tap", (e) => {
    console.log("signupBtn tapped");
    window.location.href = '/accounts/register';
});
forgotBtnHammer.on("tap", (e) => {
    console.log("forgotBtn tapped");
});
fingerBtnHammer.on("tap", (e) => {
    console.log("fingerBtn tapped");
})