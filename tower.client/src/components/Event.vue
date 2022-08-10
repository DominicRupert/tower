<template>
  <div class="event-card selectable" @click="selectEvent">
    <img class="img-fluid image" v-on:touchmove="event.description" :src="event.coverImg" alt="" />
    <div class="text-center p-2 bg-primary rounded-3">
      <h2 class="py-3">{{ event.name }}</h2>
      
      <h4 class="py-3">Venue: {{ event.location }}</h4>
      <h4>
        Date:
        {{
          new Date(event.startDate).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}
      </h4>
      <h4>Max capacity: {{ event.capacity }}</h4>
    </div>
    <div>
      <h4 class="bg-danger rounded-3 p-2" v-if="event.isCanceled == true">
        Sorry, this event is cancelled
      </h4>
    </div>
  </div>
  
  <div class="row p-3">
    <button
      class="btn btn-warning"
      type="button"
      data-bs-toggle="offcanvas"
      :data-bs-target="`#id`+ event.id "
      aria-controls="offcanvasTop"
    >
      Event Details
    </button>
  </div>
  <div
    class="offcanvas offcanvas-top"
    tabindex="-1"
    :id="`id`+ event.id "
    aria-labelledby="offcanvasTopLabel"
    
  >
    <div class="offcanvas-header text-black">
      <h5 id="offcanvasTopLabel">Details of {{ event.name }}</h5>
      <button
        type="button"
        
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"


        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p class="text-black">{{ event.description }}</p>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      selectEvent() {
        router.push({ name: 'EventDetails', params: { id: props.event.id } })
      },


    }
  }
}
</script>


<style lang="scss" scoped>
.image:hover{
   
  
}
</style>