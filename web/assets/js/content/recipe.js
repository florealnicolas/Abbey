function Recipe(outputItem, ingredientsList, newScheme, authorName, story, date) {

    this.output = outputItem;
    this.ingredients = ingredientsList;
    this.scheme = newScheme;
    this.author = authorName;
    this.description = "";
    this.name = this.output.getName();
    this.story = story;
    this.date = date;

// Getters of Recipe

    this.getName = function () {
        return this.name;
    };

    this.getOutput = function () {
        return this.output;
    };

    this.getDescription = function () {
        if (this.description === "") {
            this.description = this.writeDescription();
        }
        return this.description;
    };

    this.getScheme = function () {
        return this.scheme;
    };

    this.getStory = function () {
        return this.story;
    };

    this.getDate = function () {
        return this.date;
    };

// Functions of Recipe

    this.writeDescription = function () {

        let descriptionString = "<h3>" + this.getName().toUpperCase() + "</h3>";
        descriptionString += "<h4>Story</h4>";
        descriptionString += "<p>"+this.getStory()+"</p>";
        descriptionString += "<p>Discovered by " + this.author + " on "+this.getDate()+".</p>";
        descriptionString += "<h4>Ingredients</h4>";

        descriptionString += "<ul>";
        for (let ingredientNr = 0; ingredientNr < this.ingredients.getSize(); ingredientNr++) {
            descriptionString += "<li>" + this.ingredients.getItemByNumber(ingredientNr).toString().toLowerCase() + "</li>";
        }
        descriptionString += "</ul>";

        descriptionString += "<h4>Production scheme</h4>";

        descriptionString += "<ol>";
        for (let stepNr = 0; stepNr < this.scheme.getAmtOfSteps(); stepNr++) {
            descriptionString += "<li>" + this.scheme.getStepByNumber(stepNr).toString() + "</li>";
        }
        descriptionString += "</ol>";

        return descriptionString;
    };
}
