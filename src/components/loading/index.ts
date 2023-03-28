import {IconsPath} from "../../constants";
import {Base} from "../base";
import "./index.scss";

class Loading extends Base {
  private textEl: Base;
  private loadingEl = new Base("div", ["loading-container"]);
  constructor(text?: string) {
    super("div", ["Loading"]);

    if (text) {
      this.textEl = new Base("span", [], text);
      this.element.append(this.textEl.element);
    }
    this.element.append(this.loadingEl.element);

    this.loadingEl.element.insertAdjacentHTML(
      "afterbegin",
      `
      <img src="${IconsPath.loading}">
    `
    );
  }
}
export default Loading;
