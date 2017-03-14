function Player(aPlayerName, initialAmtOfCoins, initialAmtOfReputation) {

    this.playerName = aPlayerName;
    this.playerGender = "";
    this.coins = initialAmtOfCoins;
    this.reputation = initialAmtOfReputation;

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

//Setters of Player

    this.setPlayerGender = function (gender) {
        this.playerGender = gender;
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
}