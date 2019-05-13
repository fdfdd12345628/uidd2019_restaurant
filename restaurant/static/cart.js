var record_cart = 0;
var detect_delete = 0;
var record_profile = 0;
var detect_delete_temp_id;
var third_record =0;
var third_record_id;
var move_burger={
  "duck_01":"beef_01,salmon_01,hotdog_01",
  "beef_01":"salmon_01,hotdog_01",
  "salmon_01":"hotdog_01",
  "hotdog_01":"",
  "greenTea_01":"blackTea_01",
  "blackTea_01":"",
  "fish_01":"fries_01",
  "fries_01":""
}
var meal_money={
  "duck_01":100,
  "salmon_01": 100,
  "blackTea_01": 45,
  "beef_01": 100,
  "greenTea_01": 45,
  "hotdog_01":60,
  "fish_01": 80,
  "fries_01":60
}
$(function(){
$("#cart_icon").on("click",function(){
  console.log("aaaa");
  $("#cart_icon").css("display","none");
  $("#cart_list").css({"display":"block"});
  $("#cart_list").animate({"opacity":1,"left":"20vw"},300);
  $(document).css("height",$("#cart_list").height());
  $(".plus_detect").css("height",$(".plus_detect").width()+"px");
  $(".minus_detect").css("height",$(".plus_detect").width()+"px");
  $("body").append("<div id='temp_background'style='height:100vh;width:100vw;position:absolute;top:0;left:0;background:black;opacity:0.3;z-index:99'></div>")
  record_cart =1;
});
});
/*
$("body").hammer().on("swipeleft",function(ev){
 if(record_cart ==0){
  $("#cart_icon").css("display","none");
  $("#cart_list").css({"display":"block"});
  $("#cart_list").animate({"opacity":1,"left":"20vw"},300);
  $(document).css("height",$("#cart_list").height());
  $(".plus_detect").css("height",$(".plus_detect").width()+"px");
  $(".minus_detect").css("height",$(".plus_detect").width()+"px");
  record_cart =1;
 
 } 
})
*/
$(function(){
$(document).hammer({domEvents: true}).on("swipeleft",".meal_each,body",function(ev){
  if($(this).attr("id")=="body"){
    if(record_cart==0 && record_profile ==0){
      $("#cart_icon").css("display","none");
      $("#cart_list").css({"display":"block"});
      $("#cart_list").animate({"opacity":1,"left":"20vw"},300);
      $(document).css("height",$("#cart_list").height());
      $(".plus_detect").css("height",$(".plus_detect").width()+"px");
      $(".minus_detect").css("height",$(".plus_detect").width()+"px");
      record_cart =1;
      $("body").append("<div id='temp_background'style='height:100vh;width:100vw;position:absolute;top:0;left:0;background:black;opacity:0.3;z-index:99'></div>")
    }else if(record_profile ==1){
      $("#profile_side").animate({"opacity":0,"left":"-100vw"},300,function(){
        $("#temp_background").remove();
        $("#profile_side").css("display","none");
        record_profile=0;
      });
    }
  }else{
    if(detect_delete_temp_id == $(this).attr("id")){return;}
    if(detect_delete ==1){
      $("#"+detect_delete_temp_id).animate({"left":0},300);
      detect_delete = 0;
    }
    $(this).animate({"left":"-25%"},300);
    detect_delete =1;
    detect_delete_temp_id = $(this).attr("id");
    console.log(detect_delete_temp_id);
  }
});
});

var prevent_mult=0;
$(function(){
$("body,#cart_field").hammer().on("swiperight",function(ev){
  if(prevent_mult ==0){
    solve_mult();
    if(record_cart ==1){
      $("#cart_list").animate({"opacity":0,"left":"100vw"},300,function(){
        $("#cart_list").css("display","none");
        $("#cart_icon").css("display","block");
        $("#temp_background").remove();
      });
      record_cart = 0;
      if(detect_delete ==1){
        $("#"+detect_delete_temp_id).animate({"left":0},300);
        detect_delete = 0;
        detect_delete_temp_id="";
      }
    }else{
      if(ev.originalEvent.gesture.changedPointers[0].pageX-ev.originalEvent.gesture.deltaX < 0.1*$("body").width()){
        show_profile();
      }else if(second_menu_record ==1){
        goback();
      }
    }
  }
});
});

