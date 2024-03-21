import 'reflect-metadata';
import { Router } from "express";
import { CreateUserController } from '../../userCases/createUser/CreateUserController';
import { GetUsersController } from '../../userCases/getUsers/GetUsersController';
import { GetByIdUserController } from '../../userCases/getByIdUser/GetByIdUserController';
import { UpdateUserController } from '../../userCases/updateUser/UpdateUserController';

const userRoutes = Router();

const createControllerUser = new CreateUserController();
const getControllerUsers = new GetUsersController();
const getControllerUserById = new GetByIdUserController();
const updateControllerUser = new UpdateUserController();

userRoutes
  .post('/', createControllerUser.handle)
  .get('/', getControllerUsers.handle)
  .get('/:id', getControllerUserById.handle)
  .put('/:id', updateControllerUser.handle)

export{userRoutes};
