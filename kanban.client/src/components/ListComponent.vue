<template>
  <div class="list-component col-3 mt-4 position-relative">
    <button type="button" class="btn btn-sm btn-outline-danger delete-overlay m-0 p-0">
      <i class="fas fa-times" @click="deleteBoard(Prop.id)"></i>
    </button>
    <div class="row shadow m-3">
      <div class="col-12 text-center py-2" v-if="state.tasks">
        <h3>
          <u>{{ listProp.title }}</u>
        </h3>
        <!-- NOTE render taskComponent -->
        <TaskComponent v-for="t in state.tasks" :key="t.id" :task-prop="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
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
