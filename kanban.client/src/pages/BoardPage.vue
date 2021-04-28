<template>
  <div class="board-page flex-grow-1 row align-items-center justify-content-center">
    <div class="col-12 p-5" v-if="!state.loading">
      <div class="row justify-content-center" v-if="state.lists[0] == null">
        <div class="col-8 shadow m-3">
          <h1>NO LISTS AVAILABLE</h1>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <!-- LIST COMPONENTS DRAWS TO THE PAGE HERE -->
      </div>
    </div>
    <div class="col-12 text-center p-5" v-else>
      <h1><i class="fas fa-circle-notch fa-spin text-info"></i></h1>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import Notification from '../utils/Notification'
export default {
  name: 'Board',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newList: {},
      lists: computed(() => AppState.lists),
      activeBoard: computed(() => AppState.activeBoard)
    })
    onMounted(async() => {
      try {
        await boardsService.getListsByBoardId(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createList() {
        try {
          await listsService.createList(state.newList)
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
