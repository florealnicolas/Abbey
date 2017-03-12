function Player(aPlayerName, initialAmtOfCoins, initialAmtOfReputation) {

    var playerName = aPlayerName;
    var playerGender = "";
    var coins = initialAmtOfCoins;
    var reputation = initialAmtOfReputation;

//Getters of Player

    this.getCoins = function () {
        return coins;
    };

    this.getPlayerName = function () {
        return playerName;
    };

    this.getReputation = function () {
        return reputation;
    };

//Setters of Player

    this.setPlayerGender = function (gender) {
        playerGender = gender;
    };

//Functions of Player

    this.addCoins = function (coinsToAdd) {
        coins += coinsToAdd;
    };

    this.reduceCoins = function (coinsToReduce) {
        coins -= coinsToReduce;
    };

    this.addReputation = function (reputationToAdd) {
        reputation += reputationToAdd;
    };
}