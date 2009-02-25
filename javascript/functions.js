var SHOWING = 0;
function fadeToSection (section) {
    if (SHOWING++) return;
    if (jQuery('.section:visible').size()) {
        jQuery('.section:visible').fadeOut(function () {
            jQuery('div.'+section).fadeIn(function () { SHOWING = 0 });
        });
    }
    else {
        jQuery('div.'+section).fadeIn(function () { SHOWING = 0 });
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
            var section = $(this).attr('section');
            if (section) {
                if (!SHOWING) {
                    $('.main img.rollover').attr('selected', '').mouseout();
                    $(this).attr('selected', true).mouseover();
                }
                fadeToSection('.' + section);
            }
            return $(this).attr('href') == '#' ? false : true;
        });
});
