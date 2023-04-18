import {CardElement} from "./components/pages/cardsPage/cardElement";

export interface storageItems {
  id: number;
  word?: string;
  translation?: string;
  category?: string;
  clicks?: number;
  correct?: number;
  wrong?: number;
  percent?: number;
}

export interface ICard {
  id: number;
  word: string;
  translation: string;
  imagesrc: string;
  audiosrc: string;
  category: string;
  category_id: number;
}
export interface IStateGame {
  isGameMode: boolean;
  isGameNow: boolean;
  currentCards?: CardElement[];
}
