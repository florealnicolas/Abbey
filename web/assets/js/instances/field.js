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

        const fieldBtn = $('#' + this.fieldName + ".field.button");
        const fieldChanger = $('.veldWijzigen [id="' + this.fieldName + '"]');

        if (fieldBtn.attr("value") != "busy" && this.fieldResource != null) {

            fieldChanger.attr("disabled", true);
            fieldChanger.addClass("disabled");

            fieldBtn.addClass("disabled");
            fieldBtn.attr("value", "busy");
            $("#" + this.fieldName + '.progressbar.completed').removeClass("completed");

            $(this.progressing(fieldBtn, game));
        }

        if (this.fieldResource == null) {
            alert("Your field has not been installed yet.");
        }
    };

    this.work = function (fieldBtn, game) {

        const harvestMessage = $('div[class="opbrengst"][id="' + this.fieldName + '"]');
        const fieldChanger = $('.veldWijzigen [id="' + this.fieldName + '"]');

        fieldBtn.attr("value", "free");

        fieldChanger.attr("disabled", false);
        fieldChanger.removeClass("disabled");

        const gainedResource = this.gainResource();
        game.getStock().addAResource(gainedResource);
        const boodschap = "You got " + gainedResource.toString() + ".";

        harvestMessage.text(boodschap);
        harvestMessage.show();

        $(game.getStock()).on("change", showStock(game.getStock().allItemsIntoAStockWay(game.getResourceCategories())));
        showInventory(game);
    };

    this.progressing = function (fieldBtn, game) {

        const field = this;

        const progressbar = $("#" + this.fieldName + '[class="progressbar"]'),
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
            const val = progressbar.progressbar("value") || 0;

            progressbar.progressbar("value", val + 1);

            if (val < 99) {
                setTimeout(progress, 80);
            }
        }

        setTimeout(progress, 100);
    };

    this.gainResource = function () {
        const quantity = this.maxOutput;
        const resourceName = this.fieldResource.getName();
        const unitValue = this.fieldResource.getUnitValue();
        const category = this.fieldResource.getCategory();

        return new Resource(resourceName, quantity, unitValue, category);
    };

    this.changeFieldType = function (newFieldResource) {
        if (this.fieldResource == null || newFieldResource != this.fieldResource.getName()) {
            this.fieldResource = new Resource(newFieldResource, 0, 1, "crop");
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
