import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}
