export default class Card {
  constructor(someProduct) {
    this.state = someProduct;
    this.myRender();
  }

  getTemplate() {
    return `
    <div class="wrapper">
      <div class="item">
        <img src="${this.state.images[0]}" alt="item" />
      </div>
      <div class="info-padding">
        <div class="item-stat">
          <div class="item-rate">
            <p>${this.state.rating}<span class="star">&#9734</span></p>
          </div>
          <div class="item-price">
            <p>${this.state.price}</p>
          </div>
        </div>
        <div class="item-info">
          <p>
            ${this.state.title} 
          </p>
        </div >
      <div class="info">
        <p>${this.state.category}</p>
      </div>
      </div >
      <div class="button">
        <div class="add-button">
          <p>Add To Cart</p>
        </div>
      </div>
    </div >
        `;
  }

  update(date = {}) {
    this.state = date;
    this.componentElement.innerHTML = this.getTemplate();
  }

  myRender() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }
}
