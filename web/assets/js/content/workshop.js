function Workshop () {

    this.listOfUpgrades = new List();

// Getters of Workshop

    this.getListOfUpgrades = function () {
        return this.listOfUpgrades;
    };

// Functions of Workshop

    this.visualizeWorkshop = function () {
        let visual = "<h3>The workshop</h3>";
        visual += "<p>Here you can work on upgrades for your abbey.<br/>" +
            "Find the neccessary requirements and build!</p>";
        visual += "<h4>List of upgrades</h4>";

        if (this.getListOfUpgrades().getSize() !== 0) {
            for (let upgradeNr = 0; upgradeNr < this.getListOfUpgrades().getSize(); upgradeNr++) {
                    visual += this.getListOfUpgrades().getItemByNumber(upgradeNr).visualizeUpgrade();
            }
        }

        else {
            visual += "<p>There are no upgrades yet available.</p>";
        }

        return visual;
    };

    this.checkIfBuyable = function (game) {

        const upgradeClass = $(".upgradeButton");
        upgradeClass.attr("disabled", true);
        upgradeClass.addClass("disabled");

        for (let upgradeNr = 0, amtOfUpgrades = this.getListOfUpgrades().getSize(); upgradeNr < amtOfUpgrades; upgradeNr++) {

            let selectedUpgrade = $(upgradeClass[upgradeNr]);

            if (this.getListOfUpgrades().getItemByNumber(upgradeNr).ableToBuy(game)) {
                selectedUpgrade.attr("disabled", false);
                selectedUpgrade.removeClass("disabled");
            }
        }
    };


}