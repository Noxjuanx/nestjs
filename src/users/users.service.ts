import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  private usersFilePath = path.join(__dirname, '..', '..', 'src', 'users', 'users.json');


  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const users = await this.readUsers();
    users.push(createUserDto);
    await this.writeUsers(users);
    
    return createUserDto;
  }

  private async readUsers() {
    try {
      const data = await fs.promises.readFile(this.usersFilePath, 'utf-8');
      if (!data) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      
      if (error.code === 'ENOENT') {
        await this.writeUsers([]); 
        return [];
      }
      console.error('Eror al leer el archivo', error);
      return []; 
    }
  }

  private async writeUsers(users: CreateUserDto[]) {
    try {
      console.log('Guardando usuario en el archivo:', users); 
      await fs.promises.writeFile(this.usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error al leer el archivo de usuarios', error);
    }
  }

  async findByEmail(email: string): Promise<CreateUserDto | null> {
    const users = await this.readUsers();
    return users.find(user => user.email === email) || null; 
  }
  
}
