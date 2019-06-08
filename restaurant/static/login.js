let loginBtnHammer = new Hammer(document.getElementById("loginFormBtn"));
loginBtnHammer.on("tap", (e) => {
    // console.log(e);
    $.ajax({
        type: 'POST',
        url: '',
        data: {
            username: $("#loginUsername").val(),
            password: $("#loginPassword").val(),
        },
        success: (data) => {
            // console.log("GET RESPONSE");
            console.log(data);
        }
    })
});