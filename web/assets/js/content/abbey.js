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
        this.amtOfOccupiedMonks = this.getMonks().BreweryMonks + this.getMonks().ChapelMonks + this.getMonks().InsideMonks + this.getMonks().OutsideMonks +
            this.getMonks().FieldMonks;
    };

    this.manageMonks = function (game, updatedOne) {

        const selectedMonks = updatedOne.id;
        this.setMonkAmt(selectedMonks, 0);

        //this.updateAmtOfAvailableMonks();

        if (eval($("#" + selectedMonks).val()) <= this.getAmtOfAvailableMonks() && eval($("#" + selectedMonks).val()) >= 0) {

            this.setMonkAmt(selectedMonks, eval($("#" + selectedMonks).val()));
        }

        else {
            if (eval($("#" + selectedMonks).val()) > this.getAmtOfAvailableMonks()) {
                $("#" + selectedMonks).val(this.getAmtOfAvailableMonks());
                this.setMonkAmt(selectedMonks, eval($("#" + selectedMonks).val()));
            }

            else {
                $("#" + selectedMonks).val(0);
                this.setMonkAmt(selectedMonks, eval($("#" + selectedMonks).val()));
            }
        }

        this.updateAmtOfOccupiedMonks();
        this.updateAmtOfAvailableMonks();

        this.setMaxAmtOfMonks(this.getAmtOfAvailableMonks());

        $("#" + selectedMonks).attr("value", this.getMonks()[selectedMonks]);

        game.getBrewery().setAmtOfMonks(this.getMonks().BreweryMonks);
        game.getChapel().setAmtOfMonks(this.getMonks().ChapelMonks);

        this.updateMonks();

        console.log("MONKS", this.getMonks());
        console.log("AVAILABLE MONKS", this.getAmtOfAvailableMonks());
    };

    this.updateMonks = function () {

        const insideMonksBonus = Math.round(((this.getMonks().InsideMonks / this.getTotalAmtOfMonks()) * 100)*100)/100;
        const outsideMonksBonus = Math.round(((this.getMonks().OutsideMonks / this.getTotalAmtOfMonks()) * 100)*100)/100;
        const fieldMonksBonus = Math.round(((this.getMonks().FieldMonks / this.getTotalAmtOfMonks()) * 100)*100)/100;

        $(".inside .monkBonus span").html(insideMonksBonus + "%");
        $(".outside .monkBonus span").html(outsideMonksBonus + "%");
        $(".grounds .monkBonus span").html(fieldMonksBonus + "%");
        $("#chapelMonks").html(this.getMonks().ChapelMonks);
        $("#amtOfOccupiedMonks").html(this.getAmtOfOccupiedMonks());
    };

    this.toJSON = function () {

        let JSONFile = {};

        JSONFile["totalAmtOfMonks"] = this.totalAmtOfMonks;
        JSONFile["amtOfOccupiedMonks"] = this.amtOfOccupiedMonks;
        JSONFile["amtOfAvailableMonks"] = this.amtOfAvailableMonks;
        JSONFile["amtOfMonks"]= this.amtOfMonks;

        return JSONFile;

    };

    this.loadAbbey = function (oldAbbey) {

        for (let monks in oldAbbey) {
            if (oldAbbey.hasOwnProperty(monks)){
                this[monks] = oldAbbey[monks];
            }
        }
    };

    this.settingInputFields = function (newAmtOfMonks) {

        for (let typeOfMonks in newAmtOfMonks) {
            if(newAmtOfMonks.hasOwnProperty(typeOfMonks)){
                let inputValue = newAmtOfMonks[typeOfMonks];
                let inputField = $("#" + typeOfMonks);

                inputField.val(inputValue);
            }
        }
    };
}