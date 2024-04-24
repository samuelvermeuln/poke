import { Component, Input, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  @Input() pokemonUrl: string = '';
  pokemonDetails: any;
  totalStats: number = 0;

  constructor(
    private pokeapiService: PokeapiService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.pokemonUrl = params.get('pokemonUrl') as string;
    })
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
