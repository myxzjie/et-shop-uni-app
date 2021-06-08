import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import http from '@/utils/http'
import store from './store'
import cuCustom from './colorui/components/cu-custom'
// import TabBar from '@/components/tab-bar'
// import uniPop from '@/components/uni-pop'
import { resURL } from '@/utils/config'
import schema from 'async-validator'
import share from '@/mixins/share';

import * as filters from '@/filters/index'


// import
// Vue.component('uni-pop', uniPop)

Vue.use(uView)
// Vue.use(vant)
Vue.mixin(share)

Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.prototype.resURL = resURL
Vue.prototype.$res = resURL
Vue.prototype.$validator = (rule) => {
  return new schema(rule)
}

Vue.config.productionTip = false

Vue.component('cu-custom', cuCustom)

// 添加全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

App.mpType = 'app'

const app = new Vue({
  ...App
})

// Vue.component('tab-bar', TabBar)

app.$mount()
