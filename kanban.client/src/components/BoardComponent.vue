<template>
  <div class="board-component col-3 mt-4 position-relative">
    <button type="button" class="btn btn-sm btn-outline-danger delete-overlay m-0 p-0">
      <i class="fas fa-times" @click="deleteBoard(boardProp.id)"></i>
    </button>
    <router-link :to="{name:'Board', params:{id:boardProp.id}}">
      <!-- ROUTER LINK WRAPPING BOARD -->
      <div class="row shadow m-3">
        <div class="col-12 text-center py-2">
          <h3><u>{{ boardProp.title }}</u></h3>
          <img class="img-fluid mt-1 mb-2" :src="boardProp.imgUrl" alt="">
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
  setup() {
    return {
      async deleteBoard(id) {
        try {
          await boardsService.deleteBoard(id)
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
    top: 1.5rem;
    right: 2.5rem;
    height: 1.5rem;
    width: 1.5rem;
    z-index: 10;
  }
</style>
