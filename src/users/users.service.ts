import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/constants/messages';
import { NotFoundException } from 'src/common/helpers/exception/NotFoundException';
import { Repository } from 'typeorm';

import { LoggerService } from 'src/common/helpers/logger/Logger.service';
import { MailService } from 'src/common/helpers/mail/mail.service';
import { CreateUserDto } from './dto/request/create-user.dto';

import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponse } from './dto/response/users-response';
import { User } from './entities/user.entity';
import { UserStatus } from 'src/common/model/userStatus';

import { AlreadyExistsException } from 'src/common/helpers/exception/AlreadyExistsException';

const saltOrRounds = 10;

@Injectable()
export class UsersService{

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    
    private readonly mailsService: MailService,
    private logger: LoggerService
  ) {
    
  }

  async create(request: CreateUserDto) {
    try {
      
      let existingUserEmail = await this.usersRepository.findOne(
        {
          where:
            { email: request.email }
        }
      );
      if (existingUserEmail) {
        throw new AlreadyExistsException(`${Messages.Register.AlreadyExist}`);
      }

      const user = this.usersRepository.create(request);
      const result = await this.usersRepository.save(user);
      
      
        return {
          status: 200,
          message: 'New User Successfully Registered'
        }
        
      
     
    } catch (error) {

      throw new InternalServerErrorException(error.message);
    }
  
  }

  async findAll(): Promise<UserResponse[]> {
    return this.usersRepository.find();
  }

  async findOne(userId: number): Promise<UserResponse> {
    try {
      return await this.usersRepository.findOne(
        {
          where:
            { id: userId, status: UserStatus.ACTIVE }
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, request: UpdateUserDto): Promise<UserResponse> {
    const result = await this.usersRepository.update(userId, request);
    if (!result) {
      throw new NotFoundException(`${Messages.Resource.NotFound} : User`);
    }

    return this.usersRepository.findOne(userId);
  }

  async remove(id: number): Promise<UserResponse> {
    const deletedUser = await this.usersRepository.findOne(id);
    await this.usersRepository.delete(id);
    return deletedUser;
  }

 

  async findByEmail(email: string): Promise<UserResponse> {
    const user= await this.usersRepository.findOne(
      {
        where:
          { email: email },
        
      }
    );
    if (user && user.status != UserStatus.ACTIVE) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: Messages.Login.Unauthorised,
      }, HttpStatus.UNAUTHORIZED);
    }
   
    return user;

  }
}
