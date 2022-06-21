export default class Pagination {
  constructor({ activePageIndex = 0, totalPages = 0 } = {}) {
    this.activePageIndex = activePageIndex;
    this.totalPages = totalPages;
    this.render();
    this.addEventListener();
  }

  getTemplate() {
    return `    
        <div class="card-pagination">
          <a class="panigation-arrow-left" data-element="nav-prev" href="#"><i class="bi bi-chevron-left"></i></a>
          ${this.getPages()}
          <a class="panigation-arrow-right" data-element="nav-next" href="#"><i class="bi bi-chevron-right"></i></a>
        </div>
      
      `;
  }

  getPages() {
    return `
          <ul class="pagination-block" data-element="pagination">
              ${new Array(this.totalPages)
                .fill(1)
                .map((item, index) => {
                  return this.getPageTemplate(index);
                })
                .join("")}
          </ul>    
      `;
  }

  getPageTemplate(pageIndex = 0) {
    const isActive = pageIndex === this.activePageIndex ? "active" : "";
    return `
      <li class="pagination-item ${isActive}">
      <a href="#" data-element="page-link" class="pagination-item" data-page-index="${pageIndex}">${
      pageIndex + 1
    }</a>
      </li>`;
  }

  setPage(pageIndex = 0) {
    if (pageIndex === this.pageIndex) return;
    if (pageIndex > this.totalPages - 1 || pageIndex < 0) return;

    this.dispatchEvent(pageIndex);

    const activePage = this.element.querySelector(".pagination-item.active");
    if (activePage) {
      activePage.classList.remove("active");
    }

    const nextActivePage = this.element.querySelector(
      `[data-page-index="${pageIndex}"]`
    );

    if (nextActivePage) {
      nextActivePage.classList.add("active");
    }

    this.activePageIndex = pageIndex;
  }

  nextPage() {
    const nextPageIndex = this.activePageIndex + 1;
    this.setPage(nextPageIndex);
  }

  prevPage() {
    const prevPageIndex = this.activePageIndex - 1;
    this.setPage(prevPageIndex);
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;

    // this.element
  }

  addEventListener() {
    const prevPageBtn = this.element.querySelector(`[data-element="nav-prev"]`);
    const nextPageBtn = this.element.querySelector(`[data-element="nav-next"]`);

    const pagesList = this.element.querySelector(`[data-element="pagination"]`);

    prevPageBtn.addEventListener("click", () => {
      this.prevPage();
    });
    nextPageBtn.addEventListener("click", () => {
      this.nextPage();
    });
    pagesList.addEventListener("click", (event) => {
      const pageItem = event.target.closest(".pagination-item");

      if (!pageItem) return;

      const { pageIndex } = pageItem.dataset;

      this.setPage(parseInt(pageIndex, 10));
    });
  }

  dispatchEvent(pageIndex) {
    const customEvent = new CustomEvent("page-changed", {
      detail: pageIndex,
    });

    this.element.dispatchEvent(customEvent);
  }
}
