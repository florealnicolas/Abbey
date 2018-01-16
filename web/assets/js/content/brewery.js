function Brewery() {

    this.selectedRecipe = null;
    this.amtOfMonks = 0;
    this.equipment = new List();
    this.monkBonus = 0;

// Getters of Brewery

    this.getAmtOfMonks = function () {
        return this.amtOfMonks;
    };

    this.getEquipment = function () {
        return this.equipment;
    };

    this.getSelectedRecipe = function () {
        return this.selectedRecipe;
    };

    this.getMonkBonus = function () {
        return this.monkBonus;
    };

// Setters of Brewery

    this.setAmtOfMonks = function (newAmtOfMonks) {
        this.amtOfMonks = newAmtOfMonks;
    };

    this.setSelectedRecipe = function (newRecipe) {
        this.selectedRecipe = newRecipe;
    };

    this.setEquipment = function (listOfEquipment) {
        this.equipment = listOfEquipment;
    };


// Functions of Brewery

    this.calculateMonkBonus = function (game) {
        this.monkBonus = 0;

        if (game.getAbbey().amtOfMonks.BreweryMonks !== undefined) {
            this.monkBonus = (game.getAbbey().amtOfMonks.BreweryMonks / game.getAbbey().getTotalAmtOfMonks()) * 100;
        }
    };

    this.visualizeOverview = function (game) {

        const grammar = new Grammar();

        let visual = "<h4>Overview</h4>";

        const amtOfBreweryMonks = game.getAbbey().amtOfMonks.BreweryMonks;

        let amtOfMonk = "<h5>Employees</h5>";
        amtOfMonk += "<p>At the moment there are ";
        if (amtOfBreweryMonks === undefined) {
            amtOfMonk += "no";
        }

        else {
            amtOfMonk += amtOfBreweryMonks;
        }

        this.calculateMonkBonus(game);

        amtOfMonk += " monks working in your brewery.<br/>" +
            "That results in a monk bonus of " + this.monkBonus + "%.</p>";

        let recipe = "<h5>Recipe</h5>";
        recipe += "<p>This brewery will produce ";

        let recipeName = "no beer because you didn't gave them a recipe yet";

        if (this.getSelectedRecipe() !== null) {
            recipeName = this.getSelectedRecipe().getName();
        }

        recipe += recipeName + ".</p>";

        let equipment = "<h5>Equipment</h5>";

        if (this.getEquipment().getSize() !== 0) {
            equipment += "<ul>";
            for (let equipmentItem = 0; equipmentItem < this.getEquipment().getSize(); equipmentItem++) {
                equipment += "<li>" + grammar.writeRight(this.getEquipment().getItemByNumber(equipmentItem).getName()) + "</li>";
            }

            equipment += "</ul>";
        }

        else {
            equipment += "Your brewery is empty!";
        }

        visual += amtOfMonk + recipe + equipment;

        return visual;
    };

    this.visualizeProcess = function () {

        let visual = "<h4>Process</h4>";

        let process = "<p>There is no recipe selected yet, go to the recipe book and select one.</p>";

        if (this.getSelectedRecipe() !== null) {

            process = "";

            for (let stepNumber = 0; stepNumber < this.getSelectedRecipe().getScheme().getAmtOfSteps(); stepNumber++) {

                process += "<div id='process" + this.getSelectedRecipe().getName() + stepNumber + "' class='processRow'>";

                process += this.getSelectedRecipe().getScheme().getStepByNumber(stepNumber).visualizeStep();

                process += "</div>";
            }
        }

        return visual + process;
    };

    this.loadBrewery = function (oldBrewery, game) {
        let oldRecipe = game.getRecipes().getItemByMapName(oldBrewery.selectedRecipe);

        if (oldRecipe !== null) {
            this.setSelectedRecipe(oldRecipe);
            showRecipeDescription(oldRecipe);
        }
    };

    this.toJSON = function () {

        let jsonBrewery = {};

        if (this.getSelectedRecipe() !== null) {
            jsonBrewery["selectedRecipe"] = this.getSelectedRecipe().mapName;
        }
        else{
            jsonBrewery["selectedRecipe"] = this.getSelectedRecipe();
        }

        return jsonBrewery;

    }



}
