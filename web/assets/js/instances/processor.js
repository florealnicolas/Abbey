function Processor(processorName, processName, efficiencyAmt, placeName) {

    var name = processorName;
    var process = processName;
    var efficiency = efficiencyAmt;
    var place = placeName;

//Getters of Processor

    this.getProcess = function () {
        return process;
    };

    this.getPlace = function () {
        return place;
    };

    this.getName = function () {
        return name;
    };

//Functions of Processor

    this.processorProcess = function (game) {

        var input = process.getInput();
        var sufficientResources = this.enoughInputResources(input, game);

        var processBtn = $("#" + processorName + ".processor.button");
        var numberOfInput = eval($("#inputNumber" + name).val());

        if (processBtn.attr('value') != "busy" && numberOfInput != 0 && sufficientResources) {

            processBtn.attr("value", "busy");
            processBtn.addClass("disabled");
            $("#" + processorName + '.progressbar.completed').removeClass("completed");

            $(function () {
                var progressbar = $('#' + processorName + '[class="progressbar"]'),
                    progressLabel = $('#' + processorName + '[class="progressbar"] > .progress-label');

                progressbar.progressbar({
                    value: 0,
                    change: function () {
                        progressLabel.text(progressbar.progressbar("value") + "%");
                    },
                    complete: function () {
                        progressLabel.text("Complete!");
                        work(processBtn, game);
                        progressbar.progressbar("destroy");
                        progressbar.addClass("completed");
                        processBtn.removeClass("disabled");
                    },
                    create: function () {
                        $('div[class="opbrengst"][id="' + name + '"]').hide();
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
            })
        }

        if (!sufficientResources && numberOfInput != 0) {
            alert("You have not enough " + input.getName() + " in stock.\nTry again when you fetched more " + input.getName() + ".");
        }
    };

    var work = function (processBtn, game) {

        var harvestMessage = $('div[class="opbrengst"][id="' + name + '"]');

        processBtn.attr("value", "free");

        var numberOfInput = eval($("#inputNumber" + name).val());
        var gain = fromInputToOutput(numberOfInput, game);

        var message = "You got ";
        message += gain.toString() + ".";

        harvestMessage.text(message);
        harvestMessage.show();

        game.getStock().addAResource(gain);
        $(game.getStock()).on("change", showStock(game.getStockInString("Stock")));
    };

    var fromInputToOutput = function (numberOfInput, game) {
        var stockOfInput = game.getStock().getItemByName(process.getInput().getName());
        stockOfInput.removeQuantityOfAResource(numberOfInput);
        game.getStock().removeResourceIfThereIsNoQuantity(stockOfInput);

        var numberOfOutput = numberOfInput + (numberOfInput * efficiency);

        return new Resource(process.getOutput().getName(), numberOfOutput);
    };

    this.enoughInputResources = function (input, game) {

        var enough = true;
        var stockOfInput = game.getStock().getItemByName(input.getName());

        if (stockOfInput == null || stockOfInput.getQuantity() < process.getInput().getQuantity()) {
            enough = false;
        }

        return enough;
    };

    this.testFromInputToOutput = function (numberOfInput, testGame) {
        return fromInputToOutput(numberOfInput, testGame);
    }
}