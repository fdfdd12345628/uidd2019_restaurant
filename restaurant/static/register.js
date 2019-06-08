let registerBtnHammer = new Hammer(document.getElementById("signupBtn"));
registerBtnHammer.on("tap", (e) => {
    $.ajax({
        type: 'POST',
        url: '',
        data: {
            phone: $("#registerFormPhone").val(), // phone = username
            email: $("#registerFormEmail").val(),
            password: $("#registerFormPWrd").val(),
            passwordcheck: $("#registerFormPWrdCk").val(),
        },
        success: (data) => {
            console.log(data);
        }
    })
});