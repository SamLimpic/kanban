<template>
  <div class="home flex-grow-1 row align-items-center justify-content-center">
    <div class="col-12 text-center card shadow" v-if="user.isAuthenticated">
      <div class="row justify-content-center" v-if="state.boards[0] == null">
        <div class="col-8">
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
    <div class="col-8 card shadow" v-else>
      <h1>LOG IN YA B*</h1>
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
      newBoard: {},
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
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
