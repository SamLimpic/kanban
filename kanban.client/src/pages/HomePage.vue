<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div class="col-6 shadow bg-light text-center py-4 my-5">
        <h1>Welcome to Board Murray!</h1>
        <img class="img-fluid my-4" src="http://www.fillmurray.com/400/400" alt="" title="Mr. Bill Murray">
        <div class="row justify-content-center">
          <div class="col-4">
            <router-link :to="{name: 'Welcome'}">
              <button type="button" class="btn btn-lg btn-info mx-auto text-light my-2" title="View Boards">
                VIEW YOUR BOARDS
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-6 shadow bg-light text-center py-4 my-5">
        <h1>LOG IN TO VIEW YOUR BOARDS</h1>
        <!-- <img class="img-fluid my-4" src="http://www.fillmurray.com/400/400" alt="" title="Mr. Bill Murray"> -->
        <div class="col-12 text-center my-4">
          <h1><i class="fas fa-clipboard-check fa-spin px-1 text-info"></i></h1>
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
