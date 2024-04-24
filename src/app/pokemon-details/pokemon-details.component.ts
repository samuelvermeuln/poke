import { Component, Input, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  @Input() pokemonUrl: string = '';
  pokemonDetails: any;
  totalStats: number = 0;

  constructor(private pokeapiService: PokeapiService) { }

  async ngOnInit() {
    if (this.pokemonUrl) {
      this.pokemonDetails = await this.pokeapiService.getPokemonDetails(this.pokemonUrl);
      this.calculateTotalStats();
    }
  }

  calculateTotalStats() {
    this.totalStats = this.pokemonDetails.stats.reduce((acc: number, stat: any) => {
      return acc + stat.base_stat;
    }, 0);
  }

}
