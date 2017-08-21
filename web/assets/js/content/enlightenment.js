function Enlightenment (enlightenmentName, enlightenmentDescription) {

    this.name = enlightenmentName;
    this.requirements = {};
    this.enlightenmentEffects = {};

    this.discription = enlightenmentDescription;

// Getters of Enlightenment

    this.getName = function () {
        return this.name;
    };

    this.getRequirements = function () {
        return this.requirements;
    };

    this.getEffect = function () {
        return this.enlightenmentEffects;
    };

    this.getDiscription = function () {
        return this.discription;
    };

// Setters of Enlightenment

    this.setRequirements = function (newRequirements) {
        this.requirements = newRequirements;
    };

    this.setRequirement = function (requirement, value) {
        this.requirements[requirement] = value;
    };

    this.setEffect = function (effect, value) {
        this.enlightenmentEffects[effect] = value;
    };

    this.setEffects = function (newEffects) {
        this.enlightenmentEffects = newEffects;
    };

// Functions of Enlightenment

    this.visualizeEffects = function () {
        return this.enlightenmentEffects.description;
    };

    this.visualizeRequirements = function () {
        let grammar = new Grammar();
        let visual = "";
        for(let requirement in this.requirements) {
            if (this.requirements.hasOwnProperty(requirement)) {
                visual += grammar.writeRight(requirement) + ": " + this.requirements[requirement];
            }
        }

        return visual;
    };

    this.visualizeEnlightenment = function () {
      let visual = "<div class='enlightenment' id='"+this.getName()+"'>";
      visual += "<h5>"+this.getName()+"</h5>";
      visual += "<p>Effect:\t"+this.visualizeEffects()+"<br/>" +
          "Requirements:\t"+ this.visualizeRequirements() +"<br/>" +
          "Description:\t"+this.getDiscription()+"</p>";
      visual += "</div>";
        visual +="<button class='button enlightScroll' id='enlightenment-"+this.getName()+"'>Learn</button>";

      return visual;
    };

    this.ableToLearn = function (chapel) {
        let able = true;

        for(let requirement in this.requirements) {
            if (this.requirements.hasOwnProperty(requirement) && chapel[requirement] !== this.requirements[requirement]) {
                    able = false;
            }
        }
        return able;
    };

    this.learnEnlightenment = function (game) {

        if (this.ableToLearn(game.getChapel())) {
            game.addEffect(this.name);
        }

        else {
            console.log("You can't learn this one yet!");
        }
    };
}