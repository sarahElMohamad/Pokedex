import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemonName: string;
  pokemon: Object;

  constructor(private route:ActivatedRoute, public pokemonService:PokemonService) { }

  ngOnInit() {
    this.pokemonName = this.route.snapshot.params['name'];
    this.pokemonService.getPokemonDetail(this.pokemonName).then(res => {
      this.pokemon = res;
      console.log(this.pokemon);
    });
  }

}
