//TEST 5: Recipe
console.log("TEST 5: Recipe\n");

//First we invent some recipe... What will we make today? Why no lovely ale?!

var aleIngredients = new List();

var angelTears = new Resource("Angel tears", 10);
var daisy = new Resource("Daisy", 20);
var water = new Resource("Water", 50);
var yeast = new Resource("Yeast", 30);

aleIngredients.addAnItem(angelTears);
aleIngredients.addAnItem(daisy);
aleIngredients.addAnItem(water);
aleIngredients.addAnItem(yeast);

var aleScheme = new Scheme();

var ale = new Resource("Ale");

var aleRecipe = new Recipe(ale, aleIngredients, aleScheme, "Liya");

//End of test 5