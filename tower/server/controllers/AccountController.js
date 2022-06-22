import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import {eventsService} from '../services/EventsService'
export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)

  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getEvents(req, res, next ){
    try{
      const events = await eventsService.getAllEvents({creatorId: req.userInfo})
      res.send(events)
    } catch(error){
      next(error)
    }

  }
}
