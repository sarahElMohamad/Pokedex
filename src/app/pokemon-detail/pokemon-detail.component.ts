import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/pokemon-model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    this.getPokemonDetail(this.route.snapshot.params['name'])
  }

  public getPokemonDetail(name:string){
    this.pokemonName = name;
    this.pokemonService.getPokemonDetail(this.pokemonName).then(res => {
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
      this.pokemonService.getEvolutionChainURL(res.species.url).then(res => {
        this.pokemonService.getEvolutionChain(res).then(element => {
          if(element.chain.evolves_to.length > 0){
            this.pokemon.evolutionChain = new Array();
            this.pokemon.evolutionChain.push(element.chain.species.name);
            var nextPoke = element.chain;
            while(nextPoke.evolves_to.length > 0){
              this.pokemon.evolutionChain.push(nextPoke.evolves_to[0].species.name);
              nextPoke = nextPoke.evolves_to[0];
            }
          }
        })
      });
    });
  }

}
