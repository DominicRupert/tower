import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class EventsService{
    async createEvent(body){
        const res = await api.post('api/events', body)
        logger.log('created event', res.data)
        AppState.accountEvents.push(res.data)
    }
    async getEvents(query = ''){
        const res = await api.get('api/events' + query)
        logger.log('[get events]', res.data)
        AppState.events=res.data
    }


    async getEvent(id){
        const res = await api.get('api/events/'+ id)
        logger.log('[get event]', res.data)
        AppState.activeEvent  =res.data
    }

    async editEvent(body){
        const res = await api.put('api/events/'+ body.id, body)
        logger.log('edit event', res.data)
        AppState.activeEvent=res.data
    }
    
}


export const eventsService = new EventsService()