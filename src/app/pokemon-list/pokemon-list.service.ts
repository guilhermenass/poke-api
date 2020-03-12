import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class PokemonService {

  private POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) { }

  getAllPokemons(page: number) {
    const offset = 10 * (page - 1);
    return this.httpClient.get(`${this.POKEAPI_URL}/?offset=${offset}&limit=10`);
  }

  getPokemonByName(pokemonName: string) {
    return this.httpClient.get(`${this.POKEAPI_URL}/${pokemonName}`);
  }

  getPokemonDetails(pokemonId: number) {
    return this.httpClient.get(`${this.POKEAPI_URL}/${pokemonId}`);
  }
}
