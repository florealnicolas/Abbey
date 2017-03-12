function Tank(contentResource, capacity) {

    var content = contentResource;
    var tankName = content.getName() + "-tank";
    var tankMaterial = "iron";
    var totalCapacity = capacity;

    var tankMaterials = ["iron","steel","bronze","copper","gold"];

    var level = 0;

// Getters of Tank

    this.getName = function () {
        return tankName;
    };

    this.getContent = function () {
        return content;
    };

    this.getTankMaterial = function () {
        return tankMaterial;
    };

// Functions of Tank    

    this.visualizeTank = function () {
        var tankShell = "<div id='" + tankName.replace(" ","-") + "' class='"+tankMaterial+"Tank tankShell'>";
        var contentContainer = "<div class='contentContainer'>";
        var fluid = "<div class='fluid'>";
 
        return tankShell + contentContainer + fluid + "</div></div></div>";
    };

    this.updateFluidLevel = function () {
        $("#"+tankName.replace(" ","-") + " .fluid").css("height",((level/totalCapacity)*100) + "%");
    };
    
    this.raiseFluidLevel = function (levelAddition) {
        if ((level+levelAddition) <= totalCapacity) {
            level += levelAddition;
        }
    };

    this.changeTankMaterial = function (newTankMaterial) {
        tankMaterial = newTankMaterial;
    };

    this.updateTankMaterial = function () {

        for (var materialNr in tankMaterials) {
            $("#" + tankName).removeClass(tankMaterials[materialNr] + "Tank");
        }

        $("#" + tankName).addClass(tankMaterial + "Tank");
    };
}