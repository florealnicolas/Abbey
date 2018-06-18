function buildWorkspace () {

  let workspaceHTML = buildStoryPage() + buildRecipeBookPage() + buildBrewPage() + buildJobsPage();
  workspaceHTML += buildMarketPage() + buildAbbeyPage() +buildWorkshopPage() + buildStockPage();
  workspaceHTML += buildChapelPage() + buildProfilePage();

  return workspaceHTML;
};

function buildStoryPage() {

  let storyPageHTML = '<div class="card col-12 bg-dark text-white" id="story-page">';
  storyPageHTML += '<div class="card-header">Story</div>';
  storyPageHTML += '<div class="card-body">'
  storyPageHTML += '</div></div>';

  return storyPageHTML;

};

function buildRecipeBookPage() {

  let recipeBookPageHTML = '<div class="card col-12 bg-dark text-white" id="recipe-book-page">';
  recipeBookPageHTML += '<div class="card-header">Book of recipes</div>';
  recipeBookPageHTML += '<div class="card-body">'
  recipeBookPageHTML += '<label for="recipes">Select a recipe:</label>';
  recipeBookPageHTML += '<select id="recipes"></select>';
  recipeBookPageHTML += '<button class="button" id="selectedRecipe">Choose recipe</button>'
  recipeBookPageHTML += '<div id="recipeDescription"></div>';
  recipeBookPageHTML += '</div></div>';

  return recipeBookPageHTML;
};

function buildBrewPage() {

  let brewPageHTML = '<div class="card col-12 bg-dark text-white" id="brew-page">';
  brewPageHTML += '<div class="card-header">The Brewery</div>';
  brewPageHTML += '<div class="card-body">'
  brewPageHTML += '<ul id="secondaryBrew" class="nav nav-tabs">';
  brewPageHTML += '<li class="nav-item"><a class="nav-link" id="overview-subnav" href="#">Overview</a></li>';
  brewPageHTML += '<li class="nav-item"><a class="nav-link" id="process-subnav" href="#">Process</a></li>';
  brewPageHTML += '<li class="nav-item"><a class="nav-link" id="storage-subnav" href="#">Storage</a></li></ul>';
  brewPageHTML += '<div class="subpage" id="overview-subpage">';
  brewPageHTML += '<h4>Overview</h4></div>';
  brewPageHTML += '<div class="subpage" id="process-subpage">';
  brewPageHTML += '<h4>Process</h4></div>';
  brewPageHTML += '<div class="subpage" id="storage-subpage"></div></div>';
  brewPageHTML += '</div></div>';

  return brewPageHTML;
};

function buildJobsPage() {

  let jobsPageHTML = '<div class="card col-12 bg-dark text-white" id="jobs-page">';
  jobsPageHTML += '<div class="card-header">Jobs</div>';
  jobsPageHTML += '<div class="card-body">'
  jobsPageHTML += '<ul id="secondaryJob" class="menu nav nav-tabs">';
  jobsPageHTML += '<li class="nav-item"><a class="nav-link" id="fields-subnav" href="#">Fields</a></li>';
  jobsPageHTML += '<li class="nav-item"><a class="nav-link" id="inside-subnav" href="#">Inside</a></li>';
  jobsPageHTML += '<li class="nav-item"><a class="nav-link" id="outside-subnav" href="#">Outside</a></li></ul>';
  jobsPageHTML += '<div class="subpage" id="fields-subpage"><h4>Fields</h4></div>';
  jobsPageHTML += '<div class="subpage" id="inside-subpage"><h4>Inside the abbey</h4><div class="inside effects"></div></div>';
  jobsPageHTML += '<div class="subpage" id="outside-subpage"><h4>Outside the abbey</h4><div class="outside effects"></div></div>';
  jobsPageHTML += '</div></div>';

  return jobsPageHTML;
};

function buildMarketPage() {

  let marketPageHTML = '<div class="card col-12 bg-dark text-white" id="market-page">';
  marketPageHTML += '<div class="card-header">Market</div>';
  marketPageHTML += '<div class="card-body">';
  marketPageHTML += '<div id="market-page">';
  marketPageHTML += '<h3>Market</h3>';
  marketPageHTML += '<div id="vendors"></div>';
  marketPageHTML += '<div id="dealScreen"></div>';
  marketPageHTML += '<div id="inventory"></div></div>';
  marketPageHTML += '</div></div>';

  return marketPageHTML;
};

function buildAbbeyPage() {

  let abbeyPageHTML = '<div class="card col-12 bg-dark text-white" id="abbey-page">';
  abbeyPageHTML += '<div class="card-header">Abbey</div>';
  abbeyPageHTML += '<div class="card-body">'
  abbeyPageHTML += '</div></div>';

  return abbeyPageHTML;

};

function buildWorkshopPage() {

  let workshopPageHTML = '<div class="card col-12 bg-dark text-white" id="workshop-page">';
  workshopPageHTML += '<div class="card-header">The workshop</div>';
  workshopPageHTML += '<div class="card-body">'
  workshopPageHTML += '</div></div>';

  return workshopPageHTML;

};

function buildStockPage() {

  let stockPageHTML = '<div class="card col-12 bg-dark text-white" id="stock-page">';
  stockPageHTML += '<div class="card-header">Stock</div>';
  stockPageHTML += '<div class="card-body">'
  stockPageHTML += '</div></div>';

  return stockPageHTML;

};

function buildChapelPage() {

  let chapelPageHTML = '<div class="card col-12 bg-dark text-white" id="chapel-page">';
  chapelPageHTML += '<div class="card-header">Chapel</div>';
  chapelPageHTML += '<div class="card-body">'
  chapelPageHTML += '</div></div>';

  return chapelPageHTML;

};

function buildProfilePage() {

  let profilePageHTML = '<div class="card col-12 bg-dark text-white" id="profile-page">';
  profilePageHTML += '<div class="card-header">Profile</div>';
  profilePageHTML += '<div class="card-body">'
  profilePageHTML += '</div></div>';

  return profilePageHTML;

};
