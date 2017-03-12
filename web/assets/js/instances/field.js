function Field(fieldNumber, priceOfField, resource, categories) {

    var fieldName = "field" + fieldNumber;
    var fieldResource = resource;
    var maxOutput = 10;
    var fieldValue = priceOfField;
    var fieldCategories = categories;

//Getters of Field

    this.getName = function () {
        return fieldName;
    };

    this.getResourceName = function () {

        if (fieldResource == null) {
            return "plain";
        }

        else {
            return fieldResource.getName();
        }
    };

    this.getFieldCategories = function () {
        return fieldCategories;
    };

    this.getFieldValue = function () {
        return fieldValue;
    };

//Setters of Field

    this.setFieldCategories = function (fieldTypes) {
        fieldCategories = fieldTypes;
    };

//Functions of Field

    this.fieldProcess = function (game) {

        var fieldBtn = $('#' + fieldName + ".field.button");
        var fieldChanger = $('.veldWijzigen [id="' + fieldName + '"]');

        if (fieldBtn.attr("value") != "busy" && fieldResource != null) {

            fieldChanger.attr("disabled", true);
            fieldChanger.addClass("disabled");

            fieldBtn.addClass("disabled");
            fieldBtn.attr("value", "busy");
            $("#" + fieldName + '.progressbar.completed').removeClass("completed");

            $(function () {
                var progressbar = $("#" + fieldName + '[class="progressbar"]'),
                    progressLabel = $("#" + fieldName + '[class="progressbar"] > .progress-label');

                progressbar.progressbar({
                    value: 0,
                    change: function () {
                        progressLabel.text(progressbar.progressbar("value") + "%");
                    },
                    complete: function () {
                        progressLabel.text("Complete!");
                        work(fieldBtn, game);
                        devaluateField();
                        updateSellFieldButton();
                        progressbar.progressbar("destroy");
                        progressbar.addClass("completed");
                        fieldBtn.removeClass("disabled");
                    },
                    create: function () {
                        $('div[class="opbrengst"][id="' + fieldName + '"]').hide();
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

        if (fieldResource == null) {
            alert("Your field has not been installed yet.");
        }
    };

    var work = function (fieldBtn, game) {

        var harvestMessage = $('div[class="opbrengst"][id="' + fieldName + '"]');
        var fieldChanger = $('.veldWijzigen [id="' + fieldName + '"]');

        fieldBtn.attr("value", "free");

        fieldChanger.attr("disabled", false);
        fieldChanger.removeClass("disabled");

        var gainedResource = gainResource();
        game.getStock().addAResource(gainedResource);
        var boodschap = "You got " + gainedResource.toString() + ".";

        harvestMessage.text(boodschap);
        harvestMessage.show();

        $(game.getStock()).on("change", showStock(game.getStockInString("stock")));

    };

    var gainResource = function () {
        var quantity = maxOutput;
        var resourceName = fieldResource.getName();

        return new Resource(resourceName, quantity);
    };

    this.changeFieldType = function (newFieldResource) {
        if (fieldResource == null || newFieldResource != fieldResource.getName()) {
            fieldResource = new Resource(newFieldResource);
        }
    };

    var devaluateField = function () {
        if (fieldValue != 0) {
            fieldValue = Math.floor(fieldValue - (fieldValue * 0.05));
        }
    };
    
    var updateSellFieldButton = function () {
        $("#" + fieldName + " > #fieldValue").text(fieldValue + " coins");
    }
}
