import { ObjectId } from "typeorm"
import { User } from "../entities/User.entity"

class GetUserDto{
  _id: ObjectId

  name: string

  cpf: string

  birth_day: Date

  email: string

  constructor(user:User){
    this._id = user._id
    this.name = user.name
    this.cpf = user.cpf
    this.birth_day = user.birth_day
    this.email = user.email
  }
}
export {GetUserDto}
