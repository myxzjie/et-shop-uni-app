import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import http from '@/utils/http'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
// import TabBar from '@/components/tab-bar'
import uniPop from '@/components/uni-pop'
import { resURL } from '@/utils/config'

Vue.component('uni-pop', uniPop)

Vue.use(uView)
// Vue.use(vant)

Vue.prototype.http = http
Vue.prototype.$store = store
Vue.prototype.resURL = resURL

Vue.config.productionTip = false

Vue.component('cu-custom', cuCustom)

App.mpType = 'app'

const app = new Vue({
  ...App
})

// Vue.component('tab-bar', TabBar)

app.$mount()