function solve_mult(){
  prevent_mult = 1;
  setTimeout(function(){prevent_mult =0},100);
}
$(function(){
$("#cart_back_button").on("click",function(){
  if(record_cart ==1){
    $("#cart_list").animate({"opacity":0,"left":"100vw"},300,function(){
      $("#cart_list").css("display","none");
      $("#cart_icon").css("display","block");
    });
    record_cart = 0;
  }
});
});
var money={
  "cart_duck_01_honey":100,
  "cart_duck_01_tomato":100,
  "cart_duck_01_lemon":100,
  "cart_salmon_01_honey": 100,
  "cart_salmon_01_tomato": 100,
  "cart_salmon_01_lemon": 100,
  "cart_beef_01_honey": 100,
  "cart_beef_01_tomato": 100,
  "cart_beef_01_lemon": 100,
  "cart_hotdog_01_honey":100,
  "cart_hotdog_01_tomato":100,
  "cart_hotdog_01_lemon":100,
  "cart_blackTea_01": 45,
  "cart_greenTea_01": 45,
  "cart_fish_01": 80,
  "cart_fries_01":60
} 
var meal_in_cart={
}
$(function(){
$(document).on("click",".plus_detect",function(){
  $(this).parent().find(".plus_minus_button").attr("src","/media/source/+-_+.png");
  setTimeout(function(){$(".plus_minus_button").attr("src","/media/source/+-_ini.png");},100);
  var current_num = parseInt($(this).parent().find(".meal_count > p").text());
  if(current_num <9){
    $(this).parent().find(".meal_count > p").text(current_num+1);
    $(this).parent().find(".meal_money > p").text(money[$(this).parent().attr("id")]*(current_num+1));
    $("#total_money > p").text(parseInt($("#total_money > p").text())+money[$(this).parent().attr("id")]);
    meal_in_cart[$(this).parent().attr("id")]+=1;
  }
});
});
$(function(){
$(document).on("click",".minus_detect",function(){
  console.log("inin");
  $(this).parent().find(".plus_minus_button").attr("src","/media/source/--_-.png");
  setTimeout(function(){$(".plus_minus_button").attr("src","/media/source/+-_ini.png");},100);
  var current_num = parseInt($(this).parent().find(".meal_count > p").text());
  if(current_num >1){
    $(this).parent().find(".meal_count > p").text(current_num-1);
    $(this).parent().find(".meal_money > p").text(money[$(this).parent().attr("id")]*(current_num-1));
    $("#total_money > p").text(parseInt($("#total_money > p").text())-money[$(this).parent().attr("id")]);
    meal_in_cart[$(this).parent().attr("id")]-=1;
  }
});
});
function order(id){
  buy(id,parseInt($("#"+id+"_total_count > p").text()));   
      $("#back").animate({"width":"66.67vw"},300);
  setTimeout(function(){
    third_record=0;
    $("#"+third_record_id).animate({
      height:"32.2107vw",
    },300);
    $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
      $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
      $("#"+third_record_id).find(".sec_bot").css("bottom","0");
      $(".sec_ord").remove();
      $(".sec_plus").css({"display":"none"});
      $(".sec_plus").animate({"display":"none"},300);
      $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
    });
    var temp_array = move_burger[third_record_id].split(",");
    for(var i =0; i<temp_array.length;i++){
      if(temp_array[i]=="")break;
      $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.44983*$(window).width()+"px"},300);
    }
  },10);
}
function order_burger(id){
  if(parseInt($("#"+id+"_honey_count > p").text())>0){ buy(id+"_honey",parseInt($("#"+id+"_honey_count > p").text())); } 
  if(parseInt($("#"+id+"_tomato_count > p").text())>0){ buy(id+"_tomato",parseInt($("#"+id+"_tomato_count > p").text())); } 
  if(parseInt($("#"+id+"_lemon_count > p").text())>0){ buy(id+"_lemon",parseInt($("#"+id+"_lemon_count > p").text())); } 
      $("#back").animate({"width":"66.67vw"},300);
  setTimeout(function(){
    third_record=0;
    $("#"+third_record_id).animate({
      height:"32.2107vw",
    },300);
    $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
      $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
      $("#"+third_record_id).find(".sec_bot").css("bottom","0");
      $(".sec_ord").remove();
      $(".sec_plus").css({"display":"none"});
      $(".sec_plus").animate({"display":"none"},300);
      $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
    });
    var temp_array = move_burger[third_record_id].split(",");
    for(var i =0; i<temp_array.length;i++){
      if(temp_array[i]=="")break;
      $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.595668*$(window).width()+"px"},300);
    }
    $("body").css({"height":parseInt($("body").css("height").replace(/px/,""))-0.595668*$(window).width()+"px"});
    $("#"+id).find("p").text("0");
  },10);
}
function buy(id,count){
  if(record_cart ==0){
    if(!("cart_"+id in meal_in_cart)){
      $("#cart_field").append('<div class="meal_each" id="cart_'+id+'" ><img src="/media/source/'+id+'.png" class="meal_detail_image"><img src="/media/source/+-_ini.png" class="plus_minus_button"><div class="plus_detect" ></div><div class="minus_detect"></div><div class="meal_count"><p>'+count+'</p></div><div class="meal_money" style=" position: absolute; top:50%;left:65%;"><p>'+money["cart_"+id]*count+'</p></div><img src="/media/source/cancel.png" class="cancel"></div>')
        $("#total_money > p").text(parseInt($("#total_money > p").text())+money["cart_"+id]*count);
      meal_in_cart["cart_"+id]=count;
    }
  }
}
$(function(){
$(document).on("click",".cancel",function(){
  $("#total_money > p").text(parseInt($("#total_money > p").text())-parseInt($(this).parent().find(".meal_money").text()));
  delete meal_in_cart[$(this).parent().attr("id")];
  $(this).parent().fadeOut();
});
});
$(function(){
$("#total_check_button").on("click",function(){
  console.log(meal_in_cart);
})
});
var second_menu_record =0;
function goback(){
  if(third_record == 1){
    third_record=0;
    if(third_record_id =="duck_01"||third_record_id =="beef_01"||third_record_id =="salmon_01"||third_record_id =="hotdog_01"){
    $("#"+third_record_id).animate({
      height:"32.2107vw",
    },3);
    $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},1,function(){
      $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
      $("#"+third_record_id).find(".sec_bot").css("bottom","0");
      $(".sec_ord").remove();
      $(".sec_plus").css({"display":"none"});
      $(".sec_plus").animate({"display":"none"},3);
      $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},1);
    });
    var temp_array = move_burger[third_record_id].split(",");
    for(var i =0; i<temp_array.length;i++){
      if(temp_array[i]=="")break;
      $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.595668*$(window).width()+"px"},3);
    }
    $("body").css({"height":parseInt($("body").css("height").replace(/px/,""))-0.595668*$(window).width()+"px"});
    }else{
    third_record=0;
      $("#"+third_record_id).animate({
        height:"32.2107vw",
      },300);
      $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
        $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
        $("#"+third_record_id).find(".sec_bot").css("bottom","0");
        $(".sec_ord").remove();
        $(".sec_plus").css({"display":"none"});
        $(".sec_plus").animate({"display":"none"},300);
        $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
      });
      var temp_array = move_burger[third_record_id].split(",");
      for(var i =0; i<temp_array.length;i++){
        if(temp_array[i]=="")break;
        $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.44983*$(window).width()+"px"},300);
      }
    }
  }
  $(".sec").fadeOut();
  $(".first").fadeIn();
  //$("#back").css("width","33vw");
  $("#back").animate({"width":"33.3vw"},200);
  second_menu_record =0;
}
function second_menu(id){
  if(record_cart == 0){
    second_menu_record=1;
    //$("#back").css("width","66.7vw");
    $("#back").animate({"width":"66.7vw"},200);
    $(".first").fadeOut();
    $("#goback").fadeIn();
    if(id=="burger"){
      $("#duck_01").fadeIn();
      $("#beef_01").fadeIn(); 
      $("#salmon_01").fadeIn();
      $("#hotdog_01").fadeIn();

    }
    else if(id=="drink"){
      $("#greenTea_01").fadeIn();
      $("#blackTea_01").fadeIn(); 
    }
    else if(id=="snack"){
      $("#fish_01").fadeIn();
      $("#fries_01").fadeIn(); 

    }
    else if(id=="favor"){
    }
  }
}

