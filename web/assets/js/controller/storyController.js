function showStory(game) {

    game.strangerMode("ON");

    const coins = $("#valuta span");
    const reputation = $("#reputatie span");

    $(game.getStory().getActiveArticle()).on("change", game.getStory().showActiveArticle);

    // CHOOSING ABBOTNAME + SETTING ABBOTNAME + SAVING ABBOTNAME
    const abbotName = game.getStory().randomizer(game.getStory().getAbbotsNames());
    game.getStory().setAbbotName(abbotName);
    game.getStory().addToStorySafe("abbotName",abbotName);

    //Article0

    game.getStory().addArticleToStory();

    game.getStory().showActiveArticle();

    game.getStory().part1();

    $(".beer").on('click', function () {

        const answer1 = $(this).val();

        //SAVING THE CHOICE
        const safeValue = {value: answer1, choiceText: $(this).text()};
        game.getStory().addToStorySafe("gaveBeer",safeValue);

        if (answer1 === "1") {
            let currentAmtOfCoins = eval(coins.text());
            let currentAmtOfReputation = eval(reputation.text());

            coins.text(currentAmtOfCoins - 1);
            reputation.text(currentAmtOfReputation + 1);
        }

        $(this).addClass("chosen");
        game.getStory().disableButtons(this);

        game.getStory().part2(answer1);

        $(".choice").on('click', function () {
            const answer2 = eval($(this).val()) + eval(answer1);

            //SAVING THE CHOICE
            const safeValue = {value: $(this).val(), choiceText: $(this).text()};
            game.getStory().addToStorySafe("listenedStory",safeValue);

            $(this).addClass("chosen");
            game.getStory().disableButtons(this);

            game.getStory().part3(answer2);

            window.location.hash = "name";

            $("#name").keyup(function (e) {

                let playerName = $(this).val();

                if (e.keyCode === 13) {

                    if (playerName === "") {
                        playerName = $("#name").attr("placeholder");
                    }

                    $(this).attr("disabled", true);
                    $(this).addClass("disabled");

                    //Need a function to control this input!
                    playerName = playerName.substr(0, 1).toUpperCase() + playerName.substr(1).toLowerCase();
                    playerName = String(playerName);
                    $("#naam a").text(playerName);

                    const fact = game.getStory().chooseFact(playerName);
                    game.getStory().setRandomFact(fact);

                    let fatherName = game.getStory().getGrammar().writeBackwards(playerName);
                    fatherName = game.getStory().getGrammar().writeRight(fatherName);

                    game.getStory().setPlayerName(playerName);
                    game.getStory().setFatherName(fatherName);

                    //SAVING THE NAME + SAVING THE FACT + SAVING THE FATHERNAME
                    game.getStory().addToStorySafe("playerName",playerName);
                    game.getStory().addToStorySafe("fact",fact);
                    game.getStory().addToStorySafe("fatherName",fatherName);

                    const currentAmtOfCoins = coins.text();
                    const currentAmtOfReputation = reputation.text();

                    const newPlayer = new Player(playerName, currentAmtOfCoins, currentAmtOfReputation);
                    game.setAPlayer(newPlayer);

                    //Article1

                    game.getStory().addArticleToStory();
                    game.getStory().part4();

                    window.location.hash = "article1";

                    $(".gender").on("click", function () {
                        game.getPlayer().setPlayerGendre($(this).val());
                        game.getStory().getGrammar().setGender($(this).val());

                        //SAVING THE GENDRE
                        const keyValue = {value: $(this).val(), choiceText: $(this).text()};
                        game.getStory().addToStorySafe("playerGendre",keyValue);

                        $(this).addClass("chosen");
                        game.getStory().disableButtons(this);

                        game.getStory().part5();

                        window.location.hash = "namePlace";

                        $("#namePlace").keyup(function (e) {

                            let placeName = $(this).val();

                            if (e.keyCode === 13) {

                                if (placeName === "") {
                                    placeName = $("#namePlace").attr("placeholder");
                                }

                                $(this).attr("disabled", true);
                                $(this).addClass("disabled");

                                //Same for this input!
                                placeName = game.getStory().getGrammar().writeRight(placeName);
                                game.getStory().setPlaceName(String(placeName));

                                //SAVING THE PLACENAME
                                game.getStory().addToStorySafe("placeName",placeName);

                                //Article2

                                game.getStory().addArticleToStory();

                                window.location.hash = "article2";

                                game.getStory().secretPart();

                                window.location.hash = "password";

                                $("#password").keyup(function (e) {

                                    if (e.keyCode === 13) {

                                        let secret = $(this).val();

                                        game.getPlayer().setPassword(secret);

                                        //SAVING THE SECRET
                                        game.getStory().addToStorySafe("playerSecret","That's something you had to remember, sorry!");

                                        console.log("SECRET", game.getPlayer().getPassword());

                                        $(this).attr("disabled", true);
                                        $(this).addClass("disabled");

                                        game.getStory().part6();
                                        game.getStory().part7();
                                        game.getStory().part8();

                                        //Article3

                                        game.getStory().addArticleToStory();

                                        game.getStory().part9();
                                        game.getStory().part10();

                                        //Article4

                                        game.getStory().addArticleToStory();

                                        game.getStory().part11();

                                        //The end ???
                                        game.getStory().toBeContinued();

                                        let message = "Hello there! Thank you for reading this story.\n";
                                        message += "Here your own Abbey-story almost begins.\nJust hit the 'Acknowledge'-button.\n";
                                        message += "Just to make sure it is you, you need to login to play.\n";
                                        message += "Anyway... Enjoy and good luck!\n\n";
                                        message += "Happy greets, Laerolf.";
                                        alert(message);

                                        showNCRCounter(game);

                                        let acknowledgement = "<button class='button' id='acknowledge'>Acknowledge</button>";
                                        $("#story").append(acknowledgement);

                                        window.location.hash = "acknowledge";

                                        $("#acknowledge").on('click', function (e) {

                                            game.strangerMode("OFF");

                                            console.log("POSSIBILITY: LET'S SAVE THE STORY HERE!");

                                            $.post("/registering", game.getPlayer().toJSON());
                                            $.post("/saveGame", game.saveGame());

                                            window.location.replace("/login");
                                        });
                                    }
                                })
                            }
                        })
                    })
                }
            })
        });
    });
}