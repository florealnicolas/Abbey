function Process(processName, timeNeededToFinish, inputList, processingUnit, outputItem) {

    this.name = processName;
    this.mapName = null;
    this.time = timeNeededToFinish;
    this.input = new List();
    this.processor = processingUnit;
    this.output = outputItem;
    this.processNumber = null;

    this.storage = null;
    this.utility = null;

    this.input.addListOfItems(inputList);

// Getters of Process

    this.getProcessNumber = function () {
        return this.processNumber;
    };

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

        if (this.output.getQuantity() === 0) {
            this.output.quantity = this.calculateOutputQuantity();
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

        if (this.storage === null) {
            this.storage = new Tank(this.output, 100);
        }

        return this.storage;
    };

    this.getUtility = function () {
        return this.utility;
    };

// Setters of Process

    this.setOutput = function (newOutput) {
        this.output = newOutput;
    };

    this.setStorage = function (newStorage) {
        this.storage = newStorage;
    };

    this.setProcessNumber = function (newNumber) {
        this.processNumber = newNumber;
    };

    this.setUtility = function (newUtility) {
        this.utility = newUtility;
    };

    this.setOutputQuantity = function (newQuantity) {
        this.output.quantity = newQuantity;
    };

    this.setInput = function (newInput) {
        this.input = newInput;
    };

    this.setMapName = function (newMapName) {
        this.mapName = newMapName;
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

                ingredients = this.input.allItemsToString();
                break;

            default:

                ingredients = this.input.toString();
                break;
        }

        let nameString = this.getName();

        if (this.name.substr(this.name.length - 3) === "ing") {
            nameString = nameString.substr(0, this.name.length - 3);
        }

        return nameString + " " + ingredients.toLowerCase() + ".";
    };

    this.visualizeStep = function () {

        let visual = "<h5>" + this.getName() + "</h5>";

        visual += "<div class='row'>";
        visual += "<div class='input small-3-columns'>";

        switch (this.getInput().constructor) {
            case List:

                for (let ingredientNr = 0; ingredientNr < this.getInput().getSize(); ingredientNr++) {
                    visual += "<p>";
                    visual += this.getInput().getItemByNumber(ingredientNr).getName().toLowerCase();
                    visual += " [" + this.getInput().getItemByNumber(ingredientNr).getQuantity() + "]";
                    visual += "</p>";
                }

                break;
            case Array:

                for (let ingredientNr = 0; ingredientNr < this.getInput().length; ingredientNr++) {
                    let selectedIngredient = this.getInput()[ingredientNr];
                    visual += "<p>";
                    visual += selectedIngredient.getName().toLowerCase();
                    visual += " [" + selectedIngredient.getQuantity() + "]";
                    visual += "</p>";
                }

                break;
            default:

                visual += "<p>" + this.getInput().getName() + "</p>";
                visual += "<p>" + this.getInput().getQuantity() + "</p>";

                break;
        }

        visual += "</div>";

        visual += "<div class='processor small-offset-1 small-4-columns'>";

        visual += "<p>" + this.getProcessorName() + "</p>";
        visual += "<div class='progressbar' id='" + this.getName().toLowerCase().replace(" ", "-") + "'><div class='progress-label'>0%</div></div>";
        visual += "</div>";

        visual += "<div class='output small-offset-1 small-3-columns'>";
        visual += "<p>" + this.getOutput().getName() + "</p>";
        visual += "<p>" + this.getOutputQuantity() + "</p>";
        visual += "</div>";

        visual += "</div>";

        visual += "<div id='" + this.getName().toLowerCase() + "' class='opbrengst'></div>";

        visual += "<button id='process" + this.getName().replace(" ", "-") + "' class='process button'>Process</button>";

        return visual;

    };

    this.calculateOutputQuantity = function () {

        let amountOfOutput = 0;

        if (this.getInput().constructor.name === "List") {

            let highestAmount = 0;

            if (this.getInput().getSize() > 1) {
                for (let inputNr = 0; inputNr < this.getInput().getSize(); inputNr++) {

                    if (this.getInput().getItemByNumber(inputNr).getQuantity() > highestAmount) {
                        highestAmount = this.getInput().getItemByNumber(inputNr).getQuantity();
                    }

                }
            }

            else {
                highestAmount = this.getInput().getItemByNumber(0).getQuantity();
            }

            amountOfOutput = highestAmount;
            amountOfOutput += amountOfOutput * this.getProcessor().efficiency;
        }

        else {
            amountOfOutput = this.getInput().quantity;
            amountOfOutput += amountOfOutput * this.getProcessor().efficiency;
        }

        return amountOfOutput;
    }
}