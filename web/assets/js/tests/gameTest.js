const gameTest = function (neededForTesting) {

//TEST 4: Game
    console.log("TEST 4: Game\n");

    const assertEquals = neededForTesting.assertEquals;

//We make a little game and assign a Player to it
    const Nicolas = new Player("Nicolas", 0, 0);
    const testGame = new Game();

//The Game doens't contain a Player at the moment, right??
    assertEquals(null, testGame.getPlayer());

//Now we put Nicolas in the testGame
    testGame.setAPlayer(Nicolas);
    assertEquals(Nicolas.getPlayerName(), testGame.getPlayer().getPlayerName());

//How many monks are in the abbey?
    assertEquals(20, testGame.getAbbey().getTotalAmtOfMonks());

//End of test 4
};