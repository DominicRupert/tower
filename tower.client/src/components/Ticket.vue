<template>
  <div class="tickets" @click="createTicket">
    <div class="ticket">
      <div class="ticket-header">
        <h1>buy it</h1>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { ticketsService } from '../services/TicketsService.js'
import { logger } from '../utils/Logger.js'



export default {
    props: {
        ticket: {
        type: Object,
        required: true
        }
    },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>