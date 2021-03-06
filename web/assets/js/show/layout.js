function showInstances(game, instanceType, place) {

    let addresses = [];

    switch (instanceType) {

        case "source":
            var instanceGroup = game.getSources();
            break;
        case "processor":
            instanceGroup = game.getProcessors();
            break;
    }

    let instanceForm = "<form>";

    for (let instanceNr = 0; instanceNr < instanceGroup.getSize(); instanceNr++) {

        let instance = instanceGroup.getItemByNumber(instanceNr);

        if (place === instance.getPlace()) {

            const address = "#" + instance.getName() + '.' + instanceType;

            instanceForm += "<fieldset>";
            instanceForm += "<h5>The ";
            instanceForm += instance.getName().toLowerCase() + "</h5>";
            instanceForm += "<div class='progressbar' id='" + instance.getName() + "'><div class='progress-label'>0%</div></div>";
            instanceForm += "<div class='opbrengst' id='" + instance.getName() + "'></div>";

            if (instanceGroup === game.getProcessors()) {

                instanceForm += "<label for='" + instance.getName() + "'>";

                let selectedInputList = instance.getPossibleInputs().list;

                for (let input in selectedInputList) {
                    if (selectedInputList.hasOwnProperty(input)) {
                        let selectedInput = selectedInputList[input];

                        if (selectedInput.length > 1) {
                            selectedInput.forEach(function (input) {
                                instanceForm += "How much " + input.getName() + " you want to convert to " + instance.getOutput().getName() + "?</label>";
                                instanceForm += "<input id='inputNumber" + instance.getName() + "' type='number' min='0' value='0'/>";
                            })
                        }
                        else {
                            instanceForm += "How much " + selectedInput.getName() + " you want to convert to " + instance.getOutput().getName() + "?</label>";
                            instanceForm += "<input id='inputNumber" + instance.getName() + "' type='number' min='0' value='0'/>";
                        }
                    }
                }
            }

            instanceForm += "<button class='" + instanceType + " button' id='" + instance.getName() + "'>Execute</button>";
            instanceForm += "</fieldset>";

            addresses.push(address);
        }
    }

    instanceForm += "</form>";

    $("." + place).append(instanceForm);
    $('.opbrengst').hide();

    for (let addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function showEffects(place, game) {

    let effectsHTML = "<p>";

    const abbey = game.getAbbey();

    switch (place) {
        case 'inside':
            var monks = abbey.getMonks().InsideMonks;
            break;

        case 'outside':
            monks = abbey.getMonks().OutsideMonks;
            break;

        case 'fields':
            monks = abbey.getMonks().FieldMonks;
            break;
    }

    const monkBonus = "Monk bonus: <span class='monkBonus'>" + (monks / abbey.getTotalAmtOfMonks()) * 100 + "%</span>";

    effectsHTML += monkBonus;

    effectsHTML += "</p>";

    $("."+place +" .effects").html(effectsHTML);
}

function showNCRCounter(game) {

    const name = $("#naam a");
    const amtOfCoins = $("#valuta span");
    const amtOfReputation = $("#reputatie span");

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

function showStock(stock) {
    var content = stock;
    $("#stock-page .card-body").html(content);
}

function showStorage(game) {

    let visual = "<h4>Storage</h4>";

    const recipe = game.getBrewery().getSelectedRecipe();

    if (recipe !== null) {

        for (let recipeNr = 0, amtOfRecipes = game.getRecipes().getSize(); recipeNr < amtOfRecipes; recipeNr++) {

            const selectedScheme = game.getRecipes().getItemByNumber(recipeNr).getScheme();
            selectedScheme.loadUsedStorage();
            visual += selectedScheme.visualizeScheme(game.getRecipes().getItemByNumber(recipeNr).getName());
        }
    }

    else {
        visual += "<p>Your monks don't know what to store yet! Give them a recipe from the book!</p>";
    }

    $("#storage-page > .card-body").html(visual);
};

function showBrewery(game) {
    $("#overview-subpage").html("");
    $("#process-subpage").html("");

    const overview = game.getBrewery().visualizeOverview(game);
    const process = game.getBrewery().visualizeProcess();

    $("#overview-subpage").html(overview);
    $("#process-subpage").html(process);

    const recipe = game.getBrewery().getSelectedRecipe();

    if (recipe !== null) {
        for (let stepNr = 0; stepNr < recipe.getScheme().getAmtOfSteps(); stepNr++) {
            const step = recipe.getScheme().getStepByNumber(stepNr);
            const address = "#process" + step.getName().replace(" ", "-") + ".process.button";
            addBehaviour(game, address);
        }
    }
}

function showInventory(game) {
    $("#inventory-page > .card-body").html(game.visualizeInventory());

    $(".inventoryItem").draggable({revert: true});
}

function showMarket(game) {

    let vendorList = "<h4>Vendors on the marketplace</h4>";

    for (let vendorNr = 0; vendorNr < game.getVendors().getSize(); vendorNr++) {
        const selectedVendor = game.getVendors().getItemByNumber(vendorNr);
        vendorList += selectedVendor.visualizeVendorButton();
    }

    $("#vendors").html(vendorList);

    $(".vendorButton").on("click", function () {
        $(".vendorButton").removeClass("active");
        $(this).addClass("active");

        showVendor(game, $(this).text());
        showInventory(game);
    });

    showInventory(game);
}

function showVendor(game, vendorName) {

    let selectedVendor = game.getVendors().getItemByName(vendorName);

    $("#dealScreen").html(selectedVendor.visualizeVendor());

    $("#itemToSell").droppable({
        drop: function (event, ui) {

            const vendorName = $(this).parents()[0].id;
            const productName = ui.draggable[0].children[0].className;

            $(this).droppable("disable");

            $(this).html("<p>" + productName + "</p>");
            $(".inventoryItem." + productName).css("display", "none");

            const vendor = game.getVendors().getItemByName(vendorName);
            const itemToSell = game.getStock().getItemByName(productName);

            $("#" + vendor.getName() + " #message").hide();

            $("#" + vendor.getName()).append(vendor.visualizeRFQ(itemToSell));
            $("#" + vendor.getName() + " #itemQuantity").val(0);

            $("#" + vendor.getName() + " #itemQuantity").on("change", function () {
                const itemQuantity = $(this).val();

                $("#" + vendor.getName() + " #finalItemQuantity").html(vendor.visualizeFinalItemQuantity(itemToSell, itemQuantity));
                $("#" + vendor.getName() + " #offer").html(vendor.visualizeOffer(itemToSell, itemQuantity));

                $("#" + vendor.getName() + " #offer .button").on("click", function () {

                    let deal = false;

                    if ($(this).val() == "yes") {
                        deal = true;
                        const price = vendor.makeOffer(itemToSell) * itemQuantity;
                        game.getPlayer().addCoins(price);
                        const resourceInStock = game.getStock().getItemByName(itemToSell.getName());
                        resourceInStock.removeQuantityOfAResource(itemQuantity);
                        game.getStock().removeResourceIfThereIsNoQuantity(resourceInStock);
                        showNCRCounter(game);
                    }

                    $("#" + vendor.getName() + " .RFQ").remove();
                    showInventory(game);
                    $("#" + vendor.getName() + " #itemToSell").html("");
                    $("#" + vendor.getName() + " #itemToSell").droppable("enable");
                    $("#" + vendor.getName() + " #message").html(vendor.visualizeDealMessage(deal));
                    $("#" + vendor.getName() + " #message").show();
                });
            });
        }
    });
}

function showProfilePage(game) {

    const player = game.getPlayer();

    let profile = "<p>You are still just a stranger to us...<br/>Finish the story of Troubadour first!</p>";

    if (player !== null) {

        profile = "<h2>" + player.getPlayerName() + "</h2>" +
            "<p>Who are you to us?<br/>" +
            "Here you can find all the information we have about you.</p>";

        profile += "<div class='profileSection'>" +
            "<h3>Account details</h3>" +
            "<p>Username: " + player.getPlayerName() + "<br/>" +
            "Coins: " + player.getCoins() + "<br/>" +
            "Reputation: " + player.getReputation() + "<br/>" +
            "Gendre: " + player.getGendre() + "</p>" +
            "</div>" +

            "<div class='profileSection'>" +
            "<h3>Change password</h3>" +
            "<form action='/passwordchange' method='post'>" +
            "<label for='currentPassword'>Current password</label>" +
            "<input type='password' id='currentPassword' name='passwordChange[currentPassword]'/>" +
            "<label for='newPassword'>New password</label>" +
            "<input type='password' id='newPassword' name='passwordChange[newPassword]'/>" +
            "<label for='confirmPassword'>Confirm new password</label>" +
            "<input type='password' id='confirmPassword' name='passwordChange[confirmNewPassword]'/>" +
            "<input class='btn' type='submit' name='changePassword' value='Change password'/>" +
            "</form>" +
            "<div/>";

        profile += "<div class='profileSection'>" +
            "<h3 title='Besides playing of course.'>Alternative options</h3>" +
            "<h4>Auto-save-feature</h4>" +
            "<p>Default the game will be saved every 15 minutes.</p>" +
            "<form method='post' action='#'><label for='saveTimer'>Save my game every </label>"
            + "<select id='saveTimer'><option value='5'>5 minutes</option><option value='10'>10 minutes</option><option value='15'>15 minutes</option></select>" +
            "<input type='submit' value='Set timer' class='button' id='setSaveTimer'/></form>" +
            "<a class='btn' href='/reset'>Reset account</a>" +
            "<a class='btn' href='/logout'>Log out</a>" +
            "<button class='btn' id='saveGame'>Save</button>" +
            "<button class='btn' id='loadGame'>Load</button>" +
            "</div>";
    }

    else {

    }

    $("#profile-page .card-body").html(profile);

    $("#saveGame").on('click', function () {
        console.log("DATA TO SAVE", game.saveGame());

        $.post("/saveGame", game.saveGame());
    });

    $("#setSaveTimer").on("click", function (e) {
        e.preventDefault();

        if (game.getSaveTimer() !== null) {
            window.clearInterval(game.getSaveTimer());
        }

        let amountOfMinutes = $("#saveTimer option:selected").val();

        game.setSaveTimer(window.setInterval(function () {
            console.log("SAVED AFTER " + amountOfMinutes + " MINUTES.");
            $.post("/saveGame", game1.saveGame());
            console.log("Game saved.");
        }, amountOfMinutes * 60 * 1000));

    })
}

function updateFields(game) {
    $(".grounds").html("");

    let addresses = [];

    let field = "<form>";

    for (let fieldNr = 0, amtOfFields = game.getFields().getSize(); fieldNr < amtOfFields; fieldNr++) {

        let selectedField = game.getFields().getItemByNumber(fieldNr);
        let address = "#" + selectedField.getName() + '.field.button';

        let resourceName = game.getFields().getItemByNumber(fieldNr).getResourceName().toLowerCase();

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

    for (let addressNr = 0; addressNr < addresses.length; addressNr++) {
        addBehaviour(game, addresses[addressNr]);
    }
}

function updateBuyFieldButton(game) {

    if (game.getPriceOfAField() === 0) {
        $("#fieldPrice").text("Free")
    }

    else {
        $("#fieldPrice").text(String(game.getPriceOfAField()) + " coins");
    }
}

function buildFields(game) {

    const abbey = game.getAbbey();

    let addresses = [];

    let field = "<div class='fields effects'></div>";
    //let field = "<div class='grounds'><p class='monkBonus'>Monk bonus: <span>" + (abbey.getMonks().FieldMonks / abbey.getTotalAmtOfMonks()) * 100 + "%</span></p><form>";

    for (let fieldNr = 0, amtOfFields = game.getFields().getSize(); fieldNr < amtOfFields; fieldNr++) {

        let selectedField = game.getFields().getItemByNumber(fieldNr);
        let address = "#" + selectedField.getName() + '.field.button';

        let resourceName = game.getFields().getItemByNumber(fieldNr).getResourceName().toLowerCase();

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

function showAbbey(game) {

    const abbey = game.getAbbey();

    let monkForm = "<form name='monk' method='post'>";
    monkForm += "<h3>Monks</h3><p>Here you can decide how many monks need to work on a certain job.<br/>";
    monkForm += "Your abbey counts currently <span id='totalAmtOfMonks'>" + abbey.getTotalAmtOfMonks() + "</span> monks, ";
    monkForm += "<span id='amtOfOccupiedMonks'>" + abbey.getAmtOfOccupiedMonks() + "</span> of them are already working.</p>";

    const departments = game.getDepartments().sort();

    for (let departmentNr = 0, aantalDepartementen = departments.length; departmentNr < aantalDepartementen; departmentNr++) {

        monkForm += "<fieldset> <legend>" + departments[departmentNr] + "</legend>";
        monkForm += "<label>Number of monks:</label>";
        monkForm += "<input type='number' id='" + departments[departmentNr].split(" ")[0] + "Monks' min='0' value='0' max='"
            + abbey.getAmtOfAvailableMonks() + "'/></fieldset>";
    }

    monkForm += "</form>";

    $("#abbey-page > .card-body").html(monkForm);

    game.getAbbey().settingInputFields(game.getAbbey().amtOfMonks);

    $("#abbey-page input").change(function () {
        game.getAbbey().manageMonks(game, this);
        showBrewery(game);
        showChapel(game);
    });
}

function showChapel(game) {

    const chapel = game.getChapel();

    $("#chapel-page > .card-body").html(chapel.visualize());
    chapel.checkIfTeachable();

    $("#pray").on("click", function () {
        chapel.manualPraying();
    });

    $(".button.enlightScroll").on("click", function () {
        const scrollName = $(this)[0].id.split("-")[1];
        chapel.getEnlightenmentList().getItemByName(scrollName).learnEnlightenment(game);
        game.getPlayer().activateEnlightment(game);

        $(this).addClass("disabled");
        $(this).text("Learnt");
    });
}

function showRecipesAsOptions(game) {
    $("#recipes").append(game.getRecipesAsOptions());
}

function showRecipeDescription(recipe) {
    $("#recipeDescription").html(recipe.getDescription());
}

function showWorkshop(game) {
    const workshop = game.getWorkshop();

    $("#workshop-page > .card-body").html(game.getWorkshop().visualizeWorkshop());

    if (game.getPlayer() !== null) {
        workshop.checkIfBuyable(game);
    }

    $(".button.upgradeButton").on("click", function () {
        const upgradeName = $(this)[0].id.split("-")[1];
        if (game.upgrades.indexOf(upgradeName) === -1) {
            workshop.getListOfUpgrades().getItemByName(upgradeName).buyUpgrade(game);
            game.applyUpgrades();
            $(this).addClass("disabled");
            $(this).text("Bought");
        }
    });
}

function showFieldTypes(game, fieldName) {

    const resourceName = game.getFields().getItemByName(fieldName).getResourceName();
    let fieldTypes = "<select id='Type" + fieldName + "'>";

    const allFieldTypes = game.getFieldTypes().sort();

    for (let fieldTypeNr = 0; fieldTypeNr < allFieldTypes.length; fieldTypeNr++) {

        let fieldType = allFieldTypes[fieldTypeNr];

        if (fieldType !== resourceName) {
            let fieldTypeName = fieldType.substring(0, 1).toUpperCase() + fieldType.substring(1).toLowerCase();
            fieldTypes += "<option value='" + fieldType + "'>" + fieldTypeName + "</option>";
        }
    }

    fieldTypes += "</select>";

    return fieldTypes;
}

function updateFieldTypes(game, fieldName) {
    $("#Type" + fieldName).html(showFieldTypes(game, fieldName));
}
