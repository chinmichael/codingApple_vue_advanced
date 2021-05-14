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

import axios from 'axios';

const store = createStore({

    state() { // vuex부터는 data가 아니라 state라 부르는게 나음
        return {
            name: 'Vuex 기본 연습',
            age: 17,
            post_inform: post_ref,
            morePost: {},
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
        },
        setMorePost(state, payload) {
            state.morePost = payload;
        },
    },

    actions: {
        getData(context) { //context는 store라고 생각하면 됨
            axios.get('https://codingapple1.github.io/vue/more0.json').then((a) => {
                console.log(a.data);
                context.commit('setMorePost', a.data);
            })
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

/*  5/14 : Vuex 3 : actions >> Vuex에서 ajax를 요청할 때(서버에 데이터 요청) + state에 데이터를 저장할 때 (시간이 걸리는 작업들)

    state를 바꿀 때 ajax요청은 mutations 안에 넣으면 안됨
    순차적인 처리가 진행될 때 서버에 요청되는 경우 순차적인 처리를 보장할 수 없음 + 코드가 복잡해짐
    (JS는 비동기식 처리를 지원하는 코드는 잠시 다음 처리부터 진행하는 경우가 있기에)

    따라서 ajax요청은 actions에서 처리 후
    state 변경처리는 (무조건)mutations에서 (actions의 ajax요청 함수에서 해당 mutations 함수를 commit으로 호출)

    컴포넌트에서 요청시는 $store.dispatch('actions함수')   cf) mutations는 commit
*/

/*  5/14 : Vuex 4 : mapState >> state를 반환하는 코드가 짧아짐

    컴포넌트에서 함수 만들때

    computed : 뷰파일이 처음 로드 됐을때 값을 저장하고 반환함 (data변경이 될때만 새로 실행) (항상 return이 있어야함)
             : 함수라기보단 계산 결과 저장용 (호출시 ()붙이면 안됨)

             >> 예를 들어 연산이 좀 필요한 자료추출을 미리 해두고 뽑아 쓸때 (계속 찾을 필요가 없음)

             >> 일반적으로 state도 computed에 담아두고 사용한다
                함수명() {
                    return this.$store.state.변수명
                }
                한뒤 함수명으로 호출


                >> 축약을 위해 mapState사용
                import {mapState} from 'vuex'를 한 뒤

                ...mapState(['스테이트 변수1',...,'스테이트 변수n']), >> 한 뒤 변수이름으로 꺼내 씀

                ...mapState({ key:value, key:value }) 이렇게 오브젝트 형으로 넣을수도 있음


    methods : 함수 사용할때마다 실행
            : 컴포넌트에 methods에도 mapState처럼 축약을 위해 mapMutations사용 가능

                import {mapMutations} from 'vuex'

                ...map(['함수명', '함수명'])
                호출된 함수에 파라미터 넣을때는 기존 commit('함수명', data)가 아니라 함수명(data)로


    같은 원리로 mapActions도 있음


 */