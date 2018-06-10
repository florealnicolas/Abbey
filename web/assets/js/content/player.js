function Player(aPlayerName, coins, reputation) {

    this.playerName = aPlayerName;
    this.playerGendre = "";
    this.coins = coins;
    this.reputation = reputation;
    this.secret = "";
    this.activeEffects = new List();

//Getters of Player

    this.getCoins = function () {
        return this.coins;
    };

    this.getPlayerName = function () {
        return this.playerName;
    };

    this.getReputation = function () {
        return this.reputation;
    };

    this.getSecret = function () {
        return this.secret;
    };

    this.getGendre = function () {
        return this.playerGendre;
    };


    this.getActiveEffects = function () {
        return this.activeEffects;
    };

//Setters of Player

    this.setPlayerGendre = function (gendre) {
        this.playerGendre = gendre;
    };

    this.setSecret = function (newSecret) {
        this.secret = newSecret;
    };

//Functions of Player

    this.addCoins = function (coinsToAdd) {
        this.coins += coinsToAdd;
    };

    this.reduceCoins = function (coinsToReduce) {
        this.coins -= coinsToReduce;
    };

    this.addReputation = function (reputationToAdd) {
        this.reputation += reputationToAdd;
    };

    this.toRequestPart = function () {

        const neededInfo = ["playerName", "playerGendre", "coins", "reputation", "password"];

        let requestPart = "?";

        for (let property in neededInfo) {
            if (neededInfo.hasOwnProperty(property)) {
                let selectedDetail = neededInfo[property];
                requestPart += selectedDetail + "=" + this[selectedDetail] + "&";
            }
        }

        return requestPart.substr(0, requestPart.length - 1);
    };

    this.toJSON = function () {

        const neededInfo = ["playerName","playerGendre", "coins", "reputation", "secret"];

        let JSON = {};

        for (let property in neededInfo) {
            if (neededInfo.hasOwnProperty(property)) {
                let selectedDetail = neededInfo[property];
                JSON[selectedDetail] = this[selectedDetail];
            }
        }

        return JSON;
    };

    this.activateEnlightment = function (game) {

        if (this.getActiveEffects().getSize() > 0) {

            this.getActiveEffects().list.forEach(function (enlightment) {

                if (enlightment.status === "not-taught") {
                    switch (enlightment.name) {

                        case "the way of the little one":
                            let argument = enlightment.enlightenmentEffects.argument;
                            let target = (game.getAbbey())[enlightment.enlightenmentEffects.target];

                            game.getAbbey().setTotalAmtOfMonks(target* eval(argument));

                            showAbbey(game);
                            break;

                        default:
                            console.log("UNKNOWN EFFECT", this);
                            console.info("This means the effect is not implemented.");
                            break;
                    }

                    enlightment.setStatusTaught();
                }
            })
        }
    }
}
