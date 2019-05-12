let listHammer = new Hammer(document.getElementById("list"));
let listExpand = false;
listHammer.on("tap", (e) => {
    console.log(e);
    if (!listExpand) {
        $("#list").animate({ "top": "10vh" }, 300);
        listExpand = true;
    } else {
        $("#list").animate({ "top": "83.25vh" }, 300);
        listExpand = false;
    }
})
// listHammer.on("panup", (e) => {
//     console.log(e);
//     $("#list").animate({ "top": "28vh" }, 300);
// })
// listHammer.on("pandown", (e) => {
//     console.log(e);
//     $("#list").animate({ "top": "83.25vh" }, 300);
// })