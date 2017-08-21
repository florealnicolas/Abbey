const enlightenmentTest = function (neededForTesting) {
//TEST 8: Enlightenment
    console.log("TEST 8: Enlightenment\n");

    const assertEquals = neededForTesting.assertEquals;

    const dummyGame3 = new Game();

// Let's build a Chapel
    const chapel = dummyGame3.getChapel();

// The Chapel hasn't any enlightenment to offer, right? Or not yet! ;)

    assertEquals(0, chapel.getEnlightenmentList().getSize());

// Let's change that! We will make a enlightenment called "The way of the little one"
// You should have a believe of 5 to learn the enlightenment
// The enlightenment has an effect that we have monks 10 times more than before

    const theWayOfTheLittleOne = new Enlightenment("The way of the little one", "There was once a little one called Liya.");
    theWayOfTheLittleOne.setRequirement("believe", 5);
    theWayOfTheLittleOne.setEffect("totalAmtOfMonks", dummyGame3.totalAmtOfMonks * 10);

    assertEquals(5, theWayOfTheLittleOne.getRequirements()["believe"]);

// The Chapel now didn't reach enlightenment enough to learn this enlightenment

    assertEquals(false, theWayOfTheLittleOne.ableToLearn(chapel));

// After some time the Chapel reaches enough enlightening to earn the way of living

    chapel.setBelieve(5);

    assertEquals(true, theWayOfTheLittleOne.ableToLearn(chapel));

// If we can believe it, we don't we learn it?

    assertEquals(20, dummyGame3.getAbbey().getTotalAmtOfMonks());

    theWayOfTheLittleOne.learnEnlightenment(dummyGame3);
    dummyGame3.applyEffects();

    assertEquals(200, dummyGame3.getAbbey().getTotalAmtOfMonks());

//End of test 8

};