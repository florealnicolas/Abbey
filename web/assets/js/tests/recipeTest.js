//TEST 5: Recipe
console.log("TEST 5: Recipe\n");

//First we invent some recipe... What will we make today? Why no lovely ale?!

const aleIngredients = new List();

const angelTears = new Resource("Angel tears", 10);
const daisy = new Resource("Daisy", 20);
const water = new Resource("Water", 50);
const yeast = new Resource("Yeast", 30);

aleIngredients.addAnItem(angelTears);
aleIngredients.addAnItem(daisy);
aleIngredients.addAnItem(water);
aleIngredients.addAnItem(yeast);

const aleScheme = new Scheme();

const ale = new Resource("Ale");

const aleRecipe = new Recipe(ale, aleIngredients, aleScheme, "Liya");

//End of test 5