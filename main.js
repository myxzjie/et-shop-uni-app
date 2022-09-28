import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from 'uview-ui'
import http from '@/utils/http'
import store from './store'
import cuCustom from '@/components/cu-custom'

import { resURL } from '@/utils/config'
import schema from 'async-validator'
import share from '@/mixins/share'

import * as filters from '@/filters/index'


Vue.use(uView)
Vue.mixin(share)

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.prototype.resURL = resURL
Vue.prototype.$res = resURL
Vue.prototype.$validator = (rule) => {
  return new schema(rule)
}
Vue.component('cu-custom', cuCustom)

// 添加全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
// import { createSSRApp } from 'vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// #endif