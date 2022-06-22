import { Auth0Provider } from "@bcwdev/auth0provider";
import {eventsService} from '../services/EventsService.js';
import BaseController from '../utils/BaseController.js';
//make a new controller for events that extends the base controller class and implements the getAllEvents and create methods

export class EventsController extends BaseController {
    constructor(){
        super('api/events');
        this.router
            .get('', this.getAllEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create);

    }

    async getAllEvents(req, res, next) {
        try {
        const  events = await eventsService.getAllEvents(req.query);
            res.send(events);
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

    }}