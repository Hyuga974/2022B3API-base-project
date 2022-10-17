import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    @Column({nullable:false})
    id: string

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    referringEmployeeId: string
}
