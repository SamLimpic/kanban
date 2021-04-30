<template>
  <div class="task-component row position-relative" v-if="state.comments">
    <!-- TASK DATA -->
    <div class="col-2">
      <div class="dropdown">
        <button class="btn btn-transparent"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                title="Comments Dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          <i class="far fa-comment-dots text-info fa-2" v-if="state.comments[0]"></i>
          <i class="far fa-comment-dots fa-2" v-else></i>
        </button>
        <div class="dropdown-menu bg-secondary py-0" aria-labelledby="dropdownMenuButton">
          <CommentComponent v-for="c in state.comments" :key="c.id" :comment-prop="c" />
          <div class="dropdown-divider p-0 m-0"></div>
          <button type="button" class="btn btn-warning w-100 p-0 m-0" title="Add Comment" @click="createComment(taskProp.id)">
            Add comment
          </button>
        </div>
      </div>
    </div>
    <div class="col-8 text-left p-0 pl-2 pb-1 my-auto" v-if="state.comments" draggable="true" @dragstart="moveTask">
      <h6 class="m-0 pl-2">
        {{ taskProp.title }}
      </h6>
    </div>
    <!-- <div class="col-2 my-auto">
      <button type="button" class="btn btn-sm btn-outline-success btn-size p-0" title="Create Comment">
        <i class="fas fa-plus" @click="createComment(taskProp.id)"></i>
      </button>
    </div> -->
    <div class="col-2 my-auto">
      <button type="button" class="btn btn-sm btn-outline-danger btn-task btn-task-overlay p-0" title="Delete Task">
        <i class="fas fa-times" @click="deleteTask(taskProp.listId, taskProp.id, taskProp.creatorId)"></i>
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
      moveTask() {
        tasksService.setTaskToMove(props.taskProp)
      },
      async createComment(taskId) {
        try {
          await Notification.inputModal('Add a comment!', 'Comment here...')
          if (AppState.newPost.title.length > 20) {
            Notification.toast(`That's ${AppState.newPost.title.length - 20} too many characters!`, 'error')
          } else {
            AppState.newPost.taskId = taskId
            await commentsService.createComment(taskId, AppState.newPost)
          }
        } catch (error) {
          Notification.toast('Input cancelled!', 'warning')
        }
      },
      async deleteTask(listId, taskId, creatorId) {
        if (AppState.account.id !== creatorId) {
          Notification.toast("Denied! That's not yours!", 'error')
        } else {
          if (await Notification.confirmAction()) {
            try {
              await tasksService.deleteTask(listId, taskId)
              Notification.toast('Deleted!', 'warning')
            } catch (error) {
              Notification.toast('Input cancelled!', 'warning')
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
