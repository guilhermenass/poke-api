import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  getAllPokemons(page: number) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}`);
  }

  getPokemonByName(pokemonName: string) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

  getPokemonDetails(pokemonId: string) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  }
}
