function Resource(resourceName, amt, type) {
    var name = resourceName;
    var quantity = amt;
    var resourceType = type;

//Getters of Resource

    this.getQuantity = function () {
        return quantity;
    };

    this.getName = function () {
        return name;
    };

    this.getResourceType = function () {
      return resourceType;
    };

//Functions of Resource

    this.addQuantityOfAResource = function (amtToAdd) {
        quantity += amtToAdd;
    };

    this.removeQuantityOfAResource = function (amtToRemove) {
        quantity -= eval(amtToRemove);
    };

    this.toString = function () {

        var word = "units";

        if (quantity == 1) {
            word = "unit";
        }

        return quantity + " " + word + " of " + name;
    }
}