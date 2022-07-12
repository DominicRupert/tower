<template>
  <div class=" container d-flex flex-column ">
    <div class="row flex-row">
      <img class="img img justify-content-center" src="https://fontmeme.com/permalink/220624/38748f6367cf49aa2523ac182d412ab6.png" alt="">
      <div class="form-group sort row">
        <label for="event-type">Sort by Event type</label>
      <select class="form-select" v-model="sortEvents" id="event-type" aria-label="Default select example">
      
        <option value="">all</option>
        

          
        <option value="convention">WeebCon</option>
        <option value="sport">SportBall</option>
        <option value="digital">Whatever the next youtuber pay per view boxing thing is</option>
        <option value="concert">Concert</option>
      </select>
        
      <div v-for="e in events" :key="e.id" class="col-md-4 py-2" >
  <Event :event="e" class=""/>
    </div>
      

    </div>
  </div>
    </div>
</template>

<script>
import {computed, onMounted, ref} from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop.js'
export default {
    name: "Home",
    setup(){
      const sortEvents = ref('')
      onMounted(async ()=> {
        try {
          await eventsService.getEvents()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      })
      return{
        sortEvents,
        events: computed(()=> AppState.events.filter(e => sortEvents.value ? e.type== sortEvents.value : true))
      }
    }
}
</script>

<style scoped lang="scss">
.img{
  transform: scale(0.7);
 
}
</style>
