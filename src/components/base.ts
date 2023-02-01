export class Base {
  readonly element: HTMLElement;
  constructor(
    tag: keyof HTMLElementTagNameMap = "div",
    styles: string[] = [],
    caption: string = ""
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerText = caption;
  }
}
