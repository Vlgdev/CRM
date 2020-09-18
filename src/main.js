import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Pagination from 'vuejs-paginate'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import App from './App.vue'
import Loader from './components/Loader.vue'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Pagination', Pagination)

firebase.initializeApp({
  apiKey: "AIzaSyC_wvrc9Re-9v8OjlIns8oac7VJZ95WCwg",
  authDomain: "vue-crm-2ac65.firebaseapp.com",
  databaseURL: "https://vue-crm-2ac65.firebaseio.com",
  projectId: "vue-crm-2ac65",
  storageBucket: "vue-crm-2ac65.appspot.com",
  messagingSenderId: "884129775117",
  appId: "1:884129775117:web:bf373594b6274712ccdf44"
})

let app = null

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
})

