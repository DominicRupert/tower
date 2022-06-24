<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="https://fontmeme.com/permalink/220624/083965d2ad1f2aa3876742f5274d3c2a.png" height="45" />
      </div>
      
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
         <button class="btn btn-danger " data-bs-toggle="modal" data-bs-target="#create-event">
          Create Event
        </button>
    
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
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
  setup() {
    return {
       tickets: computed(() => AppState.tickets),
            account: computed(() => AppState.account),
            events: computed(() => AppState.accountEvents),
            myTickets: computed(() => AppState.myTickets),
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
