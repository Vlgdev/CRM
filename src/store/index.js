import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'
import user from './user'
import categories from './categories'
import record from './record'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(s, error) {
      s.error = error
    },
  },
  actions: {
    async fetchCurrencies() {
      const key = process.env.VUE_APP_KEY
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,USD,EUR`)
      return await res.json()
    }
  },
  getters: {
    error(s) {
      return s.error
    },
  },
  modules: {
    auth, user, categories, record
  }
});
