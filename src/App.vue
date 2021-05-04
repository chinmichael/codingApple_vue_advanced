<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li>Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container v-bind:post_inform="post_inform" />

  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import { post_ref } from "./assets/post_ref.js"; //항상 default아닐때는 {} 바인딩 잊지마!!

export default {
  name: "App",
  data() {
    return {
      post_inform: post_ref,
    };
  },
  components: {
    Container: Container,
  },
};
</script>

<style>
@import "App.css"; /*이런식으로 외부 css파일로 축약도 가능 */
</style>

<!-- 5/4 : Vue 강의 새 프로젝트 시작 (당근 vue create project / vue3로 선택)
     
     언제나 미리 기획부터 짜고 코드를 짜는게 좋다 / 이번 유사 인스타의 경우 App.vue에 상단메뉴, 하단메뉴 > Container.vue(post,upload,mypage등 컴포넌트 전환이 이뤄지는 곳) > Post.vue 들로 구성할 예정이라고 함
     
     컴포넌트 생성 : 언제나 의도를 미리 생각하고 생성해야함 > 주로 재사용이 되는 UI를 짜도록 한다 or 라우터로 나눌 페이지 or HTML이 너무 복잡해질 경우 > 이 세가지 경우가 아니라면 복잡도만 괜히 높아질 뿐임

-->