function addBehaviour(game, address) {

    const instanceName = address.split(".")[0].substr(1);
    const instanceClass = address.split('.')[1];

    /*console.log("ADDRESS",address);
     console.log("InstanceName",instanceName);
     console.log("InstanceClass",instanceClass);*/

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
                let processName = instanceName.replace("process","");
                processName = processName.replace("-"," ");
                const step = game.getBrewery().getSelectedRecipe().getScheme().getStepByName(processName);
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
                const newType = $("#Type" + instanceName).val();

                const selectedField = game.getFields().getItemByName(instanceName);
                selectedField.changeFieldType(newType);
                const resourceName = selectedField.getResourceName();
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