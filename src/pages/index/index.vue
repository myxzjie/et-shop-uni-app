<template>
  <view class="container">
    <tip-pop :tip="tip" :duration="duration" />
    <home v-if="active === 1" />
    <cate v-else-if="active === 2" />
    <article-view v-else-if="active === 3" />
    <cart v-else-if="active === 4" />
    <me v-else-if="active === 5" />

    <view class="cu-tabbar-height" />

    <tab-bar v-show="isVisible" :list="tabBar" @change="changeTab" />

  </view>
</template>

<script>
import Home from '@/pages/home/index'
import Cate from '@/pages/cate/index'
import ArticleView from '@/pages/article/index'
import Cart from '@/pages/cart/index'
import Me from '@/pages/me/index'
import TabBar from '@/components/tab-bar/index'
import TipPop from '@/components/tip-pop'

export default {
  components: { Home, Cate, ArticleView, Cart, Me, TabBar, TipPop },
  data() {
    return {
      BaseName: this.BaseName,
      CustomBar: this.CustomBar,
      tip: '点击「添加小程序」,使用便捷',
      duration: 3,
      active: 1,
      isVisible: true,
      tabBar: [
        {
          id: 1,
          name: '首页',
          icon: 'svg-icon-home',
          default: '/static/tabbar/tab-home.png',
          current: '/static/tabbar/tab-home-current.png'
        },
        {
          id: 2,
          name: '分类',
          icon: 'svg-icon-cate',
          default: '/static/tabbar/tab-cate.png',
          current: '/static/tabbar/tab-cate-current.png'
        },
        {
          id: 3,
          name: '发现',
          shadow: true,
          icon: 'svg-icon-discover',
          default: '/static/tabbar/tab-find.png',
          current: '/static/tabbar/tab-find-current.png'
        },
        {
          id: 4,
          name: '购物车',
          icon: 'svg-icon-cart',
          default: '/static/tabbar/tab-cart.png',
          current: '/static/tabbar/tab-cart-current.png'
        },
        {
          id: 5,
          name: '我的',
          icon: 'svg-icon-me',
          default: '/static/tabbar/tab-me.png',
          current: '/static/tabbar/tab-me-current.png'
        }
      ]

    }
  },
  onLoad(option) {
    this.active = option.active
  },
  onShow() {},
  methods: {
    changeTab(id) {
      this.active = id
      if (this.active === 4) {
        this.isVisible = false
      } else {
        this.isVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #fff;
}
</style>
