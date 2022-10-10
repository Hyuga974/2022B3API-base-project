
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

enum role {
  Employee= 'Employee',
  Admin= 'Admin',
  ProjectManager = 'ProjectManager',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique :true, nullable:false})
    usrername: string

    @Column({unique :true, nullable:false})
    email: string

    @Column({nullable:false})
    password: string

    @Column({default: role.Employee, nullable:false})
    role: role
}
