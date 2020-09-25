<template>
  <view class="container index">
    <!-- 小程序头部兼容 -->
    <!-- #ifdef MP||H5 -->
    <view class="header acea-row row-center-wrapper">
      <!-- <uni-search-bar :radius="100" placeholder="搜索商品" @confirm="search"></uni-search-bar> -->
      <view class="search acea-row row-middle" @click="onSearch">
        <icon type="search" size="34rpx" />
        <text>搜索商品</text>
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
      <view
        v-for="(item, menusIndex) in navigations"
        :key="menusIndex"
        class="item"
        @click="$router.push(item.wxapp_url)"
      >
        <view class="pictrue">
          <image :src="item.pic" />
        </view>
        <view>{{ item.name }}</view>
      </view>
    </view>

    <!---->
    <view class="news acea-row row-left">
      <view class="pictrue">
        <image :src="noticeImage" show-menu-by-longpress />
      </view>
      <view class="swiper-no-swiping new-banner">
        <swiper v-if="roll.length > 0" class="swiper-wrapper" :indicator-dots="false" autoplay circular vertical>
          <block v-for="(item, rollIndex) in roll" :key="rollIndex">
            <swiper-item class="swiper-slide">
              <view
                class="swiper-item acea-row row-between-wrapper"
                @click="item.url?$router.push(item.url) : ''"
              >
                <view class="text acea-row row-between-wrapper">
                  <view v-if="item.show === '是'" class="label">最新</view>
                  <view class="newsTitle line1">{{ item.info }}</view>
                </view>
                <view class="iconfont icon-xiangyou" />
              </view>
            </swiper-item>
          </block>
        </swiper>
      </view>
    </view>

    <!---->
    <view v-if="bast.length > 0" class="wrapper">
      <view class="title acea-row row-between-wrapper">
        <view class="text">
          <view class="name line1">精品推荐</view>
        </view>
        <view
          class="more"
          @click="$router.push({ path: '/pages/shop/HotNewGoods/main',query:{type:1} })"
        >
          更多
          <span class="iconfont icon-jiantou" />
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
            <span class="new font-color-red">HOT~</span>
          </view>
        </view>
        <view
          class="more"
          @click="$router.push({ path: '/pages/shop/HotNewGoods/main',query:{type:2} })"
        >
          更多
          <span class="iconfont icon-jiantou" />
        </view>
      </view>
      <good-list :list="hot" :is-sort="false" />
    </view>

    <!-- <tab-bar :current="tabIndex" :tabBar="tabbar" @click="onSwitchTab" /> -->

  </view>
</template>

<script>
import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog'

import { resURL } from '@/utils/config'
import { uniSearchBar, uniNoticeBar } from '@dcloudio/uni-ui'
import { getHomeData } from '@/api/public'
import goodList from '@/components/shop/good-list'
export default {
  components: { uniSearchBar, uniNoticeBar, goodList },
  data() {
    return {
      tabInde: 0,
      tabbar: [
        {
          'pagePath': '/pages/home/index',
          'iconPath': '/static/tabBar/home.png',
          'selectedIconPath': '/static/tabBar/home_col.png',
          'text': '首页',
          'fontIcon': 'icon-shouye'
        },
        // 这里是要动态切换的栏目，先隐藏，动态追加
        // {
        //     "pagePath": "/pages/tabBar/manage/manage",
        //     "iconPath": "/static/tabBar/home.png",
        //     "selectedIconPath": "/static/tabBar/home_col.png",
        //     "text": "管理",
        //     "fontIcon": "icon-guanli"
        // },
        {
          'pagePath': '/pages/tabBar/person/person',
          'iconPath': '/static/tabBar/person.png',
          'selectedIconPath': '/static/tabBar/person_col.png',
          'text': '我的',
          'fontIcon': 'icon-wode'
        }
      ],
      //
      noticeImage: resURL + '/assets/images/notice.png',
      banner: [],
      navigations: [],
      roll: [],
      bast: [],
      hot:[]
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
        that.hot = data.
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
