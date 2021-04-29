<template>
  <div class="board-component col-3 position-relative">
    <button type="button" class="btn btn-sm btn-outline-danger btn-size btn-overlay p-0">
      <i class="fas fa-times" @click="deleteBoard(boardProp.id)"></i>
    </button>
    <router-link :to="{ name: 'Board', params: { id:boardProp.id } }">
      <!-- ROUTER LINK WRAPPING BOARD -->
      <div class="row bg-light shadow m-3">
        <div class="col-12 text-center hover-light py-2">
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
.hover-light{
  color: var(--dark);
  transition: all .1s ease-in-out;
}
.hover-light:hover{
  color: var(--info);
}
</style>
