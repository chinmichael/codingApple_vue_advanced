<template>
  <div class="post">
    <div class="post-header">
      <div
        class="profile"
        :stlye="{ backgroundImage: 'url(' + post_data.postImage + ')' }"
      ></div>
      <span class="profile-name">{{ post_data.name }}</span>
    </div>

    <div
      class="post-body"
      :style="{ backgroundImage: 'url(' + post_data.postImage + ')' }"
    ></div>

    <div class="post-content">
      <p>Likes {{ post_data.likes }}</p>
      <p>
        <strong>{{ post_data.name }}</strong> {{ post_data.content }}
      </p>
      <p class="date">{{ post_data.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post_data: Object,
  },
};
</script>

<style>
@import "Post.css";
</style>

<!-- 5/4
     
     1. 다중 props (상위 C > 하위 C > 하위의 하위C) : 그냥 연속적으로 v-bind후 props 문법을 반복하면 된다
     (아놔 최상위에서 import할때 {}바인딩 주의하자...ㅠ 내 한시간)

     2.style 바인딩 : 똑같이 v-bind:style="{styleType : 변수}"
                     >> 주의할 점은 기존 스타일타입의 '-'처리는 Camel표기가 됨
                     >> 두번째로 기존 바인딩처럼 문자열쪽은 'url('+ 변수 +')'처럼 문자열 합치기로 들어가야함

-->