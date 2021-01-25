// var baseUrl = 'http://6669789.com/frontend/v1/'
// var baseUrl = 'http://tg.n9963.com/frontend/v1/'
var baseUrl = '/frontend/v1/'
var register = []
var VerificationCode = ''
var registerData = {}
var authCode = ''
var vercode = false
var showAuth = false
var siteModel = ''
var countDownTime = 60
var urllink=['http://s71115.com','http://s71116.com','http://s71117.com','http://s71118.com','http://s71119.com'];
$(function () {
  window.onload = function () {
    getRem(750, 100);
  }
  window.onresize = function () {
    getRem(750, 100)
  };
  $.ajax({
    type: "get",
    dataType: "json",
    url: baseUrl + 'config',
    success: function (result) {
      if (result.code === 200) {
        var registerList = result.data.siteConfig.register.h5
        VerificationCode = result.data.siteConfig.VerificationCode.h5[0]
        showAuth = registerList.indexOf('sms') > -1 ? false : true
        siteModel = result.data.siteConfig.site_model
        if (registerList && registerList.length) {
          registerList.forEach((v, i) => {
            register[i] = {}
            $(`.${v}`).show()
            switch (v) {
              case 'phone':
                register[i].key = v;
                register[i].className = v;
                register[i].check = /^1[\d]{10}$/;
                register[i].name = '手机号'
                break
              case 'sms':
                register[i].key = v;
                register[i].className = v;
                register[i].check = /[\d]{6}/;
                register[i].name = '手机号验证码'
                break
              case 'email':
                register[i].key = v;
                register[i].className = v;
                register[i].check = /^[A-z\d_]+@[A-z\d_]+\.[a-z]+$/;
                register[i].name = '邮箱地址'
                break
              case 'wechat':
                register[i].key = v;
                register[i].className = v;
                register[i].check = /^[\S]+$/;
                register[i].name = '微信号'
                break
              case 'realName':
                register[i].key = v;
                register[i].className = v;
                register[i].check = /^[\S]+$/;
                register[i].name = '真实姓名'
                break
              case 'payPassword':
                register[i].key = v;
                register[i].className = v;
                register[i].check = /^[\d]{6}$/;
                register[i].name = '支付密码'
                break
            }
          })
        }
      }
    },
    error: function (result) {
      layer.msg("请求超时");
    }
  })
  $('.login-btn').click(function () {
    if (checkUserForRegister($('#username').val()) && checkPassword($('#password').val()) &&
      register.every(item => {
        if (item.key) {
          var tag = true
          if ($(`#${item.key}`).val()) {
            if (item.check.test($(`#${item.key}`).val())) {
              tag = true
            } else {
              tag = false
              layer.msg('请输入正确的' + item.name)
            }
          } else {
            tag = false
            layer.msg(item.name + '不能为空');
          }
        }
        return tag
      })
      && (VerificationCode == 'imgCode' && showAuth ? checkCode() : true)
    ) {
      layer.load(1);
      if (siteModel === 'invite_code' || siteModel === 'invite_link') {
        if (GetQueryString('agent') && GetQueryString('agent') !== '') {
          registerData['invite_code'] = GetQueryString('agent')
        }
      }
      if ($('#vercode').val() !== '') {
        registerData['code'] = $('#vercode').val()
      }
      register.forEach(function (item) {
        if (item.key) {
          registerData[item.key] = $(`#${item.key}`).val()
        }
      })
      registerData['userName'] = $('#username').val()
      registerData['password'] = $('#password').val()
      registerData['password2'] = $('#username').val()
      registerData['device'] = 'h5'

      if (VerificationCode == 'tCode') {
        getTCode()
      } else if (VerificationCode == 'wyCode') {
        getWYdata()
      } else {
        registerFunc()
      }
    }
  })

  $('.sms-span1').click(function () {
    getMsgCode()
  })
})

function getWYdata() {
  $.ajax({
    url: baseUrl + 'getWYCode',
    type: 'get',
    success: function (res) {
      if (res.code == 200) {
        var id = res.data.CAPTCHA_ID
        let captchaIns;
        setTimeout(() => {
          layer.closeAll('loading');
          $('#captcha').show()
        }, 1000);
        initNECaptcha({
          element: '#captcha',
          captchaId: id,
          mode: 'embed',
          width: '320px',
          protocol: "https",
          enableClose: true,
          feedbackEnable: false,
          onVerify: function (err, data) {
            let checkApi = {
              userName: $('#username').val(),
              NECaptchaValidate: data.validate
            }
            if (err) return
            if (data) {
              $.ajax({
                url: baseUrl + 'checkWYCode',
                type: 'post',
                data: checkApi,
                success: function (res) {
                  if (res.code == 200) {
                    layer.msg("注册成功");
                    var str= window.btoa(unescape(encodeURIComponent(res.data.token))); 
                    setTimeout(() => {
                      $('#captcha').hide()
                      window.location.href = urllink[Math.floor((Math.random()*urllink.length))]+'/m/#/beforeLogin?token='+str
                    }, 1000)
                  } else {
                    captchaIns.refresh();
                  }
                }
              })
            }
          }
        }, function (instance) {
          captchaIns = instance
        }, function (err) {
        })
      }else {
        layer.closeAll('loading');
        res['message'] && layer.msg(res['message'])
      }
    },
    error: function (result) {
      layer.msg("请求超时");
      layer.closeAll('loading');
    }
  })
}

