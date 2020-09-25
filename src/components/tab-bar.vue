<!--
    @时间：2020-03-16
    @描述：自定义底部导航栏
    @使用：
        在main.js全部引入：
            import tabBar from "@/pages/common/tabBar.vue"
            Vue.component('tabBar', tabBar)

        在需要显示的页面底部添加：
        <view>
            <view>这里是页面内容代码区域</view>
　　　　　　　// 其中uni-p-b-98是公共样式类名，表示padding-bottom: 98upx;  设置的98upx是和底部导航栏的高度保持一致，页面的内容就不会被底部导航遮挡住啦
            <view class="uni-p-b-98"></view>
　　　　　　　// 最后引入自定义组件，并传当前栏目对应的pagePath到自定义组件，显示当前栏目的选中样式
            <tabBar :pagePath="'/pages/tabBar/home/home'"></tabBar>
        </view>
 -->
<template>
  <view class="uni-tabbar">
    <view v-for="(item,index) in list" :key="index" class="uni-tabbar__item" @tap="changeTab(item)">
      <view class="icon" :class="[item.fontIcon , item.pagePath == pagePath?'uni-active':'']" />
      <!-- 上面使用的是字体图标，解决切换页面的时候图标会闪的效果，毕竟每切换一个页面都会闪一下不太好看，可以切换使用下面的图片方式 -->
      <view v-if="false" class="uni-tabbar__bd">
        <view class="uni-tabbar__icon">
          <image v-if="item.pagePath == pagePath" class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.selectedIconPath" />
          <image v-else class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.iconPath" />
        </view>
      </view>
      <view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: { type: [Number, String], default: 0 },
    pagePath: null,
    tabBar: { type: [Array, Object], default: [] }
  },
  data() {
    return {
      tabIndex: this.current,
      page: 'contact',
      showPage: false,
      containerHeight: 400,
      list: this.tabBar
    }
  },
  mounted() {
    // true为判断条件，根据实际的需求替换即可
    // if (true) {
    //   this.tabbar.splice(1, 0,
    //     {
    //       'pagePath': '/pages/tabBar/manage/manage',
    //       'iconPath': '/static/tabBar/home.png',
    //       'selectedIconPath': '/static/tabBar/home_col.png',
    //       'text': '管理',
    //       'fontIcon': 'icon-guanli'
    //     }
    //   )
    // }
  },
  methods: {
    switchTab(index) {
      this.tabIndex = index
      this.$emit('click', index)
    },
    changeTab(item) {
      this.page = item.pagePath
      // 这里使用reLaunch关闭所有的页面，打开新的栏目页面
      uni.reLaunch({
        url: this.page
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
