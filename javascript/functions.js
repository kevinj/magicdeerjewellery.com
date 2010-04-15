var SHOWING = 0;
function fadeToSection (section) {
    if (SHOWING++) return;
    if (jQuery('.section:visible').size()) {
        jQuery('.section:visible').fadeOut(function () {
            jQuery('div.'+section)
                .fadeIn(function () { SHOWING = 0 });
        });
    }
    else {
        jQuery('div.'+section).fadeIn(function () { SHOWING = 0 });
    }
}

function showSection (section, nofade) {
    var shown = false;
    $('.rollover').each(function () {
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
    $('.rollover')
        .mouseover(function() {
            if ($('.hover', this).size()) {
                $('.image', this).hide();
                $('.hover', this).show();
            }
        })
        .mouseout(function() {
            if ($(this).hasClass('selected')) return;
            if ($('.hover', this).is(':visible')) {
                $('.hover', this).hide();
                $('.image', this).show();
            }
        })
        .click(function() {
            if (!$(this).attr('section')) return;
            fadeToSection('.' + $(this).attr('section'))
            $('.rollover.selected')
                .removeClass('selected')
                .mouseout();
            $(this).addClass('selected')
                .mouseover();
            return false;
        });

        /* Hack around IE which doesn't support li:hover.
         * add a class "hover" on mouse over and remove it
         * on mouse out so that we can use the same css
         * classes to control the visibilty of submenus
         */
        if (document.all && document.getElementById) {
            jQuery('li')
                .mouseover(function() {
                    this.over = true;
                    $(this).addClass('hover');
                })
                .mouseout(function() {
                    this.over = false;
                    var self = this;
                    setTimeout(function() {
                        if (!self.over) {
                            $(self).removeClass('hover');
                        }
                    },300);
                });
        }

});
