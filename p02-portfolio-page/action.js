// toggles-collapses hamburger after user clicks link
$('.nav a').on('click', function(){
    $('.navbar-toggle').click()
});

//hides scroll-top on initial load/before any scrolling
$('.scroll-top').hide();

//shows scroll-top after scrolling down
//http://stackoverflow.com/a/5980361
$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('.scroll-top').fadeIn();
    } else {
        $('.scroll-top').hide();
    }
});
