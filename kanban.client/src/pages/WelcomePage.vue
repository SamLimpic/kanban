<template>
  <div class="welcome-page container">
    <div class="row justify-content-center" v-if="state.loading">
      <div class="col-12 text-center p-3 m-md-4 my-md-3 my-4">
        <h1><i class="fas fa-clipboard-check fa-spin text-warning"></i></h1>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-md-6 col-10 shadow bg-light text-center p-3 m-md-4 my-md-3 my-4" v-if="state.boards[0] == null">
        <h1>You don't have any Bill Boards!</h1>
        <button type="button" class="btn btn-lg btn-primary text-light w-25 mx-auto my-2" @click="createBoard" title="Create Board">
          CREATE BOARD
        </button>
      </div>
      <div class="col-12 mb-4" v-else>
        <div class="row justify-content-center">
          <div class="col-md-6 col-10 bg-light shadow text-center p-3 m-md-4 my-md-3 my-4">
            <h1>Here are your Bill Boards!</h1>
            <button type="button" class="btn btn-lg btn-primary text-light mt-3 mb-2" @click="createBoard" title="Create Board">
              CREATE BOARD
            </button>
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- NOTE BoardComponent is the name of the component page -->
          <!-- NOTE b is the bananna word for boards inside state.boards, and the key is bannana.id-->
          <!-- NOTE board-prop is the kabob cased translation of our boardProp inside BoardComponent-->
          <BoardComponent v-for="b in state.boards" :key="b.id" :board-prop="b" />
          <!-- BOARD COMPONENTS DRAWS TO THE PAGE HERE -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'

export default {
  name: 'Welcome',
  setup() {
    const state = reactive({
      loading: true,
      boards: computed(() => AppState.boards),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createBoard() {
        try {
          await Notification.inputModal('Name your Board!', 'Board name here...')
          await boardsService.createBoard(AppState.newPost)
        } catch (error) {
          Notification.toast('Input cancelled!', 'warning')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
