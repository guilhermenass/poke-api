import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from './pokemon-list.service';
import { Pokemon } from '../shared/interfaces/pokemon';
import { PokemonResponseDto } from '../shared/interfaces/pokemon-response-dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {

  public pokemons: Pokemon[];
  public pokemonNameSearch: string;
  private pokemonSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  public pokemonNotFound: boolean;
  public pokemonName: string;
  public page = 1;
  public totalPokemons: number;

  constructor(private pokemonService: PokemonService, private router: Router, private ngxSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  private getAllPokemons() {
    this.ngxSpinner.show();
    this.pokemonService.getAllPokemons(this.page)
    .pipe(
      finalize(() => {
        this.ngxSpinner.hide();
      })
    )
    .subscribe(
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

  public onSearch() {
    this.pokemonNotFound = false;
    this.pokemonName = this.pokemonNameSearch;
    if (this.pokemonNameSearch) {
      this.getPokemonByName();
    } else {
      this.getAllPokemons();
    }
  }

  private getPokemonByName() {
    this.ngxSpinner.show();
    this.pokemonService.getPokemonByName(this.pokemonNameSearch)
    .pipe(
      finalize(() => {
        this.ngxSpinner.hide();
      })
    )
    .subscribe(
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
      }
    );
  }

  private getPokemonId(pokemonUrl: string) {
    return Number(pokemonUrl.split('pokemon/')[1].replace('/', ''));
  }

  public goToDetailsPage(pokemonId: number) {
    this.router.navigate(['details', pokemonId]);
  }

  public onPageChange(page: number) {
    this.page = page;
    this.getAllPokemons();
  }
}
