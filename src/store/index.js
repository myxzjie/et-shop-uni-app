import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sessionKey: '',
    hasLogin: false,
    loginProvider: '',
    openid: null,
    testvuex: false,
    colorIndex: 0,
    colorList: ['#FF0000', '#00FF00', '#0000FF'],
    userInfo: null
  },
  mutations: {
    setSessionKey(state, sessionKey) {
      state.sessionKey = sessionKey
    },
    login(state, provider) {
      state.hasLogin = true
      state.loginProvider = provider
    },
    logout(state) {
      state.hasLogin = false
      state.openid = null
    },
    setOpenid(state, openid) {
      state.openid = openid
    },
    setTestTrue(state) {
      state.testvuex = true
    },
    setTestFalse(state) {
      state.testvuex = false
    },
    setColorIndex(state, index) {
      state.colorIndex = index
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {
    currentColor(state) {
      return state.colorList[state.colorIndex]
    },
    userInfo: state => state.userInfo || {}
  },
  actions: {
    getUserInfo({ state, commit }, force) {
      if (state.userInfo !== null && !force) {
        return Promise.resolve(state.userInfo)
      } else {
        return new Promise(resolve => {
          getUserInfo().then((data) => {
            commit('setUserInfo', data)
            resolve(data)
          }).catch(err => {
            console.log(err.message)
          })
        })
      }
    },
    // lazy loading openid
    getUserOpenId: async function({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid)
        } else {
          uni.login({
            success: (data) => {
              commit('login')
              setTimeout(function() { // 模拟异步请求服务器获取 openid
                const openid = '123456789'
                console.log('uni.request mock openid[' + openid + ']')
                commit('setOpenid', openid)
                resolve(openid)
              }, 1000)
            },
            fail: (err) => {
              console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
              reject(err)
            }
          })
        }
      })
    }
  }
})

export default store
