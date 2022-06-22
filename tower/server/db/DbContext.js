import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvent'
import { TicketSchema } from '../models/Ticket'
import {CommentSchema} from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('TowerEvent', TowerEventSchema);
  Ticket = mongoose.model('Ticket', TicketSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
