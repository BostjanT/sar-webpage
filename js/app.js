const img = document.querySelector('.what-container');

img.addEventListener('click', function() {
    
   img.classList.add('what-img');
});

$(document).ready(function () {
//window scroll stciky navbar

$(document).scroll(function () {
   let position = $(this).scrollTop();
   if (position >= 718) {
      $('.navbar').addClass('navbar-background');
      $('.navbar').addClass('fixed-top');
      $('.nav-link').addClass('blue');
   } else {
      $('.navbar').removeClass('navbar-background');
      $('.navbar').removeClass('fixed-top');
      $('.nav-link').removeClass('blue');
   }
});

//smooth scroll
$('.nav-item a, .navbar-icons, #back-to-top').click(function (link) {
   link.preventDefault();
   let target = $(this).attr('href');
   $('html, body').stop().animate({
      scrollTop: $(target).offset().top - 120
   }, 2000);

});

// back to top
$(document).scroll(function () {
   let position = $(this).scrollTop();
   if (position >= 718) {
      $('#back-to-top').addClass('scrollTop');
   } else {
      $('#back-to-top').removeClass('scrollTop');
   }
});

$('.parent-container').magnificPopup({
   delegate: 'a', // child items selector, by clicking on it popup will open
   type: 'image',
   // other options
   gallery: {
      // options for gallery
      enabled: true
   }
});
});

 



  /*  if ($('#back-to-top').length) {
     var scrollTrigger = 100, // px
        backToTop = function () {
           var scrollTop = $(window).scrollTop();
           if (scrollTop > scrollTrigger) {
              $('#back-to-top').addClass('show');
           } else {
              $('#back-to-top').removeClass('show');
           }
        };
     backToTop();
      $(window).on('scroll', function () {
        backToTop();
     });
     $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
           scrollTop: 0
        }, 200);
     }); 
  }  */

