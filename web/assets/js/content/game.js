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
    this.upgrades = [];

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
    this.strangerMode = true;

//Setters of Game

    this.setAPlayer = function (newPlayer) {
        this.player = newPlayer;
    };

//Getters of Game

    this.getMode = function () {
        return this.strangerMode;
    };

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
        const grammar = new Grammar();
        let recipeString = "";

        for (let recipeNr = 0; recipeNr < this.recipes.getSize(); recipeNr++) {
            const selectedRecipeName = this.recipes.getItemByNumber(recipeNr).getOutput().getName();
            recipeString += "<option value='" + recipeNr + "'>" + grammar.writeRight(selectedRecipeName) + "</option>";
        }

        return recipeString;
    };

//Functions of Game

    this.addEffect = function (newEffect) {
        this.effects.push(newEffect);
    };

    this.addUpgrade = function (newUpgrade) {
        this.upgrades.push(newUpgrade);
    };

    this.applyEffects = function () {

        for (let effectNr = 0, totalAmtOfEffects = this.effects.length; effectNr < totalAmtOfEffects; effectNr++) {
            switch (this.effects[effectNr]) {
                case "the way of the little one":
                    this.getAbbey().setTotalAmtOfMonks(this.getAbbey().getTotalAmtOfMonks() * 10);
                    showMonks(this);
                    break;
                default:
                    break;
            }
        }
    };

    this.applyUpgrades = function () {
        for (let upgradeNr = 0, totalAmtOfUpgrades = this.upgrades.length; upgradeNr < totalAmtOfUpgrades; upgradeNr++) {
            switch (this.upgrades[upgradeNr]) {
                case "golden scythes":

                    for (let field in this.getFields().list) {
                        if (this.getFields().list.hasOwnProperty(field)) {
                            let selectedField = this.getFields().list[field];
                            selectedField.raiseMaxAmtOfOutput(0.05);
                        }
                    }

                    break;
                default:
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
    };

    this.gameInitialisation = function () {

        //LOADING SOURCES INTO GAME
        for (let source in sourceMap) {
            if (sourceMap.hasOwnProperty(source)) {
                let selectedSource = sourceMap[source];
                let newSource = new Source(selectedSource.name, selectedSource.maximumAmountOfOutput, selectedSource.location);
                let outputList = outputListMap[source].outputList;

                outputList.forEach(function (item) {
                    let resource = resourceMap[item];
                    let newResource = new Resource(resource.name, 0, resource.value, resource.category);

                    newSource.addOutput(newResource);
                });

                this.getSources().addAnItem(newSource);
            }
        }

        //LOADING PROCESSORS INTO GAME
        for (let processor in processorMap) {
            if (processorMap.hasOwnProperty(processor)) {
                let selectedProcessor = processorMap[processor];
                let newProcessor;
                if (typeof selectedProcessor.possibleInput === "string") {
                    newProcessor = new Processor(selectedProcessor.name, getResourcesFromMap(selectedProcessor.possibleInput), getResourcesFromMap(selectedProcessor.output), selectedProcessor.efficiency, selectedProcessor.location);
                }
                else {
                    let inputList = new List();
                    selectedProcessor.possibleInput.forEach(function (input) {
                        inputList.addAnItem(getResourcesFromMap(input));
                    });
                    newProcessor = new Processor(selectedProcessor.name, inputList, getResourcesFromMap(selectedProcessor.output), selectedProcessor.efficiency, selectedProcessor.location);

                }
                this.getProcessors().addAnItem(newProcessor);
            }
        }

        //LOADING PROCESSES INTO GAME
        for (let process in processMap) {
            if (processMap.hasOwnProperty(process)) {
                let selectedProcess = processMap[process];
                let newProcess = new Process(selectedProcess.name, selectedProcess.duration, getResourcesFromMap(selectedProcess.input), this.getProcessors().getItemByName(selectedProcess.processor), getResourcesFromMap(selectedProcess.output));
                this.getProcesses().addAnItem(newProcess);
                this.getProcessors().getItemByName(selectedProcess.processor).addPossibleProcess(newProcess);
            }
        }

        //LOADING RECIPES INTO GAME
        for (let recipe in recipeMap) {
            if (recipeMap.hasOwnProperty(recipe)) {
                let selectedRecipe = recipeMap[recipe];

                let scheme = new Scheme();
                const selectedScheme = schemeMap[selectedRecipe.scheme];
                for (let step in selectedScheme) {
                    if (selectedScheme.hasOwnProperty(step)) {
                        let selectedStep = processMap[selectedScheme[step]];
                        let selectedProcess = this.getProcesses().getItemByName(selectedStep.name);

                        scheme.addStep(selectedProcess)
                    }
                }

                let ingredientList = new List();
                const selectedIngredientList = ingredientsListMap[selectedRecipe.ingredientList];

                for (let ingredient in selectedIngredientList) {
                    if (selectedIngredientList.hasOwnProperty(ingredient)) {
                        let selectedIngredientName = getResourcesFromMap(ingredient);
                        let selectedIngredientDetails = selectedIngredientList[ingredient];
                        let selectedIngredient = new Resource(selectedIngredientName.name, selectedIngredientDetails.amount, 0, selectedIngredientName.category);

                        ingredientList.addAnItem(selectedIngredient);
                    }
                }

                if (selectedRecipe.specialIngredient !== "") {
                    let selectedSpecialIngredient = selectedRecipe.specialIngredient;
                    selectedSpecialIngredient = new Resource(selectedSpecialIngredient.name,selectedSpecialIngredient.amount,0,getResourcesFromMap(selectedSpecialIngredient.name).category);
                    ingredientList.addAnItem(selectedSpecialIngredient);
                }

                const output = getResourcesFromMap(selectedRecipe.output.name);
                output.setQuantity(selectedRecipe.output.amount);

                this.addARecipe(new Recipe(output, ingredientList, scheme, selectedRecipe.author, selectedRecipe.story));
            }
        }

        //LOADING BREWERY
        let breweryEquipment = new List();

        for (let processor in breweryEquipmentMap) {
            if (breweryEquipmentMap.hasOwnProperty(processor)) {
                let selectedProcessor = processorMap[breweryEquipmentMap[processor]];
                let foundProcessor = this.getProcessors().getItemByName(selectedProcessor.name);

                breweryEquipment.addAnItem(foundProcessor);
            }
        }

        this.getBrewery().setEquipment(breweryEquipment);

        //LOADING VENDORS
        for (let vendor in vendorMap) {
            if (vendorMap.hasOwnProperty(vendor)) {
                let selectedVendor = vendorMap[vendor];

                let vendorInterests = new List();
                vendorInterests.addListOfItems(selectedVendor.interests);

                this.getVendors().addAnItem(new Vendor(selectedVendor.name, vendorInterests));
            }
        }

        //LOADING ENLIGHTENMENTS
        for (let enlightenment in enlightenmentMap) {
            if (enlightenmentMap.hasOwnProperty(enlightenment)) {
                let selectedEnlightenment = enlightenmentMap[enlightenment];
                let newEnlightenment = new Enlightenment(selectedEnlightenment.name, selectedEnlightenment.description);

                newEnlightenment.setRequirements(selectedEnlightenment.requirements);
                newEnlightenment.setEffects(enlightenmentEffectMap[selectedEnlightenment.effect]);

                this.getChapel().getEnlightenmentList().addAnItem(newEnlightenment)
            }
        }

        //LOADING UPGRADES
        for (let upgrade in upgradeMap) {
            if (upgradeMap.hasOwnProperty(upgrade)) {
                let selectedUpgrade = upgradeMap[upgrade];
                let newUpgrade = new Upgrade(selectedUpgrade.name, selectedUpgrade.description);

                newUpgrade.setRequirements(selectedUpgrade.requirements);
                newUpgrade.setEffects(upgradeEffectMap[selectedUpgrade.effect]);

                this.getWorkshop().getListOfUpgrades().addAnItem(newUpgrade);
            }
        }

        //SETTING FIELDTYPES
        this.setFieldCategories(fieldTypeMap);

    }

}