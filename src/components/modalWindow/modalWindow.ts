import { Base } from "../base";
import "./modal.scss";

export class ModalWindow extends Base {
  constructor() {
    super("div", ["modalRoot"]);
  }

  insertContent(element: HTMLElement) {
    this.clearModal();
    this.element.append(element);
  }
  clearModal() {
    this.element.innerHTML = ``;
  }
  close() {
    this.element.remove();
  }
}
