function Recipe(outputItem, ingredientsList, newScheme, authorName) {

    var output = outputItem;
    var ingredients = ingredientsList;
    var scheme = newScheme;
    var author = authorName;
    var description = "";
    var name = output.getName();

// Getters of Recipe

    this.getName = function () {
        return name;
    };

    this.getOutput = function () {
        return output;
    };

    this.getDescription = function () {
        if (description == "") {
            description = this.writeDescription();
        }
        return description;
    };

    this.getScheme = function () {
      return scheme;
    };

// Functions of Recipe

    this.writeDescription = function () {

        var descriptionString = "<h3>"+ this.getName().toUpperCase() + "</h3>";
        descriptionString += "<h4>Story</h4>";
        descriptionString += "<p>Discovered by " + author + ".</p>";
        descriptionString += "<h4>Ingredients</h4>";

        descriptionString += "<ul>";
        for (var ingredientNr = 0; ingredientNr < ingredients.getSize(); ingredientNr++) {
            descriptionString += "<li>"+ingredients.getItemByNumber(ingredientNr).toString().toLowerCase()+"</li>";
        }
        descriptionString += "</ul>";
        
        descriptionString += "<h4>Production scheme</h4>";

        descriptionString += "<ol>";
        for (var stepNr = 0; stepNr < scheme.getAmtOfSteps(); stepNr++) {
            descriptionString += "<li>"+scheme.getStepByNumber(stepNr)+"</li>";
        }
        descriptionString += "</ol>";

        return descriptionString;
    };
}
