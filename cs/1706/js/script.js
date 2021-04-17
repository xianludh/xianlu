jconfirm.defaults = {
    title: '提示',
    titleClass: '',
    useBootstrap: false,
    boxWidth: '90vw',
    bgOpacity: '.6',
    animateFromElement: false,
    animation: 'top',
    closeAnimation: 'bottom',
    theme: 'se7en',
    backgroundDismiss: true,
    buttons: {
        ok: {
            text: '确定'
        },
        close: {
            text: '取消'
        }
    }
}
function GetQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

b = GetQueryString('channelCode')

if (b == null) {
    console.log(b);
    url = window.location.href
    a = url + '?channelCode=704762&code=1'
    window.location.href = a
}
$(document).ready(function() {
    // $('#fullpage').fullpage({
    //   continuousVertical: true
    // });
    var mySwiper = new Swiper('#notice_bar', {
        loop: true,
        freeMode: true,
        speed: 10000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        }
    })
    var certifySwiper = new Swiper('#certify .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        autoplay: {
            disableOnInteraction: false
        },
        on: {
            progress: function(progress) {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - .7) * 0.2 + .6;
                    }
                    translate = slideProgress * modify * 100 + 'px';
                    scale = 1 - Math.abs(slideProgress) / 9;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 1) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            }
        }

    })
    showOs();
    /*$(function() {
        getRedBagInfo(); // 第一次加载数据
        // 开启定时任务，时间间隔为3000 ms。
        setInterval(function() {
            getRedBagInfo();
        }, 30000);
    });*/

    // 阻止点击滑动层关闭mask
    $('#swiperInstall').click(function (event) {
        event.preventDefault();
        return false;
    })

    // 点击下一步隐藏IOS弹窗
    $('.closeMask1').click(function () {
        xiayibu()
    })
    $('.closeMask2').click(function () {
        $('.closeMask1').show()
        $('.closeMask2').hide()
        $('.ios_mask').hide();
    })

});
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1
        };
    }()
}

function showOs() {
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        $('.ios_show').show()
    } else if (browser.versions.android) {
        $('.and_show').show()
    } else {
        $('.and_show').show()
    }
}

function showXinRen() {
    if (document.getElementById("xinren_list").style.display == "none") {
        document.getElementById("xinren_list").style.display = "block"
        document.getElementById("game_list").style.display = "none"
        $('#xr_button').attr('src', './images/xr_button_back.jpg')
    } else {
        document.getElementById("xinren_list").style.display = "none"
        document.getElementById("game_list").style.display = "block"
        $('#xr_button').attr('src', './images/xr_button.jpg')
    }
}


function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/qq\//i) == "qq/") {
        return true;
    } else {
        return false;
    }
}

function showPc() {
    $('#pc').fadeIn()
}

function hidePc() {
    $('#pc').fadeOut()
}



function isSafari() {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

    function xiayibu(){
        
        $('#license_step_img1').hide();
        document.getElementById("download_if").src = "/js.mobileprovision";
        setTimeout(function () {
            $('#license_step_img2').show();
        }, 2000);
        $('.closeMask2').show()
        $('.closeMask1').hide()
    }
// ios12.1.4之后的下载按钮点击事件处理
/*function downLoadPath() {
    if (!isSafari()) {      
        showBaiduT()
        return false;
    }

    // 延迟2秒显示证书遮罩层
    setTimeout(() => {
        $('.ios_mask').show();
    }, 1000)
    // 延迟3秒显示证书安装箭头指示
    setTimeout(function () {
        $('#license_step_img1').show();
        setTimeout(function(){
            xiayibu()
        },3000)
    }, 2000);

    document.getElementById("download_if").src = './103qipai.mobileconfig'
}*/


/*function downApps() {
    if (!getQueryVariable("udid")) {
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            // showXR()
            // loading(function() {
            //     $('.loadingBox').css('display', 'none');
            // }, 10000);
            // 
            //https://137.cool/ios_describe/133.mobileconfig



        downLoadPath()

            // window.location.href = "https://137.cool/ios_describe/135.mobileconfig";
            // setTimeout(function() {
            //     // body...
            //     window.location.href = "https://137.cool/mobileprovision/embedded1.mobileprovision";
            // }, 3000);
        }
    }
    else{

      // window.location.href="itms-services://?action=download-manifest&url=https://137.cool/upload/udidplist/"+getQueryVariable("udid")+".plist";
        
    }


    // openInstall.wakeupOrInstall();
}*/

// 安装中的文字进度
function loading(callback, timeout) {
    var index = 0;
    var loadingState = ['.', '..', '...'];
    var intervalId = setInterval(function() {
        if (index > 2) {
            index = 0;
        }

        $('.loadingBox').css('display', 'block');
        $('#download_btn').text('更新版本，请先卸载旧APP，再点击“安装”继续' + loadingState[index]);
        index++
    }, 500);

    setTimeout(function() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (callback) callback(); //回调
    }, timeout || 7000);
}

function showMenu() {
    $('#app').toggleClass('show')
}

function showXR() {
    $('#xrBox').addClass('show')
}

function hideXrBox() {
    $('#xrBox').removeClass('show')
}

setTimeout(function() {
    $('#time1').html(Math.ceil(Math.random() * 9) + 'ms')
}, 1000)
setTimeout(function() {
    $('#time2').html(Math.ceil(Math.random() * 9) + 'ms')
}, 1500)
setTimeout(function() {
    $('#time3').html(Math.ceil(Math.random() * 9) + 'ms')
}, 2000)

function showRedBag() {
    $('#red_bag').addClass('show')
}

function hideRedBag() {
    $('#red_bag').removeClass('show')
}

/*function getRedBagInfo() {
    var showred_bag = $.trim($('#showred_bag').val());
    if (showred_bag == 1) {
        $.ajax({
            url: '//hb.178xiufu.com/ajax.php?act=lottery&_=' + new Date().getTime(),
            dataType: 'json',
            type: 'GET',
            success: function(result) {
                $("#hb_title").html(result.title);
                $("#hb_info").html(result.info);
                if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                    if (result.stat == 0 && result.ios == 1) {
                        showRedBag()
                    } else {
                        hideRedBag()
                    }
                } else {
                    if (result.stat == 0 && result.android == 1) {
                        showRedBag()
                    } else {
                        hideRedBag()
                    }
                }
            }
        })
    }
}*/

/*function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}*/

/*
function sendRedBag() {
    var username = $.trim($('#username').val());
    if (username == '') {
        alert('请输入会员名！');
        return false;
    }
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        var sys = "IOS";
    } else {
        var sys = "android";
    }

    $.ajax({
        url: '//hb.178xiufu.com/ajax.php?act=getpacket&sys=' + sys,
        dataType: 'json',
        data: { username: username },
        cache: false,
        type: 'GET',
        success: function(obj) {
            if (obj.stat == '1' || obj.stat == '0') {
                alert(obj.msg);
                hideRedBag()
                $('#showred_bag').val('0')
            } else {
                alert('系统忙，请稍后再试！');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('系统忙，请稍后再试！');
        }
    });
}*/
