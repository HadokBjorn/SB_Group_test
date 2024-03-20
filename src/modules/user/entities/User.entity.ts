import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity('users')
class User{
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  cpf!: string

  @Column()
  birth_day!: Date

  @Column()
  email!: string

  @Column()
  password!: string
}

export {User};
