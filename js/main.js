$(document).ready(function() {
    /* Translations */

    var userLang = navigator.language || navigator.userLanguage;
    if (userLang == 'pl-PL') {
        userLang = 'pl';
    }
    var langSelector = $("#lang-selector");
    var changeLang = function (lang) {
        if (lang === 'pl') {
            $("[data-lang='fr']").hide();
            $("[data-lang='pl']").css('display', 'block');
        }
        else {
            $("[data-lang='pl']").hide();
            $("[data-lang='fr']").css('display', 'block');
        }

        createCookie('lang', lang, 30);
        langSelector.find('a').removeClass('active');
        langSelector.find('a.' + lang).addClass('active');
    };

    if(readCookie('lang') !== null) {
        userLang = readCookie('lang');
    }
    changeLang(userLang);

    langSelector.find('a').click( function(e) {
        e.preventDefault();

        var lang = $(this).data('language');
        changeLang(lang);
    });

    /* Resize couple image if needed */
    var coupleImage = $('#couple');
    var coupleImageWidth = Math.min($(window).width(), coupleImage.width());
    coupleImage.width(coupleImageWidth);


    /* Center first page */
    var firstPage = $('#first-page');
    var firstPageMargin = Math.max(($(window).height() - firstPage.height() - 50) / 2, 0);
    firstPage.css('margin-top', firstPageMargin);
    firstPage.css('margin-bottom', firstPageMargin);
});

/**
 * Cookies management
 */

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}