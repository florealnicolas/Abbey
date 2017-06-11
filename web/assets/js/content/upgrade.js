function Upgrade (upgradeName, upgradeDescription) {

    this.name = upgradeName;
    this.requirements = {};
    this.upgradeEffect = {};

    this.discription = upgradeDescription;

// Getters of Enlightenment

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

// Setters of Enlightenment

    this.setRequirement = function (requirement, value) {
        this.requirements[requirement] = value;
    };

    this.setEffect = function (effect, value) {
        this.upgradeEffect[effect] = value;
    };

// Functions of Enlightenment

    this.visualizeEffects = function () {
        let visual = "";
        for(let effect in this.upgradeEffect) {
            if (this.upgradeEffect.hasOwnProperty(effect)) {
                visual += this.upgradeEffect[effect];
            }
        }

        return visual;
    };

    this.visualizeRequirements = function () {
        let visual = "";
        for(let requirement in this.requirements) {
            if (this.requirements.hasOwnProperty(requirement)) {
                visual += requirement + ": " + this.requirements[requirement];
            }
        }

        return visual;
    };

    this.visualizeUpgrade = function () {
        let visual = "<div class='upgrade' id='"+this.getName()+"'>";
        visual += "<h5>"+this.getName()+"</h5>";
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
                console.log("SELECTED REQUIREMENT",requirement);
                if (stock.getItemByName(requirement) === null){
                    able = false;
                }
            }
        }
        return able;
    };

    this.buyUpgrade = function (game) {

        if (this.ableToBuy(game)) {
            //game.addEffect(this.name);
            console.log("You can buy this upgrade!");
        }

        else {
            console.log("You can't buy this one yet!");
        }
    };
}