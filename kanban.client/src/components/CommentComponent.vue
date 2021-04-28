<template>
  <li class="comment-component">
    <h5>{{ commentProp.title }}</h5>
  </li>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
