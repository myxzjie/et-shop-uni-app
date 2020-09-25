<template>
	<!-- <view class="uni-flex tui" style="flex-direction: column;justify-content: space-between;position: relative;">
		<view style="box-sizing: border-box;flex: 1;"  :style="'height:+'+contentHeight+'px'">
			<page-home   :windowHeight="contentHeight" v-if="index=='0'"></page-home>	
			<page-order :winHeight="winHeight"  :contentHeight="contentHeight" v-if="index=='1'"></page-order>
			<page-chat :winHeight="winHeight" :contentHeight="contentHeight"  v-if="index=='2'"></page-chat>
			<page-wode :winHeight="winHeight" :contentHeight="contentHeight" v-if="index=='3'"></page-wode>
		</view>
		<view class="uni-flex tab-bar" style="height: 98upx; border-top:1px solid #DDDDDD;" >
			<view  class="uni-flex-item uni-flex uni-column tui-center" v-for="(item,idx) in bottomNav" :key="idx" @tap="tijiao(idx,item)"  :class="index==idx?'uni-badge-primary uni-badge-inverted':''">
	
					<view class="nav-icon uni-item">
						<view class="tui-nav-badge" style="">
							<view class="uni-badge uni-badge-danger" style="font-size: 0.7em;position: absolute;" v-if="item.msg">
								<text v-if="item.msg>10">…</text>
								<text v-else>{{item.msg}}</text>
							</view>
						</view>
						<view class="uni-item iconfont" style="font-size:1.6em;line-height: 1.3em;" v-html="item.ico"></view>
					</view>
					<view class="uni-item nav-title">
							{{item.name}}
					</view>
			
			</view>
		</view>
</view> -->

<view>

  <view class="tab-bar">
    <view class="line" />
    <view  class="acea-row row-middle">
      <view
        v-for="(item, footerIndex) in footerList"
        :key="footerIndex"
        class="item"
        :class="{ on: footerIndex == active }"
        @click="onSwitchTab(footerIndex)"
      >
        <view
          class="iconfont"
          :class="(footerIndex == active ? item.icon2 : item.icon1 )"
        />
        <view>{{ item.name }}</view>
      </view>
    </view>
  </view>
</view>

</template>
<script>
export default {
  data() {
			return {
				refreshTimeout:0,
				winHeight:0,
				contentHeight:0,
        active:0,
        footerList: [
        {
          name: '首页',
          icon1: 'icon-tab-home',
          icon2: 'icon-tab-home-check',
          url: '/pages/home/main'
        },
        {
          name: '分类',
          icon1: 'icon-tab-cate',
          icon2: 'icon-tab-cate-check',
          url: '/pages/shop/GoodsClass/main'
        },
        {
          name: '资讯',
          icon1: 'icon-tab-information',
          icon2: 'icon-tab-information-check',
          url: '/pages/shop/news/NewsList/main'
        },
        {
          name: '购物车',
          icon1: 'icon-tab-cart',
          icon2: 'icon-tab-cart-check',
          url: '/pages/shop/ShoppingCart/main'
        },
        {
          name: '我的',
          icon1: 'icon-tab-me',
          icon2: 'icon-tab-me-check',
          url: '/pages/user/User/main'
        }
      ]
    }
  },
  methods: {
    onSwitchTab(index){
      this.index=index
    }
  }
}
</script>

<style lang="scss" scoped>
.tui{
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100vw;
}
.uni-flex {
	display: flex;
	flex-direction: row;
}
.uni-flex-item {
	flex: 1;
}

</style>