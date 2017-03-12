function Game() {
    var story = new Story();
    var stock = new List();
    var sources = new List();
    var processors = new List();
    var processes = new List();
    var fields = new List();
    var fieldCategories = null;
    var recipes = new List();
    var tanks = new List();

    var totalAmtOfMonks = 20;
    var amtOfOccupiedMonks = 0;
    var amtOfAvailableMonks = totalAmtOfMonks;

    var departments = ["Brew", "Work", "Vendor", "Improve"];

    var priceForAField = 0;
    var fieldsMade = 0;
    var player = null;

//Setters of Game

    this.setAPlayer = function (newPlayer) {
        player = newPlayer;
    };

//Getters of Game

    this.getPlayer = function () {
        return player;
    };

    this.getPriceOfAField = function () {
        return priceForAField;
    };

    this.getStory = function () {
        return story;
    };

    this.getDepartments = function () {
        return departments;
    };

    this.getTanks = function () {
        return tanks;
    };

    this.getFieldCategories = function () {
        return fieldCategories;
    };

    this.getStock = function () {
        return stock;
    };

    this.getStockInString = function () {
        return stock.allItemsToStringWithName("Stock") + ".";
    };

    this.getRecipes = function () {
        return recipes;
    };

    this.getProcesses = function () {
        return processes;
    };

    this.getProcessors = function () {
        return processors;
    };

    this.getSources = function () {
        return sources;
    };

    this.getFields = function () {
        return fields;
    };

    this.getFieldTypes = function () {
        return fieldCategories;
    };

    this.getTotalAmtOfMonks = function () {
        return totalAmtOfMonks;
    };

    this.getAmtOfOccupiedMonks = function () {
        return amtOfOccupiedMonks;
    };

    this.getAmtOfAvailableMonks = function () {
        return amtOfAvailableMonks;
    };


    this.getAmtOfFieldsMade = function () {
      return fieldsMade;
    };

    this.getRecipesAsOptions = function () {
        var recipeString = "";

        for (var recipeNr = 0; recipeNr < recipes.getSize(); recipeNr++) {
            var selectedRecipeName = recipes.getItemByNumber(recipeNr).getOutput().getName();
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

        totalAmtOfMonks = 20;
        amtOfOccupiedMonks = amtOfBrewers + amtOfWorkers + amtOfImprovers + amtOfVendors;
        amtOfAvailableMonks = totalAmtOfMonks - amtOfOccupiedMonks;

        brewers.attr("max", amtOfBrewers + amtOfAvailableMonks);
        brewers.attr("value", amtOfBrewers);

        workers.attr("max", amtOfWorkers + amtOfAvailableMonks);
        workers.attr("value", amtOfWorkers);

        improvers.attr("max", amtOfImprovers + amtOfAvailableMonks);
        improvers.attr("value", amtOfImprovers);

        vendors.attr("max", amtOfVendors + amtOfAvailableMonks);
        vendors.attr("value", amtOfVendors);

        $('#bezetMonniken').text(amtOfOccupiedMonks);
    };

    this.buyAField = function () {
        
        if (player.getCoins() >= priceForAField) {
            player.reduceCoins(priceForAField);
            fields.addAnItem(new Field(fieldsMade,priceForAField,null,fieldCategories));
            raiseFieldsMadeByOne();
            raiseFieldPrice();
        }
        
        else {
            alert("Sorry, you don't have enough coins to buy a field.");
        }
        
    };
    
    var raiseFieldPrice = function () {

        if (priceForAField == 0) {
            priceForAField = 50;
        }

        else {
            priceForAField = priceForAField * 4;
        }
    };

    var raiseFieldsMadeByOne = function () {
      fieldsMade ++;
    };

    this.sellField = function (fieldName) {

        var selectedField = fields.getItemByName(fieldName);

        var message = "Do you really want to sell your " + selectedField.getResourceName() + " field?\n";
        var value = selectedField.getFieldValue() + " coins";

        if (selectedField.getFieldValue() == 0) {
            value = "nothing";
        }

        message += "You'll gain " + value + " for this if you do.";

        var sold = confirm(message);

        if (sold) {
            player.addCoins(selectedField.getFieldValue());
            fields.removeAnItem(selectedField);
        }
    };

    this.setFieldCategories = function (categories) {
        fieldCategories = categories;
    };

    this.setAmtOfFieldsMade = function (newAmtOfFieldsMade) {
        fieldsMade = newAmtOfFieldsMade;
    }

}