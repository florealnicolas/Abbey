const playerTest = function (neededForTesting) {

//TEST 3: Player
    console.log("TEST 3: Player\n");

    const assertEquals = neededForTesting.assertEquals;

//Make a player -> Liya
    const Liya = new Player("Liya", 0, 0);

//What's your name? Liya, right?
    assertEquals("Liya", Liya.getPlayerName());

//Here you go!
    Liya.addCoins(100);
    assertEquals(100, Liya.getCoins());

//End of test 3
};