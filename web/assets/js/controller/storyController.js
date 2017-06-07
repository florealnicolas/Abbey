function showStory(game) {

    var coins = $("#valuta span");
    var reputation = $("#reputatie span");

    $(game.getStory().getActiveArticle()).on("change", game.getStory().showActiveArticle);

    var abbotName = game.getStory().randomizer(game.getStory().getAbbotsNames());

    game.getStory().setAbbotName(abbotName);

    //Article0

    game.getStory().addArticleToStory();

    game.getStory().showActiveArticle();

    game.getStory().part1();

    $(".beer").on('click', function () {

        var answer1 = $(this).val();

        if (answer1 == "1") {
            var currentAmtOfCoins = eval(coins.text());
            var currentAmtOfReputation = eval(reputation.text());

            coins.text(currentAmtOfCoins--);
            reputation.text(currentAmtOfReputation++);
        }

        $(this).addClass("chosen");
        game.getStory().disableButtons(this);

        game.getStory().part2(answer1);

        $(".choice").on('click', function () {
            var answer2 = eval($(this).val()) + eval(answer1);

            $(this).addClass("chosen");
            game.getStory().disableButtons(this);

            game.getStory().part3(answer2);

            window.location.hash = "name";

            $("#name").keyup(function (e) {

                var playerName = $(this).val();

                if (e.keyCode == 13) {

                    if (playerName == "") {
                        playerName = $("#name").attr("placeholder");
                    }

                    $(this).attr("disabled", true);
                    $(this).addClass("disabled");

                    //Need a function to control this input!
                    playerName = playerName.substr(0, 1).toUpperCase() + playerName.substr(1).toLowerCase();
                    playerName = String(playerName);
                    $("#naam span").text(playerName);

                    var fact = game.getStory().chooseFact(playerName);
                    game.getStory().setRandomFact(fact);

                    var fatherName = game.getStory().getGrammar().writeBackwards(playerName);
                    fatherName = game.getStory().getGrammar().writeRight(fatherName);

                    game.getStory().setPlayerName(playerName);
                    game.getStory().setFatherName(fatherName);

                    var currentAmtOfCoins = coins.text();
                    var currentAmtOfReputation = reputation.text();

                    var newPlayer = new Player(playerName, currentAmtOfCoins, currentAmtOfReputation);
                    game.setAPlayer(newPlayer);

                    //Article1

                    game.getStory().addArticleToStory();
                    game.getStory().part4();

                    window.location.hash = "article1";

                    $(".gender").on("click", function () {
                        game.getPlayer().setPlayerGender($(this).val());
                        game.getStory().getGrammar().setGender($(this).val());

                        $(this).addClass("chosen");
                        game.getStory().disableButtons(this);

                        game.getStory().part5();

                        window.location.hash = "namePlace";

                        $("#namePlace").keyup(function (e) {

                            var placeName = $(this).val();

                            if (e.keyCode == 13) {

                                if (placeName == "") {
                                    placeName = $("#namePlace").attr("placeholder");
                                }

                                $(this).attr("disabled", true);
                                $(this).addClass("disabled");

                                //Same for this input!
                                placeName = game.getStory().getGrammar().writeRight(placeName);
                                game.getStory().setPlaceName(String(placeName));

                                //Article2

                                game.getStory().addArticleToStory();

                                window.location.hash = "article2";

                                game.getStory().secretPart();

                                window.location.hash = "password";

                                $("#password").keyup(function (e) {

                                    if (e.keyCode == 13) {

                                        let secret = $(this).val();

                                        game.getPlayer().setPassword(secret);

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

                                        $(window).scroll(function (event) {
                                            const scroll = $(window).scrollTop();

                                            if (game.getMode() && scroll >= 2600) {

                                                let db = new DB();

                                                db.addData("players",game.getPlayer());
                                                document.cookie = "user=" + game.getPlayer().getPlayerName();
                                                sessionStorage.setItem("player",game.getPlayer());
                                                game.strangerMode("OFF");

                                                let message = "Hello there! Thank you for reading this story.\n";
                                                message += "Let your Abbey-adventure here. Enjoy!\n\n";
                                                message += "Happy greets, Laerolf.";
                                                alert(message);

                                            }
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