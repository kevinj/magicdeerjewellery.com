function fadeToSection (section) {
    if (jQuery('.section:visible').size()) {
        jQuery('.section:visible').fadeOut(function () {
            jQuery('div.'+section).fadeIn();
        });
    }
    else {
        jQuery('div.'+section).fadeIn();
    }
}
function showSection (section, nofade) {
    var shown = false;
    $('img.rollover').each(function () {
        if ($(this).attr('section') == section) {
            $(this).click();
            shown = true;
        }
    });
    if (!shown) {
        fadeToSection(section);
    }
}

function setPage (page) {
    jQuery('img.rollover').each(function (){
        var $this = $(this);
        var name = $this.attr('name')
                        .replace(/^gallery\d/, 'gallery' + page)
        $this.attr('name', name);
        $this.mouseout();
    });
}
$(function () {
    $('img.rollover')
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
            $('img.rollover').attr('selected', '').mouseout();
            $(this).attr('selected', true).mouseover();
            var section = $(this).attr('section');
            if (section) {
                fadeToSection('.' + section);
            }
        });
});
