<template>
  <div class="myTicket container bg-dark" @click="goTo">
   
    <p>{{ ticket.event.type }}</p>
    <p>{{ ticket.event.date }}</p>
    <p>{{ ticket.event.location }}</p>
    <p>{{ ticket.event.description }}</p>
    <i class="mdi mdi-delete" @click.stop="deleteTicket"></i>
  </div>
</template>


<script>
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteTicket() {
        try {
          if (await Pop.confirm('cancel ticket?')) {
            await ticketsService.deleteTicket(props.ticket.id);
            Pop.toast("Ticket deleted successfully");
          }
        }
        catch (error) {
          Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.myTicket {
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}

</style>