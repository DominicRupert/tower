import { dbContext } from "../db/dbContext";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
//write a service to handle all the event functions

class EventsService {
  async getAllEvents(query = {}) {
    let events = await dbContext.Events.find(query).populate(
      "creator",
      "name picture"
    );
    return events;
  }
  async getById(id) {
    let towerEvent = await dbContext.Events.findById(id).populate(
      "creator",
      "name picture"
    );
    return towerEvent;
  }

  async create(body) {
    let towerEvent = await dbContext.Events.create(body);
    await towerEvent.populate("creator", "name picture");
    return towerEvent;
  }
  async update(id, update) {
    const original = await dbContext.Events.findById(id).populate(
      "creator",
      "name picture"
    );
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest("You are not authorized to update this event");
    }
    original.name = update.name ? update.name : original.name;
    original.description = update.description
      ? update.description
      : original.description;
    original.coverImg = update.coverImg ? update.coverImg : original.coverImg;
    original.location = update.location ? update.location : original.location;
    original.capacity = update.capacity ? update.capacity : original.capacity;
    original.startDate = update.startDate
      ? update.startDate
      : original.startDate;

    original.type = update.type ? update.type : original.type;
    original.save();
    return update;
  }
  async remove(id, userId) {
    const towerEvent = await dbContext.Events.findById(id);
    if (towerEvent.creatorId.toString() !== userId) {
      throw new BadRequest("You are not authorized to delete this event");
    }
  }

  async cancel(update) {
    const original = await this.getById(update.id);
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest("You are not authorized to cancel this event");
    }
    if (original.isCanceled) {
      throw new BadRequest("This event is already canceled");
    }
    original.isCanceled = update.isCanceled
      || original.isCanceled
      
    original.isCanceled = null;
    await original.save();
    return original;
  }
}
export const eventsService = new EventsService();
