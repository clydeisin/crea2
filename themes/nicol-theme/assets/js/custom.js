/**
 * File custom.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function($) {
    "use strict";
    /*---------------------------------------------------------------------
    	 Scroll
      -----------------------------------------------------------------------*/
    var position = $(window).scrollTop();
    $(window).scroll(function() {

        if ($('.has-sticky').length > 0) {
            var scroll = $(window).scrollTop();
            if (scroll < position) {
                $('.has-sticky').addClass('header-up');
                $('body').addClass('header--is-sticky');
                $('.has-sticky').removeClass('header-down');

            } else {
                $('.has-sticky').addClass('header-down');
                $('.has-sticky').removeClass('header-up ');
                $('body').removeClass('header--is-sticky');
            }
            if (scroll == 0) {
                $('.has-sticky').removeClass('header-up');
                $('.has-sticky').removeClass('header-down');
                $('body').removeClass('header--is-sticky');
            }
            position = scroll;
        }

        /*  back to top bg fill js */
        var scrollPercentage = $(window).scrollTop() / ($(document).height() - $(window).height());
        $('.text-top').css("--progress", scrollPercentage);
    });

    $(window).on('load', function(e) {

        /*------------------------
        Add to cart with plus minus
        --------------------------*/
        jQuery(document).on('click', 'button.plus, button.minus', function() {

            $('button[name="update_cart"]').removeAttr('disabled');

            var qty = $(this).closest('.quantity').find('.qty');


            if (qty.val() == '') {
                qty.val(0);
            }
            var val = parseFloat(qty.val());

            var max = parseFloat(qty.attr('max'));
            var min = parseFloat(qty.attr('min'));
            var step = parseFloat(qty.attr('step'));

            // Change the value if plus or minus
            if ($(this).is('.plus')) {
                if (max && (max <= val)) {
                    qty.val(max);
                } else {
                    qty.val(val + step);
                }
            } else {
                if (min && (min >= val)) {

                    qty.val(min);
                } else if (val >= 1) {

                    qty.val(val - step);
                }
            }
        });

        /*-- Wow Animation --*/
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();

        /*================
        masonry
        =====================*/
        if (jQuery('.iqonic-masonry-grid').length > 0) {
            jQuery('.iqonic-masonry-grid').each(function() {
                let $this = jQuery(this);
                let horizontal = $this.data("horizontal-order");
                // let horizontal = jQuery(this).data("gutter");
                jQuery(".iqonic-masonry-block").imagesLoaded(function() {
                    $this.masonry({
                        columnWidth: ".grid-sizer",
                        itemSelector: ".iqonic-masonry-item",
                        horizontalOrder: horizontal,
                        // gutter: 10
                    });
                });
            });
        }

        /*------------------------
         main menu toggle
        --------------------------*/
        $(document).on("click", '.custom-toggler', function() {
            if ($('.css_prefix-mobile-menu ').hasClass('menu-open')) {
                $('.css_prefix-mobile-menu ').toggleClass('open-delay');
                setTimeout(function() {
                    $('.css_prefix-mobile-menu ').toggleClass('menu-open');
                    $('.css_prefix-mobile-menu ').toggleClass('open-delay');
                }, 1000);
            } else {
                $('.css_prefix-mobile-menu ').toggleClass('menu-open');
            }
            $('.opn-menu').toggleClass('css_prefix-open');
        });

        $(document).on("click", '.ham-toggle', function() {
            $('.ham-toggle .menu-btn').toggleClass('is-active');
        });
        $(document).on("click", '.mob-toggle', function() {
            $('body').toggleClass('overflow-hidden');
        });


    });

    $(document).ready(function() {

        /*------------------------
        Handle porfolio image clicks.
        --------------------------*/
        $('.iq-fancybox-image').on('click', function() {
            const maxAttempts = 10;
            let attempts = 0;
            const checkInterval = 100;

            (function checkAndRemoveDialogs() {
                const $dialogElements = $('.dialog-widget.dialog-lightbox-widget.dialog-type-buttons.dialog-type-lightbox.elementor-lightbox');

                if ($dialogElements.length === 2) {
                    $dialogElements.eq(1).remove();
                    console.log(`Second dialog removed after ${attempts + 1} attempts.`);
                } else if (attempts++ < maxAttempts) { // Increment attempts here
                    console.log(`Attempt ${attempts}: Found ${$dialogElements.length} dialogs. Retrying...`);
                    setTimeout(checkAndRemoveDialogs, checkInterval);
                } else {
                    console.log('Max attempts reached. Dialogs not found with length 2.');
                }
            })();
        });

        /*------------------------
        		superfish menu
        --------------------------*/
        $('ul.sf-menu').superfish({
            delay: 500,
            onBeforeShow: function(ul) {
                var elem = $(this);
                var elem_offset = 0,
                    elem_width = 0,
                    ul_width = 0;
                // Add class if menu at the edge of the window
                if (elem.length == 1) {
                    var page_width = $('#page.site').width(),
                        elem_offset = elem.parents('li').eq(0).offset().left,
                        elem_width = elem.parents('li').eq(0).outerWidth(),
                        ul_width = elem.outerWidth();

                    if (elem.hasClass('iqonic-megamenu-container')) {
                        if (elem.hasClass('iqonic-full-width')) {
                            $('.iqonic-megamenu-container.iqonic-full-width').css({
                                'left': -elem_offset,
                            });
                        }
                        if (elem.hasClass('iqonic-container-width')) {
                            let containerOffset = (elem.closest('.elementor-container').length > 0) ? elem.closest('.elementor-container').offset() : elem.parents('li').eq(0).closest('header .container-fluid nav,header .container nav').offset();
                            $('.iqonic-megamenu-container.iqonic-container-width').css({
                                'left': -(elem_offset - containerOffset.left)
                            });
                        }
                    }
                    if (elem_offset + elem_width + ul_width > page_width - 20 && elem_offset - ul_width > 0) {
                        elem.addClass('open-submenu-main');
                        elem.css({
                            'left': 'auto',
                            'right': '0'
                        });
                    } else {
                        elem.removeClass('open-submenu-main');
                        elem.css({});
                    }
                }
                if (elem.parents("ul").length > 1) {
                    var page_width = $('#page.site').width();
                    elem_offset = elem.parents("ul").eq(0).offset().left;
                    elem_width = elem.parents("ul").eq(0).outerWidth();
                    ul_width = elem.outerWidth();

                    if (elem_offset + elem_width + ul_width > page_width - 20 && elem_offset - ul_width > 0) {
                        elem.addClass('open-submenu-left');
                        elem.css({
                            'left': 'auto',
                            'right': '100%'
                        });
                    } else {
                        elem.removeClass('open-submenu-left');
                    }
                }
            },
        });

        /*-----------------------------------------------------------------------
         --------------------------   Search Bar --------------------------------
        ------------------------------------------------------------------------*/

        if ($(".btn-search").length > 0) {
            $(".btn-search").click(function() {
                $(this).parent().find('.css_prefix-search').toggleClass('search--open');
            });
            $(".btn-search-close").click(function() {
                $(this).closest('.css_prefix-search').toggleClass('search--open');
            });
        }

        $(".navbar-toggler").click(function() {
            if ($(window).width() < 1200) {
                $('body').toggleClass('overflow-hidden');
            }
        });
        $(window).on('resize', function() {
            if ($(window).width() > 1200) {
                if ($('body').hasClass('overflow-hidden')) {
                    $('body').removeClass('overflow-hidden');
                }
            } else {
                if ($('.navbar-toggler').hasClass('moblie-menu-active')) {
                    $('body').addClass('overflow-hidden');
                }
            }
        });

        /*---------------------------
        		Select
        ---------------------------*/
        if ($('select').length > 0) {

            $('select').each(function() {
                let select_config = {
                    width: '100%',
                    dropdownParent: $(this).parent()
                }
                if ($(this).parent().closest(".checkout").length > 0) {
                    select_config = {
                        width: '100%',
                    }
                }
                $(this).select2(select_config);
            });

            $('.select2-container').addClass('wide');

        }
        // shop sidebar toggle button
        if ($('.shop-filter-sidebar').length > 0) {
            $(document).on('click', '.shop-filter-sidebar', function() {
                $('body').find('.css_prefix-woo-sidebar').toggleClass('woo-sidebar-open');
            });
        }
        $('img').removeAttr('title');

        function headerHeight() {
            const header = jQuery('.header-default');

            if (header) {
                let headerHeight = header.height();

                jQuery('html').css('--header-height', (headerHeight / 16) + 'em');
            }
        }

        headerHeight();

        jQuery(window).resize(function() {
            console.log("widnow resize");

            headerHeight();
        })

    });


    /*=====================
    portfolio-masonry
    ============================*/
    jQuery(window).ready(function() {
        /*------------------------
        Masonry
        --------------------------*/
        if (jQuery('.iqonic-masonry-grid').length > 0) {
            jQuery('.iqonic-masonry-grid').each(function() {
                apply_masonry(jQuery(".iqonic-masonry-block"), jQuery(this));
            });
        }
    });

}(jQuery));

