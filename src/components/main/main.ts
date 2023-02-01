import { Base } from "../base";
import "./main.scss";

export class Main extends Base {
  constructor() {
    super("main");
  }

  insertPage(element: HTMLElement) {
    this.clear();
    this.element.append(element);
  }
  clear() {
    this.element.innerHTML = ``;
  }
}
