let downloadType, sharetraceKey, xi_domain;
function isAndroid() {
  let o = navigator.userAgent;
  return o.indexOf("Android") > -1 || o.indexOf("Adr") > -1;
}
function isIOS() {
  return /iphone|ipad/.test(navigator.userAgent.toLowerCase())
}

function iosDownload(o) {
  setTimeout(function() {
    window.location.href = o;
  }, 0);
}
function downLink() {
  isAndroid()
    ? iosDownload(localStorage.downloadAndroidLink)
    : iosDownload(localStorage.downloadIosLink);
}
function downApp() {
  let channelParams = { channelDomain: location.origin }
  let channelCode = new URL(window.location.href).searchParams.get("channelCode") || new URL(window.location.href).searchParams.get("agent")
  if (channelCode) channelParams["channelCode"] = channelCode

  if (sharetraceKey) {
    let o = xi_domain || "https://aaebwm.com/";
    XInstall.setHost(o);
    try {
      XInstall.getInstall(
        sharetraceKey,
        channelParams,
        function(o) {
          downLink();
        }
      );
    } catch (o) {
      this.downLink();
    }
  } else downLink();
}
new Promise(function(o, n) {
  var e = new XMLHttpRequest();
  // let t = location.origin + "/frontend/v1/configNavigate";
  let t = "http://tg.n9963.com/frontend/v1/configNavigate";
  e.open("get", t, !0),
    e.addEventListener("load", function() {
      if (4 == e.readyState && 200 == e.status) {
        let n = JSON.parse(e.responseText);
        if (200 == n.code) {
          const o = n.data.siteConfig;
          o.downloadType && (downloadType = o.downloadType),
            o.other.sharetrace_key && (sharetraceKey = o.other.sharetrace_key),
            o.other.xi_domain && (xi_domain = o.other.xi_domain),
            (localStorage.downloadIosLink = o.IOS.link),
            (localStorage.downloadAndroidLink = o.Android.link),
            console.log(o.service[0].url),
            (document.getElementById("kf-link").href = o.service[0].url),
            (document.getElementById("Toh5").href = o.other.landing_to_h5);
            postPageView(sharetraceKey, xi_domain)
        }
        o(n);
      }
    }),
    e.addEventListener("error", function() {
      n(new Error("Network error"));
    }),
    e.send(null);
});
function postPageView (appid, xi_domain = "https://aaebwm.com/") {
  let channelParams = { channelDomain: location.origin }
  let channelCode = new URL(window.location.href).searchParams.get("channelCode") || new URL(window.location.href).searchParams.get("agent")
  if (channelCode) channelParams["channelCode"] = channelCode
  const uri = `${xi_domain}/index.php/api/index/viewPage`
  let params = {
    os: "H5",
    appid: appid,
    params: JSON.stringify(channelParams)
  }
  // 改成判斷是 Android 就傳 AndroidOS, iOS 就傳 iOS , 判斷不出這兩者的話, 就傳 H5
  if (isIOS()) params.os = "iOS"
  if (isAndroid()) params.os = "AndroidOS"

  fetch(uri, {
    method:'POST',
    body:JSON.stringify(params),
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
  })
  .then(res => {
  });
}
