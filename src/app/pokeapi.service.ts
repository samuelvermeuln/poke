import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor() { }

  async getAllPokemon() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      return [];
    }
  }

  async getPokemonDetails(id: string) {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ id);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      return null;
    }
  }

}
