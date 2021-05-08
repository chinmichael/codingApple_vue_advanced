<template>
  <div>
    <button @click="$emit('tab_change', 0)">포스팅</button>
    <button @click="$emit('tab_change', 1)">이미지 필터적용</button>
    <button @click="$emit('tab_change', 2)">상세글 작성</button>

    <div v-if="tab_state == 0">
      <Post
        v-for="(a, i) in post_inform"
        :key="i"
        v-bind:post_data="post_inform[i]"
      />
    </div>
  </div>
  <!--안좋은 관습이기에 v-if와 v-for을 한 태그안에 다 넣지 못함-->

  <!--필터 선택 페이지-->
  <div
    class="upload-image"
    :style="{ backgroundImage: `url(${img_url})` }"
    v-if="tab_state == 1 || tab_state == 2"
  ></div>
  <div class="filters" v-if="tab_state == 1">
    <div class="filter-1"></div>
    <div class="filter-1"></div>
    <div class="filter-1"></div>
    <div class="filter-1"></div>
    <div class="filter-1"></div>
  </div>

  <!--글 작성 페이지-->
  <!-- <div class="upload-image"></div> -->
  <div class="write" v-if="tab_state == 2">
    <textarea class="write-box">write!</textarea>
  </div>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Container",
  props: {
    post_inform: Array,
    tab_state: Number,
    img_url: String,
  },
  components: {
    Post: Post,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover; /*이미지가 찌그러지지 않은 한도내에서 제일 크게 + 가로세로비가 요소와 다르다면 이미지를 가로 또는 세로로 잘라 빈공간을 제거*/
}
.filters {
  overflow-x: scroll;
  white-space: nowrap; /*스페이스,탭,줄바꿈,자동줄바꿈 처리에 대한 속성 : https://www.codingfactory.net/10597*/
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  /*크롬 사파리 등 웹킷엔진에서 스크롤바 스타일을 바꾸기 위함 */
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>

<!-- 5/7 : Tab UI 제작 : 각각의 버튼을 누르면 해당 div의 내용물을 보여주는 것
     
     > UI 만들기는 언제나 state 데이터 만들고 / 상태에 따라 HTML이 어떻게 보일지

     > 앞으로 만들 이미지 업록드 페이지 (이미지 필터 입히기 + 글 입력) 등 페이지 나눌때 필요
     > 페이지를 나눌때 1. vue-router(주로 뒤로가기 등이 필요한 때라던가) 2.tab UI(간단한 경우) 등 상황에 따라 간결하고 효율적인걸 고르면 됨

     > state data를 상위 컴포넌트에 뒀을 때 : 뭐 emit으로 메시지 주는거지머(복습)
     > emit으로 메시지 보내는법 이벤트바인딩에 $emit('메시지명', 데이터);으로 넣어주고
       상위 컴포넌트에서 @메시지명 = "해야할 이벤트"로 처리 + 가져온 데이터는 $event 안에 있다
-->

<!-- 웹킷엔진 스크롤바 스타일
https://webisfree.com/2019-01-08/css-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%8A%A4%ED%81%AC%EB%A1%A4%EB%B0%94-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%A7%80%EC%A0%95-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B0%A9%EB%B2%95-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0

::-webkit-scrollbar
::-webkit-scrollbar-button
::-webkit-scrollbar-button:start
::-webkit-scrollbar-button:end
::-webkit-scrollbar-button:vertical:increment
::-webkit-scrollbar-button:vertical:decrement
::-webkit-scrollbar-track // 경로
::-webkit-scrollbar-track-piece // 남는 경로
::-webkit-scrollbar-thumb // 실제 집는 부분
::-webkit-scrollbar-corner
::-webkit-resizer

-->