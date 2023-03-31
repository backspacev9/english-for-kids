import {Base} from "../base";

import "./header.scss";
import {setAttributes} from "../../functions/setAttributes";
import {categoryCardElement} from "../pages/categoryPage/categoryCardElement";
import {aside, rootContainer, stateLS} from "../..";
import {statusGame} from "../../constants";
//import {router} from "../router";

export class Header extends Base {
  menuBtn = new Base("div", ["menuBtn"]);

  private switcher = new Base("label", ["switch"]);
  private toogleSlider = new Base("span", ["toogleSlider"]);
  private toogleInput = new Base("input", ["toogleInput"]);
  statusSwitcher = new Base("span", ["statusSwitcher"], "train");
  inputSwitcher = this.toogleInput.element as HTMLInputElement;

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
      aside.element.classList.toggle("activeAside");
      this.menuBtn.element.classList.toggle("closeMenu");
    });

    this.inputSwitcher.addEventListener("input", (e) => {
      if (!this.inputSwitcher.checked) {
        stateLS.setState({isGame: false});
      } else {
        stateLS.setState({isGame: true});
      }
    });
    this.updateGameMode();
  }

  updateGameMode() {
    const gameStatus = stateLS.getState().isGame;
    this.statusSwitcher.element.innerHTML = "";
    console.log(gameStatus);

    if (gameStatus) {
      if (!this.inputSwitcher.checked) this.inputSwitcher.checked = true;
      //this.statusSwitcher.element.classList.remove("statusActive");
      this.statusSwitcher.element.innerHTML = "play";
    } else {
      if (this.inputSwitcher.checked) this.inputSwitcher.checked = false;
      // this.statusSwitcher.element.classList.add("statusActive");
      this.statusSwitcher.element.innerHTML = "train";
    }
  }
}
