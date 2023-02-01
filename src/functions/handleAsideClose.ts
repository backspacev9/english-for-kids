import * as Constants from "../constants";
export function HandleAsideClose() {
  document.addEventListener("click", (e: Event) => {
    let target = <HTMLElement>e.target;
    if (!target.classList.contains("activeAside")) {
      if (!target.classList.contains("lines")) {
        if (!target.classList.contains("menuBtn")) {
          if (!target.classList.contains("containerMenu")) {
            Constants.aside.hideAside();
            Constants.header.menuBtn.element.classList.remove("closeMenu");
          }
        }
      }
    }
  });
}
