import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import http from '@/utils/http'
import store from './store'
// import TabBar from '@/components/tab-bar'
import uniPop from '@/components/uni-pop'

Vue.component('uni-pop', uniPop)

Vue.use(uView)
// Vue.use(vant)

Vue.prototype.http = http
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

// Vue.component('tab-bar', TabBar)

app.$mount()
