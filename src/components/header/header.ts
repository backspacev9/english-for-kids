import {Base} from "../base";

import "./header.scss";
import {setAttributes} from "../../functions/setAttributes";
import {aside, game, stateLS} from "../..";
import {IconsPath} from "../../constants";

export class Header extends Base {
  private menuBtn = new Base("div", ["menuBtn"]);

  private switcher = new Base("label", ["switch"]);
  private toogleSlider = new Base("span", ["toogleSlider"]);
  private toogleInput = new Base("input", ["toogleInput"]);
  private statusSwitcher = new Base("span", ["statusSwitcher"], "train");
  private inputSwitcher = this.toogleInput.element as HTMLInputElement;
  private isPlaying = false;
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
        stateLS.setState({
          isGameMode: false,
          isGameNow: stateLS.getState().isGameNow,
        });
      } else {
        stateLS.setState({
          isGameMode: true,
          isGameNow: stateLS.getState().isGameNow,
        });
      }
    });

    document.addEventListener("click", (e: Event) => {
      let target = <HTMLElement>e.target;
      if (!target.classList.contains("activeAside")) {
        if (!target.classList.contains("lines")) {
          if (!target.classList.contains("menuBtn")) {
            if (!target.classList.contains("containerMenu")) {
              aside.hideAside();
              this.menuBtn.element.classList.remove("closeMenu");
            }
          }
        }
      }
    });
  }
  updateSwitcher() {
    const state = stateLS.getState();
    if (!state.isGameMode) {
      this.statusSwitcher.element.innerText = "train";
      this.inputSwitcher.checked = false;
    } else {
      this.inputSwitcher.checked = true;
      this.statusSwitcher.element.innerText = "play";
    }
  }
  hideSwitcher(hide: boolean) {
    if (hide) {
      this.switcher.element.style.display = "none";
    } else this.switcher.element.style.display = "flex";
  }
  //
}
