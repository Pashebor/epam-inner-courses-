(function () {
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
}());