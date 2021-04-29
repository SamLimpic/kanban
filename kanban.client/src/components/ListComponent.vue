<template>
  <div class="list-component col-3 mt-4 position-relative">
    <button type="button" class="btn btn-sm btn-outline-danger btn-size btn-overlay p-0">
      <i class="fas fa-times" @click="deleteList(listProp.boardId, listProp.id)"></i>
    </button>
    <div class="row bg-light shadow bg-light m-3">
      <div class="col-12 text-center bg-secondary py-2">
        <h3>
          <u>{{ listProp.title }}</u>
        </h3>
      </div>
      <div class="col-12 p-2 px-3">
        <!-- NOTE render taskComponent -->
        <TaskComponent v-for="t in state.tasks" :key="t.id" :task-prop="t" />
        <form @submit.prevent="createTask(listProp.id)">
          <div class="input group input-group input-group-sm pb-2 pt-3 w-75 mx-auto">
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
      tasks: computed(() => AppState.tasks[props.listProp.id])
    })
    onMounted(async() => {
      try {
        await listsService.getTasksByListId(props.listProp.id)
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createTask(listId) {
        try {
          state.newPost.listId = listId
          await tasksService.createTask(listId, state.newPost)
          state.newPost = {}
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      async deleteList(boardId, listId) {
        try {
          await listsService.deleteList(boardId, listId)
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
