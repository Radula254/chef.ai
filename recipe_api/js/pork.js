const edamamApiUrl = 'https://api.edamam.com/search';
const edamamAppId = '4dd6cc90';
const edamamAppKey = 'f800e5efe08763649dab31f2a55c132f';
const recipeList = document.getElementById('recipeList');
const loadRecipesButton = document.getElementById('loadRecipes');

function fetchRecipes() {
  // Add your Application ID and Application Key to the URL as query parameters
  const apiUrlWithKey = `${edamamApiUrl}?q=pork&app_id=${edamamAppId}&app_key=${edamamAppKey}`;

  return fetch(apiUrlWithKey)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => {
      console.error('Error fetching recipes:', error);
      throw error;
    });
}

function displayRecipes(recipeHits) {
  recipeList.innerHTML = ''; // Clear existing content

  if (recipeHits.length === 0) {
    recipeList.innerHTML = '<p>No recipes available.</p>';
    return;
  }

  recipeHits.forEach(hit => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-item'); // Add a class for styling
    const recipe = hit.recipe;

    recipeElement.innerHTML = `
      <h2>${recipe.label}</h2>
      <p>${recipe.source}</p>
      <a href="${recipe.url}" target="_blank">View Recipe</a>
    `;
    recipeList.appendChild(recipeElement);
  });
}

loadRecipesButton.addEventListener('click', () => {
  loadRecipesButton.textContent = 'Loading...';

  fetchRecipes()
    .then(displayRecipes)
    .catch(error => {
      recipeList.innerHTML = '<p>Something went wrong while fetching recipes.</p>';
      console.error(error);
    })
    .finally(() => {
      loadRecipesButton.textContent = 'Pasta Recipes';
    });
});
