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

    this.totalAmtOfMonks = 20;
    this.amtOfOccupiedMonks = 0;
    this.amtOfAvailableMonks = this.totalAmtOfMonks;

    this.departments = ["Brew", "Work", "Vendor", "Improve"];

    this.resourceCategories = new Map();
    this.resourceCategories.set("liquid","bucket");
    this.resourceCategories.set("critter","ladybug");
    this.resourceCategories.set("fungus","mushroom");
    this.resourceCategories.set("crop","plant");
    this.resourceCategories.set("material","suitcase");
    this.resourceCategories.set("flower","tulip");

    this.priceForAField = 0;
    this.fieldsMade = 0;
    this.player = null;

//Setters of Game

    this.setAPlayer = function (newPlayer) {
        this.player = newPlayer;
    };

//Getters of Game

    this.getPlayer = function () {
        return this.player;
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
    }

    this.getFieldCategories = function () {
        return this.fieldCategories;
    };

    this.getStock = function () {
        return this.stock;
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

    this.getTotalAmtOfMonks = function () {
        return this.totalAmtOfMonks;
    };

    this.getAmtOfOccupiedMonks = function () {
        return this.amtOfOccupiedMonks;
    };

    this.getAmtOfAvailableMonks = function () {
        return this.amtOfAvailableMonks;
    };

    this.getAmtOfFieldsMade = function () {
        return this.fieldsMade;
    };

    this.getRecipesAsOptions = function () {
        var recipeString = "";

        for (var recipeNr = 0; recipeNr < this.recipes.getSize(); recipeNr++) {
            var selectedRecipeName = this.recipes.getItemByNumber(recipeNr).getOutput().getName();
            recipeString += "<option value='" + recipeNr + "'>" + selectedRecipeName + "</option>";
        }

        return recipeString;
    };

//Functions of Game

    this.manageMonks = function () {

        var brewers = $("#BrewPeople");
        var workers = $("#WorkPeople");
        var improvers = $("#ImprovePeople");
        var vendors = $("#VendorPeople");

        var amtOfBrewers = eval(brewers.val());
        var amtOfWorkers = eval(workers.val());
        var amtOfImprovers = eval(improvers.val());
        var amtOfVendors = eval(vendors.val());

        this.totalAmtOfMonks = 20;
        this.amtOfOccupiedMonks = amtOfBrewers + amtOfWorkers + amtOfImprovers + amtOfVendors;
        this.amtOfAvailableMonks = this.totalAmtOfMonks - this.amtOfOccupiedMonks;

        brewers.attr("max", amtOfBrewers + this.amtOfAvailableMonks);
        brewers.attr("value", amtOfBrewers);

        workers.attr("max", amtOfWorkers + this.amtOfAvailableMonks);
        workers.attr("value", amtOfWorkers);

        improvers.attr("max", amtOfImprovers + this.amtOfAvailableMonks);
        improvers.attr("value", amtOfImprovers);

        vendors.attr("max", amtOfVendors + this.amtOfAvailableMonks);
        vendors.attr("value", amtOfVendors);

        $('#bezetMonniken').text(this.amtOfOccupiedMonks);

        this.brewery.setAmtOfMonks(amtOfBrewers);
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

        if (this.priceForAField == 0) {
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

        var selectedField = this.fields.getItemByName(fieldName);

        var message = "Do you really want to sell your " + selectedField.getResourceName() + " field?\n";
        var value = selectedField.getFieldValue() + " coins";

        if (selectedField.getFieldValue() == 0) {
            value = "nothing";
        }

        message += "You'll gain " + value + " for this if you do.";

        var sold = confirm(message);

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
    }

}