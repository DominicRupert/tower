import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class TicketsService {
  async getTicketsByEvent(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`);
    AppState.tickets = res.data;
  }

  async createTicket(ticketData) {
    const res = await api.post("/api/tickets", ticketData);
    AppState.tickets.push(res.data);
    AppState.myTickets.push(res.data);
  }
  async deleteTicket(id) {
    await api.delete("api/tickets/" + id);
    AppState.myTickets = AppState.myTickets.filter((t) => t.id != id);
  }
}

export const ticketsService = new TicketsService()
