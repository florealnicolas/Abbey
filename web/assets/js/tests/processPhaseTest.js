//TEST 6: Processes & Phases
console.log("TEST 6: Processes & Phases\n");

//We should start a new Game here
var dummyGame2 = new Game();

//These are the ingredients that we need to have to get beer
var wheat = new Resource("wheat", 1);
var malt = new Resource("malt", 1);
var starch = new Resource("starch", 1);
var sugarWater = new Resource("Sugar water", 1);
var hop = new Resource("Hop", 1);
var pulp = new Resource("Pulp", 1);
var wort = new Resource("Wort", 1);
var beerToFerment = new Resource("Beer to ferment", 1);
var fermentedBeer = new Resource("Fermented beer", 1);
var beerToRipe = new Resource("Beer to ripe", 1);
var ripeBeer = new Resource("Ripe beer", 1);
var beer = new Resource("Beer", 1);

var mashingInput = [starch, water];
var cookingInput = [sugarWater, hop];

//These are the processors needed for this scheme

var windmill = new Processor("windmill", wheat, malt, 1, "outside");

//These are the steps we need to follow
var malting = new Process("Malting", 10, wheat, windmill, malt);
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
var brewingProcess = new Scheme();

brewingProcess.addStep(malting);
brewingProcess.addStep(grinding);
brewingProcess.addStep(mashing);
brewingProcess.addStep(cooking);
brewingProcess.addStep(filtering1);
brewingProcess.addStep(cooldown);
brewingProcess.addStep(fermenting);
brewingProcess.addStep(filtering2);
brewingProcess.addStep(ripening);
brewingProcess.addStep(filtering3);

//We should have 10 steps
assertEquals(10, brewingProcess.getAmtOfSteps());

//The first step is malting, right?
assertEquals("Malting", brewingProcess.getStepByNumber(0).getName());

//Then that means the last one is... Filtering3
assertEquals("Third filtering", brewingProcess.getStepByNumber(9).getName());

//Let's try to malt some wheat
dummyGame2.getStock().addAnItem(new Resource("wheat", 10, 1, "crop"));
var maltOutput = malting.getProcessor().testFromInputToOutput(wheat, 10, dummyGame2);

assertEquals("malt", maltOutput.getName());

//End of test 6