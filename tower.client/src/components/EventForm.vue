<template>
  <form id="event-form" class="p-4">
    <div class="form-group">
      <label for="event-name">Event Name</label>
      <input
        type="text"
        class="form-control"
        id="event-name"
        v-model="editable.name"
      />
    </div>
    <div class="form-group">
      <label for="event-date">Event Date</label>
      <input
        type="date"
        class="form-control"
        id="event-date"
        v-model="editable.startDate"
      />
    </div>
    <div class="form-group">
      <label for="event-capacity">Event Capacity</label>
      <input
        type="number"
        class="form-control"
        id="event-capacity"
        v-model="editable.capacity"
      />
    </div>
    <div class="form-group">
        <label for="event-type">Event type</label>
      <select class="form-select" v-model="editable.type" id="event-type" aria-label="Default select example">
      
        <option value="convention">WeebCon</option>
        <option value="sport">SportBall</option>
        <option value="digital">Whatever the next youtuber pay per view boxing thing is</option>
        <option value="concert">Concert</option>
      </select>
    </div>
    <div class="form-group">
      <label for="event-location">Event Location</label>
      <input
        type="text"
        class="form-control"
        id="event-location"
        v-model="editable.location"
      />
    </div>
    <div class="form-group">
      <label for="event-image">Event Image</label>
      <input
        type="text"
        class="form-control"
        id="event-image"
        v-model="editable.coverImg"
      />
    </div>
    <div class="form-group">
      <label for="event-description">Event Description</label>
      <textarea
        class="form-control"
        id="event-description"
        v-model="editable.description"
      ></textarea>
    </div>
    <button
      v-if="!event"
      type="submit"
      class="btn btn-primary"
      @click.prevent="createEvent"
    >
      Submit your new event!
    </button>
    <button v-else type="button" @click="editEvent">Save your changes</button>
  </form>
</template>


<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { onMounted, watchEffect } from 'vue'
import { logger } from '../utils/Logger.js'
export default {
  props: {
    event: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const router = useRouter()
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.event }
    })

    return {
      editable,
      async createEvent() {
        try {
          await eventsService.createEvent(editable.value)
          Pop.toast('Event made')
          Modal.getOrCreateInstance(document.getElementById('create-event')).hide()
          router.push({ name: 'EventDetails', params: {id: props.eventId } })
        } catch (error) {
          Pop.toast(error.message)
          logger.error(error)

        }
      },
      async editEvent() {
        try {
          await eventsService.editEvent(editable.value)
          Pop.toast('Event edited')
          Modal.getOrCreateInstance(document.getElementById('edit-event')).hide()
        } catch (error) {
          Pop.toast(error.message)

        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>