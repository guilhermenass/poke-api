import { PokemonDetails } from './../../shared/interfaces/pokemon-details/pokemon-details';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})

export class PokemonDetailsComponent implements OnInit {

  public pokemonDetails: PokemonDetails;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadPokemonDetails(Number(pokemonId));
  }

  private loadPokemonDetails(pokemonId: number) {
    this.ngxSpinner.show();
    this.pokemonService.getPokemonDetails(pokemonId)
    .pipe(
      finalize(() => {
        this.ngxSpinner.hide();
      })
    )
    .subscribe(
      (pokemonDetails: PokemonDetails) => {
        this.pokemonDetails = pokemonDetails;
      }
    );
  }
}
