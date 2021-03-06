function Source(sourceName, sourceMaxOutput, placeName) {
    this.name = sourceName;
    this.output = new List();
    this.minOuput = 1;
    this.maxOutput = sourceMaxOutput;
    this.place = placeName;

    this.sourceProcess = function (game) {

        const sourceBtn = $("#" + this.name + ".source.button");

        if (sourceBtn.attr('value') != "busy") {

            sourceBtn.attr("value", "busy");
            sourceBtn.addClass("disabled");
            $("#" + this.name + '.progressbar.completed').removeClass("completed");

            $(this.progressing(sourceBtn, game));
        }
    };

    this.progressing = function (sourceBtn, game) {

        const source = this;

        const progressbar = $('#' + source.name + '[class="progressbar"]'),
            progressLabel = $('#' + source.name + '[class="progressbar"] > .progress-label');

        switch (source.getPlace()) {
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
                source.work(sourceBtn, game);
                progressbar.progressbar("destroy");
                $("#" + sourceName + '.progressbar').addClass("completed");
                sourceBtn.removeClass("disabled");
            },
            create: function () {
                $('div[class="opbrengst"][id="' + source.name + '"]').hide();
            }
        });

        function progress() {
            const val = progressbar.progressbar("value") || 0;

            progressbar.progressbar("value", val + 1);

            if (val < 99) {
                setTimeout(progress, 80 - (80 * monkBonus));
            }
        }

        setTimeout(progress, 100 - (100 * monkBonus));
    };

    this.work = function (processBtn, game) {

        const harvestMessage = $('div[class="opbrengst"][id="' + this.name + '"]');

        processBtn.attr("value", "free");

        const resource = this.gainResource();

        let monkBonus = game.getAbbey().amtOfMonks.OutsideMonks / 100;

        if (this.getPlace() === "inside") {
            monkBonus = game.getAbbey().amtOfMonks.InsideMonks / 100;
        }

        let extraOutput = resource.getQuantity() * monkBonus;

        if (extraOutput <= 1) {
            extraOutput = 1;
        }

        resource.addQuantityOfAResource(extraOutput);

        game.getStock().addAResource(resource);

        let message = "<p>You got ";
        message += resource.toString() + ":</p>";
        message += "<p>Normal output: " + (resource.getQuantity() - extraOutput) + " " + " units of " + resource.getName();
        message += "<br/>+ Monk bonus: "  + extraOutput + " " + " units of " + resource.getName() + "</p>";

        harvestMessage.html(message);
        harvestMessage.show();

        $(harvestMessage).on("click",function () {
            $(this).hide();
        });

        game.getNotifier().notifySomething("You got new resources from the "+this.getName()+".");

        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories())));
        showInventory(game);
        game.getWorkshop().checkIfBuyable(game);
    };

    this.gainResource = function () {
        const quantity = Math.floor(Math.random() * (this.maxOutput - this.minOuput + 1)) + this.minOuput;
        const resourceNr = Math.floor(Math.random() * ((this.output.getSize() - 1) + 1));
        const resource = this.output.getItemByNumber(resourceNr);

        return new Resource(resource.getName(), resource.mapName, quantity, resource.getUnitValue(), resource.getCategory());
    };

    this.addOutput = function (newOutput) {
      this.output.addAnItem(newOutput);
    };

    this.setOutputList = function (outputs) {

        for (let outputNr in outputs) {
            if (outputs.hasOwnProperty(outputNr)) {
                this.addOutput(outputs[outputNr]);
            }
        }
    };

    this.getName = function () {
        return this.name;
    };

    this.getPlace = function () {
        return this.place;
    };
}