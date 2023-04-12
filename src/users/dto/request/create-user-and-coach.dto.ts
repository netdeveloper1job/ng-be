import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUserAndCoachDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    specialities: string;

    @ApiProperty()
    sectorExpertise: string;

    @ApiProperty()
    h37Team: string;

    @ApiProperty()
    credentials: string;

    @ApiProperty()
    other?: string;
}
