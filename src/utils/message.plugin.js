import localizeFilter from '../filters/localize.filter'

export default {
    install(Vue) {
        Vue.prototype.$message = html => {
            window.M.toast({html})
        }

        Vue.prototype.$error = text => {
            const html = localizeFilter('ErrorMessageTitle')
            window.M.toast({html: `${html} ${text}`})
        }
    }
}