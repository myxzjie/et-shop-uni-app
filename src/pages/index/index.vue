<template>
  <view class="container index">
    <!-- 小程序头部兼容 -->
    <!-- #ifdef MP||H5 -->
    <view class="header acea-row row-center-wrapper">
      <view class="search acea-row row-middle" @click="onSearch">
        <text class="iconfont icon-xiazai5" />搜索商品
      </view>
    </view>
    <!-- #endif -->

    <view class="slider-banner banner">
      <swiper v-if="banner.length > 0" :indicator-dots="true" :autoplay="true">
        <block v-for="(item, bannerIndex) in banner" :key="bannerIndex">
          <swiper-item>
            <view class="swiper-item" @click="item.url?$router.push('/'+item.url) : ''">
              <image :src="item.pic" />
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>

    <!---->
    <view class="nav acea-row">
      <navigator
        v-for="(item, menusIndex) in navigations"
        :key="menusIndex"
        class="item"
        url="/pages/cate/index"
        open-type="switchTab"
      >
        <view class="pictrue">
          <image :src="item.pic" />
        </view>
        <view>{{ item.name }}</view>
      </navigator>
    </view>

    <!---->
    <view class="news acea-row row-between-wrapper">
      <view class="pictrue">
        <image :src="images.notice" show-menu-by-longpress />
      </view>
      <view class="swiper-no-swiping new-banner">
        <swiper v-if="roll.length > 0" class="swiper-wrapper" :indicator-dots="false" autoplay circular vertical>
          <block v-for="(item, rollIndex) in roll" :key="rollIndex">
            <swiper-item class="swiper-slide">
              <view
                class="swiper-item acea-row row-between-wrapper"
                @click="onNotice(item)"
              >
                <view class="text acea-row row-between-wrapper">
                  <view v-if="item.show === '是'" class="label">最新</view>
                  <view class="newsTitle line1">{{ item.info }}</view>
                </view>
                <view class="iconfont icon-xiangyou" style="margin-right: 0.5rem;" />
              </view>
            </swiper-item>
          </block>
        </swiper>
      </view>
    </view>

    <!---->
    <view style="    margin: 0 0.5rem;">
      <view v-if="bast.length > 0" class="wrapper">
        <view class="title acea-row row-between-wrapper">
          <view class="text">
            <view class="name line1">精品推荐</view>
          </view>
          <view
            class="more"
            @click="onShopMark(1)"
          >
            更多
            <text class="iconfont icon-jiantou" />
          </view>
        </view>
        <good-list :list="bast" :is-sort="false" />
      </view>

      <!---->
      <view v-if="hot.length > 0" class="wrapper">
        <view class="title acea-row row-between-wrapper">
          <view class="text">
            <view class="name line1">
              热门榜单
              <text class="new font-color-red">HOT~</text>
            </view>
          </view>
          <view
            class="more"
            @click="onShopMark(2)"
          >
            更多
            <text class="iconfont icon-jiantou" />
          </view>
        </view>
        <good-list :list="hot" :is-sort="false" />
      </view>

      <!---->
      <view v-if="firstList.length > 0" class="wrapper">
        <view class="title acea-row row-between-wrapper">
          <view class="text">
            <view class="name line1">
              首发新品
              <text class="new font-color-red">NEW~</text>
            </view>
          </view>
          <view
            class="more"
            @click="onShopMark(3)"
          >
            更多
            <text class="iconfont icon-jiantou" />
          </view>
        </view>
        <view class="newProducts">
          <swiper
            class="swiper-wrapper"
            :options="swiperProducts"
            :indicator-dots="false"
            :display-multiple-items="2"
          >
            <block v-for="(item, firstListIndex) in firstList" :key="firstListIndex">
              <swiper-item class="swiper-slide">
                <view
                  class="newProductsItem"
                  @click="onShopDetails(item)"
                >
                  <view class="img-box">
                    <image :src="item.image" />
                  </view>
                  <view class="pro-info line1">{{ item.storeName }}</view>
                  <view class="money font-color-red">￥{{ item.price }}</view>
                </view>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>

      <!---->
      <view v-if="promotion.length > 0" class="wrapper">
        <view class="title acea-row row-between-wrapper">
          <view class="text">
            <view class="name line1">促销单品</view>
          </view>
          <view class="more" @click="onShopPromotion()">
            更多
            <text class="iconfont icon-jiantou" />
          </view>
        </view>
        <promotion-list :list="promotion" />
      </view>

      <view style="height:1.2rem;" />
    </view>
  </view>
</template>

<script>
import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog'

import { uniSearchBar, uniNoticeBar } from '@dcloudio/uni-ui'
import { getHomeData } from '@/api/public'
import goodList from '@/components/shop/good-list'
import promotionList from '@/components/shop/promotion-list'

export default {
  components: { uniSearchBar, uniNoticeBar, goodList, promotionList },
  data() {
    return {
      tabInde: 0,
      images: {
        notice: this.resURL + '/assets/images/notice.png'
      },

      banner: [],
      navigations: [],
      roll: [],
      bast: [],
      hot: [],
      firstList: [],
      promotion: [],
      coupon: []
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

// .title {
// 		font-size: 36rpx;
// 		color: #8f8f94;
//   }

  .swiper-item {
    height: 100%;
  }
</style>
