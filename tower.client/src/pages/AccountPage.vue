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
      <section id="account-details">
        <div>
          <p>{{ account.name }}</p>
          <p>{{ account.email }}</p>
        </div>
        <img :src="account.picture" alt="" />
      </section>
      <section id="account-events">
        <h1>Events</h1>
        <div id="events-container">
          <div v-for="e in events" :key="e.id" class="col-3 py-2">
          

            <router-link :to="{ name: 'EventDetails', params: { id: e.id } }"
              >{{ e.name }}
            </router-link>
          </div>
        </div>
        <button data-bs-toggle="modal" data-bs-target="#create-event">
          Create Event
        </button>
      </section>
      <section id="my-tickets">
        <h1>My Tickets</h1>
        <div>
          <Ticket
            :ticket="t"
            v-for="t in tickets"
            :key="t.id"
            class="col-3 py-2"
          />
        </div>
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

export default {
  name: "Account",
  setup() {
    onMounted(async () => {
      await accountService.getMyEvents();
      await accountService.getMyTickets();

    })
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
img {
  max-width: 100px;
}
</style>
