const loadScript = function(url) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = url;

        script.addEventListener('load', function() {
            // The script is loaded completely
            resolve(true);
        });

        document.head.appendChild(script);
    });
};

// Perform all promises in the order
const waterfall = function(promises) {
    return promises.reduce(
        function(p, c) {
            // Waiting for `p` completed
            return p.then(function() {
                // and then `c`
                return c.then(function(result) {
                    return true;
                });
            });
        },
        // The initial value passed to the reduce method
        Promise.resolve([])
    );
};

// Load an array of scripts in order
const loadScriptsInOrder = function(arrayOfJs) {
    const promises = arrayOfJs.map(function(url) {
        return loadScript(url);
    });
    return waterfall(promises);
};

loadScriptsInOrder([
    'js/jquery-2.2.3.min.js',
    'js/bootstrap.js',
    'js/responsiveslides.min.js',
    'js/simple-lightbox.min.js',
    'js/SmoothScroll.min.js',
    'js/easing.js',
    'js/move-top.js',
    'js/owl.carousel.js'
]).then(function() {
    console.log("load success")
    addEventListener("load", function () {
        setTimeout(hideURLbar, 0);
    }, false);

    hideURLbar = function () {
        window.scrollTo(0, 1);
    }
    
    $(function () {
        // Banner Slider
        $("#slider").responsiveSlides({
            auto: true,
            pager: true,
            nav: true,
            speed: 1000,
            namespace: "callbacks",
            before: function () {
                $('.events').append("<li>before event fired.</li>");
            },
            after: function () {
                $('.events').append("<li>after event fired.</li>");
            }
        });
        // Sticky Navigation Script
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 795) {
                $('nav').addClass('fixed-header');
            } else {
                $('nav').removeClass('fixed-header');
            }
        });
        // simple-lightbox
        var gallery = $('.agileinfo-gallery-row a').simpleLightbox({
            navText: ['&lsaquo;', '&rsaquo;']
        });
        // smooth-scrolling
        jQuery(document).ready(function ($) {
            $(".scroll").click(function (event) {
                event.preventDefault();

                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top
                }, 1000);
            });
        });
        $(document).ready(function () {
            // move-up
            $().UItoTop({
                easingType: 'easeOutQuart'
            });
            // Owl-Carousel-JavaScript
            $("#owl-demo").owlCarousel({
                items: 3,
                lazyLoad: true,
                autoPlay: true,
                pagination: true,
            });
        });
    });
})