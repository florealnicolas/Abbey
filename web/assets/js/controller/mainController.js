(function ($, window, document) {

    const game1 = new Game();

    //Resources needed in the game

    //FOREST

    //Liya's recommendations

    //const banana = new Resource("banana");
    //const daisy = new Resource("daisy");
    //const rose = new Resource("rose");
    //const chestnut = new Resource("chestnut");
    //const herb -> more specific;

    //Stop

    $(document).ready(function () {

        const game1 = new Game();
        game1.gameInitialisation();

        //TEST: MAKING FIELD
        const rice = getResourcesFromMap("rice");
        const ricefield = new Field(game1.getAmtOfFieldsMade(), game1.getPriceOfAField(), rice, game1.getFieldCategories());
        game1.setAmtOfFieldsMade(1);
        game1.getFields().addAnItem(ricefield);

        //IDEAS
        console.log("IDEAS:");
        console.log("- TOOLTIP FOR RESOURCES ON MARKET (VALUE + TYPE)");
        console.log("- MONKS ON MARKETPLACE");

        //ENLIGHTENMENT LIST

        const theWayOfTheLittleOne = new Enlightenment("The way of the little one","There was once a little one called Liya.");
        theWayOfTheLittleOne.setRequirement("believe",1);
        theWayOfTheLittleOne.setEffect("totalAmtOfMonks","Amount of monks multiplied by 10");

        game1.getChapel().getEnlightenmentList().addAnItem(theWayOfTheLittleOne);

        //UPGRADE LIST

        //const golden

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
        showWorkshop(game1);
        showStorage(game1);

        $("#main a").on("click", showPage);
        $("#secondaryJob a").on("click", showJobSubpage);
        $("#secondaryBrew a").on("click", showBrewSubpage);
        $(game1.getStock()).on("change", showStock(game1.getStock().allItemsIntoAStockWay(game1.getResourceCategories())));
        $(game1.getPlayer()).on("change", showNCRCounter(game1));
        $("#monks input").on("change", function () {
            game1.getAbbey().manageMonks(game1, this);
            showBrewery(game1);
        });

        $("#selectedRecipe").on("click", function (e) {
            e.preventDefault();

            const recipe = game1.getRecipes().getItemByNumber($("#recipes").val());

            showRecipeDescription(recipe);
            game1.getBrewery().setSelectedRecipe(recipe);
            showBrewery(game1);
            showStorage(game1);
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