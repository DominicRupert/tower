import { Auth0Provider } from "@bcwdev/auth0provider";
import {eventsService} from '../services/EventsService.js';
import BaseController from '../utils/BaseController.js';
//make a new controller for events that extends the base controller class and implements the getAllEvents and create methods

export class EventsController extends BaseController {
    constructor(){
        super('api/events');
        this.router
            .get('', this.getAllEvents)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.update)
            .delete('/:id', this.remove)

    }

    async getAllEvents(req, res, next) {
        try {
        const  events = await eventsService.getAllEvents(req.query);
            res.send(events);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const towerEvent = await eventsService.getById(req.params.id);
            res.send(towerEvent);
        } catch (error) {
            next(error);
        }
    }
     


    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await eventsService.create(req.body);
            res.send(towerEvent);
        } catch (error) {
            next(error);

        }

    }
    async update(req, res, next) {
        try{
            req.body.creatorId = req.userInfo.id
            const towerEvent = await eventsService.update(req.params.id, req.body);
            res.send(towerEvent);
        } catch(error){
            next(error);
        }

}
    async remove(req, res, next) {
        try{
            const message = await eventsService.remove(req.params.id, req.userInfo);
            res.send(message);
        } catch(error){
            next(error);
        }
}
    async cancel(req, res, next){
        try{
            const eventCancelled = await eventsService.cancel(req.params.id);
            res.send(eventCancelled);

        } catch(error){
            next(error);
        }
    }

}