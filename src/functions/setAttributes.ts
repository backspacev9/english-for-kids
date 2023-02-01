export function setAttributes(el: HTMLElement, options: any) {
  Object.keys(options).forEach(function (attr: string) {
    el.setAttribute(attr, options[attr]);
  });
}
