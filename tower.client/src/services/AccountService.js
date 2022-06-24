import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop.js'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyEvents(){
    const res = await api.get('account/events')
    logger.log('account events', res.data)
    AppState.accountEvents = res.data
  }
async getMyTickets(){
  try {
    
    const res = await api.get ('account/tickets')
    logger.log('[my tickets]', res.data)
    AppState.myTickets=res.data
  } catch (error) {
    Pop.error(error)
    
  }
}

}

export const accountService = new AccountService()
