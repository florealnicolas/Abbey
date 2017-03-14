function Source(sourceName, sourceMaxOutput, placeName) {
    this.name = sourceName;
    this.output = new List();
    this.minOuput = 1;
    this.maxOutput = sourceMaxOutput;
    this.place = placeName;

    this.sourceProcess = function (game) {

        var sourceBtn = $("#" + this.name + ".source.button");

        if (sourceBtn.attr('value') != "busy") {

            sourceBtn.attr("value", "busy");
            sourceBtn.addClass("disabled");
            $("#" + this.name + '.progressbar.completed').removeClass("completed");

            $(this.progressing(sourceBtn, game));
        }
    };

    this.progressing = function (sourceBtn, game) {

        var source = this;

        var progressbar = $('#' + source.name + '[class="progressbar"]'),
            progressLabel = $('#' + source.name + '[class="progressbar"] > .progress-label');

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
            var val = progressbar.progressbar("value") || 0;

            progressbar.progressbar("value", val + 1);

            if (val < 99) {
                setTimeout(progress, 80);
            }
        }

        setTimeout(progress, 100);
    };

    this.work = function (processBtn, game) {

        var harvestMessage = $('div[class="opbrengst"][id="' + this.name + '"]');

        processBtn.attr("value", "free");

        var resource = this.gainResource();
        game.getStock().addAResource(resource);
        var message = "You got " + resource.toString() + ".";

        harvestMessage.text(message);
        harvestMessage.show();

        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay()));

    };

    this.gainResource = function () {
        var quantity = Math.floor(Math.random() * (this.maxOutput - this.minOuput + 1)) + this.minOuput;
        var resourceNr = Math.floor(Math.random() * ((this.output.getSize() - 1) + 1));
        var resource = this.output.getItemByNumber(resourceNr);

        return new Resource(resource.getName(), quantity, resource.getUnitValue(), resource.getCategory());
    };

    this.setOutputList = function (outputs) {

        for (var outputNr in outputs) {
            this.output.addAnItem(outputs[outputNr]);
        }
    };

    this.getName = function () {
        return this.name;
    };

    this.getPlace = function () {
        return this.place;
    };
}