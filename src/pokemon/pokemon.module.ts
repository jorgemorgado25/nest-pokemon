import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({

  // Los módulos siempre van en los imports

  imports: [
    ConfigModule, // variables de entorno
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ],
  controllers: [ PokemonController ],
  providers:   [ PokemonService ],
  exports:     [ MongooseModule ],
})
export class PokemonModule {}
