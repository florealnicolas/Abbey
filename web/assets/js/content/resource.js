function Resource(resourceName, resourceAmt, unitValue, resourceCategory) {
    this.name = resourceName;
    this.quantity = resourceAmt;
    this.value = unitValue;
    this.category = resourceCategory;

//Getters of Resource

    this.getQuantity = function () {
        return this.quantity;
    };

    this.getCategory = function () {
        return this.category;
    };

    this.getUnitValue = function () {
        return this.value;
    };

    this.getName = function () {
        return this.name;
    };

//Functions of Resource

    this.addQuantityOfAResource = function (amtToAdd) {
        this.quantity += amtToAdd;
    };

    this.removeQuantityOfAResource = function (amtToRemove) {
        this.quantity -= eval(amtToRemove);
    };

    this.toString = function () {

        var word = "units";

        if (this.quantity == 1) {
            word = "unit";
        }

        return this.quantity + " " + word + " of " + this.name;
    }
}