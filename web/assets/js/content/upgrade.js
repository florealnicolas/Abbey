function Upgrade (upgradeName, upgradeDescription) {

    this.name = upgradeName;
    this.requirements = {};
    this.upgradeEffect = {};

    this.discription = upgradeDescription;

// Getters of Upgrade

    this.getName = function () {
        return this.name;
    };

    this.getRequirements = function () {
        return this.requirements;
    };

    this.getEffect = function () {
        return this.upgradeEffect;
    };

    this.getDiscription = function () {
        return this.discription;
    };

// Setters of Upgrade

    this.setRequirement = function (requirement, value) {
        this.requirements[requirement] = value;
    };

    this.setRequirements = function (newRequirements){
        this.requirements = newRequirements;
    };

    this.setEffects = function (newEffects) {
        this.upgradeEffect = newEffects;
    };

    this.setEffect = function (effect, value) {
        this.upgradeEffect[effect] = value;
    };

// Functions of Upgrade

    this.visualizeEffects = function () {
        return this.upgradeEffect.description;
    };

    this.visualizeRequirements = function () {
        let visual = "";
        for(let requirement in this.requirements) {
            if (this.requirements.hasOwnProperty(requirement)) {
                visual += requirement + ": " + this.requirements[requirement] + ", ";
            }
        }

        visual = visual.substr(0,visual.length-2);

        return visual + ".";
    };

    this.visualizeUpgrade = function () {
        const grammar = new Grammar();
        let visual = "<div class='upgrade' id='"+this.getName()+"'>";
        visual += "<h5>"+grammar.writeRight(this.getName())+"</h5>";
        visual += "<p>Effect:\t"+this.visualizeEffects()+"<br/>" +
            "Requirements:\t"+ this.visualizeRequirements() +"<br/>" +
            "Discription:\t"+this.getDiscription()+"</p>";
        visual += "</div>";
        visual +="<button class='button upgradeButton' id='upgrade-"+this.getName()+"'>Buy</button>";

        return visual;
    };

    this.ableToBuy = function (game) {
        const stock = game.getStock();
        let able = true;

        for(let requirement in this.requirements) {
            if (this.requirements.hasOwnProperty(requirement)) {

                switch (requirement) {
                    case "coins":
                        if (game.getPlayer().getCoins() < this.requirements[requirement]){
                            able = false;
                        }
                        break;
                    default:
                        let selectedItem = stock.getItemByName(requirement);
                        if (selectedItem === null || selectedItem.getQuantity() < this.requirements[requirement]){
                            able = false;
                        }
                        break;
                }
            }
        }
        return able;
    };

    this.buyUpgrade = function (game) {

        if (this.ableToBuy(game)) {

            for(let requirement in this.requirements) {
                if (this.requirements.hasOwnProperty(requirement)) {
                    switch (requirement) {
                        case "coins":
                           game.getPlayer().reduceCoins(this.requirements[requirement]);
                           showNCRCounter(game);
                            break;
                        default:
                            game.getStock().getItemByName(requirement).removeQuantityOfAResource(this.requirements[requirement]);
                            game.getStock().removeResourceIfThereIsNoQuantity(game.getStock().getItemByName(requirement));
                            showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories()));
                            break;
                    }
                }
            }

            game.addUpgrade(this.name);
        }
    };
}