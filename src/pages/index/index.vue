<template>
  <view class="container">
    <cu-custom bg-image="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <view class="cu-bar search bg-white">
      <view class="cu-avatar round bg-white">
        <text class="text-olive cuIcon-locationfill" />
      </view>
      <view class="search-form round">
        <text class="cuIcon-search" />
        <!-- @focus="InputFocus" @blur="InputBlur" -->
        <input type="text" confirm-type="search" :adjust-position="false" placeholder="搜索商品" @tap="onSearch">
      </view>
      <view class="action">
        <text class="cuIcon-scan" />
      </view>
    </view>
    <swiper
      class="card-swiper square-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
      indicator-active-color="#0081ff"
      indicator-color="#8799a3"
      @change="cardSwiper"
    >
      <swiper-item
        v-for="(item, index) in banner"
        :key="index"
        :class="curSwiper == index ? 'cur' : ''"
      >
        <view class="swiper-item" @tap="onSwiper(item.url)">
          <image :src="item.pic" mode="aspectFill" />
        </view>
      </swiper-item>
    </swiper>

    <view class="navigation cu-list grid col-4 no-border">
      <view v-for="(item, index) in navigations" :key="index" class="cu-item">
        <view class="text-red">
          <image class="image" :src="item.pic" />
          <!-- <view class="cu-tag badge" v-if="item.badge != 0">
            <block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
          </view> -->
        </view>
        <text>{{ item.name }}</text>
      </view>
    </view>

    <view class="cu-bar notification-bar" style="">
      <view class="cu-avatar round bg-white">
        <text class="cuIcon-notificationfill text-sm text-olive" />
      </view>
      <view class="bar-swiper">
        <swiper v-if="roll.length > 0" class="swiper" :indicator-dots="false" autoplay circular vertical>
          <block v-for="(item, rollIndex) in roll" :key="rollIndex">
            <swiper-item class="swiper-slide">
              <view
                class="swiper-item"
                @click="onNotice(item)"
              >
                <view class="text">
                  <view v-if="item.show === '是'" class="label">最新</view>
                  <view class="">{{ item.info }}</view>
                </view>
                <view>
                  <text class="cuIcon-right" />
                </view>
              </view>
            </swiper-item>
          </block>
        </swiper>
      </view>
    </view>

    <!-- <view class="grid col-3 padding-sm">
      <view class="padding-sm" v-for="(item, index) in ColorList" :key="index">
        <view class="padding radius text-center shadow-blur" :class="'bg-' + item.name">
          <view class="text-lg">{{ item.title }}</view>
          <view class="margin-top-sm text-Abc">{{ item.name }}</view>
        </view>
      </view>
    </view> -->

    <view v-if="firstList.length > 0">
      <view class="cu-bar bg-white margin-top solid-bottom">
        <view class="action">
          首发新品
          <text class="hot text-red">NEW~</text>
        </view>
        <view class="action">
          <view class="shadow" @tap="onShopMark(3)">
            更多
            <text class="cuIcon-right" />
          </view>
        </view>
      </view>
      <product-new :list="firstList" />
    </view>

    <view v-if="bast.length > 0">
      <view class="cu-bar bg-white margin-top solid-bottom">
        <view class="action">
          <!-- <text class="cuIcon-title text-orange "></text> -->
          精品推荐
        </view>
        <view class="action">
          <view class="shadow" @tap="onShopMark(1)">
            更多
            <text class="cuIcon-right" />
          </view>
        </view>
      </view>
      <product-list :list="bast" />
    </view>

    <view v-if="hot.length > 0">
      <view class="cu-bar bg-white margin-top solid-bottom">
        <view class="action">
          <!-- <text class="cuIcon-title text-orange "></text> -->
          热门榜单
          <text class="hot text-red">HOT~</text>
        </view>
        <view class="action">
          <view class="shadow" @tap="onShopMark(2)">
            更多
            <text class="cuIcon-right" />
          </view>
        </view>
      </view>
      <product-list :list="hot" />
    </view>

    <view v-if="promotion.length > 0">
      <view class="cu-bar bg-white margin-top solid-bottom">
        <view class="action">
          促销单品
        </view>
        <view class="action">
          <view class="shadow" @tap="onShopPromotion()">
            更多
            <text class="cuIcon-right" />
          </view>
        </view>
      </view>
      <product-promotion :list="promotion" />
    </view>

    <!---->
    <view style="margin: 0 0.5rem;">

      <view style="height:1.2rem;" />
    </view>
  </view>
</template>

<script>
// import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog'
// import { uniSearchBar, uniNoticeBar } from '@dcloudio/uni-ui'
import { getHomeData } from '@/api/public'
import ProductNew from '@/components/product/product-new'
import ProductList from '@/components/product/product-list'
import ProductPromotion from '@/components/product/product-promotion'

export default {
  components: { ProductList, ProductNew, ProductPromotion },
  data() {
    return {
      BaseName: this.BaseName,
      CustomBar: this.CustomBar,
      curSwiper: 0,
      dotStyle: false,
      tabInde: 0,
      isSort: false,
      images: {
        notice: this.resURL + '/assets/images/notice.png',
        one: this.resURL + '/assets/images/one.png',
        two: this.resURL + '/assets/images/two.png',
        three: this.resURL + '/assets/images/three.png'
      },
      banner: [],
      navigations: [],
      roll: [],
      bast: [],
      hot: [],
      firstList: [],
      promotion: [],
      coupon: [],
      ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      }
      ]
    }
  },
  onLoad() {
    const that = this
    that.loadHomeData()
    // Dialog.alert({
    //   title: '标题',
    //   message: '弹窗内容'
    // }).then(() => {
    //   // on close
    // });
  },
  onShow() {
    const that = this
    that.loadHomeData()
  },
  methods: {
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
