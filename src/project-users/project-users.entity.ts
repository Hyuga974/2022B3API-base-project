import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ProjectUser {
    @PrimaryGeneratedColumn("uuid")
    @Column({nullable:false})
    id: string

    @Column({nullable:false})
    startDate: Date

    @Column({nullable:false})
    endDate: Date

    @Column({nullable:false})
    projectId: string

    @Column({nullable:false})
    userId: string
}
