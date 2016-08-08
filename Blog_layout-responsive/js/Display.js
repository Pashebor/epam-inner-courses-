function Display(maxWidth) {
    'use strict';
    this.maxWidth = maxWidth;
}

Display.prototype.getWidth = function () {
    'use strict';
    var width = window.innerWidth;
    return width;
};

Display.prototype.radioAtomicity = function () {
    var allRadios = document.getElementsByName('btn_nav');
    var cleanRadio;
    var i = 0;
    for(i ; i < allRadios.length; i += 1) {

        allRadios[i].onclick = function() {

            if(cleanRadio == this) {
                this.checked = false;
                cleanRadio = null;
            }else {
                cleanRadio = this;
            }
        };
    }
};
