(function ($, window, document) {

    const game1 = new Game();

    //Resources needed in the game

    //APAIRY
    const apairyOutputs = {
        honey: new Resource("honey", 0, 1, "natural product"),
        bee: new Resource("bee", 0, 1, "critter")
    };

    //FOREST

    //Liya's recommendations

    //const banana = new Resource("banana");
    //const daisy = new Resource("daisy");
    //const rose = new Resource("rose");
    //const chestnut = new Resource("chestnut");
    //const herb -> more specific;

    //Stop

    const forestOutputs = {
        raspberry: new Resource("raspberry", 0, 1, "fruit"),
        cranberry: new Resource("cranberry", 0, 1, "fruit"),
        strawberry: new Resource("strawberry", 0, 1, "fruit"),
        wood: new Resource("wood", 0, 1, "material"),
        woodSorrel: new Resource("wood sorrel", 0, 1, "flower"),
        mushroom: new Resource("mushroom", 0, 1, "fungus"),
        chicory: new Resource("chicory", 0, 1, "flower"),
        chestnut: new Resource("chestnut", 0, 1, "nut"),
        rose: new Resource("rose", 0, 1, "flower"),
        daisy: new Resource("daisy", 0, 1, "flower"),
        banana: new Resource("banana", 0, 1, "fruit")
    };

    //WELL
    const wellOutputs = {
        water: new Resource("water", 0, 1, "liquid"),
        frog: new Resource("frog", 0, 1, "critter")
    };

    //SEA
    const seaOutputs = {
        seawater: new Resource("seawater", 0, 1, "liquid"),
        seasnail: new Resource("sea snail", 0, 1, "critter"),
        shell: new Resource("shell", 0, 1, "other"),
        duneGrass: new Resource("dune grass", 0, 1, "plant")
    };

    //FIELDS
    const rice = new Resource("rice", 0, 1, "crop");
    const fieldTypes = ["barley", "corn", "hop", "potato", "rice", "wheat"];

    //PROCESSED
    const wheat = new Resource("wheat", 0, 1, "crop");
    const flour = new Resource("flour", 0, 1, "product");

    //PROCESSORS NEEDED IN THE GAME
    var kiln;
    const mill = new Processor("windmill", wheat, flour, 0.25, "outside");

    //PROCESSES NEEDED IN THE GAME
    const graanMalen = new Process("graan malen", 10, wheat, mill, flour);
    mill.addPossibleProcess(graanMalen);

    //SOURCES
    const apairy = new Source("Apairy", 10, "inside");
    const forest = new Source("Forest", 10, "outside");
    const well = new Source("Well", 10, "outside");
    const sea = new Source("Sea", 10, "outside");

    //ACTIONS DONE FOR PROCESSES
    game1.getProcesses().addAnItem(graanMalen);

    //LOADING OUTPUT IN SOURCES
    apairy.setOutputList(apairyOutputs);
    forest.setOutputList(forestOutputs);
    well.setOutputList(wellOutputs);
    sea.setOutputList(seaOutputs);

    //SETTING FIELDTYPES
    game1.setFieldCategories(fieldTypes);

    //MAKING FIELD
    const ricefield = new Field(game1.getAmtOfFieldsMade(), game1.getPriceOfAField(), rice, game1.getFieldCategories());
    game1.setAmtOfFieldsMade(1);

    //LOADING EVERYTHING INTO THE GAME
    game1.getSources().addAnItem(apairy);
    game1.getSources().addAnItem(forest);
    game1.getSources().addAnItem(well);
    game1.getSources().addAnItem(sea);
    game1.getProcessors().addAnItem(mill);
    game1.getFields().addAnItem(ricefield);

    $(document).ready(function () {

        //IDEAS
        console.log("IDEAS:");
        console.log("- TOOLTIP FOR RESOURCES ON MARKET (VALUE + TYPE)");
        console.log("- MONKS ON MARKETPLACE");

        //ENLIGHTENMENT LIST

        const theWayOfTheLittleOne = new Enlightenment("The way of the little one","There was once a little one called Liya.");
        theWayOfTheLittleOne.setRequirement("believe",1);
        theWayOfTheLittleOne.setEffect("totalAmtOfMonks","Amount of monks multiplied by 10");

        game1.getChapel().getEnlightenmentList().addAnItem(theWayOfTheLittleOne);

        //EXPERIMENTAL: BREWERY + RECIPES

        const ale = new Resource("Ale", 20, 50, "beer");

        //INGREDIENTSLIST
        const aleIngredients = new List();

        //Basic ingredients
        const wheat = new Resource("wheat", 30, 1, "crop");
        const hop = new Resource("hop", 10, 1, "crop");
        const water = new Resource("water", 50, 1, "liquid");

        //Special ingredient
        const daisy = new Resource("daisy", 20, 1, "flower");

        aleIngredients.addAnItem(wheat);
        aleIngredients.addAnItem(hop);
        aleIngredients.addAnItem(water);

        aleIngredients.addAnItem(daisy);

        //These are the inputs of our further steps in the scheme
        const malt = new Resource("malt", 20, 1, "product");
        const starch = new Resource("starch", 10, 1, "product");
        const sugarWater = new Resource("sugar water", 30, 1, "liquid");
        const pulp = new Resource("pulp", 10, 1, "product");
        const wort = new Resource("wort", 20, 1, "liquid");
        const beerToFerment = new Resource("beer to ferment", 20, 1, "liquid");
        const fermentedBeer = new Resource("fermented beer", 20, 1, "liquid");
        const beerToRipe = new Resource("beer to ripe", 20, 1, "liquid");
        const ripeBeer = new Resource("ripe beer", 20, 1, "liquid");

        //BREWERY

        //Maybe work with itemcategories instead of names? !!!!
        const mashingInput = new List();
        mashingInput.addListOfItems([starch, water]);

        const cookingInput = new List();
        cookingInput.addListOfItems([sugarWater, hop]);

        const bucketInput = new List();
        bucketInput.addListOfItems([pulp, fermentedBeer, ripeBeer]);

        const bucketOutput = new List();
        bucketOutput.addListOfItems([wort, beerToRipe, ale]);

        const cooldownInput = new List();
        cooldownInput.addListOfItems([wort, daisy]);

        //These are the processors needed for this scheme
        const breweryEquipment = new List();

        const kiln = new Processor("Kiln", wheat, malt, 0.5, "brewery");
        const gristmill = new Processor("Gristmill", malt, starch, 0.5, "outside");
        const mashingTun = new Processor("Mashing tun", mashingInput, sugarWater, 3, "brewery");
        const brewKettle = new Processor("Brew Kettle", cookingInput, pulp, 0.25, "brewery");
        const filterBucket = new Processor("Filter bucket", bucketInput, bucketOutput, 1.50, "brewery");
        const spiralHeatExchanger = new Processor("Spiral heat exchanger", breweryEquipment, beerToFerment, 1, "brewery");
        const fermentationTank = new Processor("Fermentation tank", beerToFerment, fermentedBeer, 1, "brewery");
        const barrel = new Processor("Barrel", beerToRipe, ripeBeer, 1, "brewery");

        breweryEquipment.addAnItem(kiln);
        breweryEquipment.addAnItem(gristmill);
        breweryEquipment.addAnItem(mashingTun);
        breweryEquipment.addAnItem(brewKettle);
        breweryEquipment.addAnItem(filterBucket);
        breweryEquipment.addAnItem(spiralHeatExchanger);
        breweryEquipment.addAnItem(fermentationTank);
        breweryEquipment.addAnItem(barrel);

        game1.getBrewery().setEquipment(breweryEquipment);

        //SCHEME

        //These are the steps we need to follow
        const malting = new Process("Malting", 10, wheat, kiln, malt);
        const grinding = new Process("Grinding", 10, malt, gristmill, starch);
        const mashing = new Process("Mashing", 10, mashingInput, mashingTun, sugarWater);
        const cooking = new Process("Cooking", 10, cookingInput, brewKettle, pulp);
        const filtering1 = new Process("First filtering", 10, pulp, filterBucket, wort);
        const cooldown = new Process("Cooldown", 10, cooldownInput, spiralHeatExchanger, beerToFerment);
        const fermenting = new Process("Fermenting", 10, beerToFerment, fermentationTank, fermentedBeer);
        const filtering2 = new Process("Second filtering", 10, fermentedBeer, filterBucket, beerToRipe);
        const ripening = new Process("Ripening", 10, beerToRipe, barrel, ripeBeer);
        const filtering3 = new Process("Third filtering", 10, ripeBeer, filterBucket, ale);

        //Let's put these steps into a Scheme
        const aleScheme = new Scheme();

        aleScheme.addStep(malting);
        aleScheme.addStep(grinding);
        aleScheme.addStep(mashing);
        aleScheme.addStep(cooking);
        aleScheme.addStep(filtering1);
        aleScheme.addStep(cooldown);
        aleScheme.addStep(fermenting);
        aleScheme.addStep(filtering2);
        aleScheme.addStep(ripening);
        aleScheme.addStep(filtering3);

        const aleRecipe = new Recipe(ale, aleIngredients, aleScheme, "Liya");

        game1.addARecipe(aleRecipe);

        //EXPERIMENT: VENDOR

        const mauritsInterests = new List();
        mauritsInterests.addListOfItems(["beer","flower"]);

        const maurits = new Vendor("Maurits", mauritsInterests);

        const zinasInterests = new List();
        zinasInterests.addListOfItems(["critter","crop"]);

        const zina = new Vendor("Zina", zinasInterests);

        game1.getVendors().addAnItem(maurits);
        game1.getVendors().addAnItem(zina);

        //End of to-move

        $('#abbey').show();
        $('.menu a:first-child').addClass("active");

        $('#secondaryWork a:first-child').addClass("active");

        //TESTPLAYER
        const Laerolf = new Player("Laerolf", 1000, 50);
        game1.setAPlayer(Laerolf);

        showNCRCounter(game1);
        showStock(game1.getStock().allItemsIntoAStockWay());
        showMonks(game1);

        buildFields(game1);
        showInstances(game1, "source", "inside");
        showInstances(game1, "source", "outside");
        showInstances(game1, "processor", "outside");

        showRecipesAsOptions(game1);
        showStory(game1);
        showBrewery(game1);
        showMarket(game1);
        showChapel(game1);

        //EXPERIMENTAL

        let schemeString = "<h2>Schemes</h2>";

        for (let recipeNr = 0; recipeNr < game1.getRecipes().getSize(); recipeNr++) {
            const selectedScheme = game1.getRecipes().getItemByNumber(recipeNr).getScheme();
            selectedScheme.loadUsedStorage();
            schemeString += selectedScheme.visualizeScheme(game1.getRecipes().getItemByNumber(recipeNr).getName());
        }

        $("#main a").on("click", showPage);
        $("#secondaryJob a").on("click", showJobSubpage);
        $("#secondaryBrew a").on("click", showBrewSubpage);
        $(game1.getStock()).on("change", showStock(game1.getStock().allItemsIntoAStockWay(game1.getResourceCategories())));
        $(game1.getPlayer()).on("change", showNCRCounter(game1));
        $("#monks").on("click", function () {
            game1.manageMonks();
            showBrewery(game1);
        });

        $(".phaseAction").on("click", function (e) {
            e.preventDefault();

            const idParts = $(this).attr("id").split("-");
            const stepNr = idParts[1].substr(4);
            const recipeName = idParts[0];
            const selectedTank = game1.getRecipes().getItemByName(recipeName).getScheme().getStepByNumber(stepNr - 1).getStorage();

            selectedTank.raiseFluidLevel(10);
            selectedTank.updateFluidLevel();
        });

        $("#selectedRecipe").on("click", function (e) {
            e.preventDefault();

            const recipe = game1.getRecipes().getItemByNumber($("#recipes").val());

            showRecipeDescription(recipe);
            game1.getBrewery().setSelectedRecipe(recipe);
            showBrewery(game1);
        });

        $("#naam > a").on("click", function (e) {
            e.preventDefault();

            showProfilePage(game1);

            $('.workspace > div').hide();
            $('#main a').removeClass("active");
            $('#offCanvasNav a').removeClass("active");

            $("#profile").show();
        });
    });
})(window.jQuery, window, document);