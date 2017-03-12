(function ($, window, document) {

    var game1 = new Game();

    //Resources needed in the game

    //APAIRY
    var apairyOutputs = {
        honey: new Resource("honey",0,"mass"),
        bee: new Resource("bee",0,"mass")
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
        raspberry: new Resource("raspberry",0,"mass"),
        cranberry: new Resource("cranberry",0,"mass"),
        strawberry: new Resource("strawberry",0,"mass"),
        wood: new Resource("wood",0,"mass"),
        woodSorrel: new Resource("wood sorrel",0,"mass"),
        mushroom: new Resource("mushroom",0,"mass"),
        chicory: new Resource("chicory",0,"mass"),
        chestnut: new Resource("chestnut",0,"mass"),
        rose: new Resource("rose",0,"mass"),
        daisy: new Resource("daisy",0,"mass"),
        banana: new Resource("banana",0,"mass")
    };

    //WELL
    var wellOutputs = {
        water: new Resource("water",0,"mass"),
        frog: new Resource("frog",0,"mass")
    };

    //SEA
    var seaOutputs = {
        seawater: new Resource("seawater",0,"fluid"),
        seasnail: new Resource("sea snail",0,"mass"),
        shell: new Resource("shell",0,"mass"),
        duneGrass: new Resource("dune grass",0,"mass")
    };

    //FIELDS
    var rice = new Resource("rice");
    var fieldTypes = ["barley", "corn", "hop", "potato", "rice", "wheat"];

    //PROCESSED
    var wheat = new Resource("wheat",0,"mass");
    var flour = new Resource("flour",0,"mass");

    //PROCESSES NEEDED IN THE GAME
    var graanMalen = new Process("graan malen", 10, wheat, flour, game1);

    //PROCESSORS NEEDED IN THE GAME
    var mill = new Processor("windmill", graanMalen, 0.25, "outside");

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

        var angelTears = new Resource("Angel tears", 10, "fluid");
        var daisy = new Resource("Daisy", 20, "mass");
        var water = new Resource("Water", 50, "mass");
        var yeast = new Resource("Yeast", 30, "mass");

        aleIngredients.addAnItem(angelTears);
        aleIngredients.addAnItem(daisy);
        aleIngredients.addAnItem(water);
        aleIngredients.addAnItem(yeast);

        //These are the ingredients that we need to have to get beer
        var wheat = new Resource("wheat", 1, "mass");
        var malt = new Resource("malt", 1, "mass");
        var starch = new Resource("starch", 1, "mass");
        var sugarWater = new Resource("Sugar water", 1, "fluid");
        var hop = new Resource("Hop", 1, "mass");
        var pulp = new Resource("Pulp", 1, "fluid");
        var wort = new Resource("Wort", 1, "fluid");
        var beerToFerment = new Resource("Beer to ferment", 1, "fluid");
        var fermentedBeer = new Resource("Fermented beer", 1, "fluid");
        var beerToRipe = new Resource("Beer to ripe", 1, "fluid");
        var ripeBeer = new Resource("Ripe beer", 1, "fluid");
        var beer = new Resource("Beer", 1, "fluid");

        var mashingInput = new List();
        mashingInput.addListOfItems([starch, water]);
        
        var cookingInput = new List();
        cookingInput.addListOfItems([sugarWater, hop]);

        //These are the steps we need to follow
        var malting = new Process("Malting", 10, wheat, malt);
        var grinding = new Process("Grinding", 10, malt, starch);
        var mashing = new Process("Mashing", 10, mashingInput, sugarWater);
        var cooking = new Process("Cooking", 10, cookingInput, pulp);
        var filtering1 = new Process("First filtering", 10, pulp, wort);
        var cooldown = new Process("Cooldown", 10, wort, beerToFerment);
        var fermenting = new Process("Fermenting", 10, beerToFerment, fermentedBeer);
        var filtering2 = new Process("Second filtering", 10, fermentedBeer, beerToRipe);
        var ripening = new Process("Ripening", 10, beerToRipe, ripeBeer);
        var filtering3 = new Process("Third filtering", 10, ripeBeer, beer);

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
        showStock(game1.getStockInString());
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
        $(game1.getStock()).on("change", showStock(game1.getStockInString()));
        $(game1.getPlayer()).on("change", showNCRCounter(game1));
        $("#people").on("click", game1.manageMonks);


        $(".phaseAction").on("click", function (e) {
            e.preventDefault();

            var idParts = $(this).attr("id").split("-");
            var stepNr = idParts[1].substr(4);
            var recipeName = idParts[0];
            var selectedTank = game1.getRecipes().getItemByName(recipeName).getScheme().getStepByNumber(stepNr-1).getStorage();

            selectedTank.raiseFluidLevel(10);
            selectedTank.updateFluidLevel();
        });

        $("#selectedRecipe").on("click", function (e) {
            e.preventDefault();
            showRecipeDescription(game1)
        });
    });
})(window.jQuery, window, document);