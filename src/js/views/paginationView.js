import View from "./View";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query, please try again!';
  _message = '';

  addHandlerClick(handler) {

    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const nextPageBtn = `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    const prevPageBtn = `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextPageBtn;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return prevPageBtn;
    }
    // Other pages
    if (curPage < numPages) {
      return `${prevPageBtn}${nextPageBtn}`
    }
    // Page 1, and there are NO other pages
    return '';
  };

}

export default new PaginationView();