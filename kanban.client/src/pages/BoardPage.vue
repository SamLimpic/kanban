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
import Notification from '../utils/Notification'
export default {
  name: 'BoardPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBoard: computed(() => AppState.activeBoard),
      activeList: computed(() => AppState.activeList),
      activeTask: computed(() => AppState.activeTask),
      activeComment: computed(() => AppState.activeComment),
      lists: computed(() => AppState.lists)
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
