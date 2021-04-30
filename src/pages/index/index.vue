<template>
  <view class="container">
    <!-- <cu-custom bg-image="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom> -->

    <home v-if="active === 1" />
    <cate v-else-if="active === 2" />
    <article-view v-else-if="active === 3" />
    <cart v-else-if="active === 4" />
    <me v-else-if="active === 5" />

    <view class="cu-tabbar-height" />

    <view class="cu-bar tabbar bg-white foot">
      <view class="action" :data-id="1" @click="changeTab">
        <view class="cuIcon-cu-image">
          <image v-if="active === 1" src="@/static/tabbar/tab-home-current.png" />
          <image v-else src="@/static/tabbar/tab-home.png" />
        </view>
        <view :class="{ 'text-gray': active === 1 }">元素</view>
      </view>
      <view class="action" :data-id="2" @click="changeTab">
        <view class="cuIcon-cu-image">
          <image v-if="active === 2" src="@/static/tabbar/tab-cate-current.png" />
          <image v-else src="@/static/tabbar/tab-cate.png" />
        </view>
        <view class="text-gray">分类</view>
      </view>
      <view class="action" :data-id="3" @click="changeTab">
        <view class="cuIcon-cu-image">
          <image v-if="active === 3" src="@/static/tabbar/tab-find-current.png" />
          <image v-else src="@/static/tabbar/tab-find.png" />
          <!-- <view class="cu-tag badge">99</view> -->
        </view>
        <view class="text-gray">发现</view>
      </view>
      <view class="action" :data-id="4" @click="changeTab">
        <view class="cuIcon-cu-image">
          <image v-if="active === 4" src="@/static/tabbar/tab-cart-current.png" />
          <image v-else src="@/static/tabbar/tab-cart.png" />
          <!-- <view class="cu-tag badge" /> -->
        </view>
        <view class="text-gray">购物车</view>
      </view>

      <view class="action" :data-id="5" @click="changeTab">
        <view class="cuIcon-cu-image">
          <image v-if="active === 5" src="@/static/tabbar/tab-me-current.png" />
          <image v-else src="@/static/tabbar/tab-me.png" />
          <!-- <view class="cu-tag badge" /> -->
        </view>
        <view class="text-gray">我的</view>
      </view>
    </view>
  </view>
</template>

<script>
import Home from '@/pages/home/index'
import Cate from '@/pages/cate/index'
import ArticleView from '@/pages/article/index'
import Cart from '@/pages/cart/index'
import Me from '@/pages/me/index'
import { getHomeData } from '@/api/public'

export default {
  components: { Home, Cate, ArticleView, Cart, Me },
  data() {
    return {
      active: 1,
      BaseName: this.BaseName,
      CustomBar: this.CustomBar,
      curSwiper: 0,
      dotStyle: false,
      isSort: false,
      // images: {
      //   notice: this.resURL + '/assets/images/notice.png',
      //   one: this.resURL + '/assets/images/one.png',
      //   two: this.resURL + '/assets/images/two.png',
      //   three: this.resURL + '/assets/images/three.png'
      // },
      banner: [],
      navigations: [],
      roll: [],
      bast: [],
      hot: [],
      firstList: [],
      promotion: [],
      coupon: [],
      // ColorList: [{
      //   title: '嫣红',
      //   name: 'red',
      //   color: '#e54d42'
      // },
      // {
      //   title: '桔橙',
      //   name: 'orange',
      //   color: '#f37b1d'
      // },
      // {
      //   title: '明黄',
      //   name: 'yellow',
      //   color: '#fbbd08'
      // }
      // ]
    }
  },
  onLoad() {
    // const that = this
    // that.loadHomeData()
  },
  onShow() {
    const that = this
    that.loadHomeData()
  },
  methods: {
    changeTab(e) {
      const that = this
      const { id } = e.currentTarget.dataset
      that.active = id
    },
    loadHomeData() {
      const that = this
      getHomeData().then(({ status, data }) => {
        that.banner = data.banner
        that.navigations = data.menus
        that.roll = data.roll
        that.bast = data.bastList
        that.hot = data.likeInfo
        that.firstList = data.firstList
        that.promotion = data.benefit
        that.coupon = data.couponList
      }, err => {
        console.error(err)
      })
    },
    onSwitchTab(index) {
      this.tabInde = index
    },
    onSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
    onSwiper(url) {
      uni.navigateTo({
        url: url
      })
    },
    cardSwiper() {},
    navigationPage(item) {
      // const that = this
      debugger
      uni.switchTab({ url: item.wxapp_url })
    },
    onNavigation(url) {
      if (url === '/pages/shop/GoodsClass/main') {
        url = '/pages/cate/index'
      } else {
        url = '/pages/search/index'
      }
      uni.switchTab({
        url: url
      })
    },
    onNotice(item) {
      // open-type="switchTab"
      debugger
      uni.navigateTo({
        url: item.url
      })
    },
    onShopDetails(item) {
      const url = '/pages/shop/details/index?id=' + item.id
      uni.navigateTo({
        url: url
      })
    },
    onShopPromotion() {
      // $router.push('/pages/shop/GoodsPromotion/main')
      uni.navigateTo({
        url: '/pages/shop/promotion/index'
      })
    },
    onShopMark(type) {
      // $router.push({ path: '/pages/shop/HotNewGoods/main',query:{type:3} })
      uni.navigateTo({
        url: '/pages/shop/mark/index?type=' + type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    background-color: #fff;
  }

  .cu-bar.search {
    .cu-avatar:first-child,
    .search-form {
      margin-left: 0;
    }
  }
  .navigation {
    .image {
      width:64rpx;
      height:64rpx;
    }
  }
  .notification-bar {
    // max-height: 50upx;
    min-height: 60upx;
    border-top: 1upx solid rgba(0, 0, 0, 0.05);
    border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
    .cu-avatar:first-child {
      margin-left: 0;
    }
    .bar-swiper{
      display: flex;
      flex: 1;
      .swiper {
        width: 100%;
        height: 60upx;
        .swiper-slide {
          .swiper-item {
            border-left: 1upx solid rgba(0, 0, 0, 0.05);
            padding: 0 20upx 0;
            overflow: hidden;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
          }
        }
      }
    }
  }

// 	.logo {
// 		height: 200rpx;
// 		width: 200rpx;
// 		margin: 200rpx auto 50rpx auto;
// 	}

// 	.text-area {
// 		display: flex;
// 		justify-content: center;
// 	}

// // .title {
// // 		font-size: 36rpx;
// // 		color: #8f8f94;
// //   }

//   .swiper-item {
//     height: 100%;
//   }
</style>
