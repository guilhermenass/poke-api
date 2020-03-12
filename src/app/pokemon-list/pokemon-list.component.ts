import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from './pokemon-list.service';
import { Pokemon } from '../pokemon';
import { PokemonResponseDto } from '../pokemon-response-dto';

@Component({
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

/**
 * Componente responsável pela tela inicial de busca e visualização dos pokémons
 */
export class PokemonListComponent implements OnInit {

  public pokemons: Pokemon[];
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
      (pokemons: PokemonResponseDto) => {
        this.totalPokemons = pokemons.count;
        this.pokemons = [];
        this.pokemons = pokemons.results.map((pokemon: Pokemon) => ({
          ...pokemon,
          id: this.getPokemonId(pokemon.url),
          sprite: `${this.pokemonSpriteUrl}/${this.getPokemonId(pokemon.url)}.png`
        }));
      }
    );
  }

  /**
   * Método chamado pelo botão Pesquisar para realizar o filtro pelo nome do pokémon informado no campo de pesquisa.
   */
  public onSearch() {
    this.pokemonNotFound = false;
    this.pokemonName = this.pokemonNameSearch;
    if (this.pokemonNameSearch) {
      this.getPokemonByName();
    } else {
      this.getAllPokemons();
    }
  }

  /**
   * Método responsável por realizar a busca na API por um determinado pokémon
   */
  private getPokemonByName() {
    this.pokemonService.getPokemonByName(this.pokemonNameSearch).subscribe(
    (pokemon: any) => {
      this.totalPokemons = pokemon.count;
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
  private getPokemonId(pokemonUrl: string) {
    return Number(pokemonUrl.split('pokemon/')[1].replace('/', ''));
  }

  /**
   * Método responsável por redirecionar para a rota de detalhes do pokémon
   * @param pokemonId Identificador do pokémon que o usuário selecionou para visualizar detalhes
   */
  public goToDetailsPage(pokemonId: number) {
    this.router.navigate(['details', pokemonId]);
  }

  /**
   * Método responsável pela mudança da página no componente de paginação
   * @param event Página que o usuário deseja visualizar
   */
  onPageChange(page: number) {
    this.page = page;
    this.getAllPokemons();
  }
}
