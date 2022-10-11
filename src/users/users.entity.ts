
import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum role {
  Employee= 'Employee',
  Admin= 'Admin',
  ProjectManager = 'ProjectManager',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique :true, nullable:false})
    username: string

    @Column({unique :true, nullable:false})
    email: string

    @Column({nullable:false})
    password: string

    @Column({default: role.Employee, nullable:false})
    role: role
}
