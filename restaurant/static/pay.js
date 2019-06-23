var origin_margin
var origin_height
var origin_font_size
var container = new Hammer(document.getElementById('time_selector'))
container.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
var origin_state
const discount_loc={
    35:'../../static/img/35-01.png',
    25:'../../static/img/25-01.png',
    15:'../../static/img/15-01.png',
    0:'../../static/img/0-01.png'
}
var time = [
    new Date('2015/5/30 07:30:00'),
    new Date('2015/5/30 08:00:00'),
    new Date('2015/5/30 08:30:00'),
    new Date('2015/5/30 09:00:00'),
    new Date('2015/5/30 09:30:00'),
    new Date('2015/5/30 10:00:00'),
    new Date('2015/5/30 10:30:00'),
    new Date('2015/5/30 11:00:00'),
    new Date('2015/5/30 11:30:00'),
]
var time=[
    {
        discount:35,
        time:new Date('2015/5/30 07:30:00'),
    },
    {
        discount:35,
        time:new Date('2015/5/30 08:00:00'),
    },
    {
        discount:25,
        time:new Date('2015/5/30 08:30:00'),
    },
    {
        discount:15,
        time:new Date('2015/5/30 09:00:00'),
    },
    {
        discount:15,
        time:new Date('2015/5/30 09:30:00'),
    },
    {
        discount:0,
        time:new Date('2015/5/30 10:00:00'),
    },
    {
        discount:0,
        time:new Date('2015/5/30 10:30:00'),
    },
    {
        discount:15,
        time:new Date('2015/5/30 11:00:00'),
    },
    {
        discount:15,
        time:new Date('2015/5/30 11:30:00'),
    },
]
var state = time[0]

function paddingLeft(str,lenght){
	if(str.length >= lenght)
	return str;
	else
	return paddingLeft("0" +str,lenght);
}

