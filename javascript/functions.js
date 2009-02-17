function fadeToSection (sel) {
    if (jQuery('.section:visible').size()) {
        jQuery('.section:visible').fadeOut(function () {
            jQuery('div'+sel).fadeIn();
        });
    }
    else {
        jQuery('div'+sel).fadeIn();
    }
}
function showSection (sel, nofade) {
    if ($('img'+sel).size()) {
        $('img'+sel).click();
    }
    else {
        fadeToSection(sel);
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
$(function () {
    $('.rollover img')
        .mouseover(function (){
            var type = this.src.replace(/.*\./, '');
            var name = $(this).attr('name') + '_hover';
            this.src = 'images/' + name + '.' + type;
        })
        .mouseout(function (){
            var type = this.src.replace(/.*\./, '');
            var name = $(this).attr('name');
            if ($(this).attr('selected')) name += '_hover';
            this.src = 'images/' + name + '.' + type;
        })
        .click(function (){
            $('.rollover img').attr('selected', '').mouseout();
            $(this).attr('selected', true).mouseover();
            if ($(this).attr('showSection')) {
                fadeToSection('.' + this.className);
            }
        });
});
