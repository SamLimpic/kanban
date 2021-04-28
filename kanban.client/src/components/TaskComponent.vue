<template>
  <div class="task-component row">
    <!-- TASK DATA -->
    <div class="col-12 text-left position-relative" v-if="state.comments">
      <button type="button" class="btn btn-sm btn-outline-danger delete-overlay m-0 p-0">
        <i class="fas fa-times" @click="deleteTask(taskProp.id)"></i>
      </button>
      <h3>{{ taskProp.title }}</h3>
      <!-- Comment component renders here  -->
      <ul>
        <CommentComponent v-for="c in state.comments" :key="c.id" :comment-prop="c" />
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
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
