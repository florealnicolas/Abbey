function Brewery(breweryMonks) {

    this.selectedRecipe = null;
    this.amtOfMonks = breweryMonks;

    this.equipment = new List();


// Getters of Brewery

    this.getAmtOfMonks = function () {
        return this.amtOfMonks;
    };

    this.getEquipment = function () {
        return this.equipment;
    };

    this.getSelectedRecipe = function () {
        return this.selectedRecipe;
    };

// Setters of Brewery

    this.setAmtOfMonks = function (newAmtOfMonks) {
        this.amtOfMonks = newAmtOfMonks;
    };

    this.setSelectedRecipe = function (newRecipe) {
        this.selectedRecipe = newRecipe;
    };

    this.setEquipment = function (listOfEquipment) {
        this.equipment = listOfEquipment;
    };


// Functions of Brewery

    this.visualize = function () {

        var amtOfMonk = "<h4>Employees</h4>";
        amtOfMonk += "<p>At the moment there are ";
        if (this.getAmtOfMonks() == undefined) {
         amtOfMonk += "no";
        }

        else {
            amtOfMonk += this.getAmtOfMonks();
        }

        amtOfMonk += " monks working in your brewery.</p>";

        var equipment = "<h4>Equipment</h4>";

        if (this.getEquipment().getSize() != 0) {
            equipment += "<ul>";
            for (var equipmentItem = 0; equipmentItem < this.getEquipment().getSize(); equipmentItem++) {
                equipment += "<li>" + this.getEquipment().getItemByNumber(equipmentItem).getName() + "</li>";
            }

            equipment += "</ul>";
        }

        else {
            equipment += "Your brewery is empty!";
        }

        amtOfMonk += equipment;

        return amtOfMonk;
    }
}
