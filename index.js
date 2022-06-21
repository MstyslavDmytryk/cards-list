import CardsList from "./card-list.js";
import Pagination from "./pagination.js";

const BACKEND_URL = "https://online-store.bootcamp.place/api/";
export default class OnlineStorePage {
  constructor() {
    this.pageSize = 9;
    this.products = [];

    this.url = new URL("products", BACKEND_URL);
    this.url.searchParams.set("_limit", this.pageSize);

    this.components = {};

    this.initComponents();
    this.render();
    this.renderComponents();

    this.initEventListeners();

    this.update(1);
  }

  async loadData(pageNumber) {
    this.url.searchParams.set("_page", pageNumber);

    const response = await fetch(this.url);
    const products = await response.json();

    return products;
  }

  getTemplate() {
    return `
      <div>
        <div data-element="cardsList">        
        <!-- Card component -->
        </div>
        <div data-element="pagination">        
        <!-- Pagination component -->
        </div>
      </div>
    `;
  }

  initComponents() {
    // TODO: remove hardcoded value
    const TotalElements = 100;
    const totalPages = Math.ceil(TotalElements / this.pageSize);

    const cardList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages,
    });

    this.components.cardList = cardList;
    this.components.pagination = pagination;
  }

  renderComponents() {
    const cardsContainer = this.componentElement.querySelector(
      `[data-element="cardsList"]`
    );
    const paginationContainer = this.componentElement.querySelector(
      `[data-element="pagination"]`
    );

    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.getTemplate();

    this.componentElement = element;
  }

  initEventListeners() {
    this.components.pagination.element.addEventListener(
      "page-changed",
      (event) => {
        const pageIndex = event.detail;

        this.update(pageIndex + 1);
      }
    );
  }

  async update(pageNumber) {
    const data = await this.loadData(pageNumber);

    this.components.cardList.update(data);
  }
}
