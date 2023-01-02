import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { ProjectUser } from "../project-users/project-users.entity"
import { User } from "../users/users.entity"

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(()=>ProjectUser, projectUsers => projectUsers.project)
    projectUsers: ProjectUser

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    referringEmployeeId: string

    @ManyToOne(()=> User, user => user.projects)
    referringEmployee : User
}
