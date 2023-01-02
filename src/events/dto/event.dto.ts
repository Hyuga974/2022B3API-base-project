import { IsDate, IsEmail, IsNotEmpty, Length } from "class-validator"
import { Default } from "sequelize-typescript"


export class EventDto {  
  @IsNotEmpty()
  @IsDate()
  date: Date

  @IsNotEmpty()
  eventStatus : 'Pending' | 'Accepted' | 'Declined'

  @IsNotEmpty()
  eventType : 'RemoteWork' | 'PaidLeave'

  eventDescription: string

  @IsNotEmpty()
  userId: string
}
