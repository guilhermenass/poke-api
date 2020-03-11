import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from './pokemon-list.service';

@Component({
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public pokemons: any[];
  public pokemonNameSearch: string;
  private pokemonSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  public pokemonNotFound: boolean;
  public pokemonName: string;
  public page = 1;
  public totalPokemons: number;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  /**
   * Método que carrega todos os pokémons sem filtros e com resultados paginados
   */
  getAllPokemons() {
    this.pokemonService.getAllPokemons(this.page).subscribe(
      (pokemons: any) => {
        this.totalPokemons = pokemons.count;
        this.pokemons = pokemons.results.map((pokemon) => ({
          ...pokemon,
          id: this.getPokemonId(pokemon),
          sprite: `${this.pokemonSpriteUrl}/${this.getPokemonId(pokemon)}.png`
        }));
      }
    );
  }

  /**
   * Método da funcionalidade de busca dos pokémons
   */
  onSearch() {
    this.pokemonNotFound = false;
    this.pokemonName = this.pokemonNameSearch;
    this.pokemonService.getPokemonByName(this.pokemonNameSearch).subscribe(
    (pokemon: any) => {
      this.pokemons = [];
      this.pokemons.push({
        id: pokemon.id,
        sprite: pokemon.sprites.front_default,
        name: pokemon.name
      });
    },
    () => {
      this.pokemonNotFound = true;
    });
  }

  /**
   * Método para formatar a url, devido a API do PokeAPI não retornar o id do pokémon
   * @param pokemon Pokémon que retornou na busca da API
   */
  getPokemonId(pokemon) {
    return pokemon.url.split('pokemon/')[1].replace('/', '');
  }

  goToDetailsPage(pokemonId: string) {
    this.router.navigate(['details', pokemonId]);
  }

  onPageChange(event: any) {
    this.page = event;
    this.getAllPokemons();
  }
}
