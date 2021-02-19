$(function() {
    $('.menu_ico').toggle(function(){
        $(".head").animate({left:'60%'},"slow");
        $(".footer").animate({left:'60%'},"slow");
        $(".nr").animate({left:'60%'},"slow");
        $(".caidan").animate({left:'0px'},"slow");
    },function(){
        $(".head").animate({left:'0px'},"slow");
        $(".footer").animate({left:'0px'},"slow");
        $(".nr").animate({left:'0px'},"slow");
        $(".caidan").animate({left:'-60%'},"slow");
    });

});