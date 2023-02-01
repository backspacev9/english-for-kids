import { Base } from "../base";
import * as Constants from "../../constants";
import "./admin.scss";

export class AdminHeader extends Base {
  private btnContainer = new Base("nav");
  private btnCategories = new Base("li", [], "Categories");
  private btnWords = new Base("li", [], "Words");
  private btnLogout = new Base("span", ["btnLogout"], "Log out");

  constructor() {
    super("div", ["adminHeader"]);
    this.btnContainer.element.append(
      this.btnCategories.element,
      this.btnWords.element
    );
    this.element.append(this.btnContainer.element, this.btnLogout.element);
    this.btnLogout.element.addEventListener("click", () => {
      Constants.rootContainer.initElements();
    });
  }
}
