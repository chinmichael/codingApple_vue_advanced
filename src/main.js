import { createApp } from 'vue'
import App from './App.vue'

// mitt 라이브러리 적용
import mitt from 'mitt'

// mitt 라이브러리 적용
let emitter = mitt();
// 모든 컴포넌트에 이용 가능하게 처리
let app = createApp(App); // vue 설정부분 다루는 변수 지정
app.config.globalProperties.emitter = emitter;
//config.globalProperties. : 글로벌(모든 컴포넌트 적용) 변수 보관함 >> {emitter : emitter}가 추가된것
//모든 컴포넌트에서 다루거나 자주쓰는 변수나 라이브러리도 같은 방법으로 처리 가능
//에를들어 axios의 경우 import axios from 'axios' createApp(App).config.globalProperties.axios = axios; >> 사용시 this.axios.get~ 이렇게 this 붙여야함

import store from './store.js' // vuex 스토어 가져온 뒤 하단 createApp의 마운트 이전 콜백함수 use()로 끼워넣는다

app.use(store).mount('#app') //위에서 app 변수에 create(App) 지정
