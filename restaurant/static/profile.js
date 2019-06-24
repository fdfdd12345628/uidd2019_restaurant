var favormode=0; //judge if favor
var mode=1;
var second_order = document.getElementsByClassName("order bg p2");
var fiest_order = document.getElementsByClassName("order bg p1");
$(document).hammer().on("panleft ",function(ev){
      //alert(ev.target.id);
        if(mode==1){
            window.setTimeout(function() {
                $("#slider").animate({left:"33vw"},"normal",function(){
                 mode2();
                 mode=2;
            });
            }, 10 );

        }
        else if(mode==2){
            window.setTimeout(function() {
                 $("#slider").animate({left:"67vw"},"normal",function(){
                 mode3();
                 mode=3;
            });
            },10);

        }
});
$(document).hammer().on("panright ",function(ev){
      //alert(ev.target.id);
        if(mode==3){
            window.setTimeout(function() {
                 $("#slider").animate({left:"33vw"},"normal",function(){
                    mode2();
                    mode=2;
                });
            },10);

        }
        else if(mode==2){
             window.setTimeout(function() {
                 $("#slider").animate({left:"0vw"},"normal",function(){
                    mode1();
                    mode=1;
                });
             },10);

        }
});



$(".order").hammer().on("panleft",function(ev){
        alert(ev.target.id);

 });


function favor(o,part){
    //var money = $(o).find('.money');
    var favor;
    var all;
    if(part==1){
        all=fiest_order;
         favor =  document.getElementsByClassName('favor_button');
    }
    else{

        all=second_order;
         favor =  document.getElementsByClassName('favor_button2');
    }

    if(favormode==0){
         $(o).css("left","-25.5vw");
        let num =parseInt(o.id.substr(2)); //order num

        $(favor[num-1]).css("display","block");
        for(let i=num;i<all.length;i++){
            console.log(i);
            var minus = -12.5;
            var m=minus.toString();
            var min = m.concat("vh");
            $(all[i]).css("top",min);
        }
        favormode=1;
    }
    else{
        for(j=0;j<all.length;j++){
             $(all[j]).css({"top":"0.625vh","left":"0vw"});
             $(favor[j]).css("display","none");
        }
        favormode=0;
    }
}

$( document ).ready(function() {
    console.log( "ready!" );
    var f_btn1 = document.getElementsByClassName("favor_button");
    var f_btn2 = document.getElementsByClassName("favor_button2");
    for (i = 0; i < f_btn1.length; i++) {
        f_btn1[i].addEventListener("click", function(){
            var string = this.id
            id = string.substr(2)
            $.ajax({
                type: 'GET',
                url: 'favor',
                data: {
                    id_num :id,
                },
                dataType: 'json',
                success: function(){
                },
            })
        });
    }
     for (j = 0; j < f_btn2.length; j++) {
        f_btn2[j].addEventListener("click", function(){
            var string = this.id
            id = string.substr(2)
            $.ajax({
                type: 'GET',
                url: 'favor',
                data: {
                    id_num :id,
                },
                dataType: 'json',
                success: function(){
                },
            })
        });
    }
});

favorite = function () {
     // alert(id);

}

// function favorite(id) {
//
// }

/*switch different mode */
function mode1(){

    $("#set").css("display","none");
    $(".set").css("display","none");
    $("#finish").css("display","none");
    $(".finish").css("display","none");
    $("#order_bag").css("display","block");
    $(".order_bag").css("display","block");
}
function mode2(){

    $("#order_bag").css("display","none");
    $(".order_bag").css("display","none");
    $("#set").css("display","none");
    $(".set").css("display","none");
    $("#finish").css("display","block");
    $(".finish").css("display","block");
}
function mode3(){

    $("#order_bag").css("display","none");
    $(".order_bag").css("display","none");
    $("#finish").css("display","none");
    $(".finish").css("display","none");
    $("#set").css("display","block");
    $(".set").css("display","block");
}