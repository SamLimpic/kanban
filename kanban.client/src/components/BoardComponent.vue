<template>
  <div class="board-component col-3">
    <!-- ROUTER LINK WRAPPING BOARD -->
    <div class="card shadow m-3 p-3">
      <!-- BOARD DATA -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  props: {
    boardProps: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
