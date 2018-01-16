(function ($, window, document) {

    //Resources needed in the game

    //FOREST

    //Liya's recommendations

    //const banana = new Resource("banana");
    //const daisy = new Resource("daisy");
    //const rose = new Resource("rose");
    //const chestnut = new Resource("chestnut");
    //const herb -> more specific;

    //Stop

    $(document).ready(function () {

        $.get("./localStorage/etc/environment", function (environment) {

            $.get("/session", function (session) {

                const active = eval(session.active);

                console.log("ACTIVE", active);

                game1 = new Game();
                game1.gameInitialisation();

                if (environment === "development") {
                    developmentMode(game1);
                }

                if (!active) {
                    showWelcomePage();
                    game1.visualize();
                }

                else {

                    console.log("USER", session.user);
                    const activeUser = session.user;

                    const activePlayer = new Player(activeUser.playerName, activeUser.coins, activeUser.reputation);
                    activePlayer.setPlayerGendre(activeUser.playerGendre);
                    activePlayer.setPassword(activeUser.password);
                    game1.setAPlayer(activePlayer);

                    game1.loadGame(activeUser.game);
                    game1.visualize();

                    showNCRCounter(game1);

                }
            });
        });

    });
})(window.jQuery, window, document);