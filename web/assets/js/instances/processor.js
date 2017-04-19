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

        if (processName == undefined) {
            process = this.possibleProcesses.getItemByNumber(0);
        }

        var sufficientResources = this.enoughInputResources(process, game);

        var processBtn = $("#" + processorName + ".processor.button");
        var numberOfInput = eval($("#inputNumber" + this.name).val());

        if (processBtn.attr('value') != "busy" && numberOfInput != 0 && sufficientResources) {

            processBtn.attr("value", "busy");
            processBtn.addClass("disabled");
            $("#" + processorName + '.progressbar.completed').removeClass("completed");

            $(this.progressing(processBtn, game));
        }

        else {
            var resourceName = process.getInput().getName();
            //if (numberOfInput != 0) {
            alert("You have not enough " + resourceName + " in stock.\nTry again when you fetched more " + resourceName + ".");
            //}
        }
    };

    this.brewProcess = function (game, processName) {

        var process = this.getPossibleProcesses().getItemByName(processName);

        var sufficientResources = this.enoughInputResources(process, game);

        var processBtn = $("#process" + processName.replace(" ", "-") + ".process.button");

        if (processBtn.attr('value') != "busy" && sufficientResources) {

            processBtn.attr("value", "busy");
            processBtn.addClass("disabled");
            $("#" + processName.toLowerCase() + '.progressbar.completed').removeClass("completed");

            $(this.brewProgressing(processBtn, game));
        }

        else {

            if (process.getInput().constructor == List) {

                var message = "You don't have enough of this input:";

                process.getInput().list.forEach(function (input) {
                    message += "\n" + input.getName();
                });

                alert(message);
            }

            else {
                var resourceName = process.getInput().getName();
                alert("You have not enough " + resourceName + " in stock.\nTry again when you fetched more " + resourceName + ".");
            }
        }
    };

    this.brewProgressing = function (processBtn, game) {


        var processName = processBtn[0].id.replace("process", "").toLowerCase();

        var processor = this;

        var progressbar = $('#' + processName + '[class="progressbar"]'),
            progressLabel = $('#' + processName + '[class="progressbar"] > .progress-label');

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
                setTimeout(progress, 80);
            }
        }

        setTimeout(progress, 100);

    };

    this.progressing = function (processBtn, game) {

        var processor = this;

        var progressbar = $('#' + processor.getName() + '[class="progressbar"]'),
            progressLabel = $('#' + processor.getName() + '[class="progressbar"] > .progress-label');

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
                setTimeout(progress, 80);
            }
        }

        setTimeout(progress, 100);
    };

    this.work = function (processBtn, input, game) {

        var harvestMessage = $('div[class="opbrengst"][id="' + this.name + '"]');

        processBtn.attr("value", "free");

        var numberOfInput = eval($("#inputNumber" + this.name).val());
        var gain = this.fromInputToOutput(input, numberOfInput, game);

        var message = "You got ";
        message += gain.toString() + ".";

        harvestMessage.text(message);
        harvestMessage.show();

        game.getStock().addAResource(gain);
        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories())));
        showInventory(game);
    };

    this.brewWork = function (processBtn, game) {

        var processName = processBtn[0].id.replace("process", "").replace("-", " ");
        var process = game.getProcesses().getItemByName(processName);

        var harvestMessage = $('div[class="opbrengst"][id="' + processName.toLowerCase() + '"]');

        processBtn.attr("value", "free");

        var input = process.getInput();

        var stockOfInput = null;

        if (input.constructor == List) {

            for (var inputItem = 0; inputItem < input.getSize(); inputItem++) {
                stockOfInput = game.getStock().getItemByName(input.getItemByNumber(inputItem).getName());

                stockOfInput.removeQuantityOfAResource(input.getItemByNumber(inputItem).getQuantity());
                game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);
            }
        }

        else {
            stockOfInput = game.getStock().getItemByName(input.getName());

            stockOfInput.removeQuantityOfAResource(input.getQuantity());
            game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);
        }

        var gain = null;

        if (this.output.constructor == List) {
            var neededOutput = process.getOutput();
            gain = new Resource(this.output.getItemByName(neededOutput.getName()).getName(), neededOutput.getQuantity(), neededOutput.getUnitValue(), neededOutput.getCategory());
        }

        else {
            gain = new Resource(this.output.getName(), process.getOutputQuantity(), this.output.getUnitValue(), this.output.getCategory());
        }

        var message = "You got ";
        message += gain.toString() + ".";

        harvestMessage.text(message);
        harvestMessage.show();

        game.getStock().addAResource(gain);
        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories())));
        showInventory(game);
    };

    this.fromInputToOutput = function (input, numberOfInput, game) {
        var stockOfInput = game.getStock().getItemByName(input.getName());
        stockOfInput.removeQuantityOfAResource(numberOfInput);
        game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);

        var numberOfOutput = numberOfInput + (numberOfInput * this.efficiency);

        return new Resource(this.output.getName(), numberOfOutput, this.output.getUnitValue(), this.output.getCategory());
    };

    this.enoughInputResources = function (process, game) {

        var enough = true;

        var stockOfInput = null;

        if (process.getInput().constructor == List) {
            for (var inputItem = 0; enough && inputItem < process.getInput().getSize(); inputItem++) {

                stockOfInput = game.getStock().getItemByName(process.getInput().getItemByNumber(inputItem).getName());

                if (stockOfInput == null || stockOfInput.getQuantity() < process.getInput().getItemByNumber(inputItem).getQuantity()) {
                    enough = false;
                }
            }
        }

        else {

            stockOfInput = game.getStock().getItemByName(process.getInput().getName());

            if (stockOfInput == null || stockOfInput.getQuantity() < process.getInput().getQuantity()) {
                enough = false;
            }
        }

        return enough;
    };

    this.processableInput = function (someInput) {

        var processable = false;

        if (this.getPossibleInputs().getItemByName(someInput.getName()) != null) {
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