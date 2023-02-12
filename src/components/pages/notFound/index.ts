import {Base} from "../../base";
import "./index.scss";
class NotFoundPage extends Base {
  private btnBackToMain: Base;
  private textEl: Base;
  constructor(text = "Page Not Found") {
    super("div", ["Page-NotFound"]);
    this.textEl = new Base("span", [], text);
    this.btnBackToMain = new Base("a", [], "Back to Main Page");
    this.btnBackToMain.element.setAttribute("href", "/");

    this.element.append(this.textEl.element, this.btnBackToMain.element);
  }
}

export default NotFoundPage;
