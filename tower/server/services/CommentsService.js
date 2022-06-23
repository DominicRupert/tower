import { dbContext } from "../db/dbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { eventsService } from "./EventsService.js";
import { ticketsService } from "./TicketsService.js";




class CommentsService {

    async getEventComments(eventId, userId) {
        const comments = await dbContext.Comments.find({ eventId }).populate(
            "account",
            "name picture"
        );
        
        return comments;
    }

    async create(body){
        const comments = await dbContext.Comments.create(body);
        await comments.populate("account", "name picture", "creator")
        return comments;
    }
    /**
   * Sets the closed property to true
   * @param {String} id - The Tier Id
   * @param {String} userId - The Id of the current user
   */

    
}


export const commentsService = new CommentsService();