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
        $("#monks input").attr("max", newValue);
    };

// Functions of Abbey

    this.updateAmtOfAvailableMonks = function () {

        this.setAmtOfAvailableMonks(0);
        let newAmtOfOccupiedMonks = this.getMonks().BreweryMonks + this.getMonks().ChapelMonks + this.getMonks().InsideMonks + this.getMonks().OutsideMonks +
            this.getMonks().FieldMonks;

        this.setAmtOfAvailableMonks(this.getTotalAmtOfMonks() - newAmtOfOccupiedMonks);
    };

    this.manageMonks = function (game, updatedOne) {

        const selectedMonks = updatedOne.id;
        this.setMonkAmt(selectedMonks,0);
        this.updateAmtOfAvailableMonks();

        if (eval($("#"+selectedMonks).val()) <= this.getAmtOfAvailableMonks() && eval($("#"+selectedMonks).val()) >= 0) {

            this.setMonkAmt(selectedMonks,eval($("#"+selectedMonks).val()));
        }

        else {
            if (eval($("#"+selectedMonks).val()) >  this.getAmtOfAvailableMonks()) {
                $("#"+selectedMonks).val(this.getAmtOfAvailableMonks());
                this.setMonkAmt(selectedMonks,eval($("#"+selectedMonks).val()));
            }

            else {
                $("#"+selectedMonks).val(0);
                this.setMonkAmt(selectedMonks,eval($("#"+selectedMonks).val()));
            }
        }

        this.updateAmtOfAvailableMonks();
        this.setMaxAmtOfMonks(this.getAmtOfAvailableMonks());
        $("#" + selectedMonks).attr("value", this.getMonks()[selectedMonks]);
        game.getBrewery().setAmtOfMonks(this.getMonks().BreweryMonks);
        game.getChapel().setAmtOfMonks(this.getMonks().ChapelMonks);
        this.updateMonks();
        console.log("MONKS",this.getMonks());
        console.log("AVAILABLE MONKS",this.getAmtOfAvailableMonks());

    };

    this.updateMonks = function () {
        $(".inside .monkBonus span").html((this.getMonks().InsideMonks / this.getTotalAmtOfMonks()) * 100 + "%");
        $(".outside .monkBonus span").html((this.getMonks().OutsideMonks / this.getTotalAmtOfMonks()) * 100 + "%");
        $(".grounds .monkBonus span").html((this.getMonks().FieldMonks / this.getTotalAmtOfMonks()) * 100 + "%");
        $("#chapelMonks").html(this.getMonks().ChapelMonks);
    };
}