//TEST 2: Resource
//We make 3 resources, add them to stock and remove 1 from stock
console.log("TEST 2: Resource\n");

var dummyGame2 = new Game();
var strawberry = new Resource("Strawberry", 2);
var wood = new Resource("Wood", 5);
var fun = new Resource("Fun", 100);

dummyGame2.getStock().addAnItem(strawberry);
dummyGame2.getStock().addAnItem(wood);
dummyGame2.getStock().addAnItem(fun);

//Are there 3 resources in stock?
assertEquals(3, dummyGame2.getStock().getSize());

//Remove wood from stock
dummyGame2.getStock().removeAnItem(wood);

//Is our wood removed from stock? + Give me your number, please!
assertEquals("Stock: 2 strawberry and 100 fun.", dummyGame2.getStock().allItemsToStringWithName("Stock"));

//I'll use some fun to build this, do we have some in stock?
assertEquals(true, dummyGame2.getStock().contains(fun));

//Great, let's use some and I'm feeling a little hungry, so let's eat 2 strawberries!
var energy = new Resource("Energy");
var eat = new Process("eat", 1, strawberry, energy, dummyGame2);

//But first, we need a Mouth
var mouth = new Processor("Mouth", eat, 1, "inside");

//Let's eat our last 2 strawberries!
var gain = mouth.testFromInputToOutput(2, dummyGame2);

//We receive 4 energy units of eating 2 strawberries
assertEquals("4 Energy", gain.toString());

//Let's add it to our stock!
dummyGame2.getStock().addAnItem(gain);

//How many strawberries are there now? 2 - 2 = 0
//That means... It shouldn't be in Stock anymore???
assertEquals(-1, dummyGame2.getStock().getIndex(strawberry));

//Ow, wait! We got a new resource from eating strawberries!
assertEquals(2, dummyGame2.getStock().getSize());

//End of test 2