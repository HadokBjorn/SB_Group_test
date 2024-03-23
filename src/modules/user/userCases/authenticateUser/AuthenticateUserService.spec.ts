import 'reflect-metadata'
import { container } from "tsyringe";
import { UserRepositoryMock } from "modules/provider/fakes/UserRepositoryMock";
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { AuthenticateUserService } from './AuthenticateUserService';
import { ICreateUserDto } from 'modules/user/dtos/ICreateUserDto';
import { hashSync } from 'bcrypt';


let authenticateUserService: AuthenticateUserService;
let userRepositoryMock: UserRepositoryMock;


describe('AuthenticateUserService Tests',()=>{

  beforeEach(()=>{
    userRepositoryMock = new UserRepositoryMock();
    authenticateUserService = new AuthenticateUserService(userRepositoryMock);
    jest.spyOn(container, 'resolve').mockImplementationOnce(()=>{
      return authenticateUserService;
    })
  });

  const user:ICreateUserDto = {
    name: "Joao test1",
    cpf: "24828502076",
    birth_day: new Date('2000-08-21'),
    email: "joaotest1@gmail.com",
    password: hashSync("12345678",8)
  };

  it('Should authenticate user successfully',async()=>{
    await userRepositoryMock.save(user)
    const mockLoginCorrect = {
      email: "joaotest1@gmail.com",
      password: "12345678"
    }
    const responseToken = await authenticateUserService.execute(mockLoginCorrect)

    expect(responseToken).toHaveProperty('token')
    expect(responseToken).toHaveProperty('user')
    expect(responseToken.token).toBeTruthy()
    expect(responseToken.user.email).toBe(user.email)
    expect(responseToken.user.name).toBe(user.name)
  });

  it('Should return a Exception Unauthorized when Email is incorrect',async()=>{
    await userRepositoryMock.save(user)
    const mockLoginEmailIncorrect = {
      email: "joaotest-email-incorrect@gmail.com",
      password: "12345678"
    }

    await expect(async()=>{
      await authenticateUserService.execute(mockLoginEmailIncorrect)
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should return a Exception Unauthorized when Password is incorrect',async()=>{
    await userRepositoryMock.save(user)
    const mockLoginPasswordIncorrect = {
      email: "joaotest1@gmail.com",
      password: "incorrectPass545"
    }

    await expect(async()=>{
      await authenticateUserService.execute(mockLoginPasswordIncorrect)
    }).rejects.toBeInstanceOf(AppError)
  });
})
