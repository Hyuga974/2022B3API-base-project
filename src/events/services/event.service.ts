

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/users.entity';
import { EventDto } from '../dto/event.dto';
import { Event } from '../events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private EventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.EventsRepository.find();
  }

  findId(id: string): Promise<Event>{
    return this.EventsRepository.findOne({ where: { id: id } });
  }

  async findAllEventsUser(user: User): Promise<Event[]>{
    let test = await this.EventsRepository.find({ where: { userId : user.id}})
    return this.EventsRepository.find({ where: {userId : user.id}})
  }

  async findEvent(event: Event): Promise<Event>{
    return this.EventsRepository.findOne({ where: {id : event.id}})
  }

  //create Event
  async create(event: Event, userId : string): Promise<Event> {
    let eventCreated : Event = new Event
    eventCreated.date = event.date
    eventCreated.eventType = event.eventType
    eventCreated.eventDescription = event.eventDescription
    eventCreated.userId= userId
    return await this.EventsRepository.save(eventCreated);
  }

//   async remove(id: string): Promise<void> {
//     await this.EventsRepository.delete(id);
//   }
}
