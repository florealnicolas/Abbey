function List() {
    this.list = [];

//Getters of List

    this.getList = function () {

        if (this.getSize() === 0) {
            return null;
        }

        else {
            return this.list;
        }
    };

    this.getItemByNumber = function (itemNumber) {
        return this.list[itemNumber];
    };

    this.getItemByName = function (itemName) {

        let foundItem = null;

        for (let itemNr = 0, amtOfItems = this.list.length; itemNr < amtOfItems; itemNr++) {

            if (this.list[itemNr].getName() === itemName) {
                foundItem = this.list[itemNr];
            }
        };

        return foundItem;
    };

    this.getItemByMapName = function (mapName) {
        let foundItem = null;

        for (let itemNr = 0, amtOfItems = this.list.length; itemNr < amtOfItems; itemNr++) {

            if (this.list[itemNr].mapName === mapName) {
                foundItem = this.list[itemNr];
            }
        }
        return foundItem;
    };

    this.getSize = function () {
        return this.list.length;
    };

//Functions of List

    this.sortList = function (something) {

        let orderList = [];

        switch (something) {

            case "recipeName":

                for (let recipe in this.list) {
                    if (this.list.hasOwnProperty(recipe)) {
                        let selectedRecipe = this.list[recipe];
                        orderList[recipe] = selectedRecipe.getOutput().getName();
                    }
                }

                const orderedList = orderList.sort();
                let sortedList = [];

                for (let recipe in orderedList) {
                    if (orderedList.hasOwnProperty(recipe)) {
                        let selectedRecipeName = orderedList[recipe];

                        for (let selectedRecipe in this.list) {
                            if (this.list.hasOwnProperty(selectedRecipe)) {
                                let potRecipe = this.list[selectedRecipe];

                                if (potRecipe.getOutput().getName() === selectedRecipeName) {
                                    sortedList.push(potRecipe);
                                }
                            }
                        }
                    }
                }

                this.list = sortedList;

                break;

            default:
                break;
        }
    };

    this.addAResource = function (itemToAdd) {

        const index = this.getIndex(itemToAdd);

        if (index !== -1) {
            this.list[index].addQuantityOfAResource(itemToAdd.getQuantity());
        }

        else {
            this.list.push(itemToAdd);
        }
    };

    this.addAnItem = function (itemToAdd) {

        if (itemToAdd.constructor === Resource) {
            this.addAResource(itemToAdd);
        }

        else {
            this.list.push(itemToAdd);
        }
    };

    this.addListOfItems = function (listOfItems) {

        switch (listOfItems.constructor.name) {

            case "List":

                for (let itemNr = 0; itemNr < listOfItems.getSize(); itemNr++) {
                    this.addAnItem(listOfItems.getItemByNumber(itemNr));
                }

                break;

            case "Object":

                for (let item in listOfItems) {
                    if (listOfItems.hasOwnProperty(item)) {

                        let selectedStorageItem = listOfItems[item];
                        let selectedMapItem = getResourcesFromMap(selectedStorageItem.mapName);

                        this.addAnItem(new Resource(selectedMapItem.getName(),selectedStorageItem.mapName,eval(selectedStorageItem.quantity),eval(selectedMapItem.value),selectedMapItem.category));
                    }
                }

                break;

            default:

                for (itemNr = 0; itemNr < listOfItems.length; itemNr++) {
                    this.addAnItem(listOfItems[itemNr]);
                }

                break;

        }
    };

    this.removeAnItem = function (itemToRemove) {
        const itemNrToRemove = this.list.indexOf(itemToRemove);
        this.list.splice(itemNrToRemove, 1);
    };

    this.getAllResourceCategories = function () {

        let categories = [];

        this.list.forEach(function (resource) {

            if (resource.constructor === Resource && categories.indexOf(resource.getCategory()) === -1) {
                categories.push(resource.getCategory());
            }
        });

        if (categories.length === 0) {
            categories = null;
        }

        else {
            categories.sort();
        }

        return categories
    };

    this.getResourcesByCategory = function (someCategoryName) {

        let someCategory = [];

        for (let itemNr = 0; itemNr < this.getSize(); itemNr++) {
            const selectedItem = this.getItemByNumber(itemNr);

            if (selectedItem.getCategory() === someCategoryName) {
                someCategory.push(selectedItem);
            }
        }

        return someCategory;
    };

    this.allItemsIntoAStockWay = function (iconsMap) {

        let list = this;

        const categories = this.getAllResourceCategories();
        let itemMessage = "";

        if (categories !== null) {

            categories.forEach(function (category) {

                let resources = list.getResourcesByCategory(category);
                let className = iconsMap.get(category);

                if (category !== "fungus") {
                    category = category.substr(0, 1).toUpperCase() + category.substr(1) + "s";
                }


                itemMessage += "<h4>" + category + "</h4>";
                itemMessage += "<ul>";

                resources.forEach(function (resource) {
                    itemMessage += "<li>" + resource.getQuantity() + " units of ";
                    itemMessage += resource.getName().toLowerCase() + "</li>";
                });

                itemMessage += "</ul>";
            });
        }

        else {
            itemMessage = "<p>Nothing here.</p>";
        }

        return itemMessage;
    };

    this.allItemsToStringWithName = function (listName) {

        const amtOfItems = this.list.length;
        let itemMessage = listName + ":";

        //this.stock = this.stock.sort(); --> something for sorted people???

        if (amtOfItems === 0) {
            itemMessage += " nothing in " + listName.toLowerCase();
        }

        else {
            let item = null;
            if (amtOfItems > 2) {
                for (let itemnr = 0; itemnr < amtOfItems - 2; itemnr++) {
                    item = this.list[itemnr];
                    itemMessage += " ";

                    if (listName === "Stock") {
                        itemMessage += item.getQuantity() + " units of ";
                    }
                    itemMessage += item.getName().toLowerCase() + ",";
                }
            }

            if (amtOfItems > 1) {
                item = this.list[amtOfItems - 2];
                itemMessage += " ";

                if (listName === "Stock") {
                    itemMessage += item.getQuantity() + " units of ";
                }
                itemMessage += item.getName().toLowerCase() + " and";
            }

            item = this.list[amtOfItems - 1];
            itemMessage += " ";

            if (listName === "Stock") {
                itemMessage += item.getQuantity() + " units of ";
            }

            itemMessage += item.getName().toLowerCase();
        }
        itemMessage += ".";
        return itemMessage;
    };

    this.allItemsToString = function () {

        const amtOfItems = this.list.length;
        let itemMessage = "";

        if (amtOfItems === 0) {
            itemMessage += "nothing.";
        }

        else {

            for (var itemNr = 0; itemNr < amtOfItems - 1; itemNr++) {
                var item = this.list[itemNr];
                itemMessage += " ";
                itemMessage += item.toString();
                if (amtOfItems - itemNr > 2) {
                    itemMessage += ",";
                }
            }

            item = this.list[itemNr];
            itemMessage += " ";
            itemMessage += " and " + item.toString();
        }

        return itemMessage;
    };

    this.removeResourceIfThereIsNoQuantity = function (resource) {
        if (resource.getQuantity() === 0) {
            this.removeAnItem(resource);
        }
    };

    this.contains = function (something) {
        let contains = false;

        for (let item in this.list) {
            if (something === this.list[item]) {
                contains = true;
            }
        }

        return contains;
    };

    this.getIndex = function (something) {
        let index = -1;

        for (let itemNr in this.list) {
            if (something.getName() === this.list[itemNr].getName()) {
                index = itemNr;
            }
        }

        return index;
    };

    this.clearList = function () {
        this.list = [];
    };

    this.toJSON = function () {

        let jsonList = {};

        if (this.getSize() !== 0) {

            const typeOfList = this.list[0].constructor.name;

            let neededFields = null;

            switch (typeOfList) {

                case "Resource":
                    neededFields = ["mapName", "quantity"];
                    break;

                case "Field":
                    neededFields = ["fieldName","fieldValue","fieldResource","fieldCategories"];
                    break;

                default:
                    break;
            }

            if (neededFields !== null) {
                this.list.forEach(function (item) {

                    let neededItem = {};

                    neededFields.forEach(function (field) {
                        neededItem[field] = item[field];

                        if (field === "fieldResource") {
                            neededItem[field] = item[field].mapName;
                        }
                    });

                    jsonList[item.getName()] = neededItem;
                });
            }

            else {
                this.list.forEach(function (item) {
                    jsonList[item.getName()] = item;
                });
            }

        }

        return jsonList;
    }

}