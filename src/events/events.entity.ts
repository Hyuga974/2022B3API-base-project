import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

enum eventStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

@Entity()
export class ProjectUser {
    @PrimaryGeneratedColumn("uuid")
    @Column({nullable:false})
    id: string

    @Column({nullable:false})
    date: Date

    @Column({nullable:true, default: eventStatus.Pending})
    eventStatus: eventStatus

    @Column({nullable:false})
    eventType: 'RemoteWork' | 'PaidLeave'

    @Column({nullable:true})
    eventDescription: string

    @Column({nullable:false})
    userId: string
}
