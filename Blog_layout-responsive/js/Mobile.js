function Mobile(maxWidth) {
    'use strict';
    this.minWidth = 250;
    Display.call(this, maxWidth);
}

Mobile.prototype = Object.create(Display.prototype);



Mobile.prototype.fixedNavigationBar =  function() {
    'use strict';
    var navPanel = document.getElementById('nav'), hashtag = document.getElementById('mobile__hashtag');
    var navMenuOnScroll = document.getElementsByClassName('header__navigation__menu');
    var questionText0nScroll = document.getElementsByClassName('sidebar-hint__description')[1];
    var exclamationTextOnScroll = document.getElementsByClassName('sidebar-hint__description')[0];
    var logoOnScroll = document.getElementsByClassName('header__logo--on-scroll');
    var navSourceBottom = navPanel.getBoundingClientRect().bottom + window.pageYOffset;


    if (this.getWidth() <= this.maxWidth && this.getWidth() > this.minWidth) {
        this.radioAtomicity();
        window.onscroll = function() {
             if (navPanel.style.position = 'fixed' && window.pageYOffset < navSourceBottom) {
                 navPanel.style.cssText = '';

                 logoOnScroll[0].style.cssText = '';

                 hashtag.classList.remove('sidebar__hot-hashtags--mobile-on-scroll');
                 hashtag.classList.add('sidebar__hot-hashtags--mobile');

                 navMenuOnScroll[1].classList.remove('header__navigation__menu--mobile-on-scroll');
                 navMenuOnScroll[1].classList.add('header__navigation__menu--mobile');

                 questionText0nScroll.classList.remove('sidebar-hint__description--mobile-quest-onscroll');
                 questionText0nScroll.classList.add('sidebar-hint__description--mobile-quest');

                 exclamationTextOnScroll.classList.remove('sidebar-hint__description--mobile-exclam-onscroll');
                 exclamationTextOnScroll.classList.add('sidebar-hint__description--mobile-exclam');

             } else if (window.pageYOffset > navSourceBottom) {
                 navPanel.style.cssText = 'position: fixed; z-index: 2; width: 100%; top: 0;';
                 navPanel.style.animation = 'navSlide 0.3s 1 linear';

                 hashtag.classList.remove('sidebar__hot-hashtags--mobile');
                 hashtag.classList.add('sidebar__hot-hashtags--mobile-on-scroll');

                 logoOnScroll[0].style.display = 'block';

                 navMenuOnScroll[1].classList.remove('header__navigation__menu--mobile');
                 navMenuOnScroll[1].classList.add('header__navigation__menu--mobile-on-scroll');

                 questionText0nScroll.classList.remove('sidebar-hint__description--mobile-quest');
                 questionText0nScroll.classList.add('sidebar-hint__description--mobile-quest-onscroll');

                 exclamationTextOnScroll.classList.remove('sidebar-hint__description--mobile-exclam');
                 exclamationTextOnScroll.classList.add('sidebar-hint__description--mobile-exclam-onscroll');
             }
        };

    }else {
        console.log('!');
    }
};