<template>
  <div class="list-component">
    <div class="col-3 mt-4">
      <div class="row shadow m-3">
        <div class="col-12 text-center py-2" v-if="state.tasks">
          <h3><u>{{ listProp.title }}</u></h3>
          <!-- NOTE render taskComponent -->
          <TaskComponent v-for="t in state.tasks" :key="t.id" :task-prop="t" />
        </div>
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
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
