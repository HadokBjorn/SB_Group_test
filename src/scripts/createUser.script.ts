import 'reflect-metadata'
import { UserRepository } from "../modules/user/repositories/implementations/UserRepository";
import { ICreateUserDto } from "../modules/user/dtos/ICreateUserDto";
import { hashSync } from "bcrypt";
import { AppDataSource } from '../config/typeorm';
import { loadEnv } from '../config/env.config';
loadEnv()
const initializeDataSources = async () => {
  await AppDataSource.initialize();
};

async function createAdminAndUsers() {
  const userRepository = new UserRepository();
  const usersAlreadyExist = await userRepository.findAll({})
  if(usersAlreadyExist.length > 0) {
    console.log('------------------------------------------');
    console.log('Cannot create users because already exist');
    console.log('------------------------------------------');
    throw new Error('Seed has already been executed')
  }

  const users:ICreateUserDto[] = [
    {
      name: "Admin",
      cpf: "44906858074",
      birth_day: new Date(),
      email: "admin@gmail.com",
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User1`,
      cpf: `71589934008`,
      birth_day: new Date(`2001-01-10}`),
      email: `test_user1@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User2`,
      cpf: `74443606009`,
      birth_day: new Date(`2001-06-20}`),
      email: `test_user2@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User3`,
      cpf: `42607983088`,
      birth_day: new Date(`2008-05-16}`),
      email: `test_user3@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User4`,
      cpf: `50849697034`,
      birth_day: new Date(`2005-01-10}`),
      email: `test_user4@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User5`,
      cpf: `53056920086`,
      birth_day: new Date(`2007-11-10}`),
      email: `test_user5@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User6`,
      cpf: `99665718096`,
      birth_day: new Date(`2001-06-20}`),
      email: `test_user6@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User7`,
      cpf: `61247098052`,
      birth_day: new Date(`2008-08-26}`),
      email: `test_user7@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User8`,
      cpf: `22192560060`,
      birth_day: new Date(`2005-03-19}`),
      email: `test_user8@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User9`,
      cpf: `57942905012`,
      birth_day: new Date(`2009-12-10}`),
      email: `test_user9@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    },
    {
      name: `Test User10`,
      cpf: `035.480.330-16`,
      birth_day: new Date(`2009-12-10}`),
      email: `test_user10@gmail.com`,
      password: hashSync("12345678",+process.env.SALT)
    }

]
  console.log('------------------------------------------');
  console.log('Creating a Admin user...');
  console.log('------------------------------------------');

  const createUserAdmin = await userRepository.save(users[0])

  console.log('------------------------------------------');
  console.log('Admin user created:', createUserAdmin);
  console.log('------------------------------------------');

  for(let i = 1; i <= users.length; i++){
    console.log('------------------------------------------');
    console.log('creating users...');
    console.log('------------------------------------------');

    const createUser = await userRepository.save(users[i])

    console.log('------------------------------------------');
    console.log('user created:', createUser);
    console.log('------------------------------------------');
  }
}

initializeDataSources()
  .then(() => {
    createAdminAndUsers()
    .then(()=>{
      console.log('------------------------------------------');
      console.log('------------------------------------------');
      console.log('All users was created')
      console.log('------------------------------------------');
      console.log('------------------------------------------');

    })
    .catch(err=>{
      console.log('------------------------------------------');
      console.log('------------------------------------------');
      console.error('something went wrong when creating users ====>', err)
      console.log('------------------------------------------');
      console.log('------------------------------------------');

    })
    .finally(async()=>{
      await AppDataSource.destroy()
    })

  })
  .catch(err => {
    console.error('Error during Database initialization', err);
  })

