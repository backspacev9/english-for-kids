import * as Constants from "./constants";
import { CardCategory } from "./interface/cardCategory";
export class Server {
  constructor() {}

  async getCardsByCategory(catIid: number) {
    let response = await fetch(
      `${Constants.baseUrl}${Constants.serverPath.cards}/${catIid}`
    );
    let data = await response.json();
    // let totalItems = data.length;
    // console.log({ data, totalItems });
    return data;
  }
  async getCategories(name?: string) {
    let response = name
      ? await fetch(
          `${Constants.baseUrl}${Constants.serverPath.categories}/${name}`
        )
      : await fetch(`${Constants.baseUrl}${Constants.serverPath.categories}`);
    let data = await response.json();
    //let totalItems = data.length;
    //console.log({ data, totalItems });
    return data;
  }

  async updateCategory(par: CardCategory) {
    const response = await fetch(
      `${Constants.baseUrl}${Constants.serverPath.categories}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(par),
      }
    );
    let data = await response.json();
    console.log("updated: ", data);
  }
}
