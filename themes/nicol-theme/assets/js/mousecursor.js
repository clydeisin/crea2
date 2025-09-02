(function($) {
    "use strict";
    if ($(window).width() > 1025 && $("#ball").length > 0) {

        /* parellax Effect on mouse houver */
        $(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');

        if ($("a.magnetic-item").length) {
            $("a.magnetic-item").addClass("not-hide-cursor");
        }

        var $mouse = {
            x: 0,
            y: 0
        }; // Cursor position
        var $pos = {
            x: 0,
            y: 0
        }; // Cursor position
        var $ratio = 0.15; // delay follow cursor
        var $active = false;
        var $ball = $("#ball");
        var $ballWidth = 2.125; // Ball default width
        var $ballHeight = 2.125; // Ball default height
        var $ballScale = 1; // Ball default scale
        var $ballOpacity = 0.5; // Ball default opacity
        var $ballBorderWidth = 2; // Ball default border width

        gsap.set($ball, { // scale from middle and style ball
            xPercent: -50,
            yPercent: -50,
            width: $ballWidth + 'em',
            height: $ballHeight + 'em',
            borderWidth: $ballBorderWidth,
            opacity: $ballOpacity
        });

        document.addEventListener("mousemove", mouseMove);

        function mouseMove(e) {
            $mouse.x = e.clientX;
            $mouse.y = e.clientY;
        }

        gsap.ticker.add(updatePosition);

        function updatePosition() {
            if (!$active) {
                $pos.x += ($mouse.x - $pos.x) * $ratio;
                $pos.y += ($mouse.y - $pos.y) * $ratio;

                gsap.set($ball, {
                    x: $pos.x,
                    y: $pos.y
                });
            }
        }

        $(".magnetic-wrap").mousemove(function(e) {
            parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
            callParallax(e, this);
        });

        function callParallax(e, parent) {
            parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
        }

        function parallaxIt(e, parent, target, movement) {
            var boundingRect = parent.getBoundingClientRect();
            var relX = e.clientX - boundingRect.left;
            var relY = e.clientY - boundingRect.top;

            gsap.to(target, {
                duration: 0.3,
                x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
                ease: Power2.easeOut
            });
        }

        function parallaxCursor(e, parent, movement) {
            var rect = parent.getBoundingClientRect();
            var relX = e.clientX - rect.left;
            var relY = e.clientY - rect.top;
            $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
            $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
            gsap.to($ball, {
                duration: 0.3,
                x: $pos.x,
                y: $pos.y
            });
        }

        /* Magnetic item hover */
        if ($(".magnetic-wrap")) {
            $(".magnetic-wrap").on("mouseleave", function(e) {
                gsap.to(this.querySelector(".magnetic-item"), {
                    duration: 0.3,
                    scale: 1,
                    x: 0,
                    y: 0,
                    clearProps: "all"
                });
                $active = false;
            });
        }
        /*  Cursor view on hover (data attribute "data-cursor="...") */

        cursorView();

        // Show as the mouse moves.
        $(document).mousemove(function() {
            gsap.to("#magic-cursor", {
                duration: 0.3,
                autoAlpha: 1
            });
        });
    }
}(jQuery));

function cursorView() {
    if (jQuery('[data-cursor]').length > 0) {
        let ele = jQuery('[data-cursor]'),
            ball = jQuery("#ball");

        ele.addClass("not-hide-cursor");
        var bgColor = jQuery('.not-hide-cursor').data('mousebgcolor');
        ele.on("mouseenter", function() {
            if (ball.has(".ball-drag")) {
                ball.find(".ball-drag").remove();
            }
            ball.html('<div class="ball-view"></div>');
            jQuery(".ball-view").html(jQuery(this).data('cursor'));
            gsap.to(ball, {
                duration: 0.3,
                yPercent: -75,
                width: 3.75 + 'em',
                height: 3.75 + 'em',
                opacity: 1,
                borderWidth: 0,
                backgroundColor: (bgColor) ? bgColor : '#FFF'
            });
            gsap.to(".ball-view", {
                duration: 0.3,
                scale: 1,
                autoAlpha: 1
            });
        }).on("mouseleave", function() {
            gsap.to(ball, {
                duration: 0.3,
                yPercent: -50,
                width: 2.125 + 'em',
                height: 2.125 + 'em',
                opacity: 0.5,
                borderWidth: 2,
                backgroundColor: "transparent"
            });

            ball.find(".ball-view").remove();
        });
    }
    /* Mouse Hover on link */
    jQuery(document).on("mouseenter", 'a', function(e) {
        gsap.to(ball, {
            duration: 0.3,
            scale: 1.5,
            borderWidth: 1,
            opacity: 0.5
        });
    }).on("mouseleave", 'a', function(e) {
        gsap.to(ball, {
            duration: 0.3,
            scale: 1,
            borderWidth: 2,
            opacity: 0.5
        });
    });
}