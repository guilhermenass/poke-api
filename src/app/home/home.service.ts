import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getAllPokemons() {
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemonByName(pokemonName: string) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }
}
