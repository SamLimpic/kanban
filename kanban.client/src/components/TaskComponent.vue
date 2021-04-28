<template>
  <div class="task-component row">
    <!-- TASK DATA -->
    <div class="col-12">
      <h1>I'M HERE!</h1>
      <h3>{{ taskProp.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskComponent',
  props: {
    taskProp: {
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
