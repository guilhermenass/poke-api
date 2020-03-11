import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  public pokemonDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private homeService: HomeService) {}

  ngOnInit(): void {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadPokemonDetails(pokemonId);
  }

  loadPokemonDetails(pokemonId: string) {
    this.homeService.getPokemonDetails(pokemonId).subscribe(
      (pokemonDetails: any) => {
        this.pokemonDetails = pokemonDetails;
      }
    );
  }
}
