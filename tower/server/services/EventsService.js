import {dbContext} from '../db/dbContext';
import { BadRequest } from '@bcwdev/auth0provider/lib/Errors.js';
//write a service to handle all the event functions

class EventsService {
    async getAllEvents(query = {}) {
        let events = await dbContext.Events.find(query).populate('creator', 'name picture');
        return events
    }
 async create(body){
        let towerEvent = await dbContext.Events.create(body);
        await towerEvent.populate('creator', 'name picture')
        return towerEvent;
 }





}


export const eventsService = new EventsService();