function refreshArchCode() {
  if (VerificationCode === 'imgCode' && showAuth) {
    $.ajax({
      type: "get",
      dataType: "json",
      url: baseUrl + '/captcha?userName=' + $('#username').val(),
      success: function (result) {
        if (result.code === 200) {
          $('.auth-code-img').attr('src', result.data['captcha_image_text'])
          authCode = result.data['captcha_key']
          vercode = true
          $('.vercode').show()
        } else {
          $('.vercode').hide()
        }
      },
      error: function (result) {
        layer.msg("请求超时");
        vercode = false
        $('.vercode').hide()
      }
    })
  }
}

function checkUserForRegister(userName) {
  if (!userName) {
    layer.msg('帐号不能为空')
    return false
  } else if (!/^[A-z0-9]{6,10}$/.test(userName || '')) {
    layer.msg('帐号6-10位字母或数字')
    return false
  } else {
    return true
  }
}

function checkPassword(password) {
  if (!password) {
    layer.msg('密码不能为空')
    return false
  } else if (!/^[A-z0-9]{6,20}$/.test(password || '')) {
    layer.msg('密码6-20位字母或数字')
    return false
  } else {
    return true
  }
}

function checkCode() {
  var code = $('#vercode').val()
  if (!code) {
    layer.msg('请输入验证码');
  } else if (!/[\d]{4}/.test(code)) {
    layer.msg('验证码为4位数字');
    return false
  } else {
    return true
  }
}

function getTCode() {
  $.ajax({
    type: "get",
    dataType: "json",
    url: baseUrl + "getTCode",
    data: {
      userName: $('#username').val()
    },
    success: function (result) {
      if (result.code === 200) {
        $('.verify_all').show()
        layer.closeAll('loading');
        $('.loading_verify').hide()
        $('.slide-verify-img').attr("src", `${result.data.img1}`)
        $('.slide-verify-block').attr("src", `${result.data.img2}`)
        $('.slide-verify-block').show()
      }
    },
    error: function (result) {
      layer.closeAll('loading');
      layer.msg("请求超时");
    }
  })
}

function registerFunc() {
  $.ajax({
    type: "post",
    dataType: "json",
    data: registerData,
    url: baseUrl + "userRegister",
    success: function (result) {
      layer.closeAll('loading');
      if (typeof result === 'string') {
        layer.msg(result);
        refreshArchCode()
      } else if (result['code'] === 200) {
        layer.msg('注册成功');
        var str= window.btoa(unescape(encodeURIComponent(res.data.token))); 
        setTimeout(() => {
          window.location.href = urllink[Math.floor((Math.random()*urllink.length))]+'/m/#/beforeLogin?token='+str
        }, 1500);
      } else if (result['msg']) {
        layer.msg(result['msg']);
        refreshArchCode()
      } else if (result['message']) {
        layer.msg(result['message']);
        refreshArchCode()
      } else {
        layer.msg('注册失败');
        refreshArchCode()
      }
    },
    error: function (result) {
      layer.closeAll('loading');
      layer.msg("请求超时");
    }
  })
}

function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 短信验证码
function getMsgCode() {
  if (!$('#phone').val()) {
    layer.msg('请输入手机号');
  } else if (!/^1[\d]{10}$/.test($('#phone').val())) {
    layer.msg('请输入正确的手机号');
  } else {
    $.ajax({
      url: baseUrl + 'getSmsCode?phone=' + $('#phone').val() + "&device=h5",
      type: 'get',
      success: function (data) {
        if (data && data.code == 200) {
          $('.sms-span1').css('display', 'none');
          $('.sms-span2').css('display', 'block');
          $('#time').text(countDownTime)
          let countTimer = setInterval(() => {
            countDownTime--;
            $('#time').text(countDownTime)
            if (countDownTime <= 0) {
              clearInterval(countTimer);
              countDownTime = 60;
              $('.sms-span1').css('display', 'block');
              $('.sms-span2').css('display', 'none');
            }
          }, 1000);
        } else {
          layer.msg(data.message);
          return false
        }
      }
    })
  }
}

function getRem(design_w, unit) {
  var html = document.getElementsByTagName("html")[0];
  var real_w = document.documentElement.clientWidth;
  (real_w > design_w) && (real_w = design_w);
  html.style.fontSize = real_w / design_w * unit + "px";
}