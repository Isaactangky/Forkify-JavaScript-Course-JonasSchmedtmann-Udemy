import View from "./View";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks, please try again!';
  _message = '';

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark =>
      previewView.render(bookmark, false)
    ).join('');
  };

};

export default new BookmarkView();