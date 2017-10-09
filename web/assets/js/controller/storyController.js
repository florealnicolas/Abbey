function beginStory(game) {

    console.log("PREVIOUS STORYSAFE", game.getSafeFromGameSafeByName("storySafe"));

    const savedStorySafe = game.getSafeFromGameSafeByName("storySafe");
    const orderOfAnswers = ["abbotName", "gaveBeer", "listenedStory", "playerName", "fact", "fatherName", "playerGendre", "placeName", "playerSecret", "storyFinished"];

    if (savedStorySafe !== undefined) {

        const finishedStory = eval(savedStorySafe.storyFinished);

        if (finishedStory) {
            game.setStrangerMode("OFF");
            console.log("STORY IS FINISHED");
            game.getStory().showOldStory(game);
        }
    }

    else {
        game.setStrangerMode("ON");

        // SAVING THE CURRENT STATUS OF THE STORY COMPLETION
        game.getStory().addToStorySafe("storyFinished", false);

        console.log("STARTING A NEW STORY");
        game.getStory().showNewStory(game);
    }

}