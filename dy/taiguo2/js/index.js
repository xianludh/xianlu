if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || /BlackBerry/i.test(navigator.userAgent) || /IEMobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    window.location.href = "mobile/index.html"
};
$().ready(function() {
    $(window).scroll(function() {
        window.setTimeout(function() {
            var a = 0;
            if (typeof window.pageYOffset != 'undefined') {
                a = window.pageYOffset
            } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                a = document.documentElement.scrollTop
            } else if (typeof document.body != 'undefined') {
                a = document.body.scrollTop
            }
            $(".right").css("top", 230 + a)
        }, 100)
    })
});
function gopath(a) {
    let url;
    if (a == 1) url = 'https://lin.ee/lVzUfsI'; 
    else if (a == 2) url = 'https://vue.livelyhelp.chat/chatWindow.aspx?siteId=60002210&planId=52f5469a-0d46-4787-a52a-5d5e4adb225d#';
    else url = 'https://app.u603.com/sands/';
    window.location.href = url
}