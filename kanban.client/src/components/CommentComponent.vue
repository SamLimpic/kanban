<template>
  <!-- <div class="comment-component row justify-content-end py-1"> -->
  <!-- <div class="col-2 my-auto ">
      <button type="button" class="btn btn-sm btn-outline-danger btn-size p-0" title="Delete Comment">
        <i class="fas fa-times" @click="deleteComment(commentProp.taskId, commentProp.id, commentProp.creatorId)"></i>
      </button>
    </div>
    <div class="col-8 text-right my-auto p-0"> -->
  <!-- <a class="m-0 p-0"> -->
  <a class="dropdown-item bg-transparent px-2"><span><button type="button" class="btn btn-sm btn-outline-danger btn-size p-0" title="Delete Comment">
    <i class="fas fa-times" @click="deleteComment(commentProp.taskId, commentProp.id, commentProp.creatorId)"></i>
  </button></span><span><img class="btn-size mx-2" :src="state.account.picture" :title="(state.account.name).split('@')[0]"></span><i>{{ commentProp.title }}</i></a>
  <!-- </a> -->
  <!-- </div>
    <div class="col-2 my-auto">
      <img class="img-icon" :src="state.account.picture" :title="(state.account.name).split('@')[0]">
    </div>
  </div> -->
  <!-- </div> -->
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
      async deleteComment(taskId, commentId, creatorId) {
        if (AppState.account.id !== creatorId) {
          Notification.toast("Denied! That's not yours!", 'danger')
        } else {
          if (await Notification.confirmAction()) {
            try {
              await commentsService.deleteComment(taskId, commentId)
              Notification.toast('Deleted!', 'warning')
            } catch (error) {
              Notification.toast('Error: ' + error, 'error')
            }
          } else {
            Notification.toast('No worries!', 'success')
          }
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.btn-size {
  height: 1.5rem;
  width: 1.5rem;
}

</style>
