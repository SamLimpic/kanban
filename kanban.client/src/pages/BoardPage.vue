<template>
  <div class="board-page flex-grow-1 d-flex flex-column">
    <div class="row justify-content-center" v-if="!state.loading">
      <div class="col-6 shadow text-center p-5 m-5" v-if="state.lists[0] == null">
        <h1>NO LISTS AVAILABLE</h1>
        <button type="button" class="btn btn-lg btn-outline-info w-25 mx-auto my-5" @click="createList">
          CREATE LIST
        </button>
      </div>
      <div class="col-12" v-else>
        <div class="row justify-content-around" v-if="state.lists">
          <!-- LIST COMPONENTS DRAWS TO THE PAGE HERE -->
          <ListComponent v-for="l in state.lists" :key="l.id" :list-prop="l" />
        </div>
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
          await Notification.inputModal('Name your List!', 'List name here...')
          await listsService.createList(AppState.newPost)
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
