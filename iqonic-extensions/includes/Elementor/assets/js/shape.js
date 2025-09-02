(function($) {
    "use strict";
    $(document).ready(function() {
        /* For shape shortcode */
        if ($('.css_prefix-shape').length > 0) {
            $('.css_prefix-shape').each(function() {
                var scene = $(this).find('.parallax-shape');
                var style = $(this).find('.box-parent').data('style');
                if (style == 'style-one') {
                    parellexEffect(scene[0]);
                }
            });
        }
        /* For title box */
        if ($('.css_prefix-title-box').length > 0) {
            $('.css_prefix-title-box').each(function() {
                var scene = $('.css_prefix-title-box').find('.box-parent');
                var parellex = $(this).find('.box-parent').data('parellex');
                if (parellex == 'yes') {
                    parellexEffect(scene[0]);
                }
            });
        }
        /* For Button  */
        if ($('.css_prefix-button-container').length > 0) {
            $('.css_prefix-button-container').each(function() {
                var scene = $(this).find('.box-parent');
                var parellex = $(this).find('.box-parent').data('parellex');
                if (parellex == 'yes') {
                    parellexEffect(scene[0]);
                }
            });
        }

    });
})(jQuery);

function parellexEffect(scene) {
    var parallaxInstance = new Parallax(scene, {
        relativeInput: true,
        clipRelativeInput: true
    });
}