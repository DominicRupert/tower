<template>
  <div class="myTicket container bg-dark" @click="goTo">
   <div class="d-flex justify-content-between">

     <p class=" d-flex">Event name: {{ticket.event.name}}
     </p>   
      <button class="mdi btn btn-light mdi-delete" @click.stop="deleteTicket">Cancel?</button>
   </div>

    <p>Event type: {{ticket.event.type }}</p>
    <p>Event date:  {{
          new Date(ticket.event.startDate).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}</p>
    <p>Event location: {{ ticket.event.location }}</p>
  </div>
</template>


<script>
import { onMounted, computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState.js'
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
    const router = useRouter()
   
    onMounted(async()=> {
        try {
          await ticketsService.getTicketsByEvent(props.ticket.id);
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
    })
    return {
        tickets: computed(() => AppState.tickets),
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
      },
      goTo(){
                router.push({ name: 'EventDetails', params: {id:  props.ticket.eventId } })

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