
import { Exclude } from "class-transformer"
import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { ProjectUser } from "../project-users/project-users.entity"
import { Project } from "../projects/projects.entity"
import { role } from "./role.enum"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(()=>ProjectUser, projectUsers => projectUsers.userId)
    projectUsers: ProjectUser
    
    @Column({unique :true, nullable:false})
    username: string

    @Column({unique :true, nullable:false})
    email: string

    @Exclude()
    @Column({nullable:false})
    password: string

    @Column({default: role.Employee, nullable:false})
    role: role

    @OneToMany(()=>Project, projects => projects.referringEmployee)
    projects: Project[]

    // @OneToMany(()=> Event, events => events.user)
    // events: Event[]
}
