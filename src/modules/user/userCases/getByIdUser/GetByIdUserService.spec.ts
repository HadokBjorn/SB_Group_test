import 'reflect-metadata'
import { container } from "tsyringe";
import { UserRepositoryMock } from "modules/provider/fakes/UserRepositoryMock";
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { GetByIdUserService } from './GetByIdUserService';
import { ObjectId } from 'mongodb';
import { User } from 'modules/user/entities/User.entity';
import { ResponseUserDto } from 'modules/user/dtos/ResponseUserDto';


let getByIdUserService: GetByIdUserService;
let userRepositoryMock: UserRepositoryMock;


describe('GetByIdUserService Tests',()=>{

  beforeEach(()=>{
    userRepositoryMock = new UserRepositoryMock();
    getByIdUserService = new GetByIdUserService(userRepositoryMock);
    jest.spyOn(container, 'resolve').mockImplementationOnce(()=>{
      return getByIdUserService;
    })
  });

  const user:User = {
    _id: new ObjectId(),
    name: "Joao test1",
    cpf: "24828502076",
    birth_day: new Date('2000-08-21'),
    email: "joaotest1@gmail.com",
    password: "12345678"
  };

  it('Should return a user by id',async()=>{
    await userRepositoryMock.save(user);
    const response = await getByIdUserService.execute(user._id.toString());

    expect(response).toEqual(new ResponseUserDto(user))
  });

  it('Should return a Exception Not Found when id not exist',async()=>{
    await userRepositoryMock.save(user);

    expect(async()=>{
      await getByIdUserService.execute(new ObjectId().toString());
    }).rejects.toBeInstanceOf(AppError)
  });

})
