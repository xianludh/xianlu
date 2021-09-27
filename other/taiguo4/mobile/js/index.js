var jroll = new JRoll('#scroll');
jroll.refresh();
setInterval(function() {
    jroll.refresh()
}, 500);

function gopath(a) {
    let url;
    if (a == 1) url = 'https://www.thsands2.com/';
    else url = 'https://app.u603.com/sands/';
    window.location.href = url
}