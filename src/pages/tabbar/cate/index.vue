<template>
  <view>
    <view class="fixed">
      <cu-custom :is-back="true" bg-color="bg-shadeTop text-white">
        <!-- <block slot="backText">返回</block> -->
        <!-- <block slot="content">{{ BaseName }}</block> -->
      </cu-custom>
    </view>
    <scroll-view scroll-y class="scrollPage">
      <view v-for="(item,index) in pageData.list" :key="index">
        <view v-if="item.type === 'carousel'" class="carousel">
          <swiper
            class="screen-swiper round-dot"
            :indicator-dots="true"
            :circular="true"
            :autoplay="true"
            interval="5000"
            duration="500"
          >
            <swiper-item v-for="(option, idx) in item.options.list" :key="idx">
              <image :src="option.img" mode="aspectFill" />
            </swiper-item>
          </swiper>
        </view>

        <view v-if="item.type === 'cate'" class="VerticalBox solid-top">
        <scroll-view
          class="VerticalNav nav solid-right"
          scroll-y
          scroll-with-animation
          :scroll-top="verticalNavTop"
          style="height: calc(100vh - 375upx);"
        >
          <view
            v-for="(item, index) in list"
            :key="index"
            class="cu-item"
            :class="index == tabCur ? 'text-green cur' : ''"
            :data-id="index"
            @tap="onTabSelect"
          >
            {{ item.cateName }}
          </view>
        </scroll-view>
        <scroll-view
          class="VerticalMain"
          scroll-y
          scroll-with-animation
          style="height: calc(100vh - 375upx);"
          :scroll-into-view="'main-' + mainCur"
          @scroll="VerticalMain"
        >
          <view
            v-for="(item, index) in list"
            :id="'main-' + index"
            :key="index"
            class="item margin-top-sm bg-white"
          >
            <view class="cu-bar solid-bottom ">
              <view class="action">
                <text class="cuIcon-title text-green" /> {{ item.cateName }}</view>
            </view>
            <view class="cate cu-list grid col-3 no-border">
              <view v-for="(item, index) in item.children" :key="index" class="cu-item" @tap="onProduct(item)">
                <view class="pictrue text-red">
                  <image class="image" :src="item.pic" />
                <!-- <view class="cu-tag badge" v-if="item.badge != 0">
                      <block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
                     </view> -->
                </view>
                <text class="name text-sm">{{ item.cateName }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getStoreCateBanner, getStoreCate } from '@/api/store'
import { getPageData } from '@/api/public'
export default {
  components: {},
  data() {
    return {
      BaseName: this.BaseName,
      pageData: '',
      list: [],
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
      banner: [
        { id: 1, url: 'https://shop.cdn.dev56.com/assets/images/banner/banner-01.jpg' },
        { id: 2, url: 'https://shop.cdn.dev56.com/assets/images/banner/banner-02.jpg' },
        { id: 3, url: 'https://shop.cdn.dev56.com/assets/images/banner/banner-03.jpg' }
      ]
    }
  },
  mounted() {
    const that = this
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
    this.loadStoreCateBanner()
    that.loadStoreCate()
    that.loadPageData()
  },
  onReady() {
    uni.hideLoading()
  },
  methods: {
    loadPageData() {
      const that = this
      getPageData('cate').then(({ status, data }) => {
        that.pageData = JSON.parse(data.pageData)
      })
    },
    loadStoreCateBanner(){
      const that = this
      getStoreCateBanner().then(res =>{
        that.banner = res.data
      }, err => { console.error(err) })
    },
    loadStoreCate() {
      const that = this
      getStoreCate().then(res => {
        that.list = res.data
      }, err => { console.error(err) })
    },
    onTabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id
      this.mainCur = e.currentTarget.dataset.id
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
    },
    onProduct(item) {
      const url = '/pages/shop/product/index?id=' + item.id + '&title=' + item.cateName
      uni.navigateTo({
        url: url
      })
    },
    VerticalMain(e) {
      // #ifdef MP-ALIPAY
      return false // 支付宝小程序暂时不支持双向联动
      // #endif
      const that = this
      let tabHeight = 0
      if (that.load) {
        for (let i = 0; i < that.list.length; i++) {
          const view = uni.createSelectorQuery().in(that).select('#main-' + i)
          view.fields({ size: true }, (data) => {
            that.list[i].top = tabHeight
            tabHeight = tabHeight + data.height
            that.list[i].bottom = tabHeight
          }).exec()
        }
        that.load = false
      }
      const scrollTop = e.detail.scrollTop + 10
      for (let i = 0; i < that.list.length; i++) {
        if (scrollTop > that.list[i].top && scrollTop < that.list[i].bottom) {
          that.verticalNavTop = i * 50
          that.tabCur = i
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cate {
  .pictrue {
    .image{
      width: 100upx;
      height: 100upx;
      border-radius: 50%;
      border: 1upx solid rgba(0, 0, 0, 0.05);
    }
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
  .item {
    &:first-child {
      margin-top: 0;
    }
  }
}
.cu-list.grid {
  >.cu-item text {
    font-size:20upx;
  }
}
</style>
<style >
  .fixed {
    position: fixed;
    z-index: 99;
  }

  .VerticalNav.nav {
    width: 200upx;
    white-space: initial;
  }

  .VerticalNav.nav .cu-item {
    position: relative;
    width: 100%;
    /* height: 50px; */
    margin: 0;
    text-align: center;
    background-color: #fff;
    border: none;
  }

  .VerticalNav.nav .cu-item.cur {
    background-color: #f1f1f1;
  }

  .VerticalBox {
    display: flex;
  }

</style>
