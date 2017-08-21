const resourceMap = {
    honey: {
        name: "honey",
        value: 1,
        category: "natural product"
    },
    bee: {
        name: "bee",
        value: 1,
        category: "critter"
    },
    banana: {
        name: "banana",
        value: 1,
        category: "fruit"
    },
    daisy: {
        name: "daisy",
        value: 1,
        category: "flower"
    },
    rose: {
        name: "rose",
        value: 1,
        category: "flower"
    },
    chestnut: {
        name: "chestnut",
        value: 1,
        category: "fruit"
    },
    raspberry: {
        name: "raspberry",
        value: 1,
        category: "fruit"
    },
    cranberry: {
        name: "cranberry",
        value: 1,
        category: "fruit"
    },
    strawberry: {
        name: "strawberry",
        value: 1,
        category: "fruit"
    },
    wood: {
        name: "wood",
        value: 1,
        category: "material"
    },
    woodSorrel: {
        name: "wood sorrel",
        value: 1,
        category: "flower"
    },
    mushroom: {
        name: "mushroom",
        value: 1,
        category: "fungus"
    },
    chicory: {
        name: "chicory",
        value: 1,
        category: "flower"
    },
    water: {
        name: "water",
        value: 1,
        category: "liquid"
    },
    frog: {
        name: "frog",
        value: 1,
        category: "critter"
    },
    stone: {
        name: "stone",
        value: 1,
        category: "rock"
    },
    iron: {
        name: "iron",
        value: 1,
        category: "metal"
    },
    silver: {
        name: "silver",
        value: 1,
        category: "metal"
    },
    gold: {
        name: "gold",
        value: 1,
        category: "metal"
    },
    diamond: {
        name: "diamond",
        value: 1,
        category: "mineral"
    },
    clay: {
        name: "clay",
        value: 1,
        category: "rock"
    },
    dirt: {
        name: "dirt",
        value: 1,
        category: "rock"
    },
    seawater: {
        name: "seawater",
        value: 1,
        category: "liquid"
    },
    seaSnail: {
        name: "sea snail",
        value: 1,
        category: "critter"
    },
    shell: {
        name: "shell",
        value: 1,
        category: "other"
    },
    duneGrass: {
        name: "dune grass",
        value: 1,
        category: "plant"
    },
    rice: {
        name: "rice",
        value: 1,
        category: "crop"
    },
    wheat: {
        name: "wheat",
        value: 1,
        category: "crop"
    },
    flour: {
        name: "flour",
        value: 1,
        category: "product"
    },
    barley: {
        name: "barley",
        value: 1,
        category: "crop"
    },
    corn: {
        name: "corn",
        value: 1,
        category: "crop"
    },
    hop: {
        name: "hop",
        value: 1,
        category: "crop"
    },
    potato: {
        name: "potato",
        value: 1,
        category: "crop"
    },
    ale: {
        name: "ale",
        value: 1,
        category: "beer"
    },
    malt: {
        name: "malt",
        value: 1,
        category: "product"
    },
    starch: {
        name: "starch",
        value: 1,
        category: "product"
    },
    sugarWater: {
        name: "sugar water",
        value: 1,
        category: "liquid"
    },
    pulp: {
        name: "pulp",
        value: 1,
        category: "product"
    },
    wort: {
        name: "wort",
        value: 1,
        category: "liquid"
    },
    beerToFerment: {
        name: "beer to ferment",
        value: 1,
        category: "liquid"
    },
    fermentedBeer: {
        name: "fermented beer",
        value: 1,
        category: "liquid"
    },
    beerToRipe: {
        name: "beer to ripe",
        value: 1,
        category: "liquid"
    },
    ripeBeer: {
        name: "ripe beer",
        value: 1,
        category: "liquid"
    }
};

const fieldTypeMap = ["barley", "corn", "hop", "potato", "rice", "wheat"];

const processorMap = {
    mill: {
        name: "windmill",
        possibleInput: "wheat",
        output: "flour",
        efficiency: 0.25,
        location: "outside"
    },
    kiln: {
        name: "kiln",
        possibleInput: "wheat",
        output: "malt",
        efficiency: 0.25,
        location: "brewery"
    },
    gristmill: {
        name: "gristmill",
        possibleInput: "malt",
        output: "starch",
        efficiency: 0.25,
        location: "brewery"
    },
    mashingTun: {
        name: "mashing tun",
        possibleInput: ["water", "starch"],
        output: "flour",
        efficiency: 0.25,
        location: "brewery"
    },
    brewKettle: {
        name: "brew kettle",
        possibleInput: ["sugarWater", "hop"],
        output: "pulp",
        efficiency: 0.25,
        location: "brewery"
    },
    filterBucket: {
        name: "filter bucket",
        possibleInput: ["pulp", "fermentedBeer", "ripeBeer"],
        output: ["wort", "beerToRipe", "ale"],
        efficiency: 0.25,
        location: "brewery"
    },
    spiralHeatExchanger: {
        name: "spiral heat exchanger",
        possibleInput: ["wort", "daisy"],
        output: "beerToFerment",
        efficiency: 0.25,
        location: "brewery"
    },
    fermentationTank: {
        name: "fermentation tank",
        possibleInput: "beerToFerment",
        output: "fermentedBeer",
        efficiency: 0.25,
        location: "brewery"
    },
    barrel: {
        name: "barrel",
        possibleInput: "beerToRipe",
        output: "ripeBeer",
        efficiency: 0.25,
        location: "brewery"
    }
};

