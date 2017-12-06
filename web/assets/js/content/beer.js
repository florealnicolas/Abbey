function Beer (beerName, mapName, beerStyle, alcoholPercentage, resourceAmt, unitValue, resourceCategory) {

    this.alcoholPercentage = alcoholPercentage;
    this.beerStyle = beerStyle;

    Resource.call(this, beerName, mapName, resourceAmt, unitValue, resourceCategory);

    this.getAlcoholPercentage = function () {
        return this.alcoholPercentage
    };

    this.getBeerStyle = function () {
        return this.beerStyle;
    };
}

Beer.prototype = Object.create(Resource.prototype);
Beer.prototype.constructor = Beer;