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

        $.get("./localStorage/etc/environment", function (environment) {

            const active = eval(window.sessionStorage.getItem('active'));

            console.log("ACTIVE", active);

            const game1 = new Game();
            game1.gameInitialisation();

            if (!active) {
                showWelcomePage();
            }

            else {

                //console.log("USER", window.sessionStorage.user);
                const activeUser = JSON.parse(window.sessionStorage.user);
                console.log("USER", activeUser);

                const activePlayer = new Player(activeUser.userName, activeUser.coins, activeUser.reputation);
                activePlayer.setPlayerGendre(activeUser.gendre);
                activePlayer.setPassword(activeUser.password);
                game1.setAPlayer(activePlayer);
                showNCRCounter(game1);
                game1.strangerMode("OFF");
            }

            if (environment === "development") {
                developmentMode(game1);
            }

            $('#abbey').show();
            $('.menu a:first-child').addClass("active");

            $('#secondaryWork a:first-child').addClass("active");

            showNCRCounter(game1);
            showStock(game1.getStock());
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

           /* $("#selectedRecipe").on("click", function (e) {
                e.preventDefault();

                const recipe = game1.getRecipes().getItemByNumber($("#recipes").val());

                const schemeGameSteps = recipe.getScheme().getSteps();
                const schemeMapSteps = schemeMap[recipe.mapScheme].steps;

                const schemeGameIngredientsList = recipe.ingredients;

                for (let step in schemeGameSteps) {
                    if (schemeGameSteps.hasOwnProperty(step)) {
                        let selectedGameStep = schemeGameSteps[step];
                        let selectedMapStep = schemeMapSteps[selectedGameStep.mapName];

                        let gameInput = selectedGameStep.getInput();
                        let mapInput = selectedMapStep.input;

                        if (gameInput.constructor.name !== "Array" && gameInput.name === mapInput.name) {

                            let selectedOutTheIngredients = schemeGameIngredientsList.getItemByName(gameInput.name);

                            if (selectedOutTheIngredients !== null) {
                                gameInput.setQuantity(selectedOutTheIngredients.quantity);
                            }

                            else {
                                gameInput.setQuantity(mapInput.amount);
                            }

                        }

                        if (gameInput.constructor.name === "Array") {
                            for (let item in gameInput) {
                                if (gameInput.hasOwnProperty(item)) {

                                    let selectedItem = gameInput[item];
                                    let mapItem = mapInput[item];

                                    //console.log("SELECTED GAME ITEM " + selectedItem.name,selectedItem);
                                    //console.log("SELECTED MAP ITEM " + mapItem.name,mapItem);

                                    if (selectedMapStep.name === "cooldown") {

                                        console.log("COOLDOWN",selectedMapStep);

                                        let recipeName = recipe.getName() + "Recipe";

                                        if (recipe.getName().indexOf(" ") !== -1) {
                                            recipeName = recipe.getName().split(" ");
                                            recipeName = recipeName[0] + (recipeName[1].substring(0, 1).toUpperCase() + recipeName[1].substring(1)) + "Recipe";
                                        }

                                        recipeName = recipeName.replace("'", "");

                                        let specialIngredient = recipeMap[recipeName].specialIngredient;

                                        //Adding special ingredient to cooldown step
                                        recipe.getScheme().getStepByName("cooldown").getInput().push(new Resource(specialIngredient.name, specialIngredient.amount, 0, getResourcesFromMap(specialIngredient.name).category));
                                    }

                                    let selectedOutTheIngredients = schemeGameIngredientsList.getItemByName(selectedItem.name);

                                    if (selectedOutTheIngredients !== null) {
                                        selectedItem.setQuantity(selectedOutTheIngredients.quantity);
                                    }

                                    else {
                                        selectedItem.setQuantity(mapItem.amount);
                                    }
                                }
                            }
                        }
                    }
                }

                showRecipeDescription(recipe);
                game1.getBrewery().setSelectedRecipe(recipe);

                showBrewery(game1);
                showStorage(game1);
            });*/

            $("#selectedRecipe").on("click", function (e) {
                e.preventDefault();

                const recipe = game1.getRecipes().getItemByNumber($("#recipes").val());

                console.log("RECIPE", recipe);

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