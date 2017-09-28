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
    carrot: {
      name: "carrot",
        value: 1,
        category: "crop"
    },
    saltyDuneExtract: {
      name: "salty dune extract",
        value: 1,
        category: "extract"
    },
    ginger: {
        name: "ginger",
        value: 1,
        category: "plant"
    },
    rainbowExtract: {
        name: "rainbow extract",
        value: 1,
        category: "extract"
    },
    mango: {
        name: "mango",
        value: 1,
        category: "fruit"
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

//Basic beer ingredients?

const recipeMap = {
    aleRecipe: {
        output: {name: "ale", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "",
        scheme: "aleScheme",
        author: "Liya",
        story: ""
    },
    shivaRecipe: {
        output: {name: "shiva", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "Lilou",
        scheme: "aleScheme",
        author: "Jill",
        story: "A beer brewn to honor the gods in a mysterious land called Siam."
    },
    hikariRecipe: {
        output: {name: "hikari", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "strawberry",
        scheme: "aleScheme",
        author: "Hemily",
        story: "From a slumbering little town 'Hikari' in Japan, this beer has a mysterious, sweet taste."
    },
mandaloenRecipe: {
    output: {name: "mandaloen", amount: 10},
    ingredientList: "aleIngredients",
    specialIngredient: "carrot",
    scheme: "aleScheme",
    author: "Emma",
    story: "The colour can maybe shiver the most experienced drinker but the taste is totally worth it."
},
    analiciousRecipe: {
        output: {name: "analicious", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "raspberry",
        scheme: "aleScheme",
        author: "Anaïs",
        story: "A real Flemish beer with the taste of raspberries."
    },
    bestoneRecipe: {
        output: {name: "bestone", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "mango",
        scheme: "aleScheme",
        author: "Kim",
        story: "Once there was a Korean brewer who was not only a woman but also used mango as an ingredient for the beer called 'Bestone'."
    },
    magicaleRecipe: {
        output: {name: "magicale", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "rainbowExtract",
        scheme: "aleScheme",
        author: "Brysen",
        story: "Magicale. A rare beer with rainbow extract, its said that the taste is so sweet and great that even the old and the new gods crave it."
    },
    snorsonsAleRecipe: {
        output: {name: "snorson's ale", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "ginger",
        scheme: "aleScheme",
        author: "Snor",
        story: "This beer goes back to the roots of brewing, it's so strong you even grow a moustache after just one zip."
    },
    buttRecipe: {
        output: {name: "butt", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "strawberry",
        scheme: "aleScheme",
        author: "Xiaoxiao",
        story: "Don't get shocked by the name of this beer. As it has a strange name and an unordinary smell, it tastes just sublime."
    },
    parsenduneRecipe: {
        output: {name: "parsendune", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "saltyDuneExtract",
        scheme: "aleScheme",
        author: "Skriabin",
        story: "PARSENDUNE, when the grasp of a coarse hand plucks the sturdy grasshalms that sting and skimp the silky skin of the thighs, the parson curses and drags his habit around in total agony until his mind illuminates. What if he ordered the monks of the abbey to clear a pathway for him through the obstructive dune jungle. And so it came to be that every month a small procession of monks came all the way from Brugensis to secure a pathway to the parson's small chapel at the shoreline. Eventually when the monks returned with bloodsmeared hands and painful feet, brother Cuthbert considered their tremendous effort and sighed. Months had gone by and not one monk in the abbey still volunteered for this most exhausting task at the stormy shore of the Flanders county. Moodily Cuthbert lays his head to rest, soon to fall into the dizzying vertigo of his dreams. Shuddering he awakes to a vision. A vision of monks slaving away in a salted steam bubbling in copper cauldrons the size of a bursting bull. Uneasily he removes the remaining dunesand from his weary eyesockets and with a sudden twist of his tongue realises that mysterious cauldron is his very mouth with salty steam pouring out of his nostrils. The smell of pickled herring, the fresh dunegrass and the struggle to scrape together the money for the restauration of the old chapel, it must be hidden clues to the divine will! The beerbrewery which has been abonded decades ago now standing as a beacon of hope amidst the arrogant aristocrats preying upon the abbey, seeking to acquire it from the few grubby monks that remain in its enclosure. Foolish sinners they are, swearing and cursing that they shall turn it into a palace of vice for their lustful mistresses. However, Cuthbert sees his fate crumbling into a pathway foaming with golden threads spun of drunken memories and as the brother shivers with excitement he pledges to himself to make the abbey great again. Parsendune shall be the name that will be sung along with our Lord's fame, in every tipsy tavern across the county, passing the Word from sip to lip. Skol!"
    },
    huaZaiRecipe: {
        output: {name: "hua zai", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "rose",
        scheme: "aleScheme",
        author: "Rita",
        story: "The name 'Hua Zai' is a popular name for a boyfriend in China. It also tastes as sweet as love."
    },
    powerRecipe: {
        output: {name: "power", amount: 10},
        ingredientList: "aleIngredients",
        specialIngredient: "pepper",
        scheme: "aleScheme",
        author: "Meiling",
        story: "An old recipe for a beer which replenishes your strength after a hard day at work."
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
        name: "the way of the little one",
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

const upgradeMap = {
  goldenScythes: {
      name: "golden scythes",
      description: "This works better than iron ones.",
      requirements: {coins: 1, wood: 1},
      effect: "goldenScythes"
  }
};

const upgradeEffectMap = {
    goldenScythes: {
        target: "fields",
        effect: "multiply",
        argument: 0.05,
        description: "Gives 5% more efficieny to your fields."
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