const processMap = {
    grainGrinding: {
        name: "grain grinding",
        duration: 10,
        input: "wheat",
        processor: "windmill",
        output: "flour"
    },
    malting: {
        name: "malting",
        duration: 10,
        input: "wheat",
        processor: "kiln",
        output: "malt"
    },
    maltGrinding: {
        name: "malt grinding",
        duration: 10,
        input: "malt",
        processor: "gristmill",
        output: "starch"
    },
    mashing: {
        name: "mashing",
        duration: 10,
        input: ["starch", "water"],
        processor: "mashing tun",
        output: "sugarWater"
    },
    cooking: {
        name: "cooking",
        duration: 10,
        input: ["sugarWater", "hop"],
        processor: "brew kettle",
        output: "pulp"
    },
    firstFiltering: {
        name: "first filtering",
        duration: 10,
        input: "pulp",
        processor: "filter bucket",
        output: "wort"
    },
    cooldown: {
        name: "cooldown",
        duration: 10,
        input: ["wort", "daisy"],
        processor: "spiral heat exchanger",
        output: "beerToFerment"
    },
    fermenting: {
        name: "fermenting",
        duration: 10,
        input: "beerToFerment",
        processor: "fermentation tank",
        output: "fermentedBeer"
    },
    secondFiltering: {
        name: "second filtering",
        duration: 10,
        input: "fermentedBeer",
        processor: "filter bucket",
        output: "beerToRipe"
    },
    ripening: {
        name: "ripening",
        duration: 10,
        input: "beerToRipe",
        processor: "barrel",
        output: "ripeBeer"
    },
    thirdFiltering: {
        name: "third filtering",
        duration: 10,
        input: "ripeBeer",
        processor: "filter bucket",
        output: "ale"
    }
};

const sourceMap = {
    apairy: {
        name: "apairy",
        maximumAmountOfOutput: 10,
        location: "inside"
    },
    forest: {
        name: "forest",
        maximumAmountOfOutput: 10,
        location: "outside"
    },
    well: {
        name: "well",
        maximumAmountOfOutput: 10,
        location: "outside"
    },
    sea: {
        name: "sea",
        maximumAmountOfOutput: 10,
        location: "outside"
    },
    mine: {
        name: "mine",
        maximumAmountOfOutput: 10,
        location: "outside"
    }
};

const processorProcessMap = {
    mill: {
        processes: ["grain grinding"]
    }
};

const ingredientsListMap = {
    aleIngredients: {
        wheat: {name: "wheat", amount: 10},
        hop: {name: "hop", amount: 10},
        water: {name: "water", amount: 20},
        daisy: {name: "daisy", amount: 15}
    }
};

const schemeMap = {
    aleScheme: ["malting", "maltGrinding", "mashing", "cooking", "firstFiltering", "cooldown", "fermenting", "secondFiltering", "ripening", "thirdFiltering"]
};

const recipeMap = {
    aleRecipe: {
        output: {name: "ale", amount: 10},
        ingredientList: "aleIngredients",
        scheme: "aleScheme",
        author: "Liya",
        story: ""
    }
};

const breweryEquipmentMap = ["kiln", "gristmill", "mashingTun", "brewKettle", "filterBucket", "spiralHeatExchanger", "fermentationTank", "barrel"];

const outputListMap = {
    sea: {
        outputList: ["seawater", "seaSnail", "shell", "duneGrass"]
    },
    apairy: {
        outputList: ["honey", "bee"]
    },
    forest: {
        outputList: ["banana", "daisy", "rose", "chestnut", "raspberry", "cranberry", "strawberry", "wood", "woodSorrel", "mushroom", "chicory"]
    },
    well: {
        outputList: ["water", "frog"]
    },
    mine: {
        outputList: ["stone", "iron", "silver", "gold", "diamond", "clay", "dirt"]
    }
};

const vendorMap = {
    maurits: {
        name: "Maurits",
        interests: ["crop", "beer"]
    },
    ziyao: {
        name: "Ziyao",
        interests: ["flower", "critter"]
    }
};

const enlightenmentMap = {
    theWayOfTheLittleOne: {
        name: "The way of the little one",
        description: "There once was a little one called Liya.",
        requirements: {believe: 1},
        effect: "totalAmtOfMonksMultipliedBy10"
    }
};

const enlightenmentEffectMap = {
    totalAmtOfMonksMultipliedBy10: {
        target: "totalAmtOfMonks",
        effect: "multiply",
        argument: 10,
        description: "Multiplies your total amount of monks by 10."
    }
};

const getResourcesFromMap = function (resourceName) {

    let selectedResources;

    if (typeof resourceName !== "string") {
        let resourceArray = [];

        resourceName.forEach(function (resource) {
            let selectedResource = resourceMap[resource];
            resourceArray.push(new Resource(selectedResource.name, 0, selectedResource.value, selectedResource.category));
        });
        selectedResources = resourceArray;
    }
    else {
        let selectedResource = resourceMap[resourceName];
        selectedResources = new Resource(selectedResource.name, 0, selectedResource.value, selectedResource.category);
    }

    return selectedResources;
};