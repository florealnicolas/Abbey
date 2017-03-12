var vertrokkenTijdstip = null;
var terugTijdstip = null;

$(window).on("blur", vertrokken);
$(window).on("focus", function () {
    terug();
    if (terugTijdstip != null) {
        tijdWeg(terugTijdstip, vertrokkenTijdstip)
    }
});

function vertrokken() {
    var tijdstipVertrokken = new Date();


    console.log("Lost focus on " + tijdstipVertrokken.getHours() + ":" + tijdstipVertrokken.getMinutes());
    vertrokkenTijdstip = tijdstipVertrokken;
}

function terug() {
    var tijdstipTerug = new Date();

    console.log("Focus back on " + tijdstipTerug.getHours() + ":" + tijdstipTerug.getMinutes());
    terugTijdstip = tijdstipTerug;
}

function tijdWeg(terugTijdstip, vertrokkenTijdstip) {

    var minuten = terugTijdstip.getMinutes() - vertrokkenTijdstip.getMinutes();

    console.log("You were gone for " + minuten + " minutes.");
}
