function Processor(processorName, possibleInput, processorOutput, efficiencyAmt, placeName) {

    this.name = processorName;
    this.possibleInputs = new List();
    this.possibleProcesses = new List();
    this.output = processorOutput;
    this.efficiency = efficiencyAmt;
    this.place = placeName;

    this.possibleInputs.addAnItem(possibleInput);

//Getters of Processor

    this.getPossibleInputs = function () {
        return this.possibleInputs;
    };

    this.getPossibleProcesses = function () {
        return this.possibleProcesses;
    };

    this.getOutput = function () {
        return this.output;
    };

    this.getPlace = function () {
        return this.place;
    };

    this.getName = function () {
        return this.name;
    };

//Functions of Processor

    this.process = function (game, processName) {

        var process = this.getPossibleProcesses().getItemByName(processName);

        if (processName === undefined) {
            process = this.possibleProcesses.getItemByNumber(0);
        }

        const sufficientResources = this.enoughInputResources(process, game);

        const processBtn = $("#" + processorName + ".processor.button");
        const numberOfInput = eval($("#inputNumber" + this.name).val());

        if (processBtn.attr('value') !== "busy" && numberOfInput !== 0 && sufficientResources) {

            processBtn.attr("value", "busy");
            processBtn.addClass("disabled");
            $("#" + processorName + '.progressbar.completed').removeClass("completed");

            $(this.progressing(processBtn, game));
        }

        else {
            const resourceName = process.getInput().getName();
            //if (numberOfInput != 0) {
            alert("You have not enough " + resourceName + " in stock.\nTry again when you fetched more " + resourceName + ".");
            //}
        }
    };

    this.brewProcess = function (game, processName) {

        const process = this.getPossibleProcesses().getItemByName(processName);

        const sufficientResources = this.enoughInputResources(process, game);

        const processBtn = $("#process" + processName.replace(" ", "-") + ".process.button");

        if (processBtn.attr('value') !== "busy" && sufficientResources) {

            processBtn.attr("value", "busy");
            processBtn.addClass("disabled");
            $("#" + processName.toLowerCase() + '.progressbar.completed').removeClass("completed");

            $(this.brewProgressing(processBtn, game));
        }

        else {

            if (process.getInput().constructor === List) {

                let message = "You don't have enough of this input:";

                process.getInput().list.forEach(function (input) {
                    message += "\n" + input.getName();
                });

                alert(message);
            }

            else {
                const resourceName = process.getInput().getName();
                alert("You have not enough " + resourceName + " in stock.\nTry again when you fetched more " + resourceName + ".");
            }
        }
    };

    this.brewProgressing = function (processBtn, game) {

        const processName = processBtn[0].id.replace("process", "").toLowerCase();

        const processor = this;

        const progressbar = $('#' + processName + '[class="progressbar"]'),
            progressLabel = $('#' + processName + '[class="progressbar"] > .progress-label');

        const monkBonus = game.getAbbey().getMonks().BreweryMonks / game.getAbbey().getMonks().totalAmtOfMonks;

        progressbar.progressbar({
            value: 0,
            change: function () {
                progressLabel.text(progressbar.progressbar("value") + "%");
            },
            complete: function () {
                progressLabel.text("Complete!");
                processor.brewWork(processBtn, game);
                progressbar.progressbar("destroy");
                progressbar.addClass("completed");
                processBtn.removeClass("disabled");
            },
            create: function () {
                $('div[class="opbrengst"][id="' + processName + '"]').hide();
            }
        });

        function progress() {
            var val = progressbar.progressbar("value") || 0;

            progressbar.progressbar("value", val + 1);

            if (val < 99) {
                setTimeout(progress, 80 - (80 * monkBonus));
            }
        }

        setTimeout(progress, 100 - (100 * monkBonus));

    };

    this.progressing = function (processBtn, game) {

        const processor = this;

        const progressbar = $('#' + processor.getName() + '[class="progressbar"]'),
            progressLabel = $('#' + processor.getName() + '[class="progressbar"] > .progress-label');

        switch (processor.getPlace()) {
            case "inside":
                var monks = game.getAbbey().getMonks().amtOfInsideMonks;
                break;
            case "outside":
                monks = game.getAbbey().getMonks().amtOfOutsideMonks;
                break;
        }

        const monkBonus = monks / game.getAbbey().getTotalAmtOfMonks();

        progressbar.progressbar({
            value: 0,
            change: function () {
                progressLabel.text(progressbar.progressbar("value") + "%");
            },
            complete: function () {
                progressLabel.text("Complete!");
                processor.work(processBtn, processor.getPossibleInputs().getItemByNumber(0), game);
                progressbar.progressbar("destroy");
                progressbar.addClass("completed");
                processBtn.removeClass("disabled");
            },
            create: function () {
                $('div[class="opbrengst"][id="' + processor.getName() + '"]').hide();
            }
        });

        function progress() {
            var val = progressbar.progressbar("value") || 0;

            progressbar.progressbar("value", val + 1);

            if (val < 99) {
                setTimeout(progress, 80 - (80 * monkBonus));
            }
        }

        setTimeout(progress, 100 - (100 * monkBonus));
    };

    this.work = function (processBtn, input, game) {

        const harvestMessage = $('div[class="opbrengst"][id="' + this.name + '"]');

        processBtn.attr("value", "free");

        let monkBonus = game.getAbbey().amtOfMonks.OutsideMonks / 100;

        if (this.getPlace() === "inside") {
            monkBonus = game.getAbbey().amtOfMonks.InsideMonks / 100;
        }

        const numberOfInput = eval($("#inputNumber" + this.name).val());

        let extraOutput = numberOfInput * monkBonus;

        if (extraOutput <= 1) {
            extraOutput = 1;
        }

        const gain = this.fromInputToOutput(input, numberOfInput + extraOutput, game);

        let message = "<p>You got ";
        message += gain.toString() + ":</p>";
        message += "<p>Normal output: " + (gain.getQuantity() - extraOutput) + " " + " units of " + this.output.getName();
        message += "<br/>+ Monk bonus: " + extraOutput + " " + " units of " + this.output.getName() + "</p>";

        harvestMessage.html(message);
        harvestMessage.show();

        $(harvestMessage).on("click", function () {
            $(this).hide();
        });

        game.getNotifier().notifySomething("You got new resources from the " + this.getName() + ".");

        game.getStock().addAResource(gain);
        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories())));
        showInventory(game);
        game.getWorkshop().checkIfBuyable(game);
    };

    this.brewWork = function (processBtn, game) {

        const processName = processBtn[0].id.replace("process", "").replace("-", " ");
        const process = game.getBrewery().getSelectedRecipe().getScheme().getStepByName(processName);

        const harvestMessage = $('div[class="opbrengst"][id="' + processName.toLowerCase() + '"]');

        processBtn.attr("value", "free");

        const input = process.getInput();

        let stockOfInput = null;

        if (input.constructor === List) {

            for (let inputItem = 0; inputItem < input.getSize(); inputItem++) {
                stockOfInput = game.getStock().getItemByName(input.getItemByNumber(inputItem).getName());

                console.log("STOCK OF INPUT BEFORE",stockOfInput);
                stockOfInput.removeQuantityOfAResource(input.getItemByNumber(inputItem).getQuantity());
                game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);
                console.log("STOCK OF INPUT AFTER",stockOfInput);

                const scheme = game.getBrewery().getSelectedRecipe().getScheme();

                const previousProcess = scheme.getStepByNumber(scheme.getStepByName(processName).getProcessNumber() - 1);

                if (previousProcess !== undefined) {

                    const tank = previousProcess.getStorage();

                    tank.adjustFluidLevel(stockOfInput.getQuantity());
                    tank.updateFluidLevel();
                }

            }
        }

        else {
            stockOfInput = game.getStock().getItemByName(input.getName());

            console.log("STOCK OF INPUT BEFORE",stockOfInput);

            stockOfInput.removeQuantityOfAResource(input.getQuantity());
            game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);

            console.log("STOCK OF INPUT AFTER",stockOfInput);

            const scheme = game.getBrewery().getSelectedRecipe().getScheme();

            const previousProcess = scheme.getStepByNumber(scheme.getStepByName(processName).getProcessNumber() - 1);

            if (previousProcess !== undefined) {

                const tank = previousProcess.getStorage();

                tank.adjustFluidLevel(stockOfInput.getQuantity());
                tank.updateFluidLevel();
            }
        }

        let gain = null;

        let monkBonus = game.getBrewery().getMonkBonus() / 100;
        let extraOutput = 0;
        let outputQuantity = 0;

        switch (this.output.constructor) {

            case Resource:

                extraOutput = process.getOutputQuantity() * monkBonus;
                outputQuantity = process.getOutputQuantity() + extraOutput;

                gain = new Resource(this.output.getName(), this.output.mapName, outputQuantity, this.output.getUnitValue(), this.output.getCategory());

                break;

            case Array:

                let neededOutput = process.getOutput();
                extraOutput = neededOutput.getQuantity() * monkBonus;
                outputQuantity = neededOutput.getQuantity() + extraOutput;
                gain = new Resource(neededOutput.getName(), neededOutput.mapName, outputQuantity, neededOutput.getUnitValue(), neededOutput.getCategory());

                break;

            case List:

                neededOutput = process.getOutput();
                extraOutput = neededOutput.getOutputQuantity() * monkBonus;
                outputQuantity = neededOutput.getOutputQuantity() + extraOutput;
                gain = new Resource(this.output.getItemByName(neededOutput.getName()).getName(), this.output.getItemByName(neededOutput.getName()).mapName, outputQuantity, neededOutput.getUnitValue(), neededOutput.getCategory());

                break;

            default:

                console.log("UFO!");

                break;
        }

        if (process.getOutput().constructor === Beer) {

            let neededOutput = process.getOutput();
            outputQuantity = recipeMap[neededOutput.name + "Recipe"].output.amount;
            extraOutput = outputQuantity * monkBonus;
            let finalQuantity = extraOutput + outputQuantity;

            gain = new Resource(neededOutput.name, recipeMap[neededOutput.name + "Recipe"].output.name, finalQuantity, neededOutput.getUnitValue(), neededOutput.getCategory());
        }

        let message = "<p>You got ";
        message += gain.toString() + ":</p>";
        message += "<p>Normal output: " + (gain.getQuantity() - extraOutput) + " " + " units of " + gain.getName();
        message += "<br/>+ Monk bonus: " + extraOutput + " " + " units of " + gain.getName() + "</p>";

        harvestMessage.html(message);
        harvestMessage.show();

        $(harvestMessage).on("click", function () {
            $(this).hide();
        });

        game.getNotifier().notifySomething("You got new resources from the " + this.getName() + ".");

        game.getStock().addAResource(gain);
        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories())));
        showInventory(game);

        console.log("GAIN", gain);
        console.log("STOCK", game.getStock());

        const tank = process.getStorage();

        tank.adjustFluidLevel(gain.getQuantity());
        tank.updateFluidLevel();
    };

    this.fromInputToOutput = function (input, numberOfInput, game) {
        const stockOfInput = game.getStock().getItemByName(input.getName());
        stockOfInput.removeQuantityOfAResource(numberOfInput);
        game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);

        const numberOfOutput = numberOfInput + (numberOfInput * this.efficiency);

        return new Resource(this.output.getName(), this.output.mapName, numberOfOutput, this.output.getUnitValue(), this.output.getCategory());
    };

    this.enoughInputResources = function (process, game) {

        let enough = true;

        let stockOfInput = null;

        if (process.getInput().constructor === List) {
            for (let inputItem = 0; enough && inputItem < process.getInput().getSize(); inputItem++) {

                stockOfInput = game.getStock().getItemByName(process.getInput().getItemByNumber(inputItem).getName());

                if (stockOfInput === null || stockOfInput.getQuantity() < process.getInput().getItemByNumber(inputItem).getQuantity()) {
                    enough = false;
                }
            }
        }

        else {

            stockOfInput = game.getStock().getItemByName(process.getInput().getName());

            if (stockOfInput === null || stockOfInput.getQuantity() < process.getInput().getQuantity()) {
                enough = false;
            }
        }

        return enough;
    };

    this.processableInput = function (someInput) {

        let processable = false;

        if (this.getPossibleInputs().getItemByName(someInput.getName()) !== null) {
            processable = true;
        }

        return processable;
    };

    this.addPossibleProcess = function (newProcess) {
        this.possibleProcesses.addAnItem(newProcess);
    };

    this.testFromInputToOutput = function (input, numberOfInput, testGame) {
        return this.fromInputToOutput(input, numberOfInput, testGame);
    }
}