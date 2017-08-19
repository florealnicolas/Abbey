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
    }
};

const processMap = {
    grainGrinding: {
        name: "grain grinding",
        duration: 10,
        input: "wheat",
        processor: "mill",
        output: "flour"
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

const getResourceFromMap = function (resourceName) {
    const selectedResource = resourceMap[resourceName];
    return new Resource(selectedResource.name,0,selectedResource.value,selectedResource.category);
};