function Vendor(vendorName, vendingCategories) {

    this.name = vendorName;
    this.categories = new List();
    this.inventory = new List();

    //Getters of Vendor

    this.getName = function () {
        return this.name;
    };

    this.getCategories = function () {
        return this.categories.getList();
    };

    this.getInventory = function () {
        return this.inventory;
    };

    //Setters of Vendor

    this.setCategories = function (newCategories) {

        if (newCategories.constructor != List) {
            this.categories.clearList();
            this.categories.addAnItem(newCategories);
        }

        else {
            this.categories = newCategories;
        }
    };

    //Functions of Vendor

    this.proposeItem = function (someItem) {

        return this.categories.contains(someItem.getCategory());
    };

    this.makeOffer = function (someItem) {

        if (this.proposeItem(someItem)) {
            return someItem.getUnitValue();
        }

        else {
            return someItem.getUnitValue() / 2;
        }
    };

    this.trade = function (tradeItem, tradeAmt, game) {

        var cost = null;
        var stockOfTradeItem = game.getStock().getItemByName(tradeItem.getName());

        //Second condition can be removed after tests
        if (tradeItem.getQuantity() >= tradeAmt && stockOfTradeItem.getQuantity() >= tradeAmt) {
            cost = this.makeOffer(tradeItem) * tradeAmt;
        }

        if (cost != null) {
            game.getStock().getItemByName(tradeItem.getName()).removeQuantityOfAResource(tradeAmt);
            game.getStock().removeResourceIfThereIsNoQuantity(game.getStock().getItemByName(tradeItem.getName()));

            var tradedItem = new Resource(tradeItem.getName(), tradeAmt, tradeItem.getUnitValue(), tradeItem.getCategory());
            this.inventory.addAnItem(tradedItem);

            game.getPlayer().addCoins(cost);
        }

    };

    this.visualize = function () {

        var visual = "<div class='vendor' id='"+this.getName()+"'>";

        var name = "<h4>"+this.getName()+"</h4>";

        var greeting = "<p>Hello!<br>I'm " + this.getName() + " and I'm interested in all your ";
        greeting += this.getCategories().allItemsToString() + ".";
        greeting += "<br>Go ahead and offer me an item, so we can do business.</p>";

        visual += name + greeting;

        visual += "</div>";

        return visual;
    }


}
