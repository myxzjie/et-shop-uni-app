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
            <navigator style="width: 100%;" url="/pages/search/index" hover-class="none">
              <input type="text" confirm-type="search" :adjust-position="false" placeholder="搜索商品">
            </navigator>
          </view>
          <view class="action">
            <text class="cuIcon-scan" />
          </view>
        </view>

        <view v-if="item.type === 'carousel'" class="carousel">
          <u-swiper interval="5000" duration="500" height="300" name="img" :list="item.options.list" @click="cardSwiper">
            <u-loading slot="loading" />
          </u-swiper>
        </view>

        <view v-if="item.type ==='navigation'" class="navigation cu-list grid col-4 no-border">
          <view v-for="(option, idx) in item.options.list" :key="idx" class="cu-item" @tap="navigationPage(option)">
            <view class="text-red">
              <image class="image" :src="option.img" />
            </view>
            <text>{{ option.title }}</text>
          </view>
        </view>
        <!--方格图-->
        <flex-one v-if="item.type === 'flexOne'" :res="item.options" />
        <flex-two v-if="item.type === 'flexTwo'" :res="item.options" />
        <left-one-right-two v-if="item.type === 'leftOneRightTwo'" :res="item.options" />
        <left-two-right-one v-if="item.type === 'leftTwoRightOne'" :res="item.options" />

        <product-promotion v-if="item.type === 'product'" :res="item.options" :list="list" @change="handleList" />

      </view>

      <!-- <view class="navigation cu-list grid col-4 no-border">
        <view v-for="(item, index) in navigations" :key="index" class="cu-item" @tap="navigationPage(item)">
          <view class="text-red">
            <image class="image" :src="item.pic" />
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view> -->

      <!-- <u-notice-bar type="error" mode="horizontal" :volume-icon="true" :more-icon="true" :close-icon="false" :list="notices" @tap="onNotice(item)"></u-notice-bar> -->
      <!-- <view class="cu-bar notification-bar">
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
      </view> -->

      <!-- <view v-if="firstList.length > 0">
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
      </view> -->

    </scroll-view>
  </view>
</template>

<script>
// import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog'
import { modelNavigateTo } from '@/utils'
import { getHomeData, getPageData } from '@/api/public'
// import ProductNew from '@/components/product/product-new'
// import ProductList from '@/components/product/product-list'
// import ProductPromotion from '@/components/product/product-promotion'
import FlexOne from '@/components/templates/tpl_flex_one'
import FlexTwo from '@/components/templates/tpl_flex_two'
import LeftOneRightTwo from '@/components/templates/tpl_left_one_right_two'
import LeftTwoRightOne from '@/components/templates/tpl_left_two_right_one'
import ProductPromotion from '@/components/templates/tpl_product_promotion'
export default {
  components: {
    FlexOne,
    FlexTwo,
    LeftOneRightTwo,
    LeftTwoRightOne,
    // ProductNew,
    ProductPromotion
  },
  data() {
    return {
      pageData: '',
      BaseName: this.BaseName,
      CustomBar: this.CustomBar,
      curSwiper: 0,
      dotStyle: false,
      tabIndex: 0,
      list: [],
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
      getPageData('home').then(({ status, data }) => {
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
        that.handleList(this.tabIndex)
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
      modelNavigateTo(item)
      // uni.navigateTo({
      //   url: item.wxapp_url
      // })
    },
    cardSwiper(e) {
      this.curSwiper = e.detail.current
    },
    navigationPage(item) {
      modelNavigateTo(item)
      // uni.navigateTo({ url: item.wxapp_url + '?isBack=true' })
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
      uni.navigateTo({
        url: `/pages/shop/details/index?id=${item.id}`
      })
    },
    handleTabChange(item) {
      this.tabIndex = item.___index
      this.handleList()
    },
    handleList(index) {
      if (index === 0) {
        this.list = this.firstList
      } else if (index === 1) {
        this.list = this.bast
      } else if (index === 2) {
        this.list = this.hot
      } else if (index === 3) {
        this.list = this.promotion
      }
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
.carousel {
  padding: 12upx;
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
