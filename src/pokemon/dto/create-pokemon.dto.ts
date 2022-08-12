import { IsNumber, IsPositive, IsString, Min, min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsNumber()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    @MinLength(1)
    nombre: string;

}
