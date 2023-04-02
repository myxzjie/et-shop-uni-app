<template>
  <view class="container">
    <tip-pop :tip="tip" :duration="duration" />
    <home v-if="active === 1" />
    <cate v-else-if="active === 2" />
    <article-view v-else-if="active === 3" />
    <cart v-else-if="active === 4" />
    <me v-else-if="active === 5" />
	
	<view class="tool-sidebar tool-right">
	  <view
	    class="tool-sidebar-item"
	    @tap="handleLocatinList"
	  >
		<view style="">
			<!-- cuIcon-service -->
			<button class="bg-gradual-olive" 
			style="width: 64px; border-radius: 50px;font-size: 20rpx;" open-type="contact">
			源码咨询
			</button>
		</view>
	    
	  </view>
	</view>

    <view class="cu-tabbar-height" />

    <tab-bar v-show="isVisible" :list="tabBar" @change="changeTab" />

  </view>
</template>

<script>
import Home from '@/pages/tabbar/home/index'
import Cate from '@/pages/tabbar/cate/index'
import ArticleView from '@/pages/tabbar/article/index'
import Cart from '@/pages/tabbar/cart/index'
import Me from '@/pages/tabbar/me/index'
import TabBar from '@/components/tab-bar/index'
import TipPop from '@/components/tip-pop'
import { sceneKey } from '@/utils/config'

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
  onLoad(options) {
    const that = this
    const app = getApp()
    if (options.active) {
      const current = parseInt(options.active)
      that.changeTab(current)
    }

    // 扫小程序码进入
    // console.log('>>>:', options)
    const scene = decodeURIComponent(options.scene)
    // console.log('>>>2:', scene)
    if (scene) {
      const params = scene.split('&')
      const result = {}
      params.forEach(item => {
        const pram = item.split('=')
        result[pram[0]] = pram[1]
      })

      app.globalData.options = result
      uni.setStorage({
        key: sceneKey,
        data: result
      })
    }
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

.tool-sidebar {
	position: fixed;
	bottom: 450rpx;
	// right: 10px;
	z-index: 10;
	width: 100rpx;
	padding-top: 10rpx;
	&.tool-left {
		left: 21rpx;
	}
	&.tool-right {
		right: 1rpx;
	}
	
	&-item {
		display: flex;
		margin-bottom: 5rpx;
		text-align: center;
		justify-content: center;
		[class*="svg-icon-"] {
			padding: 10rpx;
			border-radius: 50%;
			font-size: 40rpx;
			color: var(--cyan);
			background: var(--white);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 48rpx;
			height: 48rpx;
		}
		
	}
}
// ::v-deep .tool-sidebar-item {
// 	.u-icon {
// 		padding: 10rpx;
// 		border-radius: 50%;
// 		background: rgba(255, 255, 255, 1); 
// 	}
// 	.u-icon__icon {
// 		color: #1cbbb4 !important;
// 		&:hover {
// 			color: #1cbbb4 !important;
// 		}
// 	}
// }
</style>
