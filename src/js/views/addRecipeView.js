import View from "./View";

class AddRecipeView extends View {
  _message = "Upload Success!";
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _closeBtn = document.querySelector('.btn--close-modal');
  _openBtn = document.querySelector('.nav__btn--add-recipe');


  constructor() {
    super();
    this._addHandlerOpenWindow();
    this._addHandlerHideWindow();

  };
  _toggleHidden() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');

  };
  _addHandlerOpenWindow() {
    this._openBtn.addEventListener('click', this._toggleHidden.bind(this));
  };
  _addHandlerHideWindow() {
    this._overlay.addEventListener('click', this._toggleHidden.bind(this));
    this._closeBtn.addEventListener('click', this._toggleHidden.bind(this));

  }
  addHandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }
  _generateMarkup() {

  };

};

export default new AddRecipeView();