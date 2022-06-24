import { dbContext } from "../db/dbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { eventsService } from "./EventsService.js";
import { ticketsService } from "./TicketsService.js";

class CommentsService {
  async getEventComments(eventId, userId) {
    const comments = await dbContext.Comments.find({ eventId }).populate(
      "creator",
      "name picture"
    );

    return comments;
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body);
    await comment.populate("creator");
    return comment;
  }

  async delete(id, userId) {
    const comment = await dbContext.Comments.findById(id);
    if (comment.creatorId.toString() != userId) {
      throw new BadRequest("CANT");
    }
    comment.remove();
    return `deleted comment ${comment.body}`;
  }
}

export const commentsService = new CommentsService();
