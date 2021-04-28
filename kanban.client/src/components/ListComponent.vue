<template>
  <div class="list-component col-3 mt-4 position-relative">
    <button type="button" class="btn btn-sm btn-outline-danger delete-overlay m-0 p-0">
      <i class="fas fa-times" @click="deleteList(listProp.id)"></i>
    </button>
    <div class="row shadow m-3">
      <div class="col-12 text-center py-2">
        <h3>
          <u>{{ listProp.title }}</u>
        </h3>
        <!-- NOTE render taskComponent -->

        <form @submit.prevent="createTask(listProp.id)">
          <div class="input group input-group">
            <div class="input-group-prepend">
              <button class="btn btn-outline-success px-2" type="submit">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <input type="text"
                   class="form-control"
                   placeholder="Create new task..."
                   minlength="3"
                   maxlength="20"
                   v-model="state.newPost.title"
            >
          </div>
        </form>
        <div v-if="state.activeTasks[0] != null">
          <TaskComponent v-for="t in state.activeTasks" :key="t.id" :task-prop="t" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
export default {
  name: 'ListComponent',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newPost: {},
      activeTasks: [],
      tasks: computed(() => AppState.tasks)
    })
    onMounted(async() => {
      try {
        await listsService.getTasksByListId(props.listProp.id)
        state.activeTasks = state.tasks
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createTask(id) {
        try {
          state.newPost.listId = id
          state.tasks = state.activeTasks
          await tasksService.createTask(state.newPost)
          state.activeTasks = state.tasks
          state.newPost = {}
          location.reload()
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      async deleteList(id) {
        try {
          state.tasks = state.activeTasks
          await listsService.deleteList(id)
          state.activeTasks = state.tasks
          location.reload()
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
