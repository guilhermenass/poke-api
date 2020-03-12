import { PokemonType } from './pokemon-type';
import { PokemonStats } from './pokemon.stats';
import { PokemonAbility } from './pokemon-ability';
import { PokemonSprites } from '../pokemon-sprites';

export interface PokemonDetails {
  name: string;
  weight: number;
  height: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStats[];
  abilities: PokemonAbility[];
}
