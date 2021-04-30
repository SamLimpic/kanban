<template>
  <div class="list-component col-md-3 col-10 m-3" v-if="state.account != null">
    <div class="row bg-light shadow bg-light position-relative">
      <button type="button" class="btn btn-sm btn-outline-success btn-size icon-overlay p-0" title="Add Task">
        <i class="fas fa-plus" @click="createTask(listProp.id)"></i>
      </button>
      <button type="button" class="btn btn-sm btn-outline-danger btn-size btn-overlay p-0" title="Delete List">
        <i class="fas fa-times" @click="deleteList(listProp.boardId, listProp.id, listProp.creatorId)"></i>
      </button>
      <div class="col-12 text-center bg-secondary pt-2 pb-3">
        <h4 class="m-0 pt-1 px-3 mx-3">
          <u>{{ listProp.title }}</u>
        </h4>
      </div>

      <div class="col-12 p-3" dropzone="zone" @dragover.prevent @drop.prevent="moveTask">
        <!-- NOTE render taskComponent -->
        <TaskComponent v-for="t in state.tasks" :key="t.id" :task-prop="t" />
        <!-- <form @submit.prevent="createTask(listProp.id)">
          <div class="input group input-group input-group-sm pt-4 pb-2 px-3 mx-auto">
            <div class="input-group-prepend">
              <button class="btn btn-outline-success px-2" type="submit" title="Create Task">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <input type="text"
                   class="form-control"
                   placeholder="Create new task..."
                   minlength="3"
                   maxlength="20"
                   required
                   v-model="state.newPost.title"
            >
          </div>
        </form> -->
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
      tasks: computed(() => AppState.tasks[props.listProp.id]),
      activeTask: computed(() => AppState.activeTask),
      account: computed(() => AppState.account)
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
      async moveTask() {
        try {
          await tasksService.moveTask(state.activeTask, props.listProp.id)
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      async createTask(listId) {
        try {
          await Notification.inputModal('Add a task!', 'Task name here...')
          if (AppState.newPost.title.length > 20) {
            Notification.toast(`That's ${AppState.newPost.title.length - 20} too many characters!`, 'error')
          } else {
            AppState.newPost.listId = listId
            await tasksService.createTask(listId, AppState.newPost)
          }
        } catch (error) {
          Notification.toast('Input cancelled!', 'warning')
        }
      },
      async deleteList(boardId, listId, creatorId) {
        if (AppState.account.id !== creatorId) {
          Notification.toast("Denied! That's not yours!", 'danger')
        } else {
          if (await Notification.confirmAction()) {
            try {
              await listsService.deleteList(boardId, listId)
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
