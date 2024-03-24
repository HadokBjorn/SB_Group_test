import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../../../../modules/user/repositories/implementations/UserRepository";
interface IPayload{
  sub: string
}
async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if(!authHeader) throw new AppError('Token missing', 401);
  const [,token] = authHeader.split(' ');
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const {sub: user_id} = verify(token, SECRET_KEY) as IPayload;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id)
    if(!user) throw new AppError('user not found', 404)
    request.user = {
      id: user_id
    }
    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }

}
export default ensureAuthenticated;
