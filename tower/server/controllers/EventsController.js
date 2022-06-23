import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
//make a new controller for events that extends the base controller class and implements the getAllEvents and create methods

export class EventsController extends BaseController {
  constructor() {
    super("api/events");
    this.router
      .get("", this.getAllEvents)
      .get("/:id", this.getById)
      .get("/:id/comments", this.getComments)
      .get("/:id/tickets", this.getTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.cancel);
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query);
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
      req.body.creatorId = req.userInfo.id;
      const towerEvent = await eventsService.create(req.body);
      res.send(towerEvent);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const towerEvent = await eventsService.edit(req.params.id, req.body);
      res.send(towerEvent);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const creatorId = req.userInfo.id;
      const eventCancelled = await eventsService.cancel(
        req.params.id,
        creatorId
      );
      res.send(eventCancelled);
    } catch (error) {
      next(error);
    }
  }
  async getTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets(req.params.id);
      res.send(tickets);
    } catch (error) {
      next(error);
    }
  }
  async getComments(req, res, next) {
    try {
      const userInfo = req.userInfo;
      const comments = await eventsService.getComments(req.params.id, userInfo.id);
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
}
