//model for comments, child of towerevent
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


export const CommentSchema = new Schema({
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    eventId: { type: ObjectId, ref: 'TowerEvent', required: true },
    body: { type: String, required: true },
    isAttending: { type: Boolean }
} , { timestamps: true, toJSON: { virtuals: true } });




CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})