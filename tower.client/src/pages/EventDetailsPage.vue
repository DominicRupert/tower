<template>
  <div class="event-details-page container-fluid">
    <section id="event" class="justify-content-center text-center">
      <h1>Details for {{ event.name }}</h1>
      <h2>It's habbening on {{ new Date(event.startDate).toLocaleDateString('en-us', {
          weekday: "long", year: "numeric",
          month: "short", day: "numeric"
        })
      }}</h2>
      <h2>It's habbening {{ event.location }}</h2>
      <img class="img-fluid" :src="event.coverImg" alt="">
    </section>
    <section id="comments" class="container-fluid">
      <h1>See what people are saying</h1>
      <div >
        <Comment v-for="c in comments" :key="c.id" :comment="c"/>
      </div>

    </section>
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


export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.name == 'EventDetails') {
          await eventsService.getEvent(route.params.id)
          await ticketsService.getTicketsByEvent(route.params.id)
          await commentsService.getCommentsByEvent(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),

    }
  },
}
</script>
