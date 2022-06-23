<template>
    <div class="comment">
<img src="" alt="">
<i class="mdi mdi-delete" v-if="comment.creatorId == accountId" @click="deleteComment"></i>
<h4>{{comment.body}}</h4>
    </div>
</template>


<script>
import { AppState } from '../AppState.js'
import { computed } from 'vue'
import { commentsService } from '../services/CommentsService.js'
export default {
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>