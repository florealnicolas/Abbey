//TEST 7: Vendor
console.log("TEST 7: Vendor\n");

const vendor = new Vendor("Maurits", null);

// Once upon a time there was vendor named Maurits...
// It was Maurits, right?

assertEquals("Maurits", vendor.getName());

// Maurits didn't had a preference of buying products

assertEquals(null, vendor.getCategories());

// Or no, he did, right? He sold only beer!

vendor.setCategories("beer");
assertEquals("beer", vendor.getCategories().toString());

// Let's say that we have a beer that we want to sell
// Let's say that it holds your name, dear one

const beer = new Resource("Liya", 10, 10, 'beer');

// We propose it to Maurits, he should be interested in this one

const interested = vendor.proposeItem(beer);
assertEquals(true, interested);

// If he is interested he will give us the total value of our beer "Liya"

const offer = vendor.makeOffer(beer);
assertEquals(10, offer);

// We accept the offer, so we need 10 coins of you, mister Maurits
// So let's make it more practical with a new Game and Player

const dummyGame7 = new Game();
const player = new Player("Laerolf", 0, 0);
dummyGame7.setAPlayer(player);
dummyGame7.getStock().addAnItem(beer);

// Before the trade, Laerolf has no coins

assertEquals(0, player.getCoins());

// Maurits, the deal is that we only sell 1 beer for 10 coins

vendor.trade(beer, 1, dummyGame7);

// After the trade, Laerolf should have 10 coins

assertEquals(10, player.getCoins());

// That means we also don't have 10 bottles of beer!?

assertEquals(9, dummyGame7.getStock().getItemByName("Liya").getQuantity());

// Wouldn't it be great that Maurits had a inventory?

assertEquals("Liya", vendor.getInventory().getItemByName("Liya").getName());

// Yes, it would :)

// Let's say Maurits was never interested in Beer but in Flowers
// What would the same deal mean to us financially?

vendor.setCategories("Flower");
interested = vendor.proposeItem(beer);

assertEquals(false,interested);

offer = vendor.makeOffer(beer);

assertEquals(5,offer);

// Only do business when they are interested.

