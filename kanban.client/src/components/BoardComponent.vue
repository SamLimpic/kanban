<template>
  <div class="board-component col-3 mt-4">
    <router-link :to="{name:'Board', params:{id:boardProp.id}}">
      <!-- ROUTER LINK WRAPPING BOARD -->
      <div class="row shadow m-3">
        <div class="col-12 text-center py-2">
          <h3><u>{{ boardProp.title }}</u></h3>
          <img class="img-fluid mt-1 mb-2" :src="boardProp.imgUrl" alt="">
        </div>
      </div>
      <!-- ROUTER LINK WRAPPING BOARD -->
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  props: {
    boardProp: {
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
