function Recipe(outputItem, ingredientsList, newScheme, authorName) {

    this.output = outputItem;
    this.ingredients = ingredientsList;
    this.scheme = newScheme;
    this.author = authorName;
    this.description = "";
    this.name = this.output.getName();

// Getters of Recipe

    this.getName = function () {
        return this.name;
    };

    this.getOutput = function () {
        return this.output;
    };

    this.getDescription = function () {
        if (this.description == "") {
            this.description = this.writeDescription();
        }
        return this.description;
    };

    this.getScheme = function () {
        return this.scheme;
    };

// Functions of Recipe

    this.writeDescription = function () {

        var descriptionString = "<h3>" + this.getName().toUpperCase() + "</h3>";
        descriptionString += "<h4>Story</h4>";
        descriptionString += "<p>Discovered by " + this.author + ".</p>";
        descriptionString += "<h4>Ingredients</h4>";

        descriptionString += "<ul>";
        for (var ingredientNr = 0; ingredientNr < this.ingredients.getSize(); ingredientNr++) {
            descriptionString += "<li>" + this.ingredients.getItemByNumber(ingredientNr).toString().toLowerCase() + "</li>";
        }
        descriptionString += "</ul>";

        descriptionString += "<h4>Production scheme</h4>";

        descriptionString += "<ol>";
        for (var stepNr = 0; stepNr < this.scheme.getAmtOfSteps(); stepNr++) {
            descriptionString += "<li>" + this.scheme.getStepByNumber(stepNr).toString() + "</li>";
        }
        descriptionString += "</ol>";

        return descriptionString;
    };
}
