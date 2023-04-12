import { Controller, Get, Post, Body,  Param, Delete, UseGuards, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { Public } from 'src/auth/constants';
import { ApiBearerAuth,  ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersParentRoute, UsersRoutes } from './users.http.routes';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

/* ####################################### SWAGGER DOCUMENTATION : Start ####################################### */
@ApiTags('Users')
/* ######################################## SWAGGER DOCUMENTATION : End ######################################## */

@Controller({ path: UsersParentRoute })
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post(UsersRoutes.create)
  async createUser(@Body() body: CreateUserDto) {
    const hash = await bcrypt.hash(body.password, saltOrRounds);
    body.password = hash;
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(UsersRoutes.view_all)
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(UsersRoutes.view_one)
  findUserById(@Param('userId') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(UsersRoutes.update)
  updateUsersById(@Param('userId') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(UsersRoutes.delete)
  removeUserById(@Param('userId') id: string) {
    return this.usersService.remove(+id);
  }

  



 

 

};
