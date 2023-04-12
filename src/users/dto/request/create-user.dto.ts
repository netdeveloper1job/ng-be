import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { UserStatus } from "src/common/model/userStatus";


export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name : string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;


    @ApiProperty({ default: UserStatus.PENDING })
    status: UserStatus;


}
