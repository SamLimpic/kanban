<template>
  <div class="home-page flex-grow-1 row align-items-center justify-content-center">
    <div class="col-12 p-5" v-if="user.isAuthenticated && !state.loading">
      <div class="row justify-content-center" v-if="state.boards[0] == null">
        <div class="col-8 card shadow">
          <h1>NO BOARDS!  GET STARTED!</h1>
          <button type="button" class="btn btn-outline-info mx-auto" @click="createBoard()">
            CREATE BOARD
          </button>
        </div>
      </div>
      <div class="row justify-content-around" v-else>
        <!-- BOARD COMPONENTS DRAWS TO THE PAGE HERE -->
      </div>
    </div>
    <div class="col-8 card shadow text-center" v-if="!user.isAuthenticated && !state.loading">
      <h1>LOG IN YA B*</h1>
    </div>
    <div class="col-12 text-center p-5" v-else>
      <h1><i class="fas fa-circle-notch fa-spin text-info"></i></h1>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'

export default {
  name: 'HomePage',
  setup() {
    const state = reactive({
      loading: true,
      newBoard: {},
      boards: computed(() => AppState.boards)
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
      user: computed(() => AppState.user),
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
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
