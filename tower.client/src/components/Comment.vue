<template>
  <div class="comments">
    <div class="row">
      <div class="col-12">

        <h1 class="col-12 d-flex align-items-center">
<img class="px-3" :src="account.picture" alt="">          {{comment.creator.name}}  says:   {{ comment.body }}
     
               <i
       class="mdi mdi-delete"
        v-if="comment.creator.id == account.id"
        @click="deleteComment"
      ></i>
      </h1>

    </div>
        </div>
  </div>
</template>


<script>
import { AppState } from '../AppState.js'
import { computed } from 'vue'
import { commentsService } from '../services/CommentsService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          if (await Pop.confirm()) {

            await commentsService.deleteComment(props.comment.id);
            Pop.toast("Comment deleted successfully");
          }
        }
        catch (error) {
          Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>