function js_prefixAjaxDoneHandler(e) {
    if (jQuery('select.orderby').length > 0) {
        jQuery('select.orderby').select2({
            width: '100%',
            dropdownParent: jQuery('select.orderby').parent()
        });
    }
}

function update_product_count(result_count_element = jQuery('.woocommerce-result-count'), per_paged = jQuery('.woocommerce-result-count').data('product-per-page')) {
    let text = result_count_element.text();
    let content_text_arr = text.trim().split(' ');
    let count_arr = content_text_arr[1].split('–');

    count_arr[1] = Number(count_arr[1]) + Number(per_paged);
    if (count_arr[1] > content_text_arr[3]) {
        count_arr[1] = content_text_arr[3];
    }
    content_text_arr[1] = count_arr.join('–')
    result_count_element.html(content_text_arr.join(' '));
}

function apply_masonry(parent, selector) {
    let horizontal = selector.data("horizontalorder");
    parent.imagesLoaded(function() {
        selector.masonry({
            columnWidth: ".grid-sizer",
            itemSelector: ".iqonic-masonry-item",
            horizontalOrder: horizontal,
            // gutter: gutterSpace
        });
    });
}

jQuery(document).ready(function() {
    jQuery('.icheckbox_square-blue').removeClass('icheckbox_square-blue');
});