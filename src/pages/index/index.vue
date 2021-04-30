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

    <tab-bar :list="tabBar" @change="changeTab" />

  </view>
</template>

<script>
import Home from '@/pages/home/index'
import Cate from '@/pages/cate/index'
import ArticleView from '@/pages/article/index'
import Cart from '@/pages/cart/index'
import Me from '@/pages/me/index'
import TabBar from '@/components/tab-bar/index'
import { getHomeData } from '@/api/public'

export default {
  components: { Home, Cate, ArticleView, Cart, Me, TabBar },
  data() {
    return {
      active: 1,
      BaseName: this.BaseName,
      CustomBar: this.CustomBar,
      curSwiper: 0,
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
      ],
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
      coupon: []
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
    changeTab(id) {
      const that = this
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
