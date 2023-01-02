import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "../users/users.entity"

enum eventStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

@Entity()
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable:false})
    date: Date

    @Column({nullable:true, default: 'Pending'})
    eventStatus: 'Pending'|'Accepted'|'Declined'

    @Column({nullable:false})
    eventType: 'RemoteWork' | 'PaidLeave'

    @Column({nullable:true})
    eventDescription: string

    @Column({nullable:false})
    userId: string

    // @ManyToOne(() => User, user => user.events)
    // user:User
}
