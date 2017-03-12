function Process(processName, timeNeededToFinish, inputList, outputItem) {

    var name = processName;
    var time = timeNeededToFinish;
    var input = inputList;
    var output = outputItem;

    var storage = null;
    var utility = null;

// Getters of Process

    this.getInput = function () {
        return input;
    };

    this.getOutput = function () {
        return output;
    };

    this.getName = function () {
        return name;
    };

    this.getTime = function () {
        return time;
    };

    this.getStorage = function () {
        
        if (output.getResourceType() == "fluid" && storage == null) {
            storage = new Tank(output,100);
        }

        return storage;
    };

    this.getUtility = function () {
        return utility;
    };
    
// Setters of Process

    this.setStorage = function (newStorage) {
        storage = newStorage;
    };

    this.setUtility = function (newUtility) {
        utility = newUtility;
    };

// Functions of Process

    this.toString = function () {

        var ingredients = "";

        switch (input.constructor) {
            case Array:

                for (var inputNr = 0; inputNr < input.length-1; inputNr++) {
                    ingredients += input[inputNr].toString() + ", ";
                }

                ingredients+= input[input.length-1].toString();
                break;

            case List:
                ingredients = input.allItemsToString();
                break;

            default:
                ingredients = input.toString();
                break;
        }

        var nameString = name;

        if (name.substr(name.length-3) == "ing") {
            nameString = nameString.substr(0,name.length-3);
        }

        return nameString +" " + ingredients.toLowerCase() + ".";
    };
}