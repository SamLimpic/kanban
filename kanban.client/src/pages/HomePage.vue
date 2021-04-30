<template>
  <div class="home container">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div class="col-md-6 col-10 shadow bg-light text-center p-3 m-md-4 my-md-3 my-4">
        <h1>Welcome to Bill Boards!</h1>
        <img class="img-fluid m-md-3 m-0" src="http://www.fillmurray.com/300/300" alt="" title="Mr. Bill Murray">
        <div class="row justify-content-center">
          <div class="col-md-6 col-10">
            <router-link :to="{name: 'Welcome'}">
              <button type="button" class="btn btn-lg btn-info mx-auto text-light mt-md-2 mt-3 mb-md-2" title="View Boards">
                VIEW YOUR BOARDS
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-md-6 col-10 shadow bg-light text-center p-3 m-md-4 my-md-3 my-4">
        <h1>Log in to view your Bill Boards</h1>
        <!-- <img class="img-fluid my-4" src="http://www.fillmurray.com/400/400" alt="" title="Mr. Bill Murray"> -->
        <div class="col-12 text-center m-md-4 my-4 m-0">
          <h1><i class="fas fa-clipboard-check fa-spin text-info"></i></h1>
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
