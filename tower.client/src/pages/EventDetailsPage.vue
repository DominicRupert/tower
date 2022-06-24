<template>
  <div class="event-details-page container-fluid bg-secondary">
    <section id="event" class="justify-content-center container-fluid text-center">
      <h1 class="py-4 d-flex justify-content-around">Details for {{ event.name }}<button class="btn btn-danger" v-show="event.isCanceled == false" v-if="account.id == event.creatorId"
        @click.stop="deleteEvent(event.id)">
        <h4 class="mdi mdi-delete">Cancel your Event?</h4>
      </button></h1>
      <h1 class="text-warning" v-if="event.isCanceled == true">Sorry, this event is cancelled</h1>
      

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



    </section>
    <section id="ticket-container " class="container-fluid justify-content-center d-flex flex-column">
      <h1 v-if="event.isCanceled == false" class="text-center">Get Tickets! Tickets remaining: {{ event.capacity }} </h1>

      <button v-if="event.isCanceled == false" class="btn bg-success" @click="createTicket">
        <h2> Get Ticket!</h2>
        <h4> </h4>
      </button>
     
      
        <div class="container-fluid text-center d-flex justify-content-center flex-column">
          <h1>Who's attending?</h1>
          <div class="row">

            <div v-for="tick in tickets" :key="tick.id" >
          <Ticket :ticket="tick" />
          </div>
          </div>

        </div>
    
    </section>

    <section class="">
      <div class="container d-flex flex-column justify-content-center ">
        <div class="row">


          <h1>See what people are saying</h1>
          <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-comment">
              CREATE A COMMENT
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid">

        <div class="row"  v-for="c in comments" :key="c.id" >

          <Comment :comment="c" />

        </div>
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
import { computed, ref, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { commentsService } from '../services/CommentsService.js'
import { eventsService } from '../services/EventsService.js'
import { ticketsService } from '../services/TicketsService.js'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
import Modal from '../components/Modal.vue'
import CreateComment from '../components/CreateComment.vue'
import { logger } from '../utils/Logger.js'


export default {
  setup(props) {
    onMounted(async () => {
      await accountService.getMyEvents();
      await accountService.getMyTickets();
    });
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "EventDetails") {
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
          logger.log(eventId)
          if (await Pop.confirm('cancel event?'))
            await eventsService.deleteEvent(eventId);
          Pop.toast("Event deleted", "success");

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
          Pop.toast("You already have a ticket for this event", "error");
        }
      },
      async deleteTicket() {
        try {
          if (await Pop.confirm('cancel ticket?')) {
            await ticketsService.deleteTicket(props.ticket.id);
            Pop.toast("Ticket deleted successfully");
          }
        }
        catch (error) {
          Pop.error(error.message);
          logger.log
        }
      },
      event: computed(() => AppState.event),
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      myTickets: computed(() => AppState.myTickets),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
    };
  },

}
</script>
<style>
</style>