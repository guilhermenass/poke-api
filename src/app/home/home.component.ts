import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pokemons: any[];
  public pokemonNameSearch: string;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.homeService.getAllPokemons().subscribe(
      (pokemons: any[]) => {
        this.pokemons = pokemons;
        console.log(pokemons);
      }
    );
  }

  onSearch() {
    this.homeService.getPokemonByName(this.pokemonNameSearch).subscribe(
      (pokemon) => {
        console.log(pokemon);
      }
    )
  }
}
