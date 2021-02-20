import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class PokemonService {

  constructor(private http:Http) { }

  public getPokemonList(){

    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
    .toPromise()
    .then((res:Response) => res.json().results);

  }

}
