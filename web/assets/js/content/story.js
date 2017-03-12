function Story() {

    var grammar = new Grammar();

    var playerName = "";
    var placeName = "";
    var fatherName = "";

    var abbotName = "";
    var randomFact = "";

    var arrayOfAbbotNames = ["Abel", "Berencardus", "Caillin", "Dominic", "Eoban", "Florus", "Grimbald", "Humbald", "Inigo", "John", "Konstanty", "Livinus", "Maurice", "Nicolas", "Omer", "Pelagius", "Quintius", "Robert", "Servan", "Teodor", "Ulfrid", "Vigor", "Walstan", "Xystus", "Yared", "Zeno"];

    var arrayOfFacts = ["of a song", "of a movie", "of someone I used to know", "of soup,of noodles", "that I need to feed my cats after this story", "that it’s the same name as the creator of this all", "of someone I have seen on TV"];

    var amtOfArticles = 0;
    var activeArticle = 0;

    //Setters of Story

    this.setPlayerName = function (newPlayerName) {
        playerName = newPlayerName;
    };

    this.setPlaceName = function (newPlaceName) {
        placeName = newPlaceName;
    };

    this.setFatherName = function (newFatherName) {
        fatherName = newFatherName;
    };

    this.setAbbotName = function (newAbbotName) {
        abbotName = newAbbotName;
    };

    this.setRandomFact = function (newRandomFact) {
        randomFact = newRandomFact;
    };

    this.setActiveArticle = function (newActiveArticle) {
        activeArticle = newActiveArticle;
    };

//Getters of Story

    this.getActiveArticle = function () {
        return activeArticle;
    };

    this.getAbbotsNames = function () {
        return arrayOfAbbotNames;
    };

    this.getActiveArticle = function () {
        return activeArticle;
    };

    this.getGrammar = function () {
        return grammar;
    };

//Functions of Story

    this.part1 = function () {
        var part1 = "<p>Hey kid! Yeah, you!<br/>Could you lend me a beer?<br/>I forgot my money at home.</p>";
        part1 += "<button class= 'button beer' value='1' title='Remember: it will cost you a coin.'>Give a beer</button>";
        part1 += "<button class= 'button beer' value='-1' title='Everyone should pay their own drinks.'>Give no beer</button>";

        $("#article0").append(part1);
    };

    this.part2 = function (answer) {

        var part2 = "<p><em>- You paid one golden coin and earned 1 reputation point -</em></p>";
        part2 += "<p>Ooh! Still some hope for mankind! Cheers!</br>";
        part2 += "What about I give you a short story in return? </p>";

        if (answer == "-1") {
            part2 = "<p>I'm sorry to bother you with this.<br/> Jill, I'll pay my tab later. Can you add another beer, sweetheart? Thanks!</p>";
            part2 += "<p>Can I enlighten you with one of my many stories to make the thought of giving me beer go away?</p>";
        }

        part2 += "<button class='button choice' value='1'>Yes</button><button class='button choice' value='-1'>No</button>";

        $("#article0").append(part2);
    };

    this.part3 = function (answer) {

        var part3 = "";
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

    this.part4 = function () {
        var part4 = "<p><b>" + playerName + "</b>, ehj? That’s a fine name.<br/>" +
            "I wish I was called like that. It reminds me " + randomFact + ". Gips…</p>";
        part4 += "<p>Is that a name for a boy or a girl? Sorry but my manners getting rustier every day.</p>";
        part4 += "<button class='button gender' value='girl'>Girl</button><button class='button gender' value='boy'>Boy</button>";

        $("#article1").append(part4);
    };

    this.part5 = function () {
        var part5 = "<p>I’m Troubadour. What’s in the past, is in the past but I was instead of a renowned drinker,<br/>" +
            "a very popular writer. My stories were heard everywhere and many sons were named to me.<br/>" +
            "Like everything, fame has also a prize. I could have all the women in the world but the one person<br/>" +
            "who was true and destined to be by my side in the end …<br/>" +
            "I lost her together in my hometown with a family of my own because of a fire. Ever since you can find me in places like this.</p>" +
            "<p>Anyhow! Back to the story! Could you give me the name of the place you dream of to be?</p>";

        part5 += "<label for='namePlace'>The name of the place of my dreams is </label>";
        part5 += "<input title='You can hit enter when you typed the name of your place.' id='namePlace' placeholder='Bruges' type='text'/>";

        $("#article1").append(part5);
    };

    this.part6 = function () {
        var part6 = "<p>Well, 500 years ago, there once was an abbey on the foot of the hill in a forgotten place called <b>";
        part6 += placeName + "</b>.<br/> It was forgotten because it wasn’t important or beautiful, ";
        part6 += "the people living there didn’t care about what happened around them.</p>";

        $("#article2").append(part6);
    };

    this.part7 = function () {
        var part7 = "<p>They had a job to attend to, shared a nice meal every evening with their families</br>and that was enough for them.";
        part7 += "Who their king was, didn’t matter, they followed their instincts.<br/>";
        part7 += "What language they had to speak, didn’t matter, they understood each other.<p/>";

        part7 += "<p><b>" + fatherName + "</b> was a brewer town and was famous for his beer.<br/>";
        part7 += "Sadly, his beer didn’t make him immortal and he died just when <b>" + playerName;
        part7 += "</b>, his latest ancestor, was born.<br/> People forgot the once so dearly known brewer and forgot the taste of his legacy.</p>";

        $("#article2").append(part7);
    };

    this.part8 = function () {
        var part8 = "<p>Years go by and little <b>" + playerName + "</b> grows older, finding one day the journals of ";
        part8 += grammar.hisOrHer() + " father.<br/>";
        part8 += "It told " + grammar.himOrHer() + " about the fame and glory of his brewing and even gave a little hint<br/>";
        part8 += "that he hid his recipe from the world when he knew his day came.</p>";

        part8 += "<p>After <b>" + playerName + "</b> discovered this, " + grammar.heOrShe() +
            " was intrigued by this and asked Mother about it.<br/>";
        part8 += "She confirmed everything like a murderer confesses his crimes <br/>";
        part8 += "but she didn’t had a clue about were the secret recipe could be.<br/>";
        part8 += "She only knew that her husband spent a lot of time in the silent abbey located in the mountains<br/>";
        part8 += "just before he passed away. He had to cleanse his soul and secure his future, he told her.<p/>";

        $("#article2").append(part8);
    };

    this.part9 = function () {

        var part9 = '<p>“Maybe his recipe is not far from this abbey?”, <b>' + playerName + '</b> questioned ' + grammar.himOrHer() + 'self.<br/>' + 'The next morning ' + grammar.heOrShe() + ' packed ' + grammar.hisOrHer() + ' bags and left home determined to find the abbey.';
        part9 += "<br/>Days were like minutes. The further <b>" + playerName + "</b> came in the mountains, the faster " + grammar.hisOrHer() + " heart beated. <br/>" + "Until one day " + grammar.heOrShe() + " found the old abbey.<br/>The first looks were covered with moss, cracks and holes<br/>but " + playerName;
        part9 += " knocked on the big entrance gate.</p><p> The wooden gate creaked open and an old, timid man showed himself behind the wood.<br/>" + playerName + " tells the reason of " + grammar.hisOrHer() + " visit and asks if they still know " + grammar.hisOrHer() + " dad. ";
        part9 += "<br/>The man immediately invited <b>" + playerName + "</b> for a cup of tea and <b>" + playerName + "</b> enters.<br/><b>" +
            abbotName + "</b>, the man who opened the gate,<br/>seemed to be the abbot of the abbey." +
            " He told he was glad that someone still knew about the abbey.<br/>After some time, <b>" + playerName + "</b> heard what " + grammar.heOrShe() + " wanted to hear, the story of " + grammar.hisOrHer() + " father.</p>";

        $("#article3").append(part9);

    };

    this.part10 = function () {

        var part10 = "<p><b>" + abbotName + "</b> and <b>" + fatherName + "</b> had some common interests.<br/><b>" + abbotName + "</b> was a well-known botanist" + " in his time of glory and had installed a little stall on the market of <b>" + placeName + "</b>, selling potions and other trinkets. <br/><b>" + fatherName + "</b> sought him out and talked about some way of brewing beer.<br/>He wanted to make another type of brew. Not the cheap ale anyone knew.<br/>A beer worth fighting for, a beer that wields power to make a difference in the world.</p><p><b>" + abbotName + "</b>, who was then just a broad-minded, young monk in the abbey, and <b>" + fatherName + "</b> had put their heads together to find this recipe." + " They had built a nice garden in the abbey and acquired some brewery equipment. Every day they met to study together and to try" + " things out. It took months of time and hundreds of failed batches to get something.</p>";
        part10 += "<p>Until one day, the smell of their brewing opened up the cloudy sky. The sun shined upon the claystone of the courtyard." + " It was so magically that the people of <b>" + placeName + "</b> came to visit the abbey to know what smelled so good.</p>";

        $("#article3").append(part10);
    };

    this.part11 = function () {

        var part11 = "<p><b>" + fatherName + "</b> and <b>" + abbotName + "</b> saw both what happened, they found the one true way of brewing. They were euphoric and terrified of their discovery.</p><p>One day, a man approached them. It was a man who sold himself " +
            "as a servant of the king. His ears had heard of this beer and he demanded that the young monk and <b>" + fatherName +
            "</b> only brew it for him, so he could overrule his opponents in his own way.</p><p> They both refused any cooperation because they knew the possible outcome. It was the idea of <b>" + fatherName + "</b> to hide the recipe in the mountains surrounding the abbey. " + "No one could ever get to know this brew. In any century, in any world, this could be dangerous. It would forever be the secret of the mountains.</p><p><b>" + abbotName + "</b> ended his story to <b>" + playerName + "</b> that he never saw " + grammar.hisOrHer() +
            " father again after they got rid of the recipe. <b>" + playerName + "</b> asked if the old brewery in the abbey was still there. The abbot was delighted by this question and showed his precious place.</p>";

        $("#article4").append(part11);
    };

    this.toBeContinued = function () {
        var theEnd = "<p class='theEnd'>To be continued...(?)</p>";

        $("#article4").append(theEnd);
    };

    this.disableButtons = function (item) {
        var classNames = $(item).attr("class");
        var classes = classNames.split(' ');
        var selectedClass = classes[1];

        var someClass = $("." + selectedClass);

        someClass.attr("disabled", true);
        someClass.addClass("disabled");
    };

    this.randomizer = function (array) {
        var randomNum = Math.floor(Math.random() * (array.length - 1));
        return array[randomNum];
    };

    this.chooseFact = function (playerName) {

        var fact = arrayOfFacts[5];

        if (playerName != "Laerolf" && playerName != "Nicolas") {
            fact = this.randomizer(arrayOfFacts);

            while (fact == arrayOfFacts[5]) {
                fact = this.randomizer(arrayOfFacts)
            }
        }

        return fact;
    };

    this.showActiveArticle = function () {
        $(".storyArticle").hide();
        $("#article" + activeArticle).show();
    };

    this.addArticleToStory = function () {
        var article = "<article class='storyArticle' id='article" + amtOfArticles + "'></article>";

        amtOfArticles++;

        $('#abbey').append(article);
    };

}