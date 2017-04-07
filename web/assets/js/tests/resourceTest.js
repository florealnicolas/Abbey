//TEST 2: Resource
//We make 3 resources, add them to stock and remove 1 from stock
console.log("TEST 2: Resource\n");

var dummyGame2 = new Game();
var strawberry = new Resource("Strawberry", 2, 1, "fruit");
var wood = new Resource("Wood", 5, 1, "material");
var fun = new Resource("Fun", 100, 1, "experience");

dummyGame2.getStock().addAnItem(strawberry);
dummyGame2.getStock().addAnItem(wood);
dummyGame2.getStock().addAnItem(fun);

//Are there 3 resources in stock?
assertEquals(3, dummyGame2.getStock().getSize());

//Remove wood from stock
dummyGame2.getStock().removeAnItem(wood);

//Is our wood removed from stock? + Give me your number, please!
assertEquals("Stock: 2 units of strawberry and 100 units of fun.", dummyGame2.getStock().allItemsToStringWithName("Stock"));

//I'll use some fun to build this, do we have some in stock?
assertEquals(true, dummyGame2.getStock().contains(fun));

//Great, let's use some and I'm feeling a little hungry, so let's eat 2 strawberries!
var energy = new Resource("Energy");

//But first, we need a Mouth and the ability to eat
var mouth = new Processor("Mouth", strawberry, energy, 1, "inside");

dummyGame2.processors.addAnItem(mouth);

var eat = new Process("eat", 1, strawberry, mouth, energy);

dummyGame2.addProcess(eat);

//Let's eat our last 2 strawberries!
var gain = dummyGame2.getProcessors().getItemByName(eat.getProcessorName()).testFromInputToOutput(strawberry, 2, dummyGame2);

//We receive 4 energy units of eating 2 strawberries
assertEquals("4 units of Energy", gain.toString());

//Let's add it to our stock!
dummyGame2.getStock().addAnItem(gain);

//How many strawberries are there now? 2 - 2 = 0
//That means... It shouldn't be in Stock anymore???
assertEquals(-1, dummyGame2.getStock().getIndex(strawberry));

//Ow, wait! We got a new resource from eating strawberries!
assertEquals(2, dummyGame2.getStock().getSize());

//Let's say we bought a couple of tomatoes...
//Let's say we don't know a tomato is a fruit.

var tomatoes = new Resource("Tomato", 2, 1, "fruit");

//assertEquals("vegetable", tomatoes.getCategory());

//Now we remember, a tomato is fruit!

assertEquals("fruit", tomatoes.getCategory());

//But how much are these tomatoes worth all together? We know 1 tomato is worth 1 coin
//2 * 1 = 2

assertEquals(2, tomatoes.getQuantity() * tomatoes.getUnitValue());

//Great, we will be rich if we have 1 million of them!

//End of test 2