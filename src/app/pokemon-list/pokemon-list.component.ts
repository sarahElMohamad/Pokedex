import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList: Array<Object>;
  next: string;
  previous: string;

  constructor(public pokemonService:PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList().then(pokemons => {
      this.next = pokemons.next;
      this.previous = pokemons.previous;
      this.pokemonList = pokemons.results;
    });
  }

  public getNextOrPrevious(url:string){
    this.pokemonService.getPokemonList(url).then(pokemons => {
      this.next = pokemons.next;
      this.previous = pokemons.previous;
      this.pokemonList = pokemons.results;
      window.scrollTo(0, 0);
    });
  }

}
