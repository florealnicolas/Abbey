function Tank(contentResource, capacity) {

    this.content = contentResource;
    this.tankName = this.content.getName() + "-tank";
    this.tankMaterial = "iron";
    this.totalCapacity = capacity;

    this.tankMaterials = ["iron", "steel", "bronze", "copper", "gold"];

    this.level = 0;

// Getters of Tank

    this.getName = function () {
        return this.tankName;
    };

    this.getContent = function () {
        return this.content;
    };

    this.getTankMaterial = function () {
        return this.tankMaterial;
    };

// Functions of Tank    

    this.visualizeTank = function () {
        var tankShell = "<div id='" + this.tankName.replace(" ", "-") + "' class='" + this.tankMaterial + "Tank tankShell'>";
        var contentContainer = "<div class='contentContainer'>";
        var fluid = "<div class='fluid'>";

        return tankShell + contentContainer + fluid + "</div></div></div>";
    };

    this.updateFluidLevel = function () {
        $("#" + this.tankName.replace(" ", "-") + " .fluid").css("height", ((this.level / this.totalCapacity) * 100) + "%");
    };

    this.raiseFluidLevel = function (levelAddition) {
        if ((this.level + levelAddition) <= this.totalCapacity) {
            this.level += levelAddition;
        }
    };

    this.changeTankMaterial = function (newTankMaterial) {
        this.tankMaterial = newTankMaterial;
    };

    this.updateTankMaterial = function () {

        for (var materialNr in this.tankMaterials) {
            $("#" + this.tankName).removeClass(this.tankMaterials[materialNr] + "Tank");
        }

        $("#" + this.tankName).addClass(this.tankMaterial + "Tank");
    };
}