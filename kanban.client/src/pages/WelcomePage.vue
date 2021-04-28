<template>
  <div class="welcome-page flex-grow-1 d-flex flex-column">
    <div class="row justify-content-center" v-if="state.loading">
      <div class="col-12 text-center p-5 m-5">
        <h1><i class="fas fa-circle-notch fa-spin text-info"></i></h1>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-6 shadow text-center p-5 m-5" v-if="state.boards[0] == null">
        <h1>NO BOARDS!  GET STARTED!</h1>
        <button type="button" class="btn btn-lg btn-outline-info w-25 mx-auto my-5">
          CREATE BOARD
        </button>
      </div>
      <div class="col-10 mt-3" v-else>
        <div class="row justify-content-around" v-if="state.boards">
          <!-- NOTE BoardComponent is the name of the component page -->
          <!-- NOTE b is the bananna word for boards inside state.boards, and the key is bannana.id-->
          <!-- NOTE board-prop is the kabob cased translation of our boardProp inside BoardComponent-->
          <BoardComponent v-for="b in state.boards" :key="b.id" :board-prop="b">
            <!-- <div class="col-3 mt-4">
              <div class="row shadow m-3">
                <div class="col-12 text-center py-2">
                  <h3><u>BOARD TITLE</u></h3>
                  <img class="img-fluid mt-1 mb-2" src="http://www.fillmurray.com/300/300" alt="">
                </div>
              </div>
            </div>
            <div class="col-3 mt-4">
              <div class="row shadow m-3">
                <div class="col-12 text-center py-2">
                  <h3><u>BOARD TITLE</u></h3>
                  <img class="img-fluid mt-1 mb-2" src="http://www.fillmurray.com/300/300" alt="">
                </div>
              </div>
            </div>
            <div class="col-3 mt-4">
              <div class="row shadow m-3">
                <div class="col-12 text-center py-2">
                  <h3><u>BOARD TITLE</u></h3>
                  <img class="img-fluid mt-1 mb-2" src="http://www.fillmurray.com/300/300" alt="">
                </div>
              </div>
            </div>
            <div class="col-3 mt-4">
              <div class="row shadow m-3">
                <div class="col-12 text-center py-2">
                  <h3><u>BOARD TITLE</u></h3>
                  <img class="img-fluid mt-1 mb-2" src="http://www.fillmurray.com/300/300" alt="">
                </div>
              </div>
            </div> -->
            <!-- BOARD COMPONENTS DRAWS TO THE PAGE HERE -->
          </boardcomponent>
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
      newBoard: {},
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