function third_burger(id){
  console.log("burger");
  if(third_record ==0){
    $("#back").animate({"width":"100vw"},200);
    third_record=1;
    third_record_id = id;
    $("#"+id).animate({
      height:"91.7775091vw",
    },300);
    $("#"+id).find(".sec_bot").animate({"opacity":0},150,function(){
      $("#"+id).find(".sec_bot").attr("src","/media/source/100_02.png");
      $("#"+id).find(".sec_plus").css({"display":"block"});
      $("#"+id).find(".sec_bot").css("bottom","13%");
      $("#"+id).append("<img class='sec_ord' src='/media/source/order-01.png' onclick='order_burger(\""+id+"\")'style='width:100%; z-index:51; position:absolute; bottom:0;left:0'>")
        $("#"+id).find(".sec_bot").animate({"opacity":1},150);
    });
    var temp_array = move_burger[id].split(",");
    for(var i =0; i<temp_array.length;i++){
      if(temp_array[i]=="")break;
      $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))+0.595668*$(window).width()+"px"},300);
    }
    $("body").css({"height":parseInt($("body").css("height").replace(/px/,""))+0.595668*$(window).width()+"px"});
    return;
  }else{
    if(id != third_record_id){
      setTimeout(function(){third_burger(id)},330);
      third_record=0;
      $("#"+third_record_id).animate({
        height:"32.2107vw",
      },300);
      $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
        $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
        $("#"+third_record_id).find(".sec_bot").css("bottom","0");
        $(".sec_ord").remove();
        $(".sec_plus").css({"display":"none"});
        $(".sec_plus").animate({"display":"none"},300);
        $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
      });
      var temp_array = move_burger[third_record_id].split(",");
      for(var i =0; i<temp_array.length;i++){
        if(temp_array[i]=="")break;
        $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.595668*$(window).width()+"px"},300);
      }
      $("body").css({"height":parseInt($("body").css("height").replace(/px/,""))-0.595668*$(window).width()+"px"});
    }
  }
}
function third_other(id,money){
  if(third_record ==0){
    $("#back").animate({"width":"100vw"},200);
    third_record=1;
    third_record_id = id;
    $("#"+id).animate({
      height:"74.7964vw",
    },300);
    $("#"+id).find(".sec_bot").animate({"opacity":0},150,function(){
      $("#"+id).find(".sec_bot").attr("src","/media/source/"+money+"_02.png");
      $("#"+id).find(".sec_plus").css({"display":"block"});
      $("#"+id).find(".sec_bot").css("bottom","13%");
      $("#"+id).append("<img class='sec_ord' src='/media/source/order-01.png'onclick='order(\""+id+"\")' style='width:100%; z-index:51; position:absolute; bottom:0;left:0'>")
        $("#"+id).find(".sec_bot").animate({"opacity":1},150);
    });
    var temp_array = move_burger[id].split(",");
    for(var i =0; i<temp_array.length;i++){
      if(temp_array[i]=="")break;
      $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))+0.44983*$(window).width()+"px"},300);
    }
    return;
  }else{
    if(id != third_record_id){
      setTimeout(function(){third_other(id,money)},330);
      third_record=0;
      $("#"+third_record_id).animate({
        height:"32.2107vw",
      },300);
      $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
        $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
        $("#"+third_record_id).find(".sec_bot").css("bottom","0");
        $(".sec_ord").remove();
        $(".sec_plus").css({"display":"none"});
        $(".sec_plus").animate({"display":"none"},300);
        $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
      });
      var temp_array = move_burger[third_record_id].split(",");
      for(var i =0; i<temp_array.length;i++){
        if(temp_array[i]=="")break;
        $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.44983*$(window).width()+"px"},300);
      }
    }
  }
}
$(function(){
$(".sec_top").click(function(){
  var to_off_id = $(this).parent().attr("id");
  if(to_off_id == third_record_id){
    setTimeout(function(){
      $("#back").animate({"width":"66.67vw"},300);

      if(to_off_id == "duck_01" || to_off_id =="beef_01" || to_off_id =="salmon_01" || to_off_id =="hotdog_01"){
        third_record=0;
        $("#"+third_record_id).animate({
          height:"32.2107vw",
        },300);
        $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
          $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
          $("#"+third_record_id).find(".sec_bot").css("bottom","0");
          $(".sec_ord").remove();
          $(".sec_plus").css({"display":"none"});
          $(".sec_plus").animate({"display":"none"},300);
          $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
        });
        var temp_array = move_burger[third_record_id].split(",");
        for(var i =0; i<temp_array.length;i++){
          if(temp_array[i]=="")break;
          $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.595668*$(window).width()+"px"},300);
        }
        $("body").css({"height":parseInt($("body").css("height").replace(/px/,""))-0.595668*$(window).width()+"px"});
      }else{
        third_record=0;
        $("#"+third_record_id).animate({
          height:"32.2107vw",
        },300);
        $("#"+third_record_id).find(".sec_bot").animate({"opacity":0},150,function(){
          $("#"+third_record_id).find(".sec_bot").attr("src","/media/source/100_01.png");
          $("#"+third_record_id).find(".sec_bot").css("bottom","0");
          $(".sec_ord").remove();
          $(".sec_plus").css({"display":"none"});
          $(".sec_plus").animate({"display":"none"},300);
          $("#"+third_record_id).find(".sec_bot").animate({"opacity":1},150);
        });
        var temp_array = move_burger[third_record_id].split(",");
        for(var i =0; i<temp_array.length;i++){
          if(temp_array[i]=="")break;
          $("#"+temp_array[i]).animate({"top":parseInt($("#"+temp_array[i]).css("top").replace(/px/,""))-0.44983*$(window).width()+"px"},300);
        }
      }
    },10);
  }
});
});
$(function(){
$(document).on("click",".meal_plus_detect",function(){
  var img_id = $(this).attr("id").split("-")[0];
  $("#"+img_id).attr("src","/media/source/+-_+.png");
  setTimeout(function(){$("#"+img_id).attr("src","/media/source/+-_ini.png");},100);
  var current_num = parseInt($("#"+$(this).parent().attr("id")+"_total_count > p").text());
  if(current_num <9){
    $("#"+img_id+"_count > p").text(parseInt($("#"+img_id+"_count").text())+1);
    $("#"+$(this).parent().attr("id")+"_total_count > p").text(current_num+1);
    $("#"+$(this).parent().attr("id")+"_total_money > p").text(parseInt($("#"+$(this).parent().attr("id")+"_total_money > p").text())+meal_money[$(this).parent().attr("id")]);
  }
});
});
$(function(){
$(".meal_minus_detect").click(function(){
  var img_id = $(this).attr("id").split("-")[0];
  $("#"+img_id).attr("src","/media/source/--_-.png");
  setTimeout(function(){$("#"+img_id).attr("src","/media/source/+-_ini.png");},100);
  var current_num = parseInt($("#"+$(this).parent().attr("id")+"_total_count > p").text());
  if(parseInt($("#"+img_id+"_count").text()) >0){
    $("#"+img_id+"_count > p").text(parseInt($("#"+img_id+"_count").text())-1);
    $("#"+$(this).parent().attr("id")+"_total_count > p").text(current_num-1);
    $("#"+$(this).parent().attr("id")+"_total_money > p").text(parseInt($("#"+$(this).parent().attr("id")+"_total_money > p").text())-meal_money[$(this).parent().attr("id")]);
  }
});
});
function show_profile(){
  $("#profile_side").css({"display":"block"});
  $("#profile_side").animate({"opacity":1,"left":"0vw"},300);
  $("body").append("<div id='temp_background'style='height:100vh;width:100vw;position:absolute;top:0;left:0;background:black;opacity:0.3;z-index:99'></div>")
  record_profile = 1;}
$(function(){
$("#total_check_button").on("click",function(){
  console.log(meal_in_cart);
  console.log(parseInt($("#total_money > p").text()))
    $.ajax({
       type: 'POST',
       url: '',
       data: {
          meal : JSON.stringify(meal_in_cart),
          money : parseInt($("#total_money > p").text())
       },
       dataType: 'json',
       success: function(content){
            console.log(content["order_num"])
           window.location.href="../list_management/"+content["order_num"]
          //alert('success');
          },
    })
})
});