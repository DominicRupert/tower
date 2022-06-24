<template>
  <div id="create-comment">
    <form id="comment-form" class="p-4" @submit.prevent="createComment">
      <div class="form-group">
        <label for="comment-body">Comment Body</label>
        <textarea
          class="form-control"
          id="comment-body"
          v-model="editable.body"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create Comment</button>
    </form>
  </div>
</template>



<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
import { Modal } from 'bootstrap';
export default {
  name: "CreateComment",
  setup() {
    const editable = ref({});
    const route = useRoute()
    return {
      editable,
      async createComment() {
        try {
          editable.value.eventId = route.params.id;
          await commentsService.createComment(editable.value);
          Pop.success("Comment created successfully");
          Modal.getOrCreateInstance(document.getElementById("create-comment")).hide();

        } catch (error) {
          Pop.error(error.message);



        }
      }
    }
  }
}



</script>