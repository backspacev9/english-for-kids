export interface CardsCategory {
  category: {
    name: string;
    immage: string;
  };
  fields: [
    {
      word: string;
      translation: string;
      image: string;
      audioSrc: string;
    }
  ];
}
