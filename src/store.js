/*import { createStore } from 'vuex';

const store = createStore({

    state() {
        return {

        }
    },

})

export default store;  이게 기본 골자*/

import { createStore } from 'vuex';

import { post_ref } from './assets/post_ref';

const store = createStore({

    state() { // vuex부터는 data가 아니라 state라 부르는게 나음
        return {
            name: 'Vuex 기본 연습',
            age: 17,
            post_inform: post_ref,
        }
    },

    mutations: {
        changeAge(s, payload) { // 여기 파라미터는 무조건 위 state를 의미한다 (보통 state로 작명), payload 부분은 메시지로 받은 데이터
            s.age += payload;
        },
        likeCheck(state, payload) {
            if (state.post_inform[payload].liked) {
                state.post_inform[payload].liked = false;
                state.post_inform[payload].likes--;
            } else {
                state.post_inform[payload].liked = true;
                state.post_inform[payload].likes++;
            }
        }
    },

})

export default store;

/*  5/12 : Vuex 2 : state 수정법

    >> 앞서 이야기했지만 컴포넌트에서 직접 state를 수정하다 버그가 나면 자칫하다간 전체 컴포넌트를 검사해야하는 끔찍한 상황이 발생할 수 있음 (특히 Vuex는 규모가 커질 때 쓴다)

    >> 상태관리가 가능하도록 해야함 (그래서 상태관리 라이브러리임)

    >> 컴포넌트가 store에 state변경을 요청하게 하여 한번에 관리시켜야함 (1.store에 state수정방법 정의 2.컴포넌트에서 store에 수정요청) 일종의 서비스 컴포넌트에 메서드 정의 및 호출

    mutations : {}에 수정방법을 정의한다. (함수를 정의 진짜 Service 컴포넌트 메서드 호출이라 생각하자...)

    mutations에 정의한 함수를 해당 컴포넌트에서 사용할 곳에 $store.commit('함수명')로 실행함

    만약 파라미터(메시지)가 있을때는 기존에 custom event 메시지 보낼때처럼 $store.commit('함수명', data)로 보낸뒤
    이는 두번째 파라미터로 받음

    >> 디버깅이 쉬워짐


*/