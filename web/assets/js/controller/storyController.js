function beginStory(game) {

    const savedStorySafe = game.getSafeFromGameSafeByName("storySafe");

    if (savedStorySafe !== undefined) {

        const finishedStory = eval(savedStorySafe.storyFinished);

        if (finishedStory) {
            game.setStrangerMode("OFF");
            game.getStory().showOldStory(game);
        }
    }

    else {
        game.setStrangerMode("ON");

        // SAVING THE CURRENT STATUS OF THE STORY COMPLETION
        game.getStory().addToStorySafe("storyFinished", false);

        game.getStory().showNewStory(game);
    }

}