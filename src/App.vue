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

  <Container
    v-bind:post_inform="post_inform"
    v-bind:tab_state="tab_state"
    @tabChange="tab_state = $event"
  />
  <button @click="morePost">더보기</button>

  <!-- tab 연습 :  <div v-if="tab_state == 1">내용1</div>
  <div v-if="tab_state == 2">내용2</div>
  <div v-if="tab_state == 3">내용3</div>
  <button @click="tab_state = 1">버튼1</button>
  <button @click="tab_state = 2">버튼2</button>
  <button @click="tab_state = 3">버튼3</button> -->

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

import axios from "axios"; //Ajax 요청할 곳에

export default {
  name: "App",
  data() {
    return {
      post_inform: post_ref,
      click_num: 0,
      tab_state: 0, // App.vue에서도 조작할 가능성이 있으므로 이럴때는 그냥 App.vue에 둔다
    };
  },
  components: {
    Container: Container,
  },
  methods: {
    /*morePost() {
      axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((result) => {
          //function도 되지만 arrow function이 낫다 왜냐하면 가져온 데이터를 data()에 넣을때 this를 사용함에 있어 익명함수가 상위객체를 올바르게 가르키기 때문에
          //일반 function은 this가 재정의됨
          //함수안에 함수 콜백함수
          console.log(result.data);
          this.post_inform.push(result.data); //push()함수가 js에서 Array에 데이터 추가하는 방법
        })
        .catch((err) => {
          // err는 에러메시지가 담긴 변수
          //실패시(서버나 url코드 등 문제)로 실행됨
          console.log(err);
        });
    },*/

    //과제로 수정
    morePost() {
      //let cnt = this.click_num;
      axios
        .get(`https://codingapple1.github.io/vue/more${this.click_num}.json`)
        .then((result) => {
          this.post_inform.push(result.data);
          this.click_num++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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

<!-- 5/5 : 서버와 ajax > axios이용

     서버는 그냥 간단하게 생각하면 요청한 데이터를 처리해서 보내주는 프로그램(특히 요즘은 API형태로 자주 짜니까)이라 보면 편하다. (물론 나는 좀 세세히 따져야겠지만 / 내가 스프링부트로 짜는거)

     서버에 데이터 요청은 Ajax를 통해 서버가 정해놓은 URL로
     GET(데이터 가져오기 요청) / POST(데이터 보낼때) 요청으로 >> 요즘은 기본 HTTP 메서드 GET(데이터 가져오기) / POST(데이터 생성쓰기) / PUT(데이터 수정) / DELETE(데이터 삭제) 요청 다 씀
     
     기존 url, form요청은 브라우저 전체가 새로고침됨(동기통신이라 모든 요청이 처리되고 한번에 움직임) Ajax는 필요한 요소만 새로고침된다 (검색창 자동완성 생각)
     Ajax(비동기통신) 요청은 호환성 문제로 JS기본 함수인 fetch보다 axios 라이브러리 자주 씀(npm install axios)
     fetch api >> fetch는 브라우저 기본기능인데 최신 브라우저정도만 가능해 axios사용 (사용방법은 거의 유사하다)

     GET의 경우
     axios.get('url').then(결과=>{ // 요청해서 받아온 데이터는 저 '결과' 파라미터 변수에 담겨있음
       GET요청 성공시 실행코드
     }).catch(()=>{
       요청 실패시 실행코드
     });

     콜백함수 : 이름대로 나중에 호출되는 함수 : 어떤 이벤트가 발생하거나 특정 시점에 도달했을때 시스템에서 호출되는 함수 (js핸들러 함수같은것들)

     POST의 경우
     axios.post('url', 'data').then(결과 => { // data는 문자열, object 다 가능하다

     }).catch(()=>{

     }); 

     >>머 마찬가지로 put(), delete()가 있겠지 사용방법은 필요할때 찾아보자 일단 지금 angular로 더 해야하고....ㅠ

     vue는 프론트엔드 프레임워크 라이브러리 >> 웹 프론트엔드의 목표는 DB에서 송수신해 백엔드 서버에서 처리한 데이터를 클라이언트 환경에 송수신해 보여주는것 >> 데이터 중심적으로 개발하자
-->

<!-- 5/7 : Tab UI 제작 : 각각의 버튼을 누르면 해당 div의 내용물을 보여주는 것
     
     > UI 만들기는 언제나 state 데이터 만들고 / 상태에 따라 HTML이 어떻게 보일지

     > 앞으로 만들 이미지 업록드 페이지 (이미지 필터 입히기 + 글 입력) 등 페이지 나눌때 필요
     > 페이지를 나눌때 1. vue-router 2.tab UI 등 상황에 따라 간결하고 효율적인걸 고르면 됨 
-->