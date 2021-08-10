var swiper = new Swiper('.swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
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