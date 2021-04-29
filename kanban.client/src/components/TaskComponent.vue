<template>
  <div class="task-component row">
    <!-- TASK DATA -->
    <div class="col-2 text-left my-auto">
      <button type="button" class="btn btn-sm btn-outline-danger btn-size p-0" title="Delete Task">
        <i class="fas fa-times" @click="deleteTask(taskProp.listId, taskProp.id, taskProp.creatorId)"></i>
      </button>
    </div>
    <div class="col-8 text-left p-0 my-auto" v-if="state.comments">
      <h5 class="m-0 py-1">
        {{ taskProp.title }}
      </h5>
      <!-- Comment component renders here  -->
    </div>
    <div class="col-2 my-auto">
      <button type="button" class="btn btn-sm btn-outline-success btn-size p-0" title="Create Comment">
        <i class="fas fa-plus" @click="createComment(taskProp.id)"></i>
      </button>
    </div>
  </div>
  <CommentComponent v-for="c in state.comments" :key="c.id" :comment-prop="c" />
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
import Notification from '../utils/Notification'

export default {
  name: 'TaskComponent',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments[props.taskProp.id])
    })
    onMounted(async() => {
      try {
        await tasksService.getCommentsByTaskId(props.taskProp.id)
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createComment(taskId) {
        try {
          await Notification.inputModal('Add a comment!', 'Comment here...')
          AppState.newPost.taskId = taskId
          await commentsService.createComment(taskId, AppState.newPost)
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      async deleteTask(listId, taskId, creatorId) {
        if (AppState.account.id !== creatorId) {
          Notification.toast("Denied! That's not yours!", 'danger')
        } else {
          if (await Notification.confirmAction()) {
            try {
              await tasksService.deleteTask(listId, taskId)
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

</style>
