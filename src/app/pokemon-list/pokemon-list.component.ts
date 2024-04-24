import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  allPokemon: any[] = []; // Adicionando a lista completa de Pokémon

  @Output() pokemonSelected = new EventEmitter<any>();

  constructor(
    private pokeapiService: PokeapiService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.allPokemon = await this.pokeapiService.getAllPokemon(); // Carregar todos os Pokémon
    this.pokemonList = await this.pokeapiService.getAllPokemon();
  }


  showDetails(url: string) {
    const id = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
    this.router.navigate([`/pokemon-details`], { queryParams: { pokemonUrl: id } });
    this.pokemonSelected.emit(url);
  }

  searchPokemon(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.pokemonList = this.allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

}
