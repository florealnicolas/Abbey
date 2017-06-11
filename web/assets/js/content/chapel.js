function Chapel() {

    this.believe = 0;
    this.chapelMonks = 0;

    this.currentPrayers = 0;
    this.nextEnlightenment = 10;

    this.enlightenmentList = new List();

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

    this.getEnlightenmentList = function () {
        return this.enlightenmentList;
    };

    this.getNextEnlightenment = function () {
        return this.nextEnlightenment;
    };

    this.getEnlightenmentStatus = function () {
        return this.getCurrentPrayers() / this.getNextEnlightenment();
    };

    this.getEnlightenmentStatusLabel = function () {
        return this.getCurrentPrayers() + " / " + this.getNextEnlightenment();
    };

// Setters of Chapel

    this.setAmtOfMonks = function (newAmt) {
        this.chapelMonks = newAmt;
    };

    this.setCurrentPrayers = function (newAmt) {
        this.currentPrayers = newAmt;
    };

    this.setNextEnlightenment = function () {
        this.nextEnlightenment = Math.round(this.getNextEnlightenment() * 5);
    };

    this.setBelieve = function (newAmt) {
        this.believe = newAmt;
    };

// Functions of Chapel

    this.visualize = function () {
        let visual = "<h3>Chapel</h3>";
        visual += "<p>Amount of believe:\t<span id='believe'>" + this.getBelieve() + "</span></p>";
        visual += "<p>Here your monks can pray to reach enlightenment. Every enlightenment is rewarded with believe.<br/>" +
            "The more monks you leave to the chapel, the faster your abbey will gain believe.</p>";
        visual += "<p>Use your believe for some special insights and make your abbey more advanced.</p>";
        visual += "<p>Currently there are <span id='chapelMonks'>" + this.getAmtOfMonks() + "</span> monks praying in the chapel.</p>";

        visual += "<div class='progressbar' id='enlightenmentStatus' value='" + this.getCurrentPrayers() + "'>" +
            "<div class='progress'></div>" + "<div class='progress-label'>" + this.getEnlightenmentStatusLabel() + "</div>" +
            "</div>";

        visual += "<button class='button' id='pray'>Pray</button>";

        visual += "<div id='enlightenmentList'><h4>Scrolls of enlightenment</h4>";

        for (let enlightmentNr = 0; enlightmentNr < this.getEnlightenmentList().getSize(); enlightmentNr++) {
            visual += this.getEnlightenmentList().getItemByNumber(enlightmentNr).visualizeEnlightenment();
        }

        visual += "</div>";

        return visual;
    };

    this.addEnlightenment = function (newEnlightenment) {
        this.enlightenmentList.addAnItem(newEnlightenment);
    };

    this.updateEnlightenmentStatus = function () {
        const enlightenmentStatus = $("#enlightenmentStatus"),
            enlightenmentStatusLabel = $("#enlightenmentStatus .progress-label"),
            prayButton = $("#pray");

        enlightenmentStatus.val(this.getCurrentPrayers());
        enlightenmentStatusLabel.html(this.getEnlightenmentStatusLabel());

        $(".progress").css("width", (this.getEnlightenmentStatus() * 100) + "%");

        if (this.getEnlightenmentStatus() >= 1) {
            prayButton.html("Enlighten");
        }
    };

    this.checkIfTeachable = function () {

        const scrollClass = $(".enlightScroll");
        scrollClass.attr("disabled", true);
        scrollClass.addClass("disabled");

        for (let enlightenmentNr = 0, amtOfEnlight = this.getEnlightenmentList().getSize(); enlightenmentNr < amtOfEnlight; enlightenmentNr++) {

            let selectedScroll = $(scrollClass[enlightenmentNr]);

            if (this.getEnlightenmentList().getItemByNumber(enlightenmentNr).ableToLearn(this)) {
                selectedScroll.attr("disabled", false);
                selectedScroll.removeClass("disabled");
            }
        }
    };

    this.enlightenment = function () {
        this.believe++;
        $('#believe').html(this.getBelieve());
        $("#pray").html("Pray");
        this.setCurrentPrayers(0);
        this.setNextEnlightenment();
        this.updateEnlightenmentStatus();
        this.checkIfTeachable();
    };

    this.manualPraying = function () {
        if (this.getEnlightenmentStatus() >= 1) {
            this.enlightenment();
        }
        else {
            let newAmtOfPrayers = this.getCurrentPrayers() + 1;
            this.setCurrentPrayers(newAmtOfPrayers);
            this.updateEnlightenmentStatus();
        }

        console.log("Current prayers", this.getCurrentPrayers());
        console.log("Next enlightment", this.getNextEnlightenment());
        console.log("Amount of believe", this.getBelieve());
    };

    this.automaticPraying = function () {
        const chapel = this;
        console.log("MONKS", this.getAmtOfMonks());
        if (this.getAmtOfMonks() > 0) {
            if (this.getCurrentPrayers() <= this.getNextEnlightenment() - 1) {
                var timer = window.setTimeout(function () {
                    let newAmtOfPrayers = chapel.getCurrentPrayers() + 1;
                    chapel.setCurrentPrayers(newAmtOfPrayers);
                    chapel.updateEnlightenmentStatus();

                    console.log("Current prayers", chapel.getCurrentPrayers());
                    console.log("Next enlightment", chapel.getNextEnlightenment());
                    console.log("Amount of believe", chapel.getBelieve());
                }, 1000);
            }
            else {
                window.clearInterval(timer);
            }
        }
    }

}