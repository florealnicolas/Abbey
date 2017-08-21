const developmentMode = function (game) {
    console.log("DEVELOPMENT MODE:");

    //IDEAS
    console.log("IDEAS:");
    console.log("- TOOLTIP FOR RESOURCES ON MARKET (VALUE + TYPE)");
    console.log("- MONKS ON MARKETPLACE");
    console.log("- IMPLEMENT RANDOM WITH PROBABILITY (CHANCE.JS)");

    //TESTPLAYER
    const Laerolf = new Player("Laerolf", 1000, 50);
    game.setAPlayer(Laerolf);

    //TEST: MAKING FIELD
    const rice = getResourcesFromMap("rice");
    const ricefield = new Field(game.getAmtOfFieldsMade(), game.getPriceOfAField(), rice, game.getFieldCategories());
    game.setAmtOfFieldsMade(1);
    game.getFields().addAnItem(ricefield);

    //First I write my testfunction -> assertEquals()
    const neededForTesting = {
        assertEquals: function assertEquals(expectedValue, realValue) {
            if (expectedValue !== realValue) {
                console.log("You are expecting '", expectedValue, "' but the real thing is '", realValue, "'.");
            }
        }
    };

    //TESTS
    console.log('The little canary Liya chirrups: "I am alive and kicking!".');
    listTest(neededForTesting);
    resourceTest(neededForTesting);
    playerTest(neededForTesting);
    gameTest(neededForTesting);
    recipeTest(neededForTesting);
    processPhaseTest(neededForTesting);
    vendorTest(neededForTesting);
    enlightenmentTest(neededForTesting);
};