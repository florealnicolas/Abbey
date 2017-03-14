function Grammar() {

    this.gender = null;

    //functions of Grammar

    this.setGender = function (newGender) {
        this.gender = newGender;
    };

    this.hisOrHer = function () {

        var possive = "his";

        if (this.gender == "girl") {
            possive = "her";
        }

        return possive;
    };

    this.heOrShe = function () {
        var noun = "he";

        if (this.gender == "girl") {
            noun = "she";
        }

        return noun;
    };

    this.himOrHer = function () {
        var noun = "him";

        if (this.gender == "she") {
            noun = "she";
        }

        return noun;
    };

    this.writeBackwards = function (something) {
        var backwardsSomething = "";

        for (var letterNr = something.length - 1; 0 <= letterNr; letterNr--) {
            backwardsSomething += something[letterNr];
        }

        return backwardsSomething;
    };

    this.writeRight = function (wrong) {
        return wrong.substring(0, 1).toUpperCase() + wrong.substring(1).toLowerCase();
    };
}
