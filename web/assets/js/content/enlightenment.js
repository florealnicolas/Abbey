function Enlightenment (enlightenmentName, enlightenmentDescription) {

    this.name = enlightenmentName;
    this.requirements = {};
    this.enlightenmentEffect = {};

    this.discription = enlightenmentDescription;

// Getters of Enlightenment

    this.getName = function () {
        return this.name;
    };

    this.getRequirements = function () {
        return this.requirements;
    };

    this.getEffect = function () {
        return this.enlightenmentEffect;
    };

    this.getDiscription = function () {
        return this.discription;
    };

// Setters of Enlightenment

    this.setRequirement = function (requirement, value) {
        this.requirements[requirement] = value;
    };

    this.setEffect = function (effect, value) {
        this.enlightenmentEffect[effect] = value;
    };

// Functions of Enlightenment

    this.visualizeEffects = function () {
        let visual = "";
        for(let effect in this.enlightenmentEffect) {
            if (this.enlightenmentEffect.hasOwnProperty(effect)) {
                visual += this.enlightenmentEffect[effect];
            }
        }

        return visual;
    };

    this.visualizeRequirements = function () {
        let visual = "";
        for(let requirement in this.requirements) {
            if (this.requirements.hasOwnProperty(requirement)) {
                visual += requirement + ": " + this.requirements[requirement];
            }
        }

        return visual;
    };

    this.visualizeEnlightenment = function () {
      let visual = "<div class='enlightenment' id='"+this.getName()+"'>";
      visual += "<h5>"+this.getName()+"</h5>";
      visual += "<p>Effect:\t"+this.visualizeEffects()+"<br/>" +
          "Requirements:\t"+ this.visualizeRequirements() +"<br/>" +
          "Discription:\t"+this.getDiscription()+"</p>";
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