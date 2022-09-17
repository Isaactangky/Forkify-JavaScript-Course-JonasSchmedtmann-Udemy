import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 0) Update Result view to update selected result
    // resultsView.update(model.getSearchResultPage(model.state.search.page));
    resultsView.update(model.getSearchResultPage());
    // 1) Update bookmark list
    bookmarkView.update(model.state.bookmarks);

    // 2) loading recipe
    await model.loadRecipe(id); // async function

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get serch query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    resultsView.render(model.getSearchResultPage());

    // 4) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error)
  };
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // Update the state recipe
  model.updateServings(newServings);
  // Update the view / Rendering recipe
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  // 1) add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update the recipe page
  recipeView.update(model.state.recipe);
  // 3) update bookmarklist
  bookmarkView.render(model.state.bookmarks)
}

const contralBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
}

const contralUploadRecipe = async function (newRecipe) {
  try {
    // Show Spinner
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // render the new recipe
    recipeView.render(model.state.recipe);
    // display success message
    addRecipeView.renderMessage();
    // render bookmark
    bookmarkView.render(model.state.bookmarks);
    // Change id in url 
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Close form window
    setTimeout(function () {
      addRecipeView._toggleHidden();
    }, MODAL_CLOSE_SEC * 1000);


  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
  location.reload(); // reload the form in form window
}

const init = function () {
  bookmarkView.addHandlerBookmark(contralBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(contralUploadRecipe);
};

init();
