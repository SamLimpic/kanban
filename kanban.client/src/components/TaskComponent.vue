<template>
  <div class="task-component row my-auto">
    <!-- TASK DATA -->
    <div class="col-2">
      <button type="button" class="btn btn-sm btn-outline-danger m-0 ml-2 py-0 px-1">
        <i class="fas fa-times" @click="deleteTask(taskProp.id)"></i>
      </button>
    </div>
    <div class="col-8 text-left pl-0 py-1 my-0" v-if="state.comments">
      <h5>
        {{ taskProp.title }}
      </h5>
      <!-- Comment component renders here  -->
      <ul>
        <CommentComponent v-for="c in state.comments" :key="c.id" :comment-prop="c" />
      </ul>
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-sm btn-outline-success m-0 mr-2 py-0 px-1">
        <i class="fas fa-plus" @click="createComment(taskProp.id)"></i>
      </button>
    </div>
  </div>
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
      comments: computed(() => AppState.comments)
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
      async createComment(id) {
        try {
          await Notification.inputModal('Add a comment!', 'Comment here...')
          AppState.newPost.taskId = id
          await commentsService.createComment(AppState.newPost)
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      async deleteTask(id) {
        try {
          await tasksService.deleteTask(id)
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

</style>
