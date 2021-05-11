<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="tab_state == 1" @click="tab_state++">Next</li>
      <li v-if="tab_state == 2" @click="publish">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>
  <Container
    v-bind:post_inform="post_inform"
    v-bind:tab_state="tab_state"
    v-bind:img_url="upload_img"
    v-bind:filter_name="post_filter"
    @text_change="post_content = $event"
  />
  <!-- @tab_change="tab_state = $event"
  /> -->
  <button @click="morePost">더보기</button>

  <!-- tab 연습 :  <div v-if="tab_state == 1">내용1</div>
  <div v-if="tab_state == 2">내용2</div>
  <div v-if="tab_state == 3">내용3</div>
  <button @click="tab_state = 1">버튼1</button>
  <button @click="tab_state = 2">버튼2</button>
  <button @click="tab_state = 3">버튼3</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        type="file"
        id="file"
        class="inputfile"
        accept="image/*"
      />
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
      upload_img: "",
      post_content: "",
      post_filter: "",
    };
  },
  mounted() {
    this.emitter.on("filtering", (e) => {
      this.post_filter = e;
    });
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

    upload(e) {
      //e는 event관련 유용한 함수가 담긴 자료변수
      let file = e.target.files; // input을 통해 가져온 파일들
      console.log(file[0]); // 위에서처럼 files기에 리스트로 담기는걸 알 수 있음 >> 부분처리를 위해서 [i] indexing처리를 한다(그럼 file 정보로 딱 뜸)

      //업로드 뒤엔 이미지 처리화면으로 넘어가 업로드한 이미지를 띄워야함 >> 위에서 한 tab_state이용 (이래서 상위에 data세팅한것)
      let imgUrl = URL.createObjectURL(file[0]); // 참조 링크 삭제는 URL.revokeObjectURL();
      console.log(imgUrl);
      this.tab_state = 1; // 처리화면 전환
      this.upload_img = imgUrl;

      e.target.value = "";
      // @change는 변경시 처리되는거라 같은 이미지를 연속 올릴경우 인식을 못하니 초기화 시켜야함
      // 근데 e.target.files=""를 하면 당빠 타입 에러가 발생하므로 e.target.value로 초기화시켜주자
    },

    publish() {
      let addPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.upload_img,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.post_content,
        filter: this.post_filter,
      };
      this.post_inform.unshift(addPost); // unshift() : Array에 자료를 '맨 앞에' 추가로 집어넣을때
      this.tab_state = 0;
      this.post_filter = "";
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

<!-- 5/8 : 이미지 업로드(서버 없을때), 글 발행(까지 하려고 했는데 개인적으로 한 emit warning에 카오스여서 처리하다 시간 다 갔넼ㅋㅋ (결국 질문 올림))
     >> 실질적으로는 웹브라우저 기능인데 어차피 vue는 브라우저를 다루는걸 도와주는 도구다

     파일 업로드를 위한 HTML >> input type="file" >> 파일 업로드 버튼은 뭐 수정이 안되는지라 보통 숨기고 라벨 태그를 꾸며서 처리함

     파일은 업로드 한 뒤에는 서버에 우선 보내서 저장뒤 다시 저장한 url을 보내어 img태그를 이용
     >>explorer11 이상 브라우저에서는 이미지를 다루는 함수를 이용해 서버를 보내기 전에 처리를 할 수 있음
        >> FileReader() 혹은 URL.createObjectURL()
      
      >> 참고로 여러개 동시에 입력할때 type을 multiple type으로 가면 동시에 여러개 입력(shift) 가능
      >> 이미지만 선택 가능하게 바꾸려면 accept="image/*" 속성으로 근데 정확히는 보이는것만 바뀌는거라 예전에 한것처럼 js로 유효성 검사를 써야함(.type()사용 >> image/가 들어가는지)

     @change="" : vue에서 input시(input의 데이터 변경시) 코드를 실행하기위한 바인딩

     FileReader API : 파일을 텍스트로 변환처리 >> 그래서 img src에 넣을 수 있음

     createObjectURL() : 서버없이 이미지의 가상 URL을 호스팅하는것처럼 해줌(임시니까 새로고침하면 사라짐)

     blob(binary large object) : (image 업로드하면 blob으로 링크가 되어있을것)
     >> 컴퓨터 안 모든 파일은 binary 데이터(0,1로 구성) >> 브라우저에서 img를 다룰때 BLOB Object에 담아 처리 >> 이미지 여러 조작 가능(확장자 변경 등도)
-->