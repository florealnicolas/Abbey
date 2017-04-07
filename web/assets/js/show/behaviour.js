function addBehaviour(game, address) {

    var instanceName = address.split(".")[0].substr(1);
    var instanceClass = address.split('.')[1];

    //console.log("InstanceName",instanceName);
    //console.log("InstanceClass",instanceClass);

    switch (instanceClass) {

        case "source":
            $(address).click(function (e) {
                e.preventDefault();
                game.getSources().getItemByName(instanceName).sourceProcess(game);
            });
            break;

        case "process":
            $(address).click(function (e) {
                e.preventDefault();
                var processName = instanceName.replace("process","");
                var step = game.getBrewery().getSelectedRecipe().getScheme().getStepByName(processName);
                game.getProcessors().getItemByName(step.getProcessorName()).brewProcess(game, processName);
            });

            break;

        case "processor":
            $(address).click(function (e) {
                e.preventDefault();
                game.getProcessors().getItemByName(instanceName).process(game);
            });
            break;

        case "field":
            $(address).click(function (e) {
                e.preventDefault();
                game.getFields().getItemByName(instanceName).fieldProcess(game);
            });

            $("#" + instanceName + ".fieldChanger").click(function (e) {
                e.preventDefault();
                var newType = $("#Type" + instanceName).val();

                var selectedField = game.getFields().getItemByName(instanceName);
                selectedField.changeFieldType(newType);
                var resourceName = selectedField.getResourceName();
                $("#" + instanceName + ".type").text(resourceName);

                updateFieldTypes(game, instanceName);
                $(".veldWijzigen").hide();
            });

            $('#' + instanceName + "Options").click(function (e) {
                e.preventDefault();
                $('#' + instanceName + ".veldWijzigen").toggle();
            });

            $("#" + instanceName + ".sellField").on("click", function (e) {
                e.preventDefault();
                game.sellField(instanceName);
                updateFields(game);
                showNCRCounter(game);
            });

            break;

        default:
            break;
    }
}