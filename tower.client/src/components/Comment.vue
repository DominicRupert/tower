<template>
  <div class="comments">
    <div class="row">
      <h1>
        {{ comment.body }}
      </h1>

      <i
        class="mdi mdi-delete"
        v-if="comment.creatorId == accountId"
        @click="deleteComment"
      ></i>
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