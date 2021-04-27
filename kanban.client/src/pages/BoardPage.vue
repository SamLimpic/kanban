<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
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
  name: 'BoardPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: {},
      lists: computed(() => AppState.lists),
      activeBoard: computed(() => AppState.activeBoard)
    })
    onMounted(async() => {
      try {
        await boardsService.getListsByBoardId(route.params.id)
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      state,
      async createList() {
        try {
          await listsService.createList(state.newList)
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
