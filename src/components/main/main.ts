import { aside } from '../..';
import { Base } from "../base";
import "./main.scss";

export class Main extends Base {
  constructor() {
    super("main");
  }

  insertPage(element: HTMLElement) {
    this.clear();
    this.element.append(element);
    aside.updateList()
  }
  clear() {
    this.element.innerHTML = ``;
  }
}
