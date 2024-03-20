import { ObjectId } from "mongodb"
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
class User{
  @ObjectIdColumn()
  _id!: ObjectId

  @Column({type: 'text'})
  name!: string

  @Column({type: 'text'})
  cpf!: string

  @Column({type: 'timestamp'})
  birth_day!: Date

  @Column({type: 'text'})
  email!: string

  @Column({type: 'text'})
  password!: string
}

export {User};
