import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pokemons: any[];
  public pokemonNameSearch: string;
  private pokemonSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  public pokemonNotFound: boolean;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  /**
   * Método que carrega todos os pokémons sem filtros e com resultados paginados
   */
  getAllPokemons() {
    this.homeService.getAllPokemons().subscribe(
      (pokemons: any) => {
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
    this.homeService.getPokemonByName(this.pokemonNameSearch).subscribe(
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
}
