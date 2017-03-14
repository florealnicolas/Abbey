(function ($, window, document) {

    var game1 = new Game();

    //Resources needed in the game

    //APAIRY
    var apairyOutputs = {
        honey: new Resource("honey", 0, 1, "natural product"),
        bee: new Resource("bee", 0, 1, "critter")
    };

    //FOREST

    //Liya's recommendations

    //var banana = new Resource("banana");
    //var daisy = new Resource("daisy");
    //var rose = new Resource("rose");
    //var chestnut = new Resource("chestnut");
    //var herb -> more specific;

    //Stop

    var forestOutputs = {
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
    var wellOutputs = {
        water: new Resource("water", 0, 1, "liquid"),
        frog: new Resource("frog", 0, 1, "critter")
    };

    //SEA
    var seaOutputs = {
        seawater: new Resource("seawater", 0, 1, "liquid"),
        seasnail: new Resource("sea snail", 0, 1, "critter"),
        shell: new Resource("shell", 0, 1, "other"),
        duneGrass: new Resource("dune grass", 0, 1, "plant")
    };

    //FIELDS
    var rice = new Resource("rice", 0, 1, "crop");
    var fieldTypes = ["barley", "corn", "hop", "potato", "rice", "wheat"];

    //PROCESSED
    var wheat = new Resource("wheat", 0, 1, "crop");
    var flour = new Resource("flour", 0, 1, "product");

    //PROCESSORS NEEDED IN THE GAME
    var mill = new Processor("windmill", wheat, flour, 0.25, "outside");

    //PROCESSES NEEDED IN THE GAME
    var graanMalen = new Process("graan malen", 10, wheat, mill, flour);
    mill.addPossibleProcess(graanMalen);

    //SOURCES
    var apairy = new Source("Apairy", 10, "inside");
    var forest = new Source("Forest", 10, "outside");
    var well = new Source("Well", 10, "outside");
    var sea = new Source("Sea", 10, "outside");

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
    var ricefield = new Field(game1.getAmtOfFieldsMade(), game1.getPriceOfAField(), rice, game1.getFieldCategories());
    game1.setAmtOfFieldsMade(1);

    //LOADING EVERYTHING INTO THE GAME
    game1.getSources().addAnItem(apairy);
    game1.getSources().addAnItem(forest);
    game1.getSources().addAnItem(well);
    game1.getSources().addAnItem(sea);
    game1.getProcessors().addAnItem(mill);
    game1.getFields().addAnItem(ricefield);

    $(document).ready(function () {

        //EXPERIMENTAL
        var aleIngredients = new List();

        var angelTears = new Resource("Angel tears", 10, 1, "liquid");
        var daisy = new Resource("Daisy", 20, 1, "flower");
        var water = new Resource("Water", 50, 1, "liquid");
        var yeast = new Resource("Yeast", 30, 1, "product");

        aleIngredients.addAnItem(angelTears);
        aleIngredients.addAnItem(daisy);
        aleIngredients.addAnItem(water);
        aleIngredients.addAnItem(yeast);

        //These are the ingredients that we need to have to get beer
        var wheat = new Resource("wheat", 1, 1, "crop");
        var malt = new Resource("malt", 1, 1, "product");
        var starch = new Resource("starch", 1, 1, "product");
        var sugarWater = new Resource("Sugar water", 1, 1, "liquid");
        var hop = new Resource("Hop", 1, 1, "plant");
        var pulp = new Resource("Pulp", 1, 1, "product");
        var wort = new Resource("Wort", 1, 1, "liquid");
        var beerToFerment = new Resource("Beer to ferment", 1, 1, "liquid");
        var fermentedBeer = new Resource("Fermented beer", 1, 1, "liquid");
        var beerToRipe = new Resource("Beer to ripe", 1, 1, "liquid");
        var ripeBeer = new Resource("Ripe beer", 1, 1, "liquid");
        var beer = new Resource("Beer", 1, 1, "product");

        var mashingInput = new List();
        mashingInput.addListOfItems([starch, water]);

        var cookingInput = new List();
        cookingInput.addListOfItems([sugarWater, hop]);

        //These are the steps we need to follow
        var malting = new Process("Malting", 10, wheat, windmill, malt);
        var grinding = new Process("Grinding", 10, malt, windmill, starch);
        var mashing = new Process("Mashing", 10, mashingInput, windmill, sugarWater);
        var cooking = new Process("Cooking", 10, cookingInput, windmill, pulp);
        var filtering1 = new Process("First filtering", 10, pulp, windmill, wort);
        var cooldown = new Process("Cooldown", 10, wort, windmill, beerToFerment);
        var fermenting = new Process("Fermenting", 10, beerToFerment, windmill, fermentedBeer);
        var filtering2 = new Process("Second filtering", 10, fermentedBeer, windmill, beerToRipe);
        var ripening = new Process("Ripening", 10, beerToRipe, windmill, ripeBeer);
        var filtering3 = new Process("Third filtering", 10, ripeBeer, windmill, beer);

        //Let's put these steps into a Scheme
        var aleScheme = new Scheme();

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

        var ale = new Resource("Ale");

        var aleRecipe = new Recipe(ale, aleIngredients, aleScheme, "Liya");

        game1.getRecipes().addAnItem(aleRecipe);

        //End of to-move

        $('#abbey').show();
        $('.menu a:first-child').addClass("active");

        $('#secondary a:first-child').addClass("active");

        //TESTPLAYER
        var Laerolf = new Player("Laerolf", 1000, 50);
        game1.setAPlayer(Laerolf);

        showNCRCounter(game1);
        showStock(game1.getStock().allItemsIntoAStockWay());
        showPeople(game1);

        buildFields(game1);
        showInstances(game1, "source", "inside");
        showInstances(game1, "source", "outside");
        showInstances(game1, "processor", "outside");

        showRecipesAsOptions(game1);
        showStory(game1);

        var schemeString = "<h2>Schemes</h2>";

        //EXPERIMENTAL
        for (var recipeNr = 0; recipeNr < game1.getRecipes().getSize(); recipeNr++) {
            var selectedScheme = game1.getRecipes().getItemByNumber(recipeNr).getScheme();
            selectedScheme.loadUsedStorage();
            schemeString += selectedScheme.visualizeScheme(game1.getRecipes().getItemByNumber(recipeNr).getName());
        }

        $("#research").append(schemeString);

        $("#main a").on("click", showPage);
        $("#secondary a").on("click", showSubpage);
        $(game1.getStock()).on("change", showStock(game1.getStock().allItemsIntoAStockWay()));
        $(game1.getPlayer()).on("change", showNCRCounter(game1));
        $("#people").on("click", game1.manageMonks);


        $(".phaseAction").on("click", function (e) {
            e.preventDefault();

            var idParts = $(this).attr("id").split("-");
            var stepNr = idParts[1].substr(4);
            var recipeName = idParts[0];
            var selectedTank = game1.getRecipes().getItemByName(recipeName).getScheme().getStepByNumber(stepNr - 1).getStorage();

            selectedTank.raiseFluidLevel(10);
            selectedTank.updateFluidLevel();
        });

        $("#selectedRecipe").on("click", function (e) {
            e.preventDefault();
            showRecipeDescription(game1)
        });
    });
})(window.jQuery, window, document);