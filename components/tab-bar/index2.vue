<template>
  <view class="cu-bar tabbar bg-white foot">
    <view v-for="(item, index) in list" :key="index" class="action" :data-id="item.id" @tap="changeTab(item)">
      <view class="cuIcon-cu-image">
        <image :src="active === item.id ? item.currentIcon : item.icon" mode="aspectFit" />
        <!-- <view class="cu-tag badge">99</view> -->
      </view>
      <view :class="{ 'text-gray': active === item.id }">{{ item.name }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: { type: [Number, String], default: 1 }
  },
  data() {
    return {
      active: this.current,
      list: [
        {
          id: 1,
          name: '首页',
          icon: '/static/tabbar/tab-home.png',
          currentIcon: '/static/tabbar/tab-home-current.png',
          path: '/pages/home/index'
        },
        {
          id: 2,
          name: '分类',
          icon: '/static/tabbar/tab-cate.png',
          currentIcon: '/static/tabbar/tab-cate-current.png',
          path: '/pages/cate/index'
        },
        {
          id: 3,
          name: '发现',
          icon: '/static/tabbar/tab-find.png',
          currentIcon: '/static/tabbar/tab-find-current.png',
          path: '/pages/article/index'
        },
        {
          id: 4,
          name: '购物车',
          icon: '/static/tabbar/tab-cart.png',
          currentIcon: '/static/tabbar/tab-cart-current.png',
          path: '/pages/cart/index'
        },
        {
          id: 5,
          name: '我的',
          icon: '/static/tabbar/tab-me.png',
          currentIcon: '/static/tabbar/tab-me-current.png',
          path: '/pages/me/index'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    // switchTab(id) {
    //   this.active = id
    //   this.$emit('change', id)
    // },
    changeTab(item) {
      this.page = item.pagePath
      // 这里使用reLaunch关闭所有的页面，打开新的栏目页面
      uni.reLaunch({
        url: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  [nvue] uni-scroll-view, [nvue] uni-swiper-item, [nvue] uni-view {
      flex-direction: unset;
  }
  [nvue-dir-column] uni-swiper-item, [nvue-dir-column] uni-view {
      flex-direction: unset;
  }
  .uni-tabbar {
      position: fixed;
      bottom: 0;
      z-index: 999;
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: 98upx;
      padding: 16upx 0;
      box-sizing: border-box;
      border-top: solid 1upx #ccc;
      background-color: #fff;
      box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
      .uni-tabbar__item {
          display: block;
          line-height: 24upx;
          font-size: 20upx;
          text-align: center;
      }
      .uni-tabbar__icon {
          height: 42upx;
          line-height: 42upx;
          text-align: center;
      }
      .icon {
          display: inline-block;
      }
      .uni-tabbar__label {
          line-height: 24upx;
          font-size: 24upx;
          color: #999;
          &.active {
              color: #1ca6ec;
          }
      }
  }
</style>
