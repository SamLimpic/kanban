<template>
  <div class="comment-component row justify-content-end py-1">
    <div class="col-2 my-auto ">
      <button type="button" class="btn btn-sm btn-outline-danger btn-size p-0">
        <i class="fas fa-times" @click="deleteComment(commentProp.taskId, commentProp.id)"></i>
      </button>
    </div>
    <div class="col-8 text-right my-auto p-0">
      <p class="m-0 p-0">
        <i>{{ commentProp.title }}</i>
      </p>
    </div>
    <div class="col-2 my-auto">
      <img class="img-icon" :src="state.account.picture" :title="(state.account.name).split('@')[0]">
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import Notification from '../utils/Notification'

export default {
  name: 'CommentComponent',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteComment(taskId, commentId) {
        try {
          await commentsService.deleteComment(taskId, commentId)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.img-icon {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
}
</style>
