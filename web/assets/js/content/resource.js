function Resource(resourceName, mapName, resourceAmt, unitValue, resourceCategory) {
    this.name = resourceName;
    this.mapName = mapName;
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

//Setters of Resource

    this.setQuantity = function (newQuantity) {
        this.quantity = newQuantity;
    };

//Functions of Resource

    this.addQuantityOfAResource = function (amtToAdd) {
        this.quantity += amtToAdd;
    };

    this.removeQuantityOfAResource = function (amtToRemove) {
        this.quantity -= eval(amtToRemove);
    };

    this.toString = function () {

        let word = "units";

        if (this.getQuantity() === 1) {
            word = "unit";
        }

        return this.getQuantity()+ " " + word + " of " + this.getName();
    };

    this.visualizeResource = function () {
        let productVisual = "<div class='inventoryItem "+this.getName()+"'>";
        productVisual += "<p class='"+this.getName()+"'>" + this.getName() + "</p>";
        productVisual += "</div>";

        return productVisual;
    };

}