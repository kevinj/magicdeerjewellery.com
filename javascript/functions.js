function showSection (selector) {
    if (jQuery('.section:visible').size()) {
        jQuery('.section:visible').fadeOut(function () {
            jQuery(selector).fadeIn();
        });
    }
    else {
        jQuery(selector).fadeIn();
    }
}
function setPage (page) {
    jQuery('.rollover img').each(function (){
        var $this = $(this);
        var name = $this.attr('name')
                        .replace(/^gallery\d/, 'gallery' + page)
        $this.attr('name', name);
        $this.mouseout();
    });
}
