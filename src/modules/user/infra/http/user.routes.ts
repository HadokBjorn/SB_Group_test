import 'reflect-metadata';
import { Router } from "express";
import { CreateUserController } from "../../userCases/createUser/createUserController";

const userRoutes = Router();

const createControllerUser = new CreateUserController();
userRoutes.post('/', createControllerUser.handle);

export{userRoutes};
