import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

  ){}
  
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.nombre = createPokemonDto.nombre.toLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if ( isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon && !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
 
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ nombre: term });
    }

    if (!pokemon) {
      throw new NotFoundException(`No se encontró pokemon con término: '${ term }' `);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    
    if (updatePokemonDto.nombre) {
      updatePokemonDto.nombre = updatePokemonDto.nombre.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    // return await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon con id ${ id } no encontrado`)
    }
    return true;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in DB ${ JSON.stringify( error.keyValue ) }`);
    }
    throw new InternalServerErrorException('Ocurrió un error, revisar logs');
  }
}
