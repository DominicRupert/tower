<template>

   <div class=" row justify-content-center">
  <div class=" col-3 d-flex justify-content-center bg-dark" >
    

 
        <img :title="ticket.account?.name" class="img-fluid img" :src="ticket.account?.picture" alt=""> 
          
   
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
   const hasTicket = computed (()=> AppState)
    onMounted(async()=> {
        try {
 
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
.img{
    transform: scale(0.8);
}

</style>