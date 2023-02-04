import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TrackDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsOptional()
    @IsNumber()
    artistId: string | null;

    @IsOptional()
    @IsNumber()
    albumId: string | null;
}
