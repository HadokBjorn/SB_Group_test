import 'reflect-metadata'
import { container } from "tsyringe";
import { CreateUserService } from "./CreateUserService";
import { UserRepositoryMock } from "modules/provider/fakes/UserRepositoryMock";
import { ICreateUserDto } from "modules/user/dtos/ICreateUserDto";
import { AppError } from '../../../../shared/infra/http/errors/AppError';


let createUserService: CreateUserService;
let userRepositoryMock: UserRepositoryMock;


describe('CreateUserService Tests',()=>{

  beforeEach(()=>{
    userRepositoryMock = new UserRepositoryMock();
    createUserService = new CreateUserService(userRepositoryMock);
    jest.spyOn(container, 'resolve').mockImplementationOnce(()=>{
      return createUserService;
    })
  });

  it('Create a user success',async()=>{
    const user:ICreateUserDto = {
      name: "Joao test",
      cpf: "24828502076",
      birth_day: new Date('2000-08-21'),
      email: "joaotest0101@gmail.com",
      password: "12345678"
    };
    const response = await createUserService.execute(user);
    expect(response).toHaveProperty('_id');
    expect(response.name).toBe(user.name);
    expect(response.cpf).toBe(user.cpf);
    expect(response.birth_day).toBe(user.birth_day);
    expect(response.email).toBe(user.email);
  });

  it('Should not crate a user with a invalid cpf',async()=>{
    const user:ICreateUserDto = {
      name: "Joao test",
      cpf: "123456789",
      birth_day: new Date('2000-08-21'),
      email: "joaotest0101@gmail.com",
      password: "12345678"
    };

    expect(async()=>{
      await createUserService.execute(user)
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not crate a user already email exist',async()=>{
    const user1:ICreateUserDto = {
      name: "Joao test",
      cpf: "04545571085",
      birth_day: new Date('2000-08-22'),
      email: "joaotest0101@gmail.com",
      password: "12345678"
    };
    const user2:ICreateUserDto = {
      name: "Joao test2",
      cpf: "41670258092",
      birth_day: new Date('2000-08-21'),
      email: "joaotest0101@gmail.com",
      password: "12345678"
    };
    await createUserService.execute(user1)

    expect(async()=>{
      await createUserService.execute(user2)
    }).rejects.toBeInstanceOf(AppError)
  });

})
