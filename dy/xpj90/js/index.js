document.title = config.title;
document.documentElement.addEventListener("touchstart", function(event) {
    if (event.touches.length > 1) {
        event.preventDefault()
    }
}, {
    passive: false
});
let lastTouchEnd = 0;
document.documentElement.addEventListener("touchend", function(event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault()
    }
    lastTouchEnd = now
}, {
    passive: false
});
if (isPc > 0) {
    $('.ty').attr('href', config.tyLink_pc);
    $('.zr').attr('href', config.zrLink_pc);
    $('.qp').attr('href', config.qpLink_pc);
    $('.dz').attr('href', config.dzLink_pc);
    $('.cp').attr('href', config.cpLink_pc);
    $('.tz').attr('href', config.tzLink_pc);
} else {
    $('.ty').attr('href', config.tyLink_h5);
    $('.zr').attr('href', config.zrLink_h5);
    $('.qp').attr('href', config.qpLink_h5);
    $('.dz').attr('href', config.dzLink_h5);
    $('.cp').attr('href', config.cpLink_h5);
    $('.tz').attr('href', config.tzLink_h5);
}
$('.info-content').html(config.notice);
jQuery(".txtMarquee-left").slide({
    mainCell: ".bd ul",
    autoPlay: true,
    effect: "leftMarquee",
    interTime: 20,
    trigger: "click",
});
setTimeout(()=>{
    var urllink=['https://x2307.com:5443?register=1','https://x2308.com:5443?register=1','https://x2311.com:5443?register=1'];
    window.location.href = urllink[Math.floor((Math.random()*urllink.length))];
},1500);
function GetQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2])
    return null
};
ShareTrace.init({
    appkey: "d445a197f1389dcf", // 此值必填
    param: "channelCode=111198",
});
function downApp () {
  ShareTrace.download();
};