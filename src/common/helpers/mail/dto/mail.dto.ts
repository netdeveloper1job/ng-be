import {
    IsDefined,
    IsEmail,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Type } from 'class-transformer';
  import { Stream } from 'stream';

  export class CommonMailDto {
    @ApiProperty({
      example: 'tomail@gmail.com',
    })
    to: string;
  
  }
  

  