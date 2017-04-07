function showInstances(game, instanceType, plaats) {

    var addresses = [];

    switch (instanceType) {

        case "source":
            var instanceGroup = game.getSources();
            break;
        case "processor":
            instanceGroup = game.getProcessors();
            break;
    }

    var instanceForm = "<form>";

    for (var instanceNr = 0; instanceNr < instanceGroup.getSize(); instanceNr++) {

        var instance = instanceGroup.getItemByNumber(instanceNr);

        if (plaats == instance.getPlace()) {

            var address = "#" + instance.getName() + '.' + instanceType;

            instanceForm += "<fieldset>";
            instanceForm += "<h5>The ";
            instanceForm += instance.getName().toLowerCase() + "</h5>";
            instanceForm += "<div class='progressbar' id='" + instance.getName() + "'><div class='progress-label'>0%</div></div>";
            instanceForm += "<div class='opbrengst' id='" + instance.getName() + "'></div>";

            if (instanceGroup == game.getProcessors()) {
                instanceForm += "<label for='" + instance.getName() + "'>";
                instanceForm += "How much " + instance.getPossibleInputs().getItemByNumber(0).getName() + " you want to convert to " + instance.getOutput().getName() + "?</label>";
                instanceForm += "<input id='inputNumber" + instance.getName() + "' type='number' min='0' value='0'/>";
            }

            instanceForm += "<button class='" + instanceType + " button' id='" + instance.getName() + "'>Execute</button>";
            instanceForm += "</fieldset>";

            addresses.push(address);
        }
    }

    instanceForm += "</form>";

    $("." + plaats).append(instanceForm);
    $('.opbrengst').hide();

    for (var addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function showNCRCounter(game) {

    var name = $("#naam span");
    var amtOfCoins = $("#valuta span");
    var amtOfReputation = $("#reputatie span");

    if (game.getPlayer() != null) {
        name.text(game.getPlayer().getPlayerName());
        amtOfCoins.text(game.getPlayer().getCoins());
        amtOfReputation.text(game.getPlayer().getReputation());
    }

    else {
        name.text("Stranger");
        amtOfCoins.text(13);
        amtOfReputation.text(0);
    }
}

function showPage(e) {
    e.preventDefault();

    $('.workspace > div').hide();
    $('#main a').removeClass("active");

    var page = $(this).text().toLowerCase();
    page = page.replace(" ", "-");

    $('#' + page).show();
    $(this).addClass("active");

    if (page == "work") {
        var activePage = $("#secondaryWork > .active").text();
        $('.' + activePage.toLowerCase()).show();
    }

    if (page == "brew") {
        activePage = $("#secondaryBrew > .active").text();
        $('.' + activePage.toLowerCase()).show();
    }
}

function showWorkSubpage(e, game) {
    e.preventDefault();

    var prevPage = $("#secondaryWork > .active").text();
    var currentPage = $(this).text().toLowerCase();

    if (prevPage != currentPage) {

        $('#work > div').hide();
        $('#secondaryWork > a').removeClass("active");

        $('.' + currentPage).show();
        $(this).addClass("active");
    }
}

function showBrewSubpage(e, game) {
    e.preventDefault();

    var prevPage = $("#secondaryBrew > .active").text();
    var currentPage = $(this).text().toLowerCase();

    if (prevPage != currentPage) {

        $('#brew > div').hide();
        $('#secondaryBrew > a').removeClass("active");

        $('.' + currentPage).show();
        $(this).addClass("active");
    }
}

function showStock(stock) {
    $("#stock").html("");
    var content = "<h3>Stock</h3>" + stock;
    $("#stock").html(content);
}

function showBrewery(game) {
    $("#brew .overview").html("");
    $("#brew .process").html("");

    var overview = game.getBrewery().visualizeOverview();
    var process = game.getBrewery().visualizeProcess();

    $("#brew .overview").html(overview);
    $("#brew .process").html(process);

    var recipe = game.getBrewery().getSelectedRecipe();

    if (recipe != null) {
        for (var stepNr = 0; stepNr < recipe.getScheme().getAmtOfSteps(); stepNr++) {
            var step = recipe.getScheme().getStepByNumber(stepNr);
            var address = "#process" + step.getName() + ".process.button";
            addBehaviour(game,address);
        }
    }
}

function updateFields(game) {
    $(".grounds").html("");

    var addresses = [];

    var field = "<form>";

    for (var fieldNr = 0, amtOfFields = game.getFields().getSize(); fieldNr < amtOfFields; fieldNr++) {

        var selectedField = game.getFields().getItemByNumber(fieldNr);
        var address = "#" + selectedField.getName() + '.field.button';

        var resourceName = game.getFields().getItemByNumber(fieldNr).getResourceName().toLowerCase();

        field += "<fieldset>";
        field += "<h5>A <span id='" + selectedField.getName() + "' class='type'>";
        field += resourceName + "</span> field</h5>";

        field += "<div class='progressbar' id='" + selectedField.getName() + "'><div class='progress-label'>0%</div></div>";

        field += "<div class='opbrengst' id='" + selectedField.getName() + "'></div>";

        field += "<div class='veldWijzigen' id='" + selectedField.getName() + "'><label  class='wijzigLabel' for='type" + selectedField.getName() + "'>Fieldtype:</label>";

        field += showFieldTypes(game, selectedField.getName());

        field += "<button class='button fieldChanger' id='" + selectedField.getName() + "'>Change field</button>";
        field += "<br/><button class='button sellField' id='" + selectedField.getName() + "'>Sell field<br/>[<span id='fieldValue'>";
        field += game.getFields().getItemByNumber(fieldNr).getFieldValue() + " coins</span>]</button></div>";
        field += "<br/> <button class='field button' id='" + selectedField.getName() + "'>Execute</button>";
        field += "<button class='button' id='" + selectedField.getName() + "Options'>Field options</button>";
        field += "</fieldset>";

        addresses.push(address);
    }

    field += "</form>";

    $(".grounds").append(field);
    updateBuyFieldButton(game);

    $(".opbrengst").hide();

    for (var addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function updateBuyFieldButton(game) {

    if (game.getPriceOfAField() == 0) {
        $("#fieldPrice").text("Free")
    }

    else {
        $("#fieldPrice").text(String(game.getPriceOfAField()) + " coins");
    }
}

function buildFields(game) {

    var addresses = [];

    var field = "<div class='grounds'><form>";

    for (var fieldNr = 0, amtOfFields = game.getFields().getSize(); fieldNr < amtOfFields; fieldNr++) {

        var selectedField = game.getFields().getItemByNumber(fieldNr);
        var address = "#" + selectedField.getName() + '.field.button';

        var resourceName = game.getFields().getItemByNumber(fieldNr).getResourceName().toLowerCase();

        field += "<fieldset>";
        field += "<h5>A <span id='" + selectedField.getName() + "' class='type'>";
        field += resourceName + "</span> field</h5>";

        field += "<div class='progressbar' id='" + selectedField.getName() + "'><div class='progress-label'>0%</div></div>";

        field += "<div class='opbrengst' id='" + selectedField.getName() + "'></div>";

        field += "<div class='veldWijzigen' id='" + selectedField.getName() + "'><label  class='wijzigLabel' for='type" + selectedField.getName() + "'>Fieldtype:</label>";

        field += showFieldTypes(game, selectedField.getName());

        field += "<button class='button fieldChanger' id='" + selectedField.getName() + "'>Change field</button>";
        field += "<br/><button class='button sellField' id='" + selectedField.getName() + "'>Sell field<br/>[<span id='fieldValue'>";
        field += game.getFields().getItemByNumber(fieldNr).getFieldValue() + " coins</span>]</button></div>";
        field += "<br/> <button class='field button' id='" + selectedField.getName() + "'>Execute</button>";
        field += "<button class='button' id='" + selectedField.getName() + "Options'>Field options</button>";
        field += "</fieldset>";

        addresses.push(address);
    }

    field += "</form></div>";
    field += "<button class='button' id='buyField'>Buy a new field<br/>[<span id='fieldPrice'></span>]</button>";

    $(".fields").append(field);
    updateBuyFieldButton(game);

    $(".opbrengst").hide();

    $("#buyField").on("click", function (e) {
        e.preventDefault();

        game.buyAField();
        updateFields(game);
        showNCRCounter(game);
    });

    for (var addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function showPeople(game) {

    var peopleForm = "<form name='people' method='post'>";
    peopleForm += "<h3>People</h3><p>Here you can say how many people need to work on a certain job.</p>";
    peopleForm += "<p>Your abbey counts <span id='totaalMonniken'>" + game.totalAmtOfMonks + "</span> monks, ";
    peopleForm += "<span id='bezetMonniken'>" + game.getAmtOfOccupiedMonks() + "</span> of them are already working.</p>";

    for (var departementNr = 0, aantalDepartementen = game.getDepartments().length; departementNr < aantalDepartementen; departementNr++) {

        peopleForm += "<fieldset> <legend>" + game.getDepartments()[departementNr] + "</legend>";
        peopleForm += "<label>Number of monks:</label>";
        peopleForm += "<input type='number' id='" + game.getDepartments()[departementNr] + "People' min='0' value='0' max='"
            + game.getAmtOfAvailableMonks() + "'/></fieldset>";
    }

    peopleForm += "</form>";

    $("#people").append(peopleForm);
}

function showRecipesAsOptions(game) {
    $("#recipes").append(game.getRecipesAsOptions());
}

function showRecipeDescription(recipe) {
    $("#recipeDescription").append(recipe.getDescription());
}

function showFieldTypes(game, fieldName) {

    var resourceName = game.getFields().getItemByName(fieldName).getResourceName();
    var fieldTypes = "<select id='Type" + fieldName + "'>";

    var allFieldTypes = game.getFieldTypes().sort();

    for (var fieldTypeNr = 0; fieldTypeNr < allFieldTypes.length; fieldTypeNr++) {

        var fieldType = allFieldTypes[fieldTypeNr];

        if (fieldType != resourceName) {
            var fieldTypeName = fieldType.substring(0, 1).toUpperCase() + fieldType.substring(1).toLowerCase();
            fieldTypes += "<option value='" + fieldType + "'>" + fieldTypeName + "</option>";
        }
    }

    fieldTypes += "</select>";

    return fieldTypes;
}

function updateFieldTypes(game, fieldName) {
    $("#Type" + fieldName).html(showFieldTypes(game, fieldName));
}