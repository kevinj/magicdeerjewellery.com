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
            var name = $(this).attr('name');
            if (this.src.match(/_hover/)) return;
            this.src = this.src.replace(RegExp(name), name + '_hover');
        })
        .mouseout(function (){
            if ($(this).attr('selected')) return;
            if (!this.src.match(/_hover/)) return;
            var name = $(this).attr('name');
            this.src = this.src.replace(RegExp(name + '_hover'), name);
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
