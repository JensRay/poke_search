export type BasePokemonType = {
  name: string;
  url: string;
};

export type SearchPokemonType = {
  id: string;
  name: string;
  weight: number;
  height: number;
  url: string;
};

export type SortingType =
  | "From A-Z"
  | "From Z-A"
  | "By Height"
  | "By Weight"
  | "Sort items";

export type ChildrenProps = { children: React.ReactNode };
