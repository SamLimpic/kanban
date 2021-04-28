<template>
  <div class="board-component col-3 mt-4">
    <router-link :to="{name:'Board', params:{id:boardProp.id}}">
      <!-- ROUTER LINK WRAPPING BOARD -->
      <div class="row shadow m-3">
        <div class="col-12 py-2 position-relative">
          <h3 class="text-right m-0 p-0">
            <i class="fas fa-times text-danger" @click="deleteBoard"></i>
          </h3>
          <div class="text-center">
            <h3><u>{{ boardProp.title }}</u></h3>
            <img class="img-fluid mt-1 mb-2" :src="boardProp.imgUrl" alt="">
          </div>
        </div>
      </div>
      <!-- ROUTER LINK WRAPPING BOARD -->
    </router-link>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'

export default {
  name: 'BoardComponent',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteBoard() {
        try {
          await boardsService.deleteBoard(props.board.id)
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
  .delete-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 3rem;
  }
</style>
