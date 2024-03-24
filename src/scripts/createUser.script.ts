import 'reflect-metadata'
import { UserRepository } from "../modules/user/repositories/implementations/UserRepository";
import { ICreateUserDto } from "../modules/user/dtos/ICreateUserDto";
import { hashSync } from "bcrypt";
import { AppDataSource } from '../config/typeorm';
import { loadEnv } from '../config/env.config';

const initializeDataSources = async () => {
  await AppDataSource.initialize();
};

async function createAdminAndUsers() {
  const userRepository = new UserRepository();
  const userAdmin:ICreateUserDto = {
    name: "Admin",
    cpf: "44906858074",
    birth_day: new Date(),
    email: "admin@gmail.com",
    password: hashSync("12345678",8)
  }

  console.log('Creating a Admin user...');
  const createUserAdmin = await userRepository.save(userAdmin)
  console.log('Admin user created:', createUserAdmin);

  for(let i = 1; i <= 10; i++){
    let user:ICreateUserDto = {
      name: `Test User${i}`,
      cpf: `4490685807${i}`,
      birth_day: new Date(`2000-01-${i < 10 ? '0' + i : i}`),
      email: `test_user${i}@gmail.com`,
      password: hashSync("12345678",8)
    }
    console.log('creating users...');
    const createUser = await userRepository.save(user)
    console.log('user created:', createUser);
  }
}

initializeDataSources()
  .then(() => {
    createAdminAndUsers()
    .then(()=>console.log('All users was created'))
    .catch(err=>console.error('Error in creation users', err))
    .finally(async()=>{
      await AppDataSource.destroy()
    })

  })
  .catch(err => {
    console.error('Error during Database initialization', err);
  })

