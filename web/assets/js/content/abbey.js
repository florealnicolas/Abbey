function Abbey() {

    this.totalAmtOfMonks = 20;
    this.amtOfOccupiedMonks = 0;
    this.amtOfAvailableMonks = this.totalAmtOfMonks;

    this.amtOfMonks = {
        brewerMonks: 0,
        outsideMonks: 0,
        insideMonks: 0,
        fieldMonks: 0,
        chapelMonks: 0
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

// Functions of Abbey

    this.manageMonks = function (game) {

        const monkAddresses = {
            brewerMonks: $("#BreweryMonks"),
            outsideMonks: $("#OutsideMonks"),
            insideMonks: $("#InsideMonks"),
            fieldMonks: $("#FieldsMonks"),
            chapelMonks: $("#ChapelMonks")
        };

        for (let monk in monkAddresses) {
            if (monkAddresses.hasOwnProperty(monk) && this.getMonks().hasOwnProperty(monk)) {
                let selectedMonk = monkAddresses[monk];

                console.log("MONK: " + monk, eval(selectedMonk.val()));

                if (this.getMonks()[monk] !== eval(selectedMonk.val())) {

                    this.getMonks()[monk] = 0;
                    this.amtOfOccupiedMonks = this.getMonks().brewerMonks + this.getMonks().fieldMonks + this.getMonks().outsideMonks + this.getMonks().insideMonks;
                    this.amtOfAvailableMonks = this.totalAmtOfMonks - this.amtOfOccupiedMonks;

                    if (eval(selectedMonk.val()) >= 0 && eval(selectedMonk.val()) <= this.getAmtOfAvailableMonks()) {
                        this.getMonks()[monk] = eval(selectedMonk.val());

                        this.amtOfOccupiedMonks = this.getMonks().brewerMonks + this.getMonks().fieldMonks + this.getMonks().outsideMonks + this.getMonks().insideMonks;
                        this.amtOfAvailableMonks = this.totalAmtOfMonks - this.amtOfOccupiedMonks;

                        //monkAddresses[monk].attr("max", this.amtOfAvailableMonks);
                        monkAddresses[monk].attr("value", this.getMonks()[monk]);
                    }
                    else {
                        console.log("You are cheating!");

                        if (eval(selectedMonk.val()) > this.getAmtOfAvailableMonks()) {
                            this.getMonks()[monk] = this.amtOfAvailableMonks;
                            //monkAddresses[monk].attr("max", this.amtOfAvailableMonks);
                            monkAddresses[monk].attr("value", this.amtOfAvailableMonks);
                            monkAddresses[monk].val(this.amtOfAvailableMonks);
                        }

                        else {
                            this.getMonks()[monk] = 0;
                            //monkAddresses[monk].attr("max", this.amtOfAvailableMonks);
                            monkAddresses[monk].attr("value", 0);
                            monkAddresses[monk].val(0);
                        }
                    }
                    this.amtOfOccupiedMonks = this.getMonks().brewerMonks + this.getMonks().fieldMonks + this.getMonks().outsideMonks + this.getMonks().insideMonks;
                    this.amtOfAvailableMonks = this.totalAmtOfMonks - this.amtOfOccupiedMonks;
                    $("#monks input").attr("max", this.amtOfAvailableMonks);
                }
            }
        }

        /*this.amtsOfMonks = {
         brewerMonks: eval(brewerMonks.val()),
         outsideMonks: eval(outsideMonks.val()),
         insideMonks: eval(insideMonks.val()),
         fieldMonks: eval(fieldMonks.val()),
         chapelMonks: eval(chapelMonks.val())
         };*/


        /*
         monkAddresses[insideMonks].attr("max", this.getMonks().insideMonks + this.amtOfAvailableMonks);
         monkAddresses[insideMonks].attr("value", this.getMonks().insideMonks);

         monkAddresses[outsideMonks].attr("max", this.getMonks().outsideMonks + this.amtOfAvailableMonks);
         monkAddresses[outsideMonks].attr("value", this.getMonks().outsideMonks);

         monkAddresses[fieldMonks].attr("max", this.getMonks().fieldMonks + this.amtOfAvailableMonks);
         monkAddresses[fieldMonks].attr("value", this.getMonks().fieldMonks);

         monkAddresses[chapelMonks].attr("max", this.getMonks().chapelMonks + this.amtOfAvailableMonks);
         monkAddresses[chapelMonks].attr("value", this.getMonks().chapelMonks);
         */
        $('#amtOfOccupiedMonks').text(this.amtOfOccupiedMonks);
        this.updateMonks();

        game.getBrewery().setAmtOfMonks(this.getMonks().brewerMonks);
        game.getChapel().setAmtOfMonks(this.getMonks().chapelMonks);

        game.getChapel().automaticPraying();
    };

    this.updateMonks = function () {
        $(".inside .monkBonus span").html((this.getMonks().insideMonks / this.getTotalAmtOfMonks()) * 100 + "%");
        $(".outside .monkBonus span").html((this.getMonks().outsideMonks / this.getTotalAmtOfMonks()) * 100 + "%");
        $(".grounds .monkBonus span").html((this.getMonks().fieldMonks / this.getTotalAmtOfMonks()) * 100 + "%");
        $("#chapelMonks").html(this.getMonks().chapelMonks);
    };
}