function initial() {
    let p = document.getElementById('current')
    //console.log(window.getComputedStyle(p, null).getPropertyValue('height'))
    let height = Number(window.getComputedStyle(p, null).getPropertyValue('height').slice(0, -2))
    origin_height = height
    let margin = Number(window.getComputedStyle(p, null).getPropertyValue('margin-bottom').slice(0, -2))
    origin_margin = margin
    let pre = document.getElementById('previous2')
    pre.style.marginTop = (margin + height) / 2
    let font=Number(window.getComputedStyle(p, null).getPropertyValue('font-size').slice(0, -2))
    origin_font_size=font
    $('#previous2').css({
        marginTop:(margin + height) / 2,
    })
    document.getElementById('previous2').innerHTML = time[0].time.getHours() + ":" + time[0].time.getMinutes()
    document.getElementById('current').innerHTML = time[1].time.getHours() + ":" + time[1].time.getMinutes()
    document.getElementById('next2').innerHTML = time[2].time.getHours() + ":" + time[2].time.getMinutes()
    origin_state=0
    $('#previous2').css({
        marginTop: (origin_margin + origin_height) / 2,
        opacity: 0.5,
    })
    $('#next2').css({
        opacity: 0.5,
    })
    $('#current').css({
        fontSize: origin_font_size*1.2
    })
    origin_state=-1
    //console.log(window.getComputedStyle(p, null).getPropertyValue('margin-top'))
}
container.on('panstart', function(ev){
    $('#current').animate({
        fontSize: origin_font_size
    }, 100)
    
})
container.on('pandown panup panend', function (ev) {
    
    console.log('origin: ',origin_state)
    $('#previous2').stop()
    $('#next2').stop()
    //console.log(ev.type)
    var shift_state = 0
    if ((ev.deltaY + (origin_margin + origin_height) / 2) < 0) {
        //let origin_state=shift_state
        shift_state = (ev.deltaY + (origin_margin + origin_height) / 2) / (origin_height + origin_margin)
        //shift_state--;
        shift_state = parseInt((shift_state+origin_state) % time.length)
        //console.log(shift_state)
        shift_state--;
        shift_state += time.length
        shift_state = (time.length - shift_state)%time.length
        document.getElementById('previous2').style.marginTop = (origin_margin + origin_height) - (-1) * (ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)
        /*$('#previous2').animate({
            marginTop: (origin_margin + origin_height) - (-1) * (ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height),
            opacity: 0.5,
        }, 1, 'swing')*/
        $('#previous2').css({
            marginTop:(origin_margin + origin_height) - (-1) * (ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)
        })
        
        document.getElementById('previous2').style.opacity = 1 - (-1) * ((ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)) / (origin_margin + origin_height)
        document.getElementById('next2').style.opacity = -1 * ((ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)) / (origin_margin + origin_height)
        console.log(shift_state)
    } else {
        //let origin_state=shift_state
        shift_state = (ev.deltaY + (origin_margin + origin_height) / 2) / (origin_height + origin_margin)
        shift_state = parseInt((shift_state) % time.length)
        //console.log(shift_state,origin_state)
        shift_state = (time.length - shift_state )%time.length
        document.getElementById('previous2').style.marginTop = (ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)
        /*$('#previous2').animate({
            marginTop: (ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height),
            opacity: 0.5,
        }, 1, 'swing')*/
        $('#previous2').css({
            marginTop:(ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)
        })
        document.getElementById('previous2').style.opacity = ((ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)) / (origin_margin + origin_height)
        document.getElementById('next2').style.opacity = 1 - ((ev.deltaY + (origin_margin + origin_height) / 2) % (origin_margin + origin_height)) / (origin_margin + origin_height)
        

        console.log(shift_state)
    }
    shift_state+=origin_state
    document.getElementById('previous2').innerHTML = time[(shift_state + 1) % time.length].time.getHours() + ":" + paddingLeft(time[(shift_state + 1) % time.length].time.getMinutes().toString(),2)
    document.getElementById('current').innerHTML = time[(shift_state + 2) % time.length].time.getHours() + ":" + paddingLeft(time[(shift_state + 2) % time.length].time.getMinutes().toString(),2)
    document.getElementById('next2').innerHTML = time[(shift_state + 3) % time.length].time.getHours() + ":" + paddingLeft(time[(shift_state + 3) % time.length].time.getMinutes().toString(),2)
    document.getElementById('discount').style.backgroundImage="url('"+ discount_loc[ time[(shift_state + 2) % time.length].discount]+"')"
    //document.getElementById('previous').innerHTML = time[(shift_state + 1) % time.length].getHours() + ":" + time[(shift_state + 1) % time.length].getMinutes()
    //document.getElementById('current').innerHTML = time[(shift_state + 2) % time.length].getHours() + ":" + time[(shift_state + 2) % time.length].getMinutes()
    
    //document.getElementById('next').innerHTML = time[(shift_state + 3) % time.length].getHours() + ":" + time[(shift_state + 3) % time.length].getMinutes()
    //document.getElementById('next2').innerHTML = time[(shift_state + 4) % time.length].getHours() + ":" + time[(shift_state + 4) % time.length].getMinutes()
    if(ev.type=='panend'){
        origin_state=shift_state
     }
    state = time[(shift_state + 2) % time.length]
})
container.on('panend', function (ev) {
    //console.log(ev.type)
    //console.log(ev.deltaY)
    $('#current').stop()
    $('#previous2').animate({
        marginTop: (origin_margin + origin_height) / 2,
        opacity: 0.5,
    }, 100, 'swing')
    $('#next2').animate({
        opacity: 0.5,
    }, 100, 'swing')
    $('#current').animate({
        fontSize: origin_font_size*1.2
    },100)
    
    console.log(state.toString())
})
$('#pay_button').click(function(){
    
})
$(document).ready(initial)
$(document).ready(function(){
  tmp_height = $("#listImg").height()*1.2 + $("#listMenuField").height() + $("#listBottomField").height()
    $("#list").height(tmp_height+"px");
  //setTimeout(change(),3000);
})
paymentChoose = ["applepay","paypal","linepay"]
middleRecord = 1
function change_right(){
  $(".listBottomPayElement_each").each(function(){
    new_left = parseInt($(this).css("left").split("px",1))+ $(".listBottomPayElement").width()*0.4
      if(new_left < $(".listBottomPayElement").width()) {
        $(this).animate({left: new_left+"px"},300);
      }else{
        $(this).animate({left: new_left+"px"},100);
        setTimeout(function(){$("#"+paymentChoose[(middleRecord+1) %3]).remove();},102);
        setTimeout(function(){
          if(paymentChoose[(middleRecord+1) %3]!="linepay"){
            $("#listBottomPay").append('<img class="listBottomPayElement_each"id="'+paymentChoose[(middleRecord+1) %3]+'"src="../../media/img/listManagement/'+ paymentChoose[(middleRecord+1) %3] +'-01.png" alt=" "style="left: -25%;">');
          }else{
            $("#listBottomPay").append('<img class="listBottomPayElement_each"id="linepay"src="../../media/img/listManagement/linepay-01.png" alt=" "style="left: -25%; height:60%; top:20%">');

          }
        },105);
        setTimeout(function(){$("#"+paymentChoose[(middleRecord+1) %3]).animate({left:"-5%"},190); },110);
        setTimeout(function(){middleRecord = (middleRecord+2)%3},300);
      }
  });
}
function change_left(){
  $(".listBottomPayElement_each").each(function(){
    new_left = parseInt($(this).css("left").split("px",1))- $(".listBottomPayElement").width()*0.4
      if(new_left > $(".listBottomPayElement").width()*(-0.4)) {
        $(this).animate({left: new_left+"px"},300);
      }else{
        $(this).animate({left: new_left+"px"},50);
        setTimeout(function(){$("#"+paymentChoose[(middleRecord+2) %3]).remove();},52);
        setTimeout(function(){
          if(paymentChoose[(middleRecord+2)%3] != "linepay"){
            $("#listBottomPay").append('<img class="listBottomPayElement_each"id="'+paymentChoose[(middleRecord+2) %3]+'"src="../../media/img/listManagement/'+ paymentChoose[(middleRecord+2) %3] +'-01.png" alt=" "style="left: 100%;">');
          }else{
            $("#listBottomPay").append('<img class="listBottomPayElement_each"id="linepay"src="../../media/img/listManagement/linepay-01.png" alt=" "style="left: 100%; height:60%;top:20%;">');
          }
        },55);

        setTimeout(function(){$("#"+paymentChoose[(middleRecord+2) %3]).animate({left:"75%"},240); },60);
        setTimeout(function(){middleRecord = (middleRecord+1)%3},300);
      }
  });
}
$("#listBottomPay").hammer().on("swipeleft",function(ev){
  change_left();
});
$("#listBottomPay").hammer().on("swiperight",function(ev){
  change_right();
});
