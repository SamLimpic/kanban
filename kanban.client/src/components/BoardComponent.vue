<template>
  <div class="board-component col-3 p-0 position-relative" v-if="state.account">
    <img class="img-icon icon-overlay my-auto" :src="state.account.picture" :title="(state.account.name).split('@')[0]">
    <button type="button" class="btn btn-sm btn-outline-danger btn-size btn-overlay p-0" title="Delete Board">
      <i class="fas fa-times" @click="deleteBoard(boardProp.id, boardProp.creatorId)"></i>
    </button>
    <router-link :to="{ name: 'Board', params: { id:boardProp.id } }">
      <!-- ROUTER LINK WRAPPING BOARD -->
      <div class="row bg-light shadow m-3">
        <div class="col-12 text-center hover-light" title="Navigate into Board">
          <h3><u>{{ boardProp.title }}</u></h3>
          <img class="img-fluid w-100 px-3 py-4" :src="boardProp.imgUrl" alt="" title="Mr. Bill Murray">
        </div>
      </div>
      <!-- ROUTER LINK WRAPPING BOARD -->
    </router-link>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { computed, reactive } from 'vue'

export default {
  name: 'BoardComponent',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteBoard(id, creatorId) {
        if (state.account.id !== creatorId) {
          Notification.toast("Denied! That's not yours!", 'danger')
        } else {
          if (await Notification.confirmAction()) {
            try {
              await boardsService.deleteBoard(id)
              Notification.toast('Deleted! ', 'error')
            } catch (error) {
              Notification.toast('Error: ' + error, 'error')
            }
          } else {
            Notification.toast('No worries!', 'success')
          }
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
