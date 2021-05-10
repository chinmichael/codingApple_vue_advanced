<template>
  <div>
    <!-- <button @click="$emit('tab_change', 0)">포스팅</button>
    <button @click="$emit('tab_change', 1)">이미지 필터적용</button>
    <button @click="$emit('tab_change', 2)">상세글 작성</button> -->

    <div v-if="tab_state == 0">
      <Post
        v-for="(a, i) in post_inform"
        :key="i"
        v-bind:post_data="post_inform[i]"
      />
    </div>

    <!--안좋은 관습이기에 v-if와 v-for을 한 태그안에 다 넣지 못함-->

    <!--와... emit error 한방 해결... 같은 div 안에 있지 않아서 였어... 적절한 질문은 매우 효율이 좋습니다...-->

    <!--필터 선택 페이지-->
    <div
      class="upload-image"
      :style="`background-image:url(${img_url})`"
      v-if="tab_state == 1 || tab_state == 2"
    ></div>
    <!--style 바인딩을 문자열로 할 경우 Camel임 아님-->
    <div class="filters" v-if="tab_state == 1">
      <!-- <div class="filter-1"></div>
      <div class="filter-1"></div>
      <div class="filter-1"></div>
      <div class="filter-1"></div> -->
      <FilterBox
        v-for="(a, i) in filter_list"
        :key="i"
        v-bind:filter="a"
        v-bind:img_url="img_url"
      ></FilterBox>
    </div>

    <!--글 작성 페이지-->
    <!-- <div class="upload-image"></div> -->
    <div class="write" v-if="tab_state == 2">
      <textarea
        @input="$emit('text_change', $event.target.value)"
        class="write-box"
        placeholder="write!"
      ></textarea>
    </div>

    <!--5/10 : 글 발행 기능
        코딩은 무엇을 할 지 명확히 정의하고 가야한다

        여기서는 <Post>를 하나 더 생성해야하는것 >> 생성자체는 데이터를 기준으로 Vue가 알아서 랜더링하며 추가하므로 >> 데이터를 추가해야함

        >> 참조하는 Object Array 데이터에 Object를 하나 더 추가한다

        ※basic때 했던 form 바인딩 재복습!!

          - input에서의 이벤트 핸들러 >> @input(입력할 때마다) @onChange(입력이 끝나고 다른 행동을 취할 때) @change(이거 파일때 해보니 내용 변경시마다인듯)

          - custom event처럼 여기서도 $event 사용 가능하다 이는 JS 이벤트 리스너에서 e와 동일하게 사용되는 이벤트정보를 담은 변수라고 생각

          - v-model="data"은 사실  @input="data=$event.target.value" 일종의 축약버전이라고 생각하면 됨


        unshift함수도 그렇지만
        같은 이미지 연속 업데이트를 위해 개인적으로 추가한
        e.target.value = "";
        // @change는 변경시 처리되는거라 같은 이미지를 연속 올릴경우 인식을 못하니 초기화 시켜야함
        // 근데 e.target.files=""를 하면 당빠 타입 에러가 발생하므로 e.target.value로 초기화시켜주자
        이 부분 주의하자 (App.vue의 upload 메서드 파트)
    -->
  </div>
</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import { filter_list } from "../assets/filter_list.js";

export default {
  name: "Container",
  data() {
    return {
      filter_list: filter_list,
    };
  },
  props: {
    post_inform: Array,
    tab_state: Number,
    img_url: String,
  },
  components: {
    Post: Post,
    FilterBox,
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
  height: 10px;
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

<!--5/10: 필터기능 추가

    cssgram.css : 인스타필터 기능을 쓸 수 있는 css라이브러리

    파일 설치 후 img class="필터명" 클래스에 필터명 넣는 것으로 필터효과 적용가능

    파일 설치는 실제 메인 페이지(index.html)에 첨부시키면 됨

    만약 포스팅한 글에도 적용시키려면 포스트 Object에 filter명 저장하는 key가 있으니 여기 저장한 걸 클래스에 붙여넣을수 있도록 하면 되겠지

-->