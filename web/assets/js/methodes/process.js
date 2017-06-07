function Process(processName, timeNeededToFinish, inputList, processingUnit, outputItem) {

    this.name = processName;
    this.time = timeNeededToFinish;
    this.input = inputList;
    this.processor = processingUnit;
    this.output = outputItem;
    this.outputQuantity = 0;

    this.storage = null;
    this.utility = null;

// Getters of Process

    this.getInput = function () {
        return this.input;
    };

    this.getProcessor = function () {
        return this.processor;
    };

    this.getProcessorName = function () {
        return this.processor.getName();
    };

    this.getOutput = function () {
        return this.output;
    };

    this.getOutputQuantity = function () {

        if (this.output.getQuantity() == 0) {
            return 0;
        }

        return this.output.getQuantity();
    };

    this.getName = function () {
        return this.name;
    };

    this.getTime = function () {
        return this.time;
    };

    this.getStorage = function () {

        if (this.storage == null) {
            this.storage = new Tank(this.output, 100);
        }

        return this.storage;
    };

    this.getUtility = function () {
        return this.utility;
    };

// Setters of Process

    this.setStorage = function (newStorage) {
        this.storage = newStorage;
    };

    this.setUtility = function (newUtility) {
        this.utility = newUtility;
    };

    this.setOutputQuantity = function (newQuantity) {
        this.outputQuantity = newQuantity;
    };

// Functions of Process

    this.toString = function () {

        let ingredients = "";

        switch (this.input.constructor) {
            case Array:

                for (let inputNr = 0; inputNr < this.input.length - 1; inputNr++) {
                    ingredients += this.input[inputNr].toString() + ", ";
                }

                ingredients += this.input[this.input.length - 1].toString();
                break;

            case List:

                console.log("THIS IS LIST",this.getName());
                ingredients = this.input.allItemsToString();
                break;

            default:
                ingredients = this.input.toString();
                break;
        }

        let nameString = this.getName();

        if (this.name.substr(this.name.length - 3) == "ing") {
            nameString = nameString.substr(0, this.name.length - 3);
        }

        return nameString + " " + ingredients.toLowerCase() + ".";
    };

    this.visualizeStep = function () {

        let visual = "<h5>" + this.getName() + "</h5>";

        visual += "<div class='row'>";

        visual += "<div class='input small-3-columns'>";

        if (this.getInput().constructor == List) {
            for (let ingredientNr = 0; ingredientNr < this.getInput().getSize(); ingredientNr++) {
                visual += "<p>";
                visual += this.getInput().getItemByNumber(ingredientNr).getName().toLowerCase();
                visual += " [" + this.getInput().getItemByNumber(ingredientNr).getQuantity() + "]";
                visual += "</p>";
            }
        }

        else {
            visual += "<p>" + this.getInput().getName() + "</p>";
            visual += "<p>" + this.getInput().getQuantity() + "</p>";
        }

        visual += "</div>";

        visual += "<div class='processor small-offset-1 small-4-columns'>";
        visual += "<p>"+this.getProcessorName()+"</p>";
        visual += "<div class='progressbar' id='" + this.getName().toLowerCase().replace(" ","-") + "'><div class='progress-label'>0%</div></div>";
        visual += "</div>";

        visual += "<div class='output small-offset-1 small-3-columns'>";
        visual += "<p>"+this.getOutput().getName()+"</p>";
        visual += "<p>"+this.getOutput().getQuantity()+"</p>";
        visual += "</div>";

        visual += "</div>";

        visual += "<div id='" + this.getName().toLowerCase() + "' class='opbrengst'></div>";

        visual += "<button id='process" + this.getName().replace(" ","-") + "' class='process button'>Process</button>";

        return visual;

    }
}