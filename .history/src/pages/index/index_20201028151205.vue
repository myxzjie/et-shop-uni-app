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
      <swiper v-if="banner.length > 0" indicator-dots="true">
        <block v-for="(item, bannerIndex) in banner" :key="bannerIndex">
          <swiper-item>
            <view class="swiper-item" @click="item.url?$router.push('/'+item.url) : ''">
              <img :src="item.pic">
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>

    <!-- <tab-bar :current="tabIndex" :tabBar="tabbar" @click="onSwitchTab" /> -->

  </view>
</template>

<script>
import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog'

import conf from '@/utils/config'
import { uniSearchBar } from '@dcloudio/uni-ui'
import { getHomeData } from '@/api/public'

export default {
  components: { uniSearchBar },
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
      ]
    }
  },
  onLoad() {
    getHomeData().then(res => {
      debugger
    },err => {

    })
    // Dialog.alert({
    //   title: '标题',
    //   message: '弹窗内容'
    // }).then(() => {
    //   // on close
    // });
  },
  onShow() {
    console.log('App Show')
    const that = this
    debugger
     getHomeData().then(res => {
      debugger
    },err => {

    })
  },
  methods: {
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

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
