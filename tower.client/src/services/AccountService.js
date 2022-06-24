import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop.js";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = res.data;
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }
  async getMyEvents() {
    const res = await api.get("account/events");
    logger.log("account events", res.data);
    AppState.accountEvents = res.data;
  }
  async getMyTickets(ticketId) {
  
      const res = await api.get("account/tickets", ticketId);
      logger.log("[my tickets]", res.data);
      AppState.myTickets = res.data;
   
      
  }
}

export const accountService = new AccountService();
