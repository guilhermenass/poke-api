/**
 * Interface para manipular os atributos necessários de um Pokémon
 */
export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  url?: string;
}
