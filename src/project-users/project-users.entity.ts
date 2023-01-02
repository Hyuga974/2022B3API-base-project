import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Project } from "../projects/projects.entity"
import { User } from "../users/users.entity"

@Entity()
export class ProjectUser {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable:false})
    startDate: Date

    @Column({nullable:false})
    endDate: Date

    @Column({nullable:false})
    projectId: string

    @OneToOne(()=>Project, project => project.id)
    project!: Project

    @Column({nullable:false})
    userId: string

    @OneToOne(()=> User, user=> user.id)
    user!: User
}
