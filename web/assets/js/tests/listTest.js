//First I write my testfunction -> assertEquals()
function assertEquals(expectedValue, realValue) {
    if (expectedValue !== realValue) {
        console.log("You are expecting '", expectedValue ,"' but the real thing is '", realValue ,"'.");
    }
}

console.log('The little canary Liya chirrups: "I am alive and kicking!".');

//TEST 1: List
//We make 2 resources and add them to the stock
console.log("TEST 1: List\n");

const melon = new Resource("Melon", 5);
const banana = new Resource("Banana", 2);
const dummyGame = new Game();

dummyGame.getStock().addAnItem(melon);
dummyGame.getStock().addAnItem(banana);

//Are there 2 resources inside the stock of the game?
assertEquals(2, dummyGame.getStock().getSize());

//These have to be the same???
assertEquals("Banana", banana.getName());

//We make a task and add it to the games tasklist
const oogsten = new Process("Oogsten", 10);
dummyGame.getProcesses().addAnItem(oogsten);

//How much time is it to seize everything?
assertEquals(10, dummyGame.getProcesses().getItemByNumber(0).getTime());

//What tasks contains our little game?
assertEquals("Tasks: oogsten.", dummyGame.getProcesses().allItemsToStringWithName("Tasks"));

//How much time do you need for "Oogsten"?
assertEquals(10, dummyGame.getProcesses().getItemByName("Oogsten").getTime());

//End of test 1