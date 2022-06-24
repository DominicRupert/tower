<template>
  <div class="myTicket container bg-dark" @click="goTo">
   <div class="d-flex justify-content-between">

     <p class=" d-flex">Name: {{account.name}}
     </p> 
     <img :src="account.img" alt="">  
   </div>

   
    
    
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