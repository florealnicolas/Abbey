function Chapel() {

    this.believe = 0;
    this.chapelMonks = 0;

    this.currentPrayers = 0;
    this.nextEnlightment = 10;


// Getters of Chapel

    this.getBelieve = function () {
        return this.believe;
    };

    this.getAmtOfMonks = function () {
        return this.chapelMonks;
    };

    this.getCurrentPrayers = function () {
        return this.currentPrayers;
    };

    this.getNextEnlightment = function () {
        return this.nextEnlightment;
    };

    this.getEnlightmentStatus = function () {
        return this.getCurrentPrayers() / this.getNextEnlightment();
    };

    this.getEnlightmentStatusLabel = function () {
        return this.getCurrentPrayers() + " / " +this.getNextEnlightment();
    };

// Setters of Chapel

    this.setAmtOfMonks = function (newAmt) {
        this.chapelMonks = newAmt;
    };

    this.setCurrentPrayers = function (newAmt) {
        this.currentPrayers = newAmt;
    };

    this.setNextEnlightment = function () {
        this.nextEnlightment = Math.round(this.getNextEnlightment() * 5);
    };

// Functions of Chapel

    this.visualize = function () {
        let visual = "<h3>Chapel</h3>";
        visual += "<p>Amount of believe:\t<span id='believe'>" + this.getBelieve() + "</span></p>";
        visual += "<p>Here your monks can pray to reach enlightment. Every enlightenment is rewarded with believe.<br/>" +
            "The more monks you leave to the chapel, the faster your abbey will gain believe.</p>";
        visual += "<p>Use your believe for some special researches and make your abbey more advanced.</p>";
        visual += "<p>Currently there are <span id='chapelMonks'>" + this.getAmtOfMonks() + "</span> monks doing some research in the chapel.</p>";

        visual += "<div class='progressbar' id='enlightmentStatus' value='" + this.getCurrentPrayers() + "'><div class='progress-label'>" + this.getEnlightmentStatusLabel() + "</div></div>";
        visual += "<button class='button' id='pray'>Pray</button>";

        return visual;
    };

    this.updateEnlightmentStatus = function () {
        const enlightmentStatus = $("#enlightmentStatus"),
            enlightmentStatusLabel = $("#enlightmentStatus .progress-label"),
        prayButton = $("#pray");

        enlightmentStatus.val(this.getCurrentPrayers());
        enlightmentStatusLabel.html(this.getEnlightmentStatusLabel());

        if (this.getEnlightmentStatus() >= 1) {
            prayButton.html("Enlighten");
        }
    };

    this.enlightment = function () {
        this.believe++;
        $('#believe').html(this.getBelieve());
        $("#pray").html("Pray");
        this.setCurrentPrayers(0);
        this.setNextEnlightment();
        this.updateEnlightmentStatus();
    }
}