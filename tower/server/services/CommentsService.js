import { dbContext } from "../db/dbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { eventsService } from "./EventsService.js";
import { ticketsService } from "./TicketsService.js";




class CommentsService {

    async getEventComments(eventId, userId) {
        const towerEvent = await eventsService.getById(eventId);
        const comments = await dbContext.Comments.find({ eventId }).populate(
            "account",
            "name picture"
        );
        const myComment = await ticketsService.getAccountEventTicket(userId, eventId)
        if (myComment) {
            comments.push(myComment);
        }   
        return comments;
    }
}


export const commentsService = new CommentsService();