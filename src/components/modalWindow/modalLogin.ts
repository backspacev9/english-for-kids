import {modalWindow, rootContainer} from "../..";
import {setAttributes} from "../../functions/setAttributes";

import {Base} from "../base";

export class ModalLogin extends Base {
  private lable = new Base("h3", [], "Login");

  private form = new Base("form", ["loginForm"]);
  private inputLogin = new Base("input", ["inputLogin"]);
  private inputPassword = new Base("input", ["inputPassword"]);
  private btnContainer = new Base("div", ["btnContainer"]);
  private btnCandel = new Base("button", [], "Cancel");
  private btnLogin = new Base("button", [], "Login");

  constructor() {
    super("div", ["modalLogin"]);
    this.init();
  }
  private init() {
    setAttributes(this.form.element, {id: "loginForm"});
    setAttributes(this.inputLogin.element, {
      type: "text",
      placeholder: "login",
      required: "",
    });
    setAttributes(this.inputPassword.element, {
      type: "password",
      placeholder: "password",
      required: "",
    });

    setAttributes(this.btnLogin.element, {
      form: "loginForm",
    });
    this.form.element.append(this.inputLogin.element, this.inputPassword.element);
    this.btnContainer.element.append(this.btnCandel.element, this.btnLogin.element);
    this.element.append(this.lable.element, this.form.element, this.btnContainer.element);
    this.btnCandel.element.addEventListener("click", () => {
      this.element.remove();
      modalWindow.close();
    });
    this.btnLogin.element.addEventListener("click", () => {
      rootContainer.initAdmin();
    });
  }
}
