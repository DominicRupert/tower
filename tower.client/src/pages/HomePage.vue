<template>
  <div class=" container-fluid d-flex flex-column">
    <div class="row flex-row">
      <h1>we goin</h1>
      

      <div v-for="e in events" :key="e.id" class="col-3 py-2" >
  <Event :event="e" class=""/>
    </div>
  </div>
    </div>
</template>

<script>
import {computed, onMounted} from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop.js'
export default {
    name: "Home",
    setup(){
      onMounted(async ()=> {
        try {
          await eventsService.getEvents()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      })
      return{
        events: computed(()=> AppState.events)
      }
    }
}
</script>

<style scoped lang="scss">

</style>
