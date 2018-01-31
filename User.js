const uuid = require('uuid');

function User(aPlayerName, password, gendre, initialAmtOfCoins, initialAmtOfReputation) {

    this._id = aPlayerName
    this.userName = aPlayerName;
    this.gendre = gendre;
    this.coins = initialAmtOfCoins;
    this.reputation = initialAmtOfReputation;
    this.password = "";

//Getters of User

    this.getCoins = function () {
        return this.coins;
    };

    this.getUserName = function () {
        return this.userName;
    };

    this.getReputation = function () {
        return this.reputation;
    };

    this.getPassword = function () {
        return this.password;
    };

    this.getGendre = function () {
        return this.gendre;
    };

    this.getUserID = function () {
        return this._id;
    },

//Setters of User

    this.setGendre = function (gendre) {
        this.gendre = gendre;
    };

    this.setPassword = function (newPassword) {
        this.password = newPassword;
    };

//Functions of User

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

        const neededInfo = ["_id","userName", "gendre", "coins", "reputation", "password"];

        let JSON = {};

        for (let property in neededInfo) {
            if (neededInfo.hasOwnProperty(property)) {
                let selectedDetail = neededInfo[property];
                JSON[selectedDetail] = this[selectedDetail];
            }
        }

        return JSON;
    }
}

module.exports = User;