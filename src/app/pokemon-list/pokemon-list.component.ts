import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList;

  constructor(public pokemonService:PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList().then(pokemons => {
      this.pokemonList = pokemons;
    });
  }

}
