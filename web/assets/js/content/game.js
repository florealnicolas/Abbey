function Game() {
    this.story = new Story();
    this.stock = new List();
    this.sources = new List();
    this.processors = new List();
    this.processes = new List();
    this.fields = new List();
    this.fieldCategories = null;
    this.recipes = new List();
    this.tanks = new List();
    this.brewery = new Brewery();
    this.chapel = new Chapel();
    this.abbey = new Abbey();
    this.workshop = new Workshop();
    this.vendors = new List();

    this.effects = [];

    //IDEA: MARKET MONKS! -> capacity!

    this.departments = ["Fields", "Inside the abbey", "Outside the abbey", "Brewery", "Chapel"];

    this.resourceCategories = new Map();
    this.resourceCategories.set("liquid", "bucket");
    this.resourceCategories.set("critter", "ladybug");
    this.resourceCategories.set("fungus", "mushroom");
    this.resourceCategories.set("crop", "plant");
    this.resourceCategories.set("material", "suitcase");
    this.resourceCategories.set("flower", "tulip");

    this.priceForAField = 0;
    this.fieldsMade = 0;
    this.player = null;

//Setters of Game

    this.setAPlayer = function (newPlayer) {
        this.player = newPlayer;
    };

//Getters of Game

    this.getAbbey = function () {
        return this.abbey;
    };

    this.getPlayer = function () {
        return this.player;
    };

    this.getEffects = function () {
        return this.effects;
    };

    this.getPriceOfAField = function () {
        return this.priceForAField;
    };

    this.getStory = function () {
        return this.story;
    };

    this.getDepartments = function () {
        return this.departments;
    };

    this.getResourceCategories = function () {
        return this.resourceCategories;
    };

    this.getTanks = function () {
        return this.tanks;
    };

    this.getBrewery = function () {
        return this.brewery;
    };

    this.getChapel = function () {
        return this.chapel;
    };

    this.getVendors = function () {
        return this.vendors;
    };

    this.getFieldCategories = function () {
        return this.fieldCategories;
    };

    this.getStock = function () {
        return this.stock;
    };

    this.getWorkshop = function () {
        return this.workshop;
    };

    this.getStockInString = function () {
        return this.stock.allItemsToStringWithName("Stock");
    };

    this.getRecipes = function () {
        return this.recipes;
    };

    this.getProcesses = function () {
        return this.processes;
    };

    this.getProcessors = function () {
        return this.processors;
    };

    this.getSources = function () {
        return this.sources;
    };

    this.getFields = function () {
        return this.fields;
    };

    this.getFieldTypes = function () {
        return this.fieldCategories;
    };

    this.getAmtOfFieldsMade = function () {
        return this.fieldsMade;
    };

    this.getRecipesAsOptions = function () {
        let recipeString = "";

        for (let recipeNr = 0; recipeNr < this.recipes.getSize(); recipeNr++) {
            const selectedRecipeName = this.recipes.getItemByNumber(recipeNr).getOutput().getName();
            recipeString += "<option value='" + recipeNr + "'>" + selectedRecipeName + "</option>";
        }

        return recipeString;
    };

//Functions of Game

    this.addEffect = function (newEffect) {
        this.effects.push(newEffect);
    };

    this.applyEffects = function () {

        for (let effectNr = 0, totalAmtOfEffects = this.effects.length; effectNr < totalAmtOfEffects; effectNr++) {
            switch (this.effects[effectNr]) {
                case "The way of the little one":
                    this.getAbbey().setTotalAmtOfMonks(this.getAbbey().getTotalAmtOfMonks() * 10);
                    showMonks(this);
                    break;
            }
        }
    };

    this.buyAField = function () {

        if (this.player.getCoins() >= this.priceForAField) {
            this.player.reduceCoins(this.priceForAField);
            this.fields.addAnItem(new Field(this.fieldsMade, this.priceForAField, null, this.fieldCategories));
            this.raiseFieldsMadeByOne();
            this.raiseFieldPrice();
        }

        else {
            alert("Sorry, you don't have enough coins to buy a field.");
        }

    };

    this.raiseFieldPrice = function () {

        if (this.priceForAField === 0) {
            this.priceForAField = 50;
        }

        else {
            this.priceForAField = this.priceForAField * 4;
        }
    };

    this.raiseFieldsMadeByOne = function () {
        this.fieldsMade++;
    };

    this.sellField = function (fieldName) {

        const selectedField = this.fields.getItemByName(fieldName);

        let message = "Do you really want to sell your " + selectedField.getResourceName() + " field?\n";
        let value = selectedField.getFieldValue() + " coins";

        if (selectedField.getFieldValue() === 0) {
            value = "nothing";
        }

        message += "You'll gain " + value + " for this if you do.";

        const sold = confirm(message);

        if (sold) {
            this.player.addCoins(selectedField.getFieldValue());
            this.fields.removeAnItem(selectedField);
        }
    };

    this.setFieldCategories = function (categories) {
        this.fieldCategories = categories;
    };

    this.setAmtOfFieldsMade = function (newAmtOfFieldsMade) {
        this.fieldsMade = newAmtOfFieldsMade;
    };

    this.addARecipe = function (newRecipe) {

        let game = this;

        newRecipe.getScheme().getSteps().forEach(function (step) {
            game.addProcess(step);
        });

        this.getRecipes().addAnItem(newRecipe)
    };

    this.addProcess = function (someNewProcess) {
        this.getProcesses().addAnItem(someNewProcess);

        let processor = this.getProcessors().getItemByName(someNewProcess.getProcessorName());

        if (processor === null) {
            this.getProcessors().addAnItem(someNewProcess.getProcessor());
            processor = this.getProcessors().getItemByName(someNewProcess.getProcessorName());
        }

        processor.addPossibleProcess(someNewProcess);
    };

    this.visualizeInventory = function () {

        let visual = "<h4>Inventory</h4>";
        visual += "<div class='inventoryRow'>";

        if (this.getStock().getSize() === 0) {
            visual += "<p>There is nothing here.</p>";
        }

        else {
            for (let itemNr = 0; itemNr < this.getStock().getSize(); itemNr++) {
                visual += this.getStock().getItemByNumber(itemNr).visualizeResource();
            }
        }

        visual += "</div>";

        return visual;
    };

    this.strangerMode = function (onOFF) {

        if (this.getPlayer() === null && onOFF === "ON") {
            $("#main > a").hide();
            $("#main > a:first").show();

            $(".uk-nav-offcanvas > a").hide();
            $(".uk-nav-offcanvas > a:first").show();

            this.strangermode = true;
        }

        else {
            $("#main > a").show();
            $(".uk-nav-offcanvas > a").show();

            this.strangermode = false;
        }
    }

}