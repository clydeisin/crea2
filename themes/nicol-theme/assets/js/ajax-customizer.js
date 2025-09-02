(function($) {

    "use strict";
    const iq_window = $(window);
    const body = $("body");
    const check_ajax = $(body).hasClass("css_prefix-ajax");
    SidebarAjax();
    const ajax_click = $("a.ajax-effect-link:not([target*='_blank']),ul.page-numbers li .page-numbers");
    const ajax_search_click = $(".wp-block-search");
    const ajax_error_click = $(".errorsearchform");
    PageLoad();

    iq_window.on("load", function() {
        $(body).removeClass('pageload-is-changing');
        ReloadAjax();
        PageLoader();
        if ($("a.fancyboxitem").length > 0) {
            $("a.fancyboxitem").fancybox();
        }
    });

    if (check_ajax == true) {
        if ($(ajax_click).length > 0) {
            Page_AjaxLoad();
        }

        /*** Search form ***/
        if ($(ajax_search_click).length > 0) {
            ajax_search_click.each(function() {
                $(this).attr('action');
            }).submit(function(e) {
                var _that = $(this).attr("action");
                var url = _that + "?s=" + $(".wp-block-search__input").val();
                if (url.indexOf("#") >= 0 || url === undefined) {
                    return;
                }
                e.preventDefault();
                AjaxLoad(url);
            });
        }

        if ($(ajax_error_click).length > 0) {
            ajax_error_click.each(function() {
                $(this).attr('action');
            }).submit(function(e) {
                var _that = $(this).attr("action");
                var url = _that + "?s=" + $(".error-search__input").val();
                if (url.indexOf("#") >= 0 || url === undefined) {
                    return;
                }
                e.preventDefault();
                AjaxLoad(url);
            });
        }
    }

    function PageLoad() {
        $('.transition-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            $('.transition-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
    }


    /*** SIdebar ***/
    function SidebarAjax() {
        if (check_ajax == true) {
            if ($(".blog_widget").hasClass("show-ajax")) {
                $('.blog_widget').not('.iq_socail_media').find('a').addClass('ajax-effect-link');
                $('.blog_widget .css_prefix-author-social').find('a').removeClass('ajax-effect-link');
            }
        }
    }

})(jQuery);


/*** Execute Data After Ajax Call ***/
function ReloadAjax(iq_window = jQuery(window)) {
    BackTotop(iq_window);
    NavigationMenu();
}

/*-- Page Loader --*/
function PageLoader() {
    jQuery("#load").fadeOut();
    jQuery("#loading").delay(0).fadeOut("slow");
}

/*-- back-to-top --*/
function BackTotop(iq_window) {
    jQuery('#back-to-top').fadeOut();
    iq_window.on("scroll", function() {
        if (jQuery(this).scrollTop() > 250) {
            jQuery('#back-to-top').fadeIn(1400);
        } else {
            jQuery('#back-to-top').fadeOut(400);
        }
    });

    jQuery('#back-to-top').on('click', function() {
        jQuery('#back-to-top').tooltip('hide');
        jQuery('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

}

/*** Vertical Menu ***/
function NavigationMenu() {
    if (jQuery('.menu-style-one.css_prefix-mobile-menu').length > 0) {
        getDefaultMenu();
    }
}

function getDefaultMenu() {
    jQuery('.menu-style-one nav.mobile-menu .sub-menu').css('display', 'none ');
    jQuery('.menu-style-one nav.mobile-menu .top-menu li .dropdown').hide();
    jQuery('.menu-style-one nav.mobile-menu .sub-menu').prev().prev().addClass('submenu');
    jQuery('.menu-style-one nav.mobile-menu .sub-menu').before('<span class="toggledrop"><i class="fas fa-chevron-right"></i></span>');

    jQuery('nav.mobile-menu .widget i,nav.mobile-menu .top-menu i').on('click', function() {
        jQuery(this).next('.children, .sub-menu').slideToggle();
    });
    jQuery('.menu-style-one nav.mobile-menu .top-menu .menu-item .toggledrop').off('click');
    jQuery('.menu-style-one nav.mobile-menu .menu-item .toggledrop').on('click', function() {
        if (jQuery(this).closest(".menu-is--open").length == 0) {
            jQuery('.menu-style-one nav.mobile-menu .menu-item').removeClass('menu-is--open');
        }
        if (jQuery(this).parent().find("ul").length > 1) {
            jQuery(this).parent().addClass('menu-is--open');
        }
        jQuery('.menu-style-one nav.mobile-menu .menu-item:not(.menu-is--open) .children,.menu-style-one nav.mobile-menu .menu-item:not(.menu-is--open) .sub-menu').slideUp();
        if (!jQuery(this).next('.children, .sub-menu').is(':visible') || jQuery(this).parent().hasClass("menu-is--open")) {
            jQuery(this).next('.children, .sub-menu').slideToggle();
        }
        jQuery('.menu-style-one nav.mobile-menu .menu-item:not(.menu-is--open) .toggledrop').not(jQuery(this)).removeClass('active');

        jQuery(this).toggleClass('active');

        jQuery('.menu-style-one nav.mobile-menu .menu-item').removeClass('menu-clicked');
        jQuery(this).parent().addClass('menu-clicked');

        jQuery('.menu-style-one nav.mobile-menu .menu-item').removeClass('current-menu-ancestor');
    });
}


function Page_AjaxLoad() {
    const ajax_click = jQuery("a.ajax-effect-link:not([target*='_blank']),ul.page-numbers li .page-numbers");
    ajax_click.each(function() {
        jQuery(this).attr('href');
    }).click(function(e) {
        var url = jQuery(this).attr('href');
        if (url.indexOf("#") >= 0 || url === undefined) {
            return;
        }
        e.preventDefault();
        AjaxLoad(url);
    });
}


function AjaxLoad(url) {
    var isAnimating = false;
    isAnimating = true;
    window.ajax_flag = true;
    jQuery('body').addClass('page-is-changing');
    jQuery('.transition-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        loadNewContent(url);
        jQuery('.transition-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    return false;
}

function loadNewContent(url) {
    jQuery('body').load(url, function(responseText) {

        var isAnimating = false;
        var html_cls = responseText.match(/<html[^>]*class="(.+)">/);
        var cls = responseText.match(/<body[^>]*class="(.+)">/);
        getBodyClass(cls);
        jQuery('html').attr("class", html_cls[1]);
        jQuery('body').removeClass('pageload-is-changing');

        var objStyle = ["style[type]"];
        objStyle.forEach(function($value) {
            jQuery(responseText).filter($value).each(function() {
                let $this = jQuery(this);
                if (jQuery($value).length) {
                    jQuery($value).remove();
                }
                setTimeout(function() {
                    jQuery("head").append($this);
                }, 20);
            });
        });
        if (jQuery("a.fancyboxitem").length > 0) {
            jQuery("a.fancyboxitem").fancybox();
        }
        ReloadAjax();
        ajaxTitle(url);
        history.pushState(null, null, url);
        effectBackForward();
        if (typeof window.elementorFrontend !== "undefined") {
            elementorFrontend.init();
        }
        jQuery('body').html();
        var s = responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1];
        jQuery("head title").html(s), jQuery("html, body").scrollTop(0);
        var delay = (transitionsSupported()) ? 30 : 0;
        setTimeout(function() {
            jQuery('body').removeClass('page-is-changing');
            jQuery('.transition-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                isAnimating = false;
                jQuery('.transition-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });
            if (!transitionsSupported()) isAnimating = false;
        }, delay);
    });
}

function transitionsSupported() {
    return jQuery('html').hasClass('csstransitions');
}
/**
 *  event will be triggered by doing browser action such as
 *  a click on the back or forward button
 */
function effectBackForward() {
    jQuery(window).on("popstate", function(e) {
        var response = document.location;
        var url = jQuery(response).attr("href");
        AjaxLoad(url);
    });
}
/*** Html Class ***/

/*** Body Class ***/
function getBodyClass(cls) {
    if (cls)
        jQuery('body').attr("class", cls[1]);
    cls = null;
}

/*** Browser Title ***/
function ajaxTitle(url) {
    jQuery("title").load(url + " title", "", function(data) {
        document.title = jQuery(this).text();
    });
    var admin_bar = jQuery("#wpadminbar");
    if (admin_bar.length > 0) {
        admin_bar.load(url + " #wpadminbar", "", function(data) {
            admin_bar.html(jQuery(this).html());
        });
    }
}