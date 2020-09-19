import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
      Vue.prototype.$title = key => {
          return localizeFilter(key) + ' | Vue CRM'
      }
  }
}