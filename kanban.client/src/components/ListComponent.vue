<template>
  <div class="list-component col-3 mt-4 position-relative">
    <button type="button" class="btn btn-sm btn-outline-danger delete-overlay m-0 p-0">
      <i class="fas fa-times" @click="deleteList(listProp.id)"></i>
    </button>
    <div class="row shadow m-3">
      <div class="col-12 text-center py-2" v-if="state.tasks">
        <h3>
          <u>{{ listProp.title }}</u>
        </h3>
        <!-- NOTE render taskComponent -->
        <TaskComponent v-for="t in state.tasks" :key="t.id" :task-prop="t" />
        <form @submit.prevent="createTask(listProp.id)">
          <div class="input group input-group">
            <div class="input-group-prepend">
              <button class="btn btn-outline-success px-2" type="submit">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <input type="text" class="form-control" placeholder="Create new task..." v-model="state.newPost.title">
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
      tasks: computed(() => AppState.tasks)
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
      async createTask(id) {
        try {
          state.newPost.listId = id
          await tasksService.createTask(state.newPost)
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      async deleteList(id) {
        try {
          await listsService.deleteList(id)
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
