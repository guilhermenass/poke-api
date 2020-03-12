import { Pokemon } from './pokemon';

/**
 * Interface facilitadora para manipular atributos retornados pela API
 */
export interface PokemonResponseDto {
  count: number;
  results: Pokemon[];
}
