<template>
  <header class="container-fluid">
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view :key="$route.fullPath" />
  </main>
  <footer class="container-fluid">
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
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
