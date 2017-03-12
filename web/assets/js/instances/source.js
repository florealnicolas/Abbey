function Source(sourceName, sourceMaxOutput, placeName) {
    var name = sourceName;
    var output = new List();
    var minOuput = 1;
    var maxOutput = sourceMaxOutput;
    var place = placeName;

    this.sourceProcess = function (game) {

        var sourceBtn = $("#" + sourceName + ".source.button");

        if (sourceBtn.attr('value') != "busy") {

            sourceBtn.attr("value", "busy");
            sourceBtn.addClass("disabled");
            $("#" + sourceName + '.progressbar.completed').removeClass("completed");

            $(function () {
                var progressbar = $('#' + name + '[class="progressbar"]'),
                    progressLabel = $('#' + name + '[class="progressbar"] > .progress-label');

                progressbar.progressbar({
                    value: 0,
                    change: function () {
                        progressLabel.text(progressbar.progressbar("value") + "%");
                    },
                    complete: function () {
                        progressLabel.text("Complete!");
                        work(sourceBtn, game);
                        progressbar.progressbar("destroy");
                        $("#" + sourceName + '.progressbar').addClass("completed");
                        sourceBtn.removeClass("disabled");
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
            });
        }
    };

    var work = function (processBtn, game) {

        var harvestMessage = $('div[class="opbrengst"][id="' + name + '"]');

        processBtn.attr("value", "free");

        var resource = gainResource();
        game.getStock().addAResource(resource);
        var message = "You got " + resource.toString() + ".";

        harvestMessage.text(message);
        harvestMessage.show();

        $(game.getStock()).on("change", showStock(game.getStockInString("Stock")));

    };

    var gainResource = function () {
        var quantity = Math.floor(Math.random() * (maxOutput - minOuput + 1)) + minOuput;
        var resourceNr = Math.floor(Math.random() * ((output.getSize() - 1) + 1));
        var resourceName = output.getItemByNumber(resourceNr).getName();

        return new Resource(resourceName, quantity);
    };

    this.setOutputList = function (outputs) {

        for (var outputNr in outputs) {
            output.addAnItem(outputs[outputNr]);
        }
    };

    this.getName = function () {
        return name;
    };

    this.getPlace = function () {
        return place;
    };
}