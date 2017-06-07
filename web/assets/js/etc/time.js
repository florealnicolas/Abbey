let vertrokkenTijdstip = null;
let terugTijdstip = null;

$(window).on("blur", vertrokken);
$(window).on("focus", function () {
    terug();
    if (terugTijdstip != null) {
        tijdWeg(terugTijdstip, vertrokkenTijdstip)
    }
});

function vertrokken() {
    const tijdstipVertrokken = new Date();


    console.log("Lost focus on " + tijdstipVertrokken.getHours() + ":" + tijdstipVertrokken.getMinutes());
    vertrokkenTijdstip = tijdstipVertrokken;
}

function terug() {
    const tijdstipTerug = new Date();

    console.log("Focus back on " + tijdstipTerug.getHours() + ":" + tijdstipTerug.getMinutes());
    terugTijdstip = tijdstipTerug;
}

function tijdWeg(terugTijdstip, vertrokkenTijdstip) {

    const minuten = terugTijdstip.getMinutes() - vertrokkenTijdstip.getMinutes();

    console.log("You were gone for " + minuten + " minutes.");
}
