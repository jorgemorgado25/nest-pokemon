import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

import { JoiValidationSchema } from './config/joi.schema';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }),

    MongooseModule.forRoot(process.env.MONGODB),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    
    PokemonModule, CommonModule, SeedModule    
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {}
