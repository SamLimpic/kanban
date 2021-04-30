<template>
  <div class="board-page container">
    <div class="row justify-content-center mb-2">
      <div class="col-12" v-if="!state.loading && state.activeBoard">
        <div class="row justify-content-center">
          <div class="col-md-6 col-10 bg-light shadow p-3 m-md-4 my-md-3 my-3 mt-4 text-center">
            <h1>Current Board: <u>{{ state.activeBoard.title }}</u></h1>
            <button type="button" class="btn btn-lg btn-dark mt-3 mb-2" @click="createList()" title="Create List">
              CREATE LIST
            </button>
          </div>
        </div>

        <div class="row justify-content-center" v-if="state.lists[0] != null">
          <!-- LIST COMPONENTS DRAWS TO THE PAGE HERE -->
          <ListComponent v-for="l in state.lists" :key="l.id" :list-prop="l" />
        </div>
      </div>
      <div class="col-12 text-center  p-3 m-md-4 my-md-3 my-4" v-else>
        <h1><i class="fas fa-circle-notch fa-spin text-info"></i></h1>
      </div>
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
      boardId: route.params.id,
      loading: true,
      newList: {},
      // ANCHOR THE BIG CHANGE: specific lists are now values inside the global 'lists' object in the Appstate.
      // ANCHOR those values are keyed to the id of it's parent object (in this case list = boardId)
      lists: computed(() => AppState.lists[state.boardId]),
      activeBoard: computed(() => AppState.activeBoard)
    })
    // NOTE changing what was a computed global variabe to a computed section of the variable that only changes when this specific board changes
    // NOTE those changes are tied to the id of this specific board - the lists are noew being defined by thier parent's Ids
    // NOTE they will only be modified on a local level (parent container!)
    // LINK   lists: {
    //          ${boardId}: computed list,
    //          Another ${boardId}: another board's computed list
    //        }
    onMounted(async() => {
      try {
        await boardsService.getListsByBoardId(state.boardId)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
      try {
        await boardsService.getBoardById(state.boardId)
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createList() {
        try {
          await Notification.inputModal('Name your List!', 'List name here...')
          if (AppState.newPost.length > 20) {
            Notification.toast(`That's ${AppState.newPost.length - 20} too many characters!`, 'error')
          } else {
            AppState.newPost.boardId = state.boardId
            await listsService.createList(state.boardId, AppState.newPost)
          }
        } catch (error) {
          Notification.toast('Error: ', error, 'error')
        }
      },
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
