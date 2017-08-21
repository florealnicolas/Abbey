(function ($, window, document) {

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

        $.get("./localStorage/env", function (data) {

            const game1 = new Game();
            game1.gameInitialisation();

            if (data === "development") {
                developmentMode(game1);
            }

            //UPGRADE LIST

            //const golden

            $('#abbey').show();
            $('.menu a:first-child').addClass("active");

            $('#secondaryWork a:first-child').addClass("active");

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

    });
})(window.jQuery, window, document);