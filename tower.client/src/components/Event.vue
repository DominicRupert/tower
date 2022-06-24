<template>
  <div class="event-card selectable" @click="selectEvent">
    <img class="img-fluid" :src="event.coverImg" alt="" />
    <div class="text-center bg-primary rounded-3">
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

      <p>{{ event.description }}</p>
      <h4 class="bg-danger rounded-3 p-2" v-if=" event.isCanceled == true">Sorry, this event is cancelled</h4>
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
</style>