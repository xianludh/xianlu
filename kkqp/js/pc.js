var certifySwiper = new Swiper('#certify .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 4,
    autoplay: {
      disableOnInteraction: false, // 鼠标滑动后继续自动播放
      delay: 2000, //4秒切换一次
    },
    on: {
      progress: function (progress) {
        for (i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          var slideProgress = this.slides[i].progress;
          modify = 1;
          if (Math.abs(slideProgress) > 1) {
            modify = (Math.abs(slideProgress) - .7) * 0.4 + .6;
          }
          translate = slideProgress * modify * 17.33 + 'px';
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