import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class PokemonService {

  constructor(private http:Http) { }

  public getPokemonList(url: string = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'){

    return this.http.get(url)
    .toPromise()
    .then((res:Response) => res.json());

  }

  public getPokemonDetail(name:string){
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+ name + '')
    .toPromise()
    .then((res:Response) => res.json());
  }

  public getEvolutionChainURL(url:string){
    return this.http.get(url)
    .toPromise()
    .then((res:Response) => res.json().evolution_chain.url);
  }

  public getEvolutionChain(url:string){
    return this.http.get(url)
    .toPromise()
    .then((res:Response) => res.json());
  }

}
