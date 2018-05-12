function Abbey() {

    this.totalAmtOfMonks = 20;
    this.amtOfOccupiedMonks = 0;
    this.amtOfAvailableMonks = this.totalAmtOfMonks;

    this.amtOfMonks = {
        BreweryMonks: 0,
        ChapelMonks: 0,
        InsideMonks: 0,
        FieldMonks: 0,
        OutsideMonks: 0
    };

    this.monkAddresses = {
        BreweryMonks: $("#BreweryMonks"),
        OutsideMonks: $("#OutsideMonks"),
        InsideMonks: $("#InsideMonks"),
        FieldMonks: $("#FieldsMonks"),
        ChapelMonks: $("#ChapelMonks")
    };


// Getters of Abbey

    this.getMonks = function () {
        return this.amtOfMonks;
    };

    this.getTotalAmtOfMonks = function () {
        return this.totalAmtOfMonks;
    };

    this.getAmtOfOccupiedMonks = function () {
        return this.amtOfOccupiedMonks;
    };

    this.getAmtOfAvailableMonks = function () {
        return this.amtOfAvailableMonks;
    };

// Setters of Abbey

    this.setTotalAmtOfMonks = function (newAmt) {
        this.totalAmtOfMonks = newAmt;
    };

    this.setAmtOfAvailableMonks = function (newAmt) {
        this.amtOfAvailableMonks = newAmt;
    };

    this.setMonkAmt = function (typeOfMonks, newMonkAmt) {
        this.amtOfMonks[typeOfMonks] = newMonkAmt;
    };

    this.setMaxAmtOfMonks = function (newValue) {
        $("#abbey input").attr("max", newValue);
    };

// Functions of Abbey

    this.updateAmtOfAvailableMonks = function () {

        this.setAmtOfAvailableMonks(0);

        this.setAmtOfAvailableMonks(this.getTotalAmtOfMonks() - this.amtOfOccupiedMonks);
    };

    this.updateAmtOfOccupiedMonks = function () {
        this.amtOfOccupiedMonks = eval(this.amtOfMonks.BreweryMonks) + eval(this.amtOfMonks.ChapelMonks) + eval(this.amtOfMonks.InsideMonks) + eval(this.amtOfMonks.OutsideMonks) +
            eval(this.amtOfMonks.FieldMonks);
    };

    this.manageMonks = function (game, updatedOne) {

        const selectedMonksID = updatedOne.id;
        let selectedMonksMap = selectedMonksID;

        if (selectedMonksID === "FieldsMonks") {
            selectedMonksMap = "FieldMonks";
        }

        this.setMonkAmt(selectedMonksMap, 0);

        const changedNumber = eval($("#" + selectedMonksID).val());

        this.updateAmtOfAvailableMonks();

        if (changedNumber <= this.getAmtOfAvailableMonks() && changedNumber >= 0) {
            this.setMonkAmt(selectedMonksMap, changedNumber);

        }

        else {
            if (changedNumber > this.getAmtOfAvailableMonks()) {
                $("#" + selectedMonksID).val(this.getAmtOfAvailableMonks());
                this.setMonkAmt(selectedMonksMap, eval($("#" + selectedMonksID).val()));
            }

            else {
                $("#" + selectedMonksID).val(0);
                this.setMonkAmt(selectedMonksMap, eval($("#" + selectedMonksID).val()));
            }
        }

        this.updateAmtOfOccupiedMonks();
        this.updateAmtOfAvailableMonks();

        this.setMaxAmtOfMonks(this.getAmtOfAvailableMonks());

        $("#" + selectedMonksID).attr("value", this.getMonks()[selectedMonksMap]);

        game.getBrewery().setAmtOfMonks(this.getMonks().BreweryMonks);
        game.getChapel().setAmtOfMonks(this.getMonks().ChapelMonks);

        this.updateMonks(game);
    };

    this.updateMonks = function (game) {

        const insideMonksBonus = Math.round(((this.getMonks().InsideMonks / this.getTotalAmtOfMonks()) * 100) * 100) / 100;
        const outsideMonksBonus = Math.round(((this.getMonks().OutsideMonks / this.getTotalAmtOfMonks()) * 100) * 100) / 100;
        const fieldMonksBonus = Math.round(((this.getMonks().FieldMonks / this.getTotalAmtOfMonks()) * 100) * 100) / 100;

        showEffects("fields",game);
        showEffects("inside",game);
        showEffects("outside",game);
        $("#chapelMonks").html(this.getMonks().ChapelMonks);
        $("#amtOfOccupiedMonks").html(this.getAmtOfOccupiedMonks());
    };

    this.toJSON = function () {

        let JSONFile = {};

        JSONFile["totalAmtOfMonks"] = this.totalAmtOfMonks;
        JSONFile["amtOfOccupiedMonks"] = this.amtOfOccupiedMonks;
        JSONFile["amtOfAvailableMonks"] = this.amtOfAvailableMonks;
        JSONFile["amtOfMonks"] = this.amtOfMonks;

        return JSONFile;

    };

    this.loadAbbey = function (oldAbbey) {

        for (let monks in oldAbbey) {
            if (oldAbbey.hasOwnProperty(monks)) {
                this[monks] = oldAbbey[monks];
            }
        }
    };

    this.settingInputFields = function (newAmtOfMonks) {

        for (let typeOfMonks in newAmtOfMonks) {
            if (newAmtOfMonks.hasOwnProperty(typeOfMonks)) {
                let inputValue = newAmtOfMonks[typeOfMonks];
                let inputField = $("#" + typeOfMonks);

                inputField.val(inputValue);
            }
        }
    };
}