import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(s, error) {
      s.error = error
    }
  },
  actions: {},
  getters: {
    error(s) {
      return s.error
    }
  },
  modules: {
    auth
  }
});
