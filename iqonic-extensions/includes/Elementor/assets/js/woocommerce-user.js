/*----------------
Video Popup
---------------------*/
(function($) {
    "use strict";
    $(document).ready(function() {
        callUserList();
    });
})(jQuery);

function callUserList() {

    if (jQuery(document).find('#btn-user-list').length > 0) {

        jQuery(document).find('#btn-user-list').each(function() {

            jQuery(document).on('click', '#btn-user-list', function() {
                jQuery('.css_prefix-usermenu-dropdown li.header-user-rights , .css_prefix-usermenu-dropdown .header-user-rights').toggleClass('css_prefix-show');
                jQuery('header .css_prefix-sub-dropdown.css_prefix-user-dropdown').toggleClass('active');

                jQuery('.css_prefix-usermenu-dropdown li.header-search-right , .css_prefix-usermenu-dropdown .header-search-right, .search_form_wrap').removeClass('css_prefix-show');
                jQuery('header .search-box, .search-box').removeClass('active');
            });
        });

    }
}