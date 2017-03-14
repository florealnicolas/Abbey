function Process(processName, timeNeededToFinish, inputList, processingUnit, outputItem) {

    this.name = processName;
    this.time = timeNeededToFinish;
    this.input = inputList;
    this.processor = processingUnit;
    this.output = outputItem;

    this.storage = null;
    this.utility = null;

// Getters of Process

    this.getInput = function () {
        return this.input;
    };

    this.getProcessor = function () {
        return this.processor;
    };

    this.getOutput = function () {
        return this.output;
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

// Functions of Process

    this.toString = function () {

        var ingredients = "";

        switch (this.input.constructor) {
            case Array:

                for (var inputNr = 0; inputNr < this.input.length - 1; inputNr++) {
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

        var nameString = this.name;

        if (this.name.substr(this.name.length - 3) == "ing") {
            nameString = nameString.substr(0, this.name.length - 3);
        }

        return nameString + " " + ingredients.toLowerCase() + ".";
    };
}