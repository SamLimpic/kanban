<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div class="col-6 shadow text-center p-5 m-5">
        <h1>WELCOME TO KANBAN</h1>
        <router-link :to="{name: 'Welcome'}">
          <button type="button" class="btn btn-lg btn-outline-info w-25 mx-auto my-5">
            VIEW YOUR BOARDS
          </button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-6 shadow text-center p-5 m-5">
        <h1>LOG IN TO VIEW YOUR BOARDS</h1>
        <div class="col-12 text-center p-5">
          <h1><i class="fas fa-circle-notch fa-spin text-info"></i></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style>

</style>
