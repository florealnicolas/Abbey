function Field(fieldNumber, priceOfField, resource, categories) {

    this.fieldName = "field" + fieldNumber;
    this.fieldResource = resource;
    this.maxOutput = 10;
    this.fieldValue = priceOfField;
    this.fieldCategories = categories;

//Getters of Field

    this.getName = function () {
        return this.fieldName;
    };

    this.getResourceName = function () {

        if (this.fieldResource == null) {
            return "plain";
        }

        else {
            return this.fieldResource.getName();
        }
    };

    this.getFieldCategories = function () {
        return this.fieldCategories;
    };

    this.getFieldValue = function () {
        return this.fieldValue;
    };

//Setters of Field

    this.setFieldCategories = function (fieldTypes) {
        this.fieldCategories = fieldTypes;
    };

//Functions of Field

    this.fieldProcess = function (game) {

        var fieldBtn = $('#' + this.fieldName + ".field.button");
        var fieldChanger = $('.veldWijzigen [id="' + this.fieldName + '"]');

        if (fieldBtn.attr("value") != "busy" && this.fieldResource != null) {

            fieldChanger.attr("disabled", true);
            fieldChanger.addClass("disabled");

            fieldBtn.addClass("disabled");
            fieldBtn.attr("value", "busy");
            $("#" + this.fieldName + '.progressbar.completed').removeClass("completed");

            $(this.progressing(fieldBtn,game));
        }

        if (this.fieldResource == null) {
            alert("Your field has not been installed yet.");
        }
    };

    this.work = function (fieldBtn, game) {

        var harvestMessage = $('div[class="opbrengst"][id="' + this.fieldName + '"]');
        var fieldChanger = $('.veldWijzigen [id="' + this.fieldName + '"]');

        fieldBtn.attr("value", "free");

        fieldChanger.attr("disabled", false);
        fieldChanger.removeClass("disabled");

        var gainedResource = this.gainResource();
        game.getStock().addAResource(gainedResource);
        var boodschap = "You got " + gainedResource.toString() + ".";

        harvestMessage.text(boodschap);
        harvestMessage.show();

        $(game.getStock()).on("change", showStock(game.getStockInString("stock")));

    };

    this.progressing = function (fieldBtn, game) {

        var field = this;

        var progressbar = $("#" + this.fieldName + '[class="progressbar"]'),
            progressLabel = $("#" + this.fieldName + '[class="progressbar"] > .progress-label');

        progressbar.progressbar({
            value: 0,
            change: function () {
                progressLabel.text(progressbar.progressbar("value") + "%");
            },
            complete: function () {
                progressLabel.text("Complete!");
                field.work(fieldBtn, game);
                field.devaluateField();
                field.updateSellFieldButton();
                progressbar.progressbar("destroy");
                progressbar.addClass("completed");
                fieldBtn.removeClass("disabled");
            },
            create: function () {
                $('div[class="opbrengst"][id="' + field.fieldName + '"]').hide();
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

    this.gainResource = function () {
        var quantity = this.maxOutput;
        var resourceName = this.fieldResource.getName();

        return new Resource(resourceName, quantity);
    };

    this.changeFieldType = function (newFieldResource) {
        if (this.fieldResource == null || newFieldResource != this.fieldResource.getName()) {
            this.fieldResource = new Resource(newFieldResource);
        }
    };

    this.devaluateField = function () {
        if (this.fieldValue != 0) {
            this.fieldValue = Math.floor(this.fieldValue - (this.fieldValue * 0.05));
        }
    };

    this.updateSellFieldButton = function () {
        $("#" + this.fieldName + " > #fieldValue").text(this.fieldValue + " coins");
    }
}
