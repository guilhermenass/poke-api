import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon-list.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  public pokemonDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadPokemonDetails(pokemonId);
  }

  loadPokemonDetails(pokemonId: string) {
    this.pokemonService.getPokemonDetails(pokemonId).subscribe(
      (pokemonDetails: any) => {
        this.pokemonDetails = pokemonDetails;
      }
    );
  }
}
