import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter

  ){}
  
  async executeSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonsToInsert: { nombre: string, no: number }[] = [];

    data.results.forEach( async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];
      pokemonsToInsert.push({ nombre: name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed executed';
  }
}
