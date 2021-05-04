<template>
  <div>
    <Post
      v-for="(a, i) in post_inform"
      :key="i"
      v-bind:post_data="post_inform[i]"
    />
  </div>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Container",
  props: {
    post_inform: Array,
  },
  components: {
    Post: Post,
  },
};
</script>

<style>
</style>