<template>
    <div class="event-card selectable" @click="selectEvent">
        <img class="img-fluid" :src="event.coverImg" alt="">
        <div>
            <h2>{{ event.name }}</h2>
            <h2>Venue: {{ event.location }}</h2>
            <h3>Date: {{ new Date(event.startDate).toLocaleDateString('en-us', {
                    weekday: "long", year: "numeric",
                    month: "short", day: "numeric"
                })
            }}</h3>
            <h3>Max capacity: {{ event.capacity }}</h3>

            <p>{{ event.description }}</p>
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