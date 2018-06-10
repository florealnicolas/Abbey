$(document).ready(function () {

    $("#addARecipeForm").on("submit", function () {

        const recipeName = $("#recipeName").val();
        const beerCategory = $("#beerCategory").val();
        const specialIngredient = $("#beerSpecialIngredient").val();
        const beerStory = $("#beerStory").val();
        const author = $("#beerAuthor").val();
        const authorPermission = $("#author-permission-yes").val();

        const newRecipeData = {
            _id: recipeName,
            recipeName: recipeName,
            beerCategory: beerCategory,
            specialIngredient: specialIngredient,
            beerStory: beerStory,
            author: author,
            authorPermission: authorPermission
        };

        $.post("/addNewRecipe", newRecipeData);

    });

});