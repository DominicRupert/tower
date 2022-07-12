import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class TicketsService {
  async getAccountEventTicket(accountId, eventId) {
    const ticket = await dbContext.Ticket.findOne({ accountId, eventId })
      .populate("account", "name picture")
      .populate("event");
    return ticket;
  }

  async getMyTickets(accountId) {
    const ticket = await dbContext.Ticket.find({ accountId })
      .populate("account", "name picture")
      .populate("event");

    const events = await dbContext.Ticket.find({ accountId })
      .populate("event","account", )
      .populate("account", "event");
    await dbContext.Ticket.find({ accountId }).populate(
      "event",
      "account"
    );
   
    return ticket;
  }

  async getEventTickets(eventId, userId) {
    // const towerEvent = await eventsService.getById(eventId);
    const tickets = await dbContext.Ticket.find({ eventId }).populate(
      "account",
      "name picture"
    );

    return tickets;
  }

  async getById(id) {
    const ticket = await dbContext.Ticket.findById(id);
    if (!ticket) {
      throw new BadRequest("Ticket not found");
    }
    return ticket;
  }

  async create(ticketData) {
    const hasTicket = await this.getAccountEventTicket(
      ticketData.accountId,
      ticketData.eventId
    );
    if (hasTicket) {
      throw new BadRequest("You already have a ticket for this event");
    }
    const ticket = await dbContext.Ticket.create(ticketData);
    const towerEvent = await dbContext.Events.findById(ticketData.eventId);
    await ticket.populate("account");
    if (towerEvent.capacity <= 0) {
      throw new BadRequest("This event is full");
    }
    towerEvent.capacity--;

    await towerEvent.save();
    await ticket.save();
    return ticket;
  }

  async delete(id, userId) {
    const ticket = await dbContext.Ticket.findById(id);
    if (!ticket) {
      throw new BadRequest("Ticket not found");
    }
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden("You are not authorized to delete this ticket");
    }
    const towerEvent = await dbContext.Events.findById(ticket.eventId);
    towerEvent.capacity++;
    await towerEvent.save();
    await ticket.remove();
    return ticket;
  }
}

export const ticketsService = new TicketsService();
