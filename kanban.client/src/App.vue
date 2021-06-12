<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view :key="$route.fullPath" />
  </main>
  <footer>
    <div class="bg-dark text-light text-center pt-4 pb-3">
      <h5>Made by <i class="fas fa-clipboard-check text-warning px-1"></i> Samaredonica Inc.</h5>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
