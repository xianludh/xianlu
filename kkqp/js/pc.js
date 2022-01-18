var certifySwiper = new Swiper('#certify .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    spaceBetween:38,
    autoplay: {
      disableOnInteraction: false, // 鼠标滑动后继续自动播放
      delay: 2000, //4秒切换一次
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }

  })