import {AppState} from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService{
    async createComment(body){
        const res = await api.post('api/comments', body)
        logger.log('comments', res.data)
        AppState.comments = AppState.comments.push(res.data)
        
    }

    async getCommentsByEvent(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('get comments', res.data)
        AppState.comments = res.data.comments
    }

    async deleteComment(commentId){
        const res =  await api.delete('api/comments'+ commentId)
        logger.log('delete comment', res.data)
        AppState.comments = AppState.comments.filter(c=>c.id!=commentId)
    }
}


export const commentsService = new CommentsService()