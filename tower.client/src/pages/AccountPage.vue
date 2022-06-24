<template>

  <div
    class="
      account-page
      container-fluid
      d-flex
      justify-content-center
      flex-column
    "
  >
    <div class="row justify-content-center">
      <section id="account-details " class="justify-content-center flex-column">
        <img :src="account.picture" class="img-fluid" alt="" />
        <div class="container-fluid text-center justify-content-center d-flex flex-column">
        <div>
          <h1>My name: {{ account.name }}</h1>
          <p>My email: {{ account.email }}</p>
        </div>
    

          <h1>Events you've made</h1>
        <div id="events-container">
          <div v-for="e in events" :key="e.id" class="py-2">
          

            <router-link :to="{ name: 'EventDetails', params: { id: e.id } }"
              ><h3>{{ e.name }}</h3>
            </router-link>
          </div>
        <button class="btn btn-danger " data-bs-toggle="modal" data-bs-target="#create-event">
          Create Event
        </button>
          </div>
        </div>
      </section>
      <section id="my-tickets">
        <h1>My Tickets</h1>
        
          <MyTicket
            v-for="t in myTickets"
            :key="t.id"
            :ticket = t
           

          >
           <router-link :to="{ name: 'EventDetails', params: { id: e.id } }"
              >{{ e.name }}
            </router-link>
          </MyTicket>
      </section>
    </div>
  </div>
  <Modal id="create-event">
    <template #header>Create Event</template>
    <template #body>
      <EventForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
import {commentsService} from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';



export default {
    name: "Account",
    setup() {
      const route = useRoute()
        onMounted(async () => {
            await accountService.getMyEvents();
            await accountService.getMyTickets();
        });
        return {
            tickets: computed(() => AppState.tickets),
            account: computed(() => AppState.account),
            events: computed(() => AppState.accountEvents),
            myTickets: computed(() => AppState.myTickets),
        };
    },
}
</script>

<style scoped>

</style>
