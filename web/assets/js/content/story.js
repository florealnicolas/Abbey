function Story() {

  this.grammar = new Grammar();

  this.playerName = "";
  this.placeName = "";
  this.fatherName = "";

  this.abbotName = "";
  this.randomFact = "";

  this.arrayOfAbbotNames = ["Abel", "Berencardus", "Caillin", "Dominic", "Eoban", "Florus", "Grimbald", "Humbald", "Inigo", "John", "Konstanty", "Livinus", "Maurice", "Nicolas", "Omer", "Pelagius", "Quintius", "Robert", "Servan", "Teodor", "Ulfrid", "Vigor", "Walstan", "Xystus", "Yared", "Zeno"];

  this.arrayOfSecrets = ["When I was little, I used to have a lot of 'accidents'. If you know what I mean.", "My favourite colour is pink.", "A lot of my famous stories contain things that I made, just to make it more sensational.", "I sometimes think that I want to live in another time. What would it be to live 600 years from now?", "Honestly saying, I still believe the world is flat."];

  this.arrayOfFacts = ["of a song", "of a movie", "of someone I used to know", "of soup,of noodles", "that I need to feed my cats after this story", "that it’s the same name as the creator of this all", "of someone I have seen on TV"];

  this.amtOfArticles = 0;
  this.activeArticle = 0;

  this.storySafe = {};

  //Setters of Story

  this.setPlayerName = function(newPlayerName) {
    this.playerName = newPlayerName;
  };

  this.setPlaceName = function(newPlaceName) {
    this.placeName = newPlaceName;
  };

  this.setFatherName = function(newFatherName) {
    this.fatherName = newFatherName;
  };

  this.setAbbotName = function(newAbbotName) {
    this.abbotName = newAbbotName;
  };

  this.setRandomFact = function(newRandomFact) {
    this.randomFact = newRandomFact;
  };

  this.setActiveArticle = function(newActiveArticle) {
    this.activeArticle = newActiveArticle;
  };

  //Getters of Story

  this.getActiveArticle = function() {
    return this.activeArticle;
  };

  this.getAbbotsNames = function() {
    return this.arrayOfAbbotNames;
  };

  this.getActiveArticle = function() {
    return this.activeArticle;
  };

  this.getGrammar = function() {
    return this.grammar;
  };

  this.getStorySafe = function() {
    return this.storySafe;
  };

  //Functions of Story

  this.part1 = function() {
    let part1 = "<p>Hey kid! Yeah, you!<br/>Could you lend me a beer?<br/>I forgot my money at home.</p>";
    part1 += "<button class= 'button beer' value='1' title='Remember: it will cost you a coin.'>Give a beer</button>";
    part1 += "<button class= 'button beer' value='-1' title='Everyone should pay their own drinks.'>Give no beer</button>";

    $("#article0").append(part1);
  };

  this.part2 = function(answer) {

    let part2 = "<p><em>- You paid one golden coin and earned 1 reputation point -</em></p>";
    part2 += "<p>Ooh! Still some hope for mankind! Cheers!</br>";
    part2 += "What about I give you a short story in return? </p>";

    if (answer === "-1") {
      part2 = "<p>I'm sorry to bother you with this.<br/> Jill, I'll pay my tab later. Can you add another beer, sweetheart? Thanks!</p>";
      part2 += "<p>Can I enlighten you with one of my many stories to make the thought of giving me beer go away?</p>";
    }

    part2 += "<button class='button choice' value='1'>Yes</button><button class='button choice' value='-1'>No</button>";

    $("#article0").append(part2);
  };

  this.part3 = function(answer) {

    let part3 = "";
    switch (answer) {

      case 2:
        part3 = "<p>Great, you are a generous one and a listener!<br/>Your lover is lucky to have you.</p>";
        break;

      case 0:
        part3 = "<p>Great, you are a great listener or just generous.<br/>These days those kind of people are hard to find.</p>";
        break;

      case -1:
        part3 = "<p>Anyway… Thanks for the beer!</p>";
        break;

      case -2:
        part3 = "<p>May I ask, why did you go to a pub in the first place?";
        part3 += "<br/>Be social! Fill the bellies of lost cases and listen to their sad stories.";
        part3 += "<br/>You'll see, the world would be a better place if we all did this.</p>";
        break;
    }

    part3 += "<p>So let me tell you a story about this drink here, a simple plain beer.<br/>" +
      "Aah… You know, this was brewed by history.</p>" +
      "<p>It was playing a part in every story about kings and swords, civilizations and endless riches.<br/>" +
      "Oh! Before I go further, you seem like a nice lad. What’s your name?<br/>" +
      "Let us share an interactive story.<p/>" +
      "<label for='name'>My name is</label><input title='You can hit enter when you typed your name.' type='text' placeholder='Laerolf' id='name'/>";

    $("#article0").append(part3);
  };

  this.part4 = function() {
    let part4 = "<p><b>" + this.playerName + "</b>, ehj? That’s a fine name.<br/>" +
      "I wish I was called like that. It reminds me " + this.randomFact + ". Gips…</p>";
    part4 += "<p>Is that a name for a boy or a girl? Sorry but my manners getting rustier every day.</p>";
    part4 += "<button class='button gender' value='girl'>Girl</button><button class='button gender' value='boy'>Boy</button>";

    $("#article1").append(part4);
  };

  this.part5 = function() {
    let part5 = "<p>I’m Troubadour. What’s in the past, is in the past but I was instead of a renowned drinker,<br/>" +
      "a very popular writer. My stories were heard everywhere and many sons were named to me.<br/>" +
      "Like everything, fame has also a prize. I could have all the women in the world but the one person<br/>" +
      "who was true and destined to be by my side in the end …<br/>" +
      "I lost her together in my hometown with a family of my own because of a fire. Ever since you can find me in places like this.</p>" +
      "<p>Anyhow! Back to the story! Could you give me the name of the place you dream of to be?</p>";

    part5 += "<label for='namePlace'>The name of the place of my dreams is </label>";
    part5 += "<input title='You can hit enter when you typed the name of your place.' id='namePlace' placeholder='Bruges' type='text'/>";

    $("#article1").append(part5);
  };

  this.secretPart = function() {
    let secretPart = "<p>It's always great to bound with someone, for sure if you have such a nice time like we have.<br/>";
    secretPart += "I learned from a wise guy once, to get a real connection with someone, you should share a secret.<br/>";
    secretPart += "What do you say? Up for a trade? I'll tell you one of my secrets and you tell me one in return.</p>";
    secretPart += "<p>My courtesy wanders off sometimes but what do you say? I'll tell my secret first.<br/>";
    secretPart += "So that you'll feel less uncomfortable. Let me see... What's my most exotic secret?<br/>";
    secretPart += "Hmmmm... Yes, haha! Oh, no no no, maybe that's too open. Aaah! Yes, I got one to share!<br/>";
    secretPart += "Don't you dare to laugh or else I'll laugh with you later on!<br/>";
    secretPart += "Here we go... " + this.randomizer(this.arrayOfSecrets) + "</p>";
    secretPart += "<p>Isn't that awkard? Your turn! Don't be shy, you can tell me anything. I'll take it to my grave.</p>";

    secretPart += "<label for='secret'>My darkest secret is </label>";
    secretPart += "<input type='text' name='secret' id='secret' placeholder=' I like to sleep during class.'/>";

    $("#article2").append(secretPart);
  };

  this.part6 = function() {
    //PART OF SECRETPART!!!
    let secretPart = "<p>Hahaha! That's a dirty one! Thank you for your trust!</p>";

    let part6 = "<p>Well, 500 years ago, there once was an abbey on the foot of the hill in a forgotten place called <b>";
    part6 += this.placeName + "</b>.<br/> It was forgotten because it wasn’t important or beautiful, ";
    part6 += "the people living there didn’t care about what happened around them.</p>";

    $("#article2").append(secretPart + part6);
  };

  this.part7 = function() {
    let part7 = "<p>They had a job to attend to, shared a nice meal every evening with their families</br>and that was enough for them.";
    part7 += "Who their king was, didn’t matter, they followed their instincts.<br/>";
    part7 += "What language they had to speak, didn’t matter, they understood each other.<p/>";

    part7 += "<p><b>" + this.fatherName + "</b> was a brewer town and was famous for his beer.<br/>";
    part7 += "Sadly, his beer didn’t make him immortal and he died just when <b>" + this.playerName;
    part7 += "</b>, his latest ancestor, was born.<br/> People forgot the once so dearly known brewer and forgot the taste of his legacy.</p>";

    $("#article2").append(part7);
  };

  this.part8 = function() {
    let part8 = "<p>Years go by and little <b>" + this.playerName + "</b> grows older, finding one day the journals of ";
    part8 += this.grammar.hisOrHer() + " father.<br/>";
    part8 += "It told " + this.grammar.himOrHer() + " about the fame and glory of his brewing and even gave a little hint<br/>";
    part8 += "that he hid his recipe from the world when he knew his day came.</p>";

    part8 += "<p>After <b>" + this.playerName + "</b> discovered this, " + this.grammar.heOrShe() +
      " was intrigued by this and asked Mother about it.<br/>";
    part8 += "She confirmed everything like a murderer confesses his crimes <br/>";
    part8 += "but she didn’t had a clue about were the secret recipe could be.<br/>";
    part8 += "She only knew that her husband spent a lot of time in the silent abbey located in the mountains<br/>";
    part8 += "just before he passed away. He had to cleanse his soul and secure his future, he told her.<p/>";

    $("#article2").append(part8);
  };

  this.part9 = function() {

    let part9 = '<p>“Maybe his recipe is not far from this abbey?”, <b>' + this.playerName + '</b> questioned ' + this.grammar.himOrHer() + 'self.<br/>' + 'The next morning ' + this.grammar.heOrShe() + ' packed ' + this.grammar.hisOrHer() + ' bags and left home determined to find the abbey.';
    part9 += "<br/>Days were like minutes. The further <b>" + this.playerName + "</b> came in the mountains, the faster " + this.grammar.hisOrHer() + " heart beated. <br/>" + "Until one day " + this.grammar.heOrShe() + " found the old abbey.<br/>The first looks were covered with moss, cracks and holes<br/>but " + this.playerName;
    part9 += " knocked on the big entrance gate.</p><p> The wooden gate creaked open and an old, timid man showed himself behind the wood.<br/>" + this.playerName + " tells the reason of " + this.grammar.hisOrHer() + " visit and asks if they still know " + this.grammar.hisOrHer() + " dad. ";
    part9 += "<br/>The man immediately invited <b>" + this.playerName + "</b> for a cup of tea and <b>" + this.playerName + "</b> enters.<br/><b>" +
      this.abbotName + "</b>, the man who opened the gate,<br/>seemed to be the abbot of the abbey." +
      " He told he was glad that someone still knew about the abbey.<br/>After some time, <b>" + this.playerName + "</b> heard what " + this.grammar.heOrShe() + " wanted to hear, the story of " + this.grammar.hisOrHer() + " father.</p>";

    $("#article3").append(part9);

  };

  this.part10 = function() {

    let part10 = "<p><b>" + this.abbotName + "</b> and <b>" + this.fatherName + "</b> had some common interests.<br/><b>" + this.abbotName + "</b> was a well-known botanist" + " in his time of glory and had installed a little stall on the market of <b>" + this.placeName + "</b>, selling potions and other trinkets. <br/><b>" + this.fatherName + "</b> sought him out and talked about some way of brewing beer.<br/>He wanted to make another type of brew. Not the cheap ale anyone knew.<br/>A beer worth fighting for, a beer that wields power to make a difference in the world.</p><p><b>" + this.abbotName + "</b>, who was then just a broad-minded, young monk in the abbey, and <b>" + this.fatherName + "</b> had put their heads together to find this recipe." + " They had built a nice garden in the abbey and acquired some brewery equipment. Every day they met to study together and to try" + " things out. It took months of time and hundreds of failed batches to get something.</p>";
    part10 += "<p>Until one day, the smell of their brewing opened up the cloudy sky. The sun shined upon the claystone of the courtyard." + " It was so magically that the people of <b>" + this.placeName + "</b> came to visit the abbey to know what smelled so good.</p>";

    $("#article3").append(part10);
  };

  this.part11 = function() {

    let part11 = "<p><b>" + this.fatherName + "</b> and <b>" + this.abbotName + "</b> saw both what happened, they found the one true way of brewing. They were euphoric and terrified of their discovery.</p><p>One day, a man approached them. It was a man who sold himself " +
      "as a servant of the king. His ears had heard of this beer and he demanded that the young monk and <b>" + this.fatherName +
      "</b> only brew it for him, so he could overrule his opponents in his own way.</p><p> They both refused any cooperation because they knew the possible outcome. It was the idea of <b>" + this.fatherName + "</b> to hide the recipe in the mountains surrounding the abbey. " + "No one could ever get to know this brew. In any century, in any world, this could be dangerous. It would forever be the secret of the mountains.</p><p><b>" + this.abbotName + "</b> ended his story to <b>" + this.playerName + "</b> that he never saw " + this.grammar.hisOrHer() +
      " father again after they got rid of the recipe. <b>" + this.playerName + "</b> asked if the old brewery in the abbey was still there. The abbot was delighted by this question and showed his precious place.</p>";

    $("#article4").append(part11);
  };

  this.toBeContinued = function() {
    let theEnd = "<p class='theEnd'>To be continued...(?)</p>";

    $("#article4").append(theEnd);
  };

  this.disableButtons = function(item) {
    const classNames = $(item).attr("class");
    const classes = classNames.split(' ');
    const selectedClass = classes[1];

    const someClass = $("." + selectedClass);

    someClass.attr("disabled", true);
    someClass.addClass("disabled");
  };

  this.randomizer = function(array) {
    const randomNum = Math.floor(Math.random() * (array.length - 1));
    return array[randomNum];
  };

  this.chooseFact = function(playerName) {

    let fact = this.arrayOfFacts[5];

    if (playerName !== "Laerolf" && playerName !== "Nicolas") {
      fact = this.randomizer(this.arrayOfFacts);

      while (fact === this.arrayOfFacts[5]) {
        fact = this.randomizer(this.arrayOfFacts)
      }
    }

    return fact;
  };

  this.showActiveArticle = function() {
    $(".storyArticle").hide();
    $("#article" + this.activeArticle).show();
  };

  this.addArticleToStory = function() {
    const article = "<article class='storyArticle' id='article" + this.amtOfArticles + "'></article>";

    this.amtOfArticles++;

    $('#story').append(article);
  };

  this.addToStorySafe = function(key, value) {
    this.storySafe[key] = value;
  };

  this.setStorySafe = function(oldStory) {
    this.storySafe = oldStory.storySafe;
  };

  this.showOldStory = function(game) {

    const oldStory = this.getStorySafe();

    $(game.getStory().getActiveArticle()).on("change", game.getStory().showActiveArticle);

    // SETTING ABBOTNAME
    game.getStory().setAbbotName(oldStory.abbotName);

    //Article0

    game.getStory().addArticleToStory();

    game.getStory().showActiveArticle();

    game.getStory().part1();

    let chosenButton = $(".button:contains(" + oldStory.gaveBeer.choiceText + ")");
    chosenButton.addClass("chosen");
    game.getStory().disableButtons(chosenButton);

    game.getStory().part2(oldStory.gaveBeer.value);

    chosenButton = $(".button:contains(" + oldStory.listenedStory.choiceText + ")");
    chosenButton.addClass("chosen");
    game.getStory().disableButtons(chosenButton);

    game.getStory().part3(oldStory.listenedStory.value);

    game.getStory().setPlayerName(oldStory.playerName);
    game.getStory().setFatherName(oldStory.fatherName);
    game.getStory().setRandomFact(oldStory.fact);

    let inputField = $("#name");
    inputField.val(oldStory.playerName);
    inputField.attr("disabled", true);
    inputField.addClass("disabled");

    game.getStory().addArticleToStory();
    game.getStory().part4();

    chosenButton = $(".button:contains(" + oldStory.playerGendre.choiceText + ")");
    chosenButton.addClass("chosen");
    game.getStory().disableButtons(chosenButton);

    game.getStory().getGrammar().setGender(game.getPlayer().getGendre());
    game.getStory().part5();

    game.getStory().setPlaceName(oldStory.placeName);

    inputField = $("#namePlace");
    inputField.val(oldStory.placeName);
    inputField.attr("disabled", true);
    inputField.addClass("disabled");

    game.getStory().addArticleToStory();
    game.getStory().secretPart();

    inputField = $("#secret");
    inputField.attr("type", "text");
    inputField.val(oldStory.playerSecret);
    inputField.attr("disabled", true);
    inputField.addClass("disabled");

    game.getStory().part6();

    game.getStory().part7();

    game.getStory().part8();

    game.getStory().addArticleToStory();
    game.getStory().part9();

    game.getStory().part10();

    game.getStory().addArticleToStory();
    game.getStory().part11();

    game.getStory().toBeContinued();
  };

  this.showNewStory = function(game) {

    const coins = $("#valuta span");
    const reputation = $("#reputatie span");

    $(game.getStory().getActiveArticle()).on("change", game.getStory().showActiveArticle);

    // CHOOSING ABBOTNAME + SETTING ABBOTNAME + SAVING ABBOTNAME
    const abbotName = game.getStory().randomizer(game.getStory().getAbbotsNames());
    game.getStory().setAbbotName(abbotName);
    game.getStory().addToStorySafe("abbotName", abbotName);

    //Article0

    game.getStory().addArticleToStory();

    game.getStory().showActiveArticle();

    game.getStory().part1();

    $(".beer").on('click', function() {

      const answer1 = $(this).val();

      //SAVING THE CHOICE
      const safeValue = {
        value: answer1,
        choiceText: $(this).text()
      };
      game.getStory().addToStorySafe("gaveBeer", safeValue);

      if (answer1 === "1") {
        let currentAmtOfCoins = eval(coins.text());
        let currentAmtOfReputation = eval(reputation.text());

        coins.text(currentAmtOfCoins - 1);
        reputation.text(currentAmtOfReputation + 1);
      }

      $(this).addClass("chosen");

      game.getStory().disableButtons(this);

      game.getStory().part2(answer1);

      $(".choice").on('click', function() {
        const answer2 = eval($(this).val()) + eval(answer1);

        //SAVING THE CHOICE
        const safeValue = {
          value: $(this).val(),
          choiceText: $(this).text()
        };
        game.getStory().addToStorySafe("listenedStory", safeValue);

        $(this).addClass("chosen");
        game.getStory().disableButtons(this);

        game.getStory().part3(answer2);

        window.location.hash = "name";

        $("#name").keyup(function(e) {

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
            game.getStory().addToStorySafe("playerName", playerName);
            game.getStory().addToStorySafe("fact", fact);
            game.getStory().addToStorySafe("fatherName", fatherName);

            const currentAmtOfCoins = coins.text();
            const currentAmtOfReputation = reputation.text();

            const newPlayer = new Player(playerName, currentAmtOfCoins, currentAmtOfReputation);
            game.setAPlayer(newPlayer);

            //Article1

            game.getStory().addArticleToStory();
            game.getStory().part4();

            window.location.hash = "article1";

            $(".gender").on("click", function() {
              game.getPlayer().setPlayerGendre($(this).val());
              game.getStory().getGrammar().setGender($(this).val());

              //SAVING THE GENDRE
              const keyValue = {
                value: $(this).val(),
                choiceText: $(this).text()
              };
              game.getStory().addToStorySafe("playerGendre", keyValue);

              $(this).addClass("chosen");
              game.getStory().disableButtons(this);

              game.getStory().part5();

              window.location.hash = "namePlace";

              $("#namePlace").keyup(function(e) {

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
                  game.getStory().addToStorySafe("placeName", placeName);

                  //Article2

                  game.getStory().addArticleToStory();

                  window.location.hash = "article2";

                  game.getStory().secretPart();

                  window.location.hash = "password";

                  $("#secret").keyup(function(e) {

                    if (e.keyCode === 13) {

                      let secret = $(this).val();

                      game.getPlayer().setSecret(secret);

                      //SAVING THE SECRET
                      game.getStory().addToStorySafe("playerSecret", "That's something you had to remember, sorry!");

                      console.log("SECRET", game.getPlayer().getSecret());

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

                      $("#acknowledge").on('click', function(e) {

                        game.setStrangerMode("OFF");

                        // SAVING THE CURRENT STATUS OF THE STORY COMPLETION
                        game.getStory().addToStorySafe("storyFinished", true);

                        /*let registeringData = game.getPlayer().toJSON();
                        registeringData["game"] = game.saveGame();
                        registeringData["_id"] = game.getPlayer().getPlayerName();

                        console.log("REGISTERING DATA", registeringData);
                        $.post("/registering", registeringData);*/

                        $.post("/saveGame", game.saveGame(), function(result) {

                          if (result) {
                            window.location.replace("/");
                          }
                        })

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
}
