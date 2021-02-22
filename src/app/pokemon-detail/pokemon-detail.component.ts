import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/pokemon-model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemonName: string;
  pokemon: Pokemon = new Pokemon();

  constructor(private route:ActivatedRoute, public pokemonService:PokemonService) { }

  ngOnInit() {
    this.pokemonName = this.route.snapshot.params['name'];
    this.pokemonService.getPokemonDetail(this.pokemonName).then(res => {
      console.log(res);
      this.pokemon.id = res.id;
      this.pokemon.name = res.name;
      this.pokemon.types = new Array();
      this.pokemon.abilities = new Array();
      this.pokemon.moves = new Array();
      res.types.forEach(element => {
        this.pokemon.types.push(element.type.name);
      });
      res.abilities.forEach(element => {
        this.pokemon.abilities.push(element.ability.name);
      });
      res.moves.forEach(element => {
        this.pokemon.moves.push(element.move.name);
      });
      this.pokemon.speciesURL = res.species.url;
      this.pokemonService.getEvolutionChainURL(res.species.url).then(res => {this.pokemon.evolutionChainURL = res});
    });
  }

}
