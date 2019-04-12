import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      userId: "",
      activeTab: 0,
      openid: '',
        token: '',
    },
    mutations: {
      changeState (state, payload) {
        state[payload.k] = payload.v
      },
      setopenid(state, payload) {
          state.openid = payload
      },
    }
  });

export default store;
