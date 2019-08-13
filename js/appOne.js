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

    // toggler button
    $('.navbar-toggler').click(function () {
        $('.navbar-toggler').toggleClass('change');
    });

 /*    //smooth scroll
    $('.nav-item a, .navbar-icons, #back-to-top').click(function (link) {
        link.preventDefault();
        let target = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - 120
        }, 2000);

    }); */

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


    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - 121
                    }, 2000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
});