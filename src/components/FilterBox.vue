<template>
  <div
    :class="`${filter} filter-item`"
    :style="`background-image:url(${img_url})`"
  ></div>
</template>

<script>
export default {
  name: "filterbox",
  props: {
    img_url: String,
    filter: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>