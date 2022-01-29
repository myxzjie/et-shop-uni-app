<template>
  <view>
    <cu-custom bg-color="bg-gradual-olive">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>

    <scroll-view scroll-y class="scrollPage">
      <view v-for="(item,index) in pageData.list" :key="index">
        <view v-if="item.type === 'search'" class="cu-bar search bg-white">
          <view class="cu-avatar round bg-white">
            <text class="text-olive cuIcon-locationfill" />
          </view>
          <view class="search-form round">
            <text class="cuIcon-search" />
            <navigator url="/pages/search/index" hover-class="none">
              <input type="text" confirm-type="search" :adjust-position="false" placeholder="搜索商品">
            </navigator>
          </view>
          <view class="action">
            <text class="cuIcon-scan" />
          </view>
        </view>

        <view v-if="item.type === 'carousel'">
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
              v-for="(option, idx) in item.options.list"
              :key="idx"
              :class="curSwiper === idx ? 'cur' : ''"
              @tap="onSwiper(option)"
            >
              <view class="swiper-item">
                <image :src="option.img" mode="aspectFill" />
              </view>
            </swiper-item>
          </swiper>
        </view>

      </view>

      <view class="navigation cu-list grid col-4 no-border">
        <view v-for="(item, index) in navigations" :key="index" class="cu-item" @tap="navigationPage(item)">
          <view class="text-red">
            <image class="image" :src="item.pic" />
          <!-- <view class="cu-tag badge" v-if="item.badge != 0">
            <block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
          </view> -->
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view>

      <!-- <u-notice-bar type="error" mode="horizontal" :volume-icon="true" :more-icon="true" :close-icon="false" :list="notices" @tap="onNotice(item)"></u-notice-bar> -->
      <view class="cu-bar notification-bar">
        <view class="cu-avatar round bg-white">
          <text class="cuIcon-notificationfill text-sm text-olive" />
        </view>
        <view class="bar-swiper">
          <swiper v-if="roll.length > 0" class="swiper" :indicator-dots="false" autoplay circular vertical>
            <block v-for="(item, rollIndex) in roll" :key="rollIndex">
              <swiper-item class="swiper-slide">
                <view
                  class="swiper-item"
                  @tap="onNotice(item)"
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

      <view v-if="firstList.length > 0">
        <view class="cu-bar bg-white margin-top solid-bottom">
          <view class="action">
            首发新品
            <text class="text-red text-xs">NEW~</text>
          </view>
          <view class="action">
            <navigator class="shadow" url="/pages/shop/product/sales?type=3" hover-class="none">
              更多
              <text class="cuIcon-right" />
            </navigator>
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
            <navigator class="shadow" url="/pages/shop/product/sales?type=1" hover-class="none">
              更多
              <text class="cuIcon-right" />
            </navigator>
          </view>
        </view>
        <product-list :list="bast" />
      </view>

      <view v-if="hot.length > 0">
        <view class="cu-bar bg-white margin-top solid-bottom">
          <view class="action">
            <!-- <text class="cuIcon-title text-orange "></text> -->
            热门榜单
            <text class="text-red text-xs">HOT~</text>
          </view>
          <view class="action">
            <navigator class="shadow" url="/pages/shop/product/sales?type=2" hover-class="none">
              更多
              <text class="cuIcon-right" />
            </navigator>
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
            <navigator class="shadow" url="/pages/shop/promotion/index" hover-class="none">
              更多
              <text class="cuIcon-right" />
            </navigator>
          </view>
        </view>
        <product-promotion :list="promotion" />
      </view>

    </scroll-view>
  </view>
</template>

<script>
// import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog'
import { modelNavigateTo } from '@/utils'
import { getHomeData, getPageDataHome } from '@/api/public'
import ProductNew from '@/components/product/product-new'
import ProductList from '@/components/product/product-list'
import ProductPromotion from '@/components/product/product-promotion'

export default {
  components: { ProductList, ProductNew, ProductPromotion },
  data() {
    return {
      pageData: '',
      BaseName: this.BaseName,
      CustomBar: this.CustomBar,
      curSwiper: 0,
      dotStyle: false,
      tabInde: 0,
      isSort: false,
      banner: [],
      navigations: [],
      roll: [],
      bast: [],
      hot: [],
      firstList: [],
      promotion: [],
      coupon: [],
      notices: []
    }
  },
  mounted() {
    const that = this
    that.loadHomeData()
    that.loadPageDataHome()
  },
  methods: {
    loadPageDataHome() {
      const that = this
      getPageDataHome().then(({ status, data }) => {
        that.pageData = JSON.parse(data.pageData)
      })
    },
    loadHomeData() {
      const that = this
      getHomeData().then(({ status, data }) => {
        that.banner = data.banner
        that.navigations = data.menus
        that.roll = data.roll
        that.setNotices(data.roll)
        that.bast = data.bastList
        that.hot = data.likeInfo
        that.firstList = data.firstList
        that.promotion = data.benefit
        that.coupon = data.couponList
      }, err => {
        console.error(err)
      })
    },
    onSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
    onSwiper(item) {
      console.log('>>>', item)
      modelNavigateTo(item)
      // uni.navigateTo({
      //   url: item.wxapp_url
      // })
    },
    cardSwiper(e) {
      this.curSwiper = e.detail.current
    },
    navigationPage(item) {
      uni.navigateTo({ url: item.wxapp_url + '?isBack=true' })
    },
    onNavigation(url) {
      if (url === '/pages/shop/GoodsClass/main') {
        url = '/pages/tabbar/cate/index'
      } else {
        url = '/pages/search/index'
      }
      uni.switchTab({
        url: url
      })
    },
    onNotice(item) {
      // open-type="switchTab"
      uni.navigateTo({
        url: item.wxapp_url
      })
    },
    setNotices(list) {
      const that = this
      for (let i = 0; i < list.length; i++) {
        that.notices.push(list[i].info)
      }
    },
    onShopDetails(item) {
      const url = '/pages/shop/details/index?id=' + item.id
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
          padding: 10upx 20upx 0;
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
</style>
