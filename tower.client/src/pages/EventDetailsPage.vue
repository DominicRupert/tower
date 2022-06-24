<template>
  <div class="event-details-page container-fluid bg-secondary">
    <section
      id="event"
      class="justify-content-center container-fluid text-center"
    >
      <h1>Details for {{ event.name }}</h1>
      <button v-if="account.id == event.creatorId" @click.stop="deleteEvent">
        <i class="mdi mdi-delete"></i>
      </button>
      <h2>
        It's habbening on
        {{
          new Date(event.startDate).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}
      </h2>
      <h2>It's habbening {{ event.location }}</h2>
      <img class="img-fluid" :src="event.coverImg" alt="" />

      <Comment v-for="c in comments" :key="c.id" :comment="c" />
    </section>
    <section id="ticket-container " class="container-fluid">
      <h1>Get Tickets</h1>
      <div class="row justify-content-center">
        <button @click="createTicket">get ticket</button>
      </div>
    </section>

    <section class="container-fluid">
      <h1>See what people are saying</h1>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#create-comment"
        >
          CREATE A COMMENT
        </button>
      </div>
    </section>

    <Modal id="create-comment">
      <template #header>Comment on {{ event.name }}</template>
      <template #body>
        <CreateComment />
      </template>
    </Modal>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { commentsService } from '../services/CommentsService.js'
import { eventsService } from '../services/EventsService.js'
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
import Modal from '../components/Modal.vue'
import CreateComment from '../components/CreateComment.vue'
import { logger } from '../utils/Logger.js'

export default {

  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "EventDetails") {
          AppState.myTickets.length
          
          await eventsService.getEvent(route.params.id);
          await ticketsService.getTicketsByEvent(route.params.id);
          await commentsService.getCommentsByEvent(route.params.id);
        }
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      async deleteEvent(eventId) {
        try {
          if (await Pop.confirm)
            await eventsService.deleteEvent(eventId);
          Pop.toast("Event deleted", "success")
        }
        catch (error) {
          Pop.toast(error.message, "error");
        }
        ;
      },
  async createTicket() {
    try {
      await ticketsService.createTicket({
        eventId: route.params.id,
        userId: AppState.account.id,
      });
      Pop.toast("Ticket created", "success");
    }
    catch (error) {
      Pop.toast(error.message, "error");
    }
  },

      event: computed(() => AppState.event),
      myTickets: computed(() => AppState.myTickets.find(t => AppState.activeEvent.id == t.eventId)),
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
    };
  },
}
</script>
<style>
</style>