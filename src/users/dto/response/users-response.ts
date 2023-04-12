import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformDateToEpoch } from 'src/common/helpers/decorators/transformDateToEpoch';
import { UserStatus } from 'src/common/model/userStatus';


export class UserResponse {
  @ApiProperty()
  @Expose()
  id?: number;

  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  email?: string;

  @ApiProperty()
  @Expose()
  password?: string;



  @ApiProperty({ example: UserStatus })
  @Expose()
  status?: UserStatus;


  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  createdAt?: number;

  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  updatedAt?: number;
}
