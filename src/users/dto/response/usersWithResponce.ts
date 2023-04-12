import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserResponse } from './users-response';

export class UsersWithMessageResponse
  
{

  @ApiProperty({
    title: 'Message',
    description: 'Specifies a response message',
    example: 'Process Successful',
  })
 
  @Expose()
  message: string;


  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  
  @Expose()
  data: UserResponse | UserResponse[];

  constructor(message: string, data: UserResponse | UserResponse[]) {
    this.data = data;
    this.message = message;
  }
}
