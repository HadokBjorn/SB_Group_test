import 'reflect-metadata';
import { Router } from "express";
import { CreateUserController } from '../../userCases/createUser/CreateUserController';
import { GetUsersController } from '../../userCases/getUsers/GetUsersController';
import { GetByIdUserController } from '../../userCases/getByIdUser/GetByIdUserController';
import { UpdateUserController } from '../../userCases/updateUser/UpdateUserController';
import { DeleteUserController } from '../../userCases/deleteUser/DeleteUserController';

const userRoutes = Router();

const createControllerUser = new CreateUserController();
const getControllerUsers = new GetUsersController();
const getControllerUserById = new GetByIdUserController();
const updateControllerUser = new UpdateUserController();
const deleteControllerUser = new DeleteUserController();

userRoutes
  .post('/', createControllerUser.handle)
  .get('/', getControllerUsers.handle)
  .get('/:id', getControllerUserById.handle)
  .put('/:id', updateControllerUser.handle)
  .delete('/:id', deleteControllerUser.handle)

export{userRoutes};
