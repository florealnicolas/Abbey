//TEST 4: Game
console.log("TEST 4: Game\n");

//We make a little game and assign a Player to it
var Nicolas = new Player("Nicolas", 0, 0);
var testGame = new Game();

//The Game doens't contain a Player at the moment, right??
assertEquals(null, testGame.getPlayer());

//Now we put Nicolas in the testGame
testGame.setAPlayer(Nicolas);
assertEquals(Nicolas.getPlayerName(), testGame.getPlayer().getPlayerName());

//How many monks are in the abbey?
assertEquals(20, testGame.getTotalAmtOfMonks());

//End of test 4