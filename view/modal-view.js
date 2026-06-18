export default class MovesModalView {
  dialog;
  addButton;
  closeButton;
  selectInput;

  constructor({dialogId}) {
    this.dialog = document.getElementById(dialogId);

    this.addButton = this.dialog.querySelector("#modal-add-button");
    this.closeButton = this.dialog.querySelector("#modal-close-button");
    this.selectInput = this.dialog.querySelector("#moves-select");

    this.bindEvents();
  }

  bindEvents() {
    // this.dialog.addEventListener("click");
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }
}
