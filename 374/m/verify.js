$(function () {
  var originX = null
  var isMouseDown = false
  var slideVerifyImg = 310
  var blockImgW = 57
  var slideVerifySlider = 310
  var blockWith = 82
  var setLeftX = 0
  function touchStartEvent(e) {
    e.preventDefault();
    var theEvent = window.event || e;
    if (theEvent.touches) {
      theEvent = theEvent.touches[0];
    }
    originX = theEvent.clientX;
    isMouseDown = true;
    slideVerifyImg = $('.slide-verify-img')[0].offsetWidth
    blockImgW = $('.slide-verify-block')[0].offsetWidth
    slideVerifySlider = $('.slide-verify-slider')[0].offsetWidth
    blockWith = $('.slide-verify-slider-mask-item')[0].offsetWidth
  }
  function touchMoveEvent(e) {
    e.preventDefault();
    if (!isMouseDown) return false;
    var theEvent = window.event || e;
    if (theEvent.touches) {
      theEvent = theEvent.touches[0];
    }
    const moveX = theEvent.clientX - originX;
    if (moveX < 0 || moveX >= slideVerifySlider - blockWith) return false;
    $('.slide-verify-slider-mask-item').css('left',moveX + "px")
    setLeftX = ((slideVerifyImg - blockImgW) / (slideVerifySlider - blockWith)) * moveX;
    $('.slide-verify-block').css('left',setLeftX + "px")
    $('.slide-verify-slider').addClass('container-active')
  }
  function touchEndEvent(e) {
    e.preventDefault();
    if (!isMouseDown) return false;
    isMouseDown = false;
    if (e.originalEvent.changedTouches[0].pageX === originX) return false;
    $('.slide-verify-slider').removeClass('container-active')
    if (setLeftX) {
      $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "checkTCode",
        data: {
          tnCode: Math.round(setLeftX * 2 / (document.body.offsetWidth / 375)),
          userName: $('#username').val()
        },
        success: function (result) {
          if(result.code === 200) {
            $('.slide-verify-slider').addClass('container-success')
            checkName()
          } else {
            $('.slide-verify-slider').addClass('container-fail')
            setTimeout(() => {
              getTCode()
            }, 300);
          }
          setTimeout(() => {
            reset();
          }, 300);
        },
        error: function (result) {
          layer.msg("请求超时");
        }
      })
    }
  }

  function checkName() {
    $.ajax({
      type: "post",
      dataType: "json",
      url: baseUrl + "checkUsername/"+$('#username').val()+"",
      success: function (result) {
        reset()
        $('.verify_all').hide()
        if(result.code === 200) {
          registerFunc()
        }else {
          setTimeout(() => {
            layer.msg(result.message)
          }, 200);
        }
      },
      error: function () {
        layer.msg("请求超时");
      }
    })
  }

  function reset() {
    $('.loading_verify').show()
    $('.slide-verify-slider').removeClass('container-active')
    $('.slide-verify-slider').removeClass('container-success')
    $('.slide-verify-slider').removeClass('container-fail')
    $('.slide-verify-slider-mask-item').css('left',0 + "px")
    $('.slide-verify-block').css('left',0 + "px")
    $('.slide-verify-img').attr("src",'./img/loading_bg.png')
    $('.slide-verify-block').attr("src",'')
    $('.slide-verify-block').hide()
  }

  

  $('.slide-verify-slider-mask-item').on('touchstart',function (e) {
    touchStartEvent(e)
  })
  $('.slide-verify-slider-mask-item').on('touchmove',function (e) {
    touchMoveEvent(e)
  })
  $('.slide-verify-slider-mask-item').on('touchend',function (e) {
    touchEndEvent(e)
  })

  $('.reset-btn').click(function () {
    reset()
    getTCode()
  })

  $('.close-btn').click(function () {
    $('.verify_all').hide()
  })
})