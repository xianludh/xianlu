var browser = {
  versions: function () {
    var u = navigator.userAgent,
        app = navigator.appVersion
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
    }
  }()
}

function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

b = GetQueryString('channelCode')

if (b == null) {
  url = window.location.href
  a = url + '?channelCode=790010&code=1'
  window.location.href = a
}

var certifySwiper = new Swiper('#certify .swiper-container', {
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 4,
  autoplay: false,
  on: {
    progress: function (progress) {
      for (i = 0; i < this.slides.length; i++) {
        var slide = this.slides.eq(i);
        var slideProgress = this.slides[i].progress;
        modify = 1;
        if (Math.abs(slideProgress) > 1) {
          modify = (Math.abs(slideProgress) - .7) * 0.4 + .6;
        }
        translate = slideProgress * modify * 17.33 + 'vw';
        scale = 1 - Math.abs(slideProgress) / 9;
        zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
        slide.css('zIndex', zIndex);
        slide.css('opacity', 1);
        if (Math.abs(slideProgress) > 3) {
          slide.css('opacity', 0);
        }
      }
    },
    setTransition: function (transition) {
      for (var i = 0; i < this.slides.length; i++) {
        var slide = this.slides.eq(i)
        slide.transition(transition);
      }

    }
  }

})
