import { Base } from "../base";

import * as Constants from "../../constants";
import "./header.scss";
import { setAttributes } from "../../functions/setAttributes";
import { categoryCardElement } from "../pages/categoryPage/categoryCardElement";

export class Header extends Base {
  menuBtn = new Base("div", ["menuBtn"]);
  private switcher = new Base("label", ["switch"]);
  private toogleSlider = new Base("span", ["toogleSlider"]);
  private toogleInput = new Base("input", ["toogleInput"]);
  private statusSwitcher = new Base("span", ["statusSwitcher"], "train");
  private input = this.toogleInput.element as HTMLInputElement;

  constructor() {
    super("header");
    setAttributes(this.toogleInput.element, {
      id: "toogleInput",
      type: "checkbox",
      checked: "",
    });
    this.switcher.element.append(this.toogleInput.element);
    this.toogleSlider.element.append(this.statusSwitcher.element);
    this.switcher.element.append(this.toogleSlider.element);
    this.menuBtn.element.insertAdjacentHTML(
      "afterbegin",
      ` 
      <span class="lines"></span>
      <span class="lines"></span>
      <span class="lines"></span>
      `
    );
    this.element.append(this.menuBtn.element, this.switcher.element);
    this.menuBtn.element.addEventListener("click", () => {
      Constants.aside.element.classList.toggle("activeAside");
      this.menuBtn.element.classList.toggle("closeMenu");
    });
    this.input.addEventListener("input", (e) => {
      this.statusSwitcher.element.innerHTML = "";
      if (this.input.checked) {
        this.statusSwitcher.element.classList.remove("statusActive");
        this.statusSwitcher.element.innerText = "train";
        Constants.statusGame.gameMode = "train";
      } else {
        this.statusSwitcher.element.classList.add("statusActive");
        this.statusSwitcher.element.innerText = "play";
        Constants.statusGame.gameMode = "play";
      }
      Constants.catPage.changeState();
      Constants.cardsPage.gameModOn();
      Constants.rootContainer.updateBtnStart();
    });
  }
}
