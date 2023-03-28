import {Base} from "../base";
import "./rootContainer.scss";
import {HandleAsideClose} from "../../functions/handleAsideClose";
import {adminMain, header, main} from "../..";
import {IconsPath, statusGame, currenPage, pages} from "../../constants";

export class RootContainer extends Base {
  private ratingContainer = new Base("div", ["ratingContainer"]);
  btnStartGame = new Base("div", ["btnStartGame"]);
  constructor() {
    super("div", ["rootContainer"]);
    if (localStorage.getItem("isLoggedIn") === "false") {
      this.initElements();
    } else {
      this.initAdmin();
    }
  }

  initElements() {
    localStorage.setItem("isLoggedIn", "false");
    this.clearPage();
    this.element.classList.remove("rootAdminActive");
    this.updateBtnStart();
    HandleAsideClose();
    this.element.append(
      header.element,
      this.ratingContainer.element,
      main.element,
      this.btnStartGame.element
    );
  }
  initAdmin() {
    this.clearPage();
    this.element.classList.add("rootAdminActive");
    this.element.append(adminMain.element);
    localStorage.setItem("isLoggedIn", "true");
  }

  addStar(isRight: boolean) {
    if (isRight) {
      let rStar = new Base("img", ["rightStar"]);
      rStar.element.setAttribute("src", IconsPath.starWin);
      this.ratingContainer.element.appendChild(rStar.element);
    } else {
      let wStar = new Base("img", ["wrongStar"]);
      wStar.element.setAttribute("src", IconsPath.starLoose);
      this.ratingContainer.element.appendChild(wStar.element);
    }
  }

  clearRating() {
    this.ratingContainer.element.innerHTML = ``;
  }

  updateBtnStart() {
    // console.log(Constants.currenPage.page);
    if (
      statusGame.gameMode === "train" ||
      currenPage.page === pages.main ||
      currenPage.page === pages.statistics
    ) {
      this.btnStartGame.element.classList.add("hideElement");
      this.ratingContainer.element.classList.add("hideElement");
      return;
    }
    this.btnStartGame.element.classList.remove("hideElement");
    this.ratingContainer.element.classList.remove("hideElement");
    this.btnStartGame.element.innerHTML = ``;
    if (statusGame.isGame) {
      this.btnStartGame.element.insertAdjacentHTML(
        "afterbegin",
        `<img src="${IconsPath.repeatBtn}">`
      );
    } else {
      this.btnStartGame.element.innerText = `start`;
    }
  }

  clearPage() {
    this.element.innerHTML = ``;
  }
}
