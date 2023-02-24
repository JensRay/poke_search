export type BasePokemonType = {
  name: string;
  url: string;
}

export type SearchPokemonType = {
  id: string;
  name: string;
  weight: number;
  height: number;
  url: string;
}

export type ChildrenProps = {children: React.ReactNode}

export type SortingType = "From A-Z" | "From Z-A" | "By Height" | "By Weight" | ''

export interface PokemonProperties {
  name:string, weight: number, height:number, base_experience: number, is_default: boolean, order: number, species: string
}
