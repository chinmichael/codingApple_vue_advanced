<template>
  <div
    :class="`${filter} filter-item`"
    :style="`background-image:url(${img_url})`"
    @click="filtering"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "filterbox",
  props: {
    img_url: String,
    filter: String,
  },
  methods: {
    filtering() {
      this.emitter.emit("filtering", this.filter);
    },
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

<!--  5/11 : slot, mitt 컴포넌트간 데이터 전송

      Tip : vue에서는 class="" 클래스 이름을 스페이스로 구분 않고 class 속성을 여러개 줄 수 있음 <class="" class=""> 가능

      slot: props보다 좀 더 직관적으로 자식 컴포넌트에 데이터 전송

      >> 자식컴포넌트에 <slot></slot>으로 데이터가 들어갈 공간 지정
         + 부모컴포넌트에서 자식컴포넌트 <Component> slot에 들어갈 데이터들 </Component> 이런식으로 넣어줌

      >> 태그 속성에는 쓸수없다 | 대신 slot은 자식 컴포넌트 태그 사이의 것들이 다 들어가기에 <span> data </span>이런 html 요소까지 같이 전송 가능

      >> 만약 slot에서 들어갈 데이터를 구분해서 넣고 싶으면 slot태그의 name 속성 이용
         + 부모태그에는 자식컴포넌트 태그에 <Component><template v-slot:slot name에 지정할 이름>데이터</template></Component> 이런 방식으로 넣어줘야 함

         >> object 데이터 같은거 뿌릴때는 props가 나음 slot은 간단히 데이터를 전송할때 직관적으로 편히 씀

      slot props : slot을 '사용할 때' 부모가 자식 데이터를 필요로하는 경우 
      >> slot태그내에 변수명을 바인딩하여 데이터를 보내면된다 props처럼 역props랄까 <slot v-bind:msg="message" name="first"> data(){return{message:"hello"}}
      >> slot태그의 props는 이제 부모의 자식컴포넌트 태그의 slot데이터 지정하는 곳에서 해당 변수명으로 사용가능 <Component><template v-slot:first="item"><span>{{item.msg}}</span></template></Component>
                                                                                                                     (name 없음 default)

      mitt : 멀리 있는 컴포넌트 간 데이터 전송 시 필요 (기존 custom event라면 다단 이동을 해야함)
      >> 라이브러리 설치 필요 (npm install mitt) (emitter의 약자)
      >> main.js에 라이브러리 등록 (main.js 참조)
      >> mitt로 데이터 전송 : (예를 들어 클릭시 보낼 때) @click="send" 하단 methods: {send(){this.emitter.emit('이벤트명',데이터);}} 이걸로 보냄 (emitter는 전역에 주입되었기에)
      >> mitt 데이터 수신 : 수신 컴포넌트에서 this.emitter.on('이벤트명',arrow function) >> 보통 랜더링되면서 처리되야하므로 lifecycle함수에 mounted()에 넣는다

      >> 근데 mitt도 많이쓰면 관리가 힘들어지는데 컴포넌트가 많아지면 쉽게 남발하게 됨
      >> 결국 담 시간부터 하게 되는 Vuex 같은 상태관리 라이브러리가 쓰인다 (오예 Redux말고 이거 공부하고 ngrx 알면 좀 낫겠지...)
      
-->