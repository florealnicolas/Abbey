function List() {
    this.list = [];

//Getters of List

    this.getItemByNumber = function (itemNumber) {
        return this.list[itemNumber];
    };

    this.getItemByName = function (itemName) {
        var foundItem = null;

        for (var itemNr = 0, amtOfItems = this.list.length; itemNr < amtOfItems; itemNr++) {

            if (this.list[itemNr].getName() == itemName) {
                foundItem = this.list[itemNr];
            }
        }
        return foundItem;
    };

    this.getSize = function () {
        return this.list.length;
    };

//Functions of List

    this.addAResource = function (itemToAdd) {

        var index = this.getIndex(itemToAdd);

        if (index != -1) {
            this.list[index].addQuantityOfAResource(itemToAdd.getQuantity());
        }

        else {
            this.list.push(itemToAdd);
        }
    };

    this.addAnItem = function (itemToAdd) {

        if (itemToAdd.constructor == Resource) {
            this.addAResource(itemToAdd);
        }

        else {
            this.list.push(itemToAdd);
        }
    };

    this.addListOfItems = function (listOfItems) {

        if (listOfItems.constructor == List) {
            for (var itemNr = 0; itemNr < listOfItems.getSize(); itemNr++) {
                this.addAnItem(listOfItems.getItemByNumber(itemNr));
            }
        }

        else {
            for (itemNr = 0; itemNr < listOfItems.length; itemNr++) {
                this.addAnItem(listOfItems[itemNr]);
            }
        }
    };

    this.removeAnItem = function (itemToRemove) {
        var itemNrToRemove = this.list.indexOf(itemToRemove);
        this.list.splice(itemNrToRemove, 1);
    };

    this.allItemsToStringWithName = function (listName) {

        var amtOfItems = this.list.length;
        var itemMessage = listName + ":";

        //this.stock = this.stock.sort(); --> something for sorted people???

        if (amtOfItems == 0) {
            itemMessage += " nothing in " + listName.toLowerCase();
        }

        else {
            if (amtOfItems > 2) {
                for (var itemnr = 0; itemnr < amtOfItems - 2; itemnr++) {
                    item = this.list[itemnr];
                    itemMessage += " ";

                    if (listName == "Stock") {
                        itemMessage += item.getQuantity() + " ";
                    }
                    itemMessage += item.getName().toLowerCase() + ",";
                }
            }

            if (amtOfItems > 1) {
                var item = this.list[amtOfItems - 2];
                itemMessage += " ";

                if (listName == "Stock") {
                    itemMessage += item.getQuantity() + " ";
                }
                itemMessage += item.getName().toLowerCase() + " and";
            }

            item = this.list[amtOfItems - 1];
            itemMessage += " ";

            if (listName == "Stock") {
                itemMessage += item.getQuantity() + " ";
            }

            itemMessage += item.getName().toLowerCase();
        }
        itemMessage += ".";
        return itemMessage;
    };

    this.allItemsToString = function () {

        var amtOfItems = this.list.length;
        var itemMessage = "";

        if (amtOfItems == 0) {
            itemMessage += "nothing.";
        }

        else {

            var item = this.list[0];
            itemMessage += item.toString() + ",";

            if (amtOfItems > 2) {
                for (var itemNr = 1; itemNr < amtOfItems - 2; itemNr++) {
                    item = this.list[itemNr];
                    itemMessage += " ";
                    itemMessage += item.toString() + ",";
                }
            }

            if (amtOfItems > 1) {
                item = this.list[amtOfItems - 2];
                itemMessage += " ";
                itemMessage += item.toString() + " and";
            }

            item = this.list[amtOfItems - 1];
            itemMessage += " ";
            itemMessage += item.toString();
        }
        return itemMessage;
    };

    this.removeResourceIfThereIsNoQuantity = function (resource) {
        if (resource.getQuantity() == 0) {
            this.removeAnItem(resource);
        }
    };

    this.contains = function (something) {
        var contains = false;

        for (var item in this.list) {
            if (something == this.list[item]) {
                contains = true;
            }
        }

        return contains;
    };

    this.getIndex = function (something) {
        var index = -1;

        for (var itemNr in this.list) {
            if (something.getName() == this.list[itemNr].getName()) {
                index = itemNr;
            }
        }

        return index;
    }
}