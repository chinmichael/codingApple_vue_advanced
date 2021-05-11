<template>
  <div class="post">
    <div class="post-header">
      <div
        class="profile"
        :stlye="{ backgroundImage: 'url(' + post_data.postImage + ')' }"
      ></div>
      <!--v-bind:style="" 안에는 일종의 js문법 공간 따라서 변수 + 문자열은 변수 + '문자열'처리-->
      <span class="profile-name">{{ post_data.name }}</span>
    </div>

    <div
      :class="`post-body ${post_data.filter}`"
      :style="{ backgroundImage: `url(${post_data.postImage})` }"
    ></div>
    <!--'가 아니라 `임을 주의-->

    <div class="post-content">
      <p>{{ post_data.likes }} Likes</p>
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
     
     1. 다중 props (상위 C > 하위 C > 하위의 하위C) : 그냥 연속적으로 v-bind후 props 문법을 반복하면 된다 (단계를 뛰어넘어 전송하는 방법도 물론 있음. 나중에)
     (아놔 최상위에서 import할때 {}바인딩 주의하자...ㅠ 내 한시간)

     2.style 바인딩 : 똑같이 v-bind:style="{styleType : 변수}" (object형으로) 그냥 styleType : '값' >> 그냥 값 넣을때는 ''문자로
                     >> 주의할 점은 기존 스타일타입의 '-'처리는 CamelCase가 됨(바인딩시 JS코드 인식으로 되야하므로 -를 못쓴다)
                     >> 두번째로 기존 바인딩처럼 문자열쪽은 'url('+ 변수 +')'처럼 문자열 합치기로 들어가야함
                     >> or JS 문자열 중간에 변수넣는법은 위처럼 잘라서 +로 붙이기랑 또 하나는 `문자${변수}문자`가 있다(es6신문법) >> 이때 '가 아니라 `(백틱)임을 주의!!

-->