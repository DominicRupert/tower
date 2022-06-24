<template>
  <div class="account-page">
    <section id="account-details">
      <div>
        <p>{{ account.name }}</p>
        <p>{{ account.email }}</p>
      </div>
      <img :src="account.picture" alt="" />
    </section>
    <section id="account-events">
      <h1>Events</h1>
      <div v-for="e in events" :key="e.id" class="col-3 py-2">
        <Event :event="e" class="" />
        <router-link :to="{ name: 'EventDetails', params: { id: e.id } }">
          {{ e.name }}
        </router-link>
      </div>
    </section>
    <button data-bs-toggle="modal" data-bs-target="#create-event">
      Create Event
    </button>
    <section id="my-tickets">
      <h1>My Tickets</h1>
      <div v-for="t in tickets" :key="t.id" class="col-3 py-2">
        <Ticket :ticket="t" />
      </div>
    </section>
  </div>
  <Modal id="create-event">
    <template #header>Create Event</template>
    <template #body>
      <EventForm />
      </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import EventForm from '../components/EventForm.vue'
export default {
    name: "Account",
    setup() {
        return {
            account: computed(() => AppState.account)
        };
    },
    components: { EventForm }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
