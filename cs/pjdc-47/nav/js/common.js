$(document).ready(function(){

    $(".m2_left ul li a").hover(function(){
        $(this).children(".i1").hide().end().children(".i2").show();
    },function(){
        $(this).children(".i2").hide().end().children(".i1").show();
    })

    $(".m1_list li").hover(function(){
        $(this).addClass("cur");
        $(this).children(".link").stop(false,false).animate({top:"25px"});
        $(this).children(".btn").stop(false,false).animate({top:"50px"});
    },function(){
        $(this).removeClass("cur");
        $(this).children(".link").stop(false,false).animate({top:"45px"});
        $(this).children(".btn").stop(false,false).animate({top:"100%"});
    })

    $(".ico_again").click(function(){
        window.location.reload();
    })
})

var tim=1;
setInterval("tim++",100);
var autourl=new Array();
for(i=0;i<=5;i++){
    autourl[i]=$('.m1_list li').eq(i).find('.link').data("href");
}
