//TEST 6: Processes & Phases
console.log("TEST 6: Processes & Phases\n");

//We should start a new Game here
const dummyGame2 = new Game();

//These are the ingredients that we need to have to get beer
const wheat = new Resource("wheat", 1);
const malt = new Resource("malt", 1);
const starch = new Resource("starch", 1);
const sugarWater = new Resource("Sugar water", 1);
const hop = new Resource("Hop", 1);
const pulp = new Resource("Pulp", 1);
const wort = new Resource("Wort", 1);
const beerToFerment = new Resource("Beer to ferment", 1);
const fermentedBeer = new Resource("Fermented beer", 1);
const beerToRipe = new Resource("Beer to ripe", 1);
const ripeBeer = new Resource("Ripe beer", 1);
const beer = new Resource("Beer", 1);

const mashingInput = [starch, water];
const cookingInput = [sugarWater, hop];

//These are the processors needed for this scheme

const windmill = new Processor("windmill", wheat, malt, 1, "outside");

//These are the steps we need to follow
const malting = new Process("Malting", 10, wheat, windmill, malt);
const grinding = new Process("Grinding", 10, malt, starch);
const mashing = new Process("Mashing", 10, mashingInput, sugarWater);
const cooking = new Process("Cooking", 10, cookingInput, pulp);
const filtering1 = new Process("First filtering", 10, pulp, wort);
const cooldown = new Process("Cooldown", 10, wort, beerToFerment);
const fermenting = new Process("Fermenting", 10, beerToFerment, fermentedBeer);
const filtering2 = new Process("Second filtering", 10, fermentedBeer, beerToRipe);
const ripening = new Process("Ripening", 10, beerToRipe, ripeBeer);
const filtering3 = new Process("Third filtering", 10, ripeBeer, beer);

//Let's put these steps into a Scheme
const brewingProcess = new Scheme();

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

dummyGame2.getProcessors().addAnItem(windmill);
dummyGame2.addProcess(malting);

//We should have 10 steps
assertEquals(10, brewingProcess.getAmtOfSteps());

//The first step is malting, right?
assertEquals("Malting", brewingProcess.getStepByNumber(0).getName());

//Then that means the last one is... Filtering3
assertEquals("Third filtering", brewingProcess.getStepByNumber(9).getName());

//Let's try to malt some wheat
dummyGame2.getStock().addAnItem(new Resource("wheat", 10, 1, "crop"));
const maltOutput = dummyGame2.getProcessors().getItemByName(malting.getProcessorName()).testFromInputToOutput(wheat, 10, dummyGame2);

assertEquals("malt", maltOutput.getName());

//End of test 6