import 'reflect-metadata'
import { container } from "tsyringe";
import { UserRepositoryMock } from "modules/provider/fakes/UserRepositoryMock";
import { ICreateUserDto } from "modules/user/dtos/ICreateUserDto";
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { GetUsersService } from './GetUsersService';
import IFilterSearchDTO from 'modules/user/dtos/IFilterSearchDto';
import { ResponseUserDto } from 'modules/user/dtos/ResponseUserDto';
import { ObjectId } from 'mongodb';
import { User } from 'modules/user/entities/User.entity';


let getUsersService: GetUsersService;
let userRepositoryMock: UserRepositoryMock;


describe('GetUsersService Tests',()=>{

  beforeEach(()=>{
    userRepositoryMock = new UserRepositoryMock();
    getUsersService = new GetUsersService(userRepositoryMock);
    jest.spyOn(container, 'resolve').mockImplementationOnce(()=>{
      return getUsersService;
    })
  });

  const mockFilterName: IFilterSearchDTO = {name: 'Joao test1'}
  const mockFilterCpf: IFilterSearchDTO = {cpf: '24828502076'}
  const mockFilterEmail: IFilterSearchDTO = {email: 'joaotest2@gmail.com'}
  const users:User[] = [
    {
      _id: new ObjectId(),
      name: "Joao test1",
      cpf: "24828502076",
      birth_day: new Date('2000-08-21'),
      email: "joaotest1@gmail.com",
      password: "12345678"
    },
    {
      _id: new ObjectId(),
      name: "Joao test2",
      cpf: "24828502076",
      birth_day: new Date('2000-08-21'),
      email: "joaotest2@gmail.com",
      password: "12345678"
    },
    {
      _id: new ObjectId(),
      name: "Joao test3",
      cpf: "24828502076",
      birth_day: new Date('2000-08-21'),
      email: "joaotest3@gmail.com",
      password: "12345678"
    },
  ];

  it('Should return all users without filters',async()=>{
    users.forEach(user=>userRepositoryMock.save(user))
    const resultAll = await getUsersService.execute({name: null, cpf: null, email:null});

    expect(resultAll).toEqual(
      expect.arrayContaining([
        new ResponseUserDto(users[0]),
        new ResponseUserDto(users[1]),
        new ResponseUserDto(users[2]),
      ])
    )
  });

  it('Should return all users by cpf filter',async()=>{
    users.forEach(user=>userRepositoryMock.save(user))
    const resultCpf = await getUsersService.execute(mockFilterCpf);

    expect(resultCpf).toEqual(
      expect.arrayContaining([
        new ResponseUserDto(users[0]),
        new ResponseUserDto(users[1]),
        new ResponseUserDto(users[2]),
      ])
    )
  });

  it('Should return a user by name filter',async()=>{
    users.forEach(user=>userRepositoryMock.save(user))
    const resultName = await getUsersService.execute(mockFilterName);

    expect(resultName).toEqual(
      expect.arrayContaining([
        new ResponseUserDto(users[0]),
      ])
    )
  });

  it('Should return a user by email filter',async()=>{
    users.forEach(user=>userRepositoryMock.save(user))
    const resultEmail = await getUsersService.execute(mockFilterEmail);

    expect(resultEmail).toEqual(
      expect.arrayContaining([
        new ResponseUserDto(users[1]),
      ])
    )
  });

})
