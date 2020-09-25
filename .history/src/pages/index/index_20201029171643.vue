<template>
	<view class="uni-flex tui" style="flex-direction: column;justify-content: space-between;position: relative;">
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
</view>

</template>
<script>
export default {
  data() {
			return {
				refreshTimeout:0,
				winHeight:0,
				contentHeight:0,
				index:0,
				bottomNav:[
					// 底部按钮数据
					{
						fn:this.tijiao,
						msg:0,
						name:'首页',
						ico:'&#xe98e;',
						url:'/pages/home/index'
					},{
						fn:this.tijiao,
						msg:1,
						name:'订单',
						ico:'&#xe8cd;',
						url:'/pages/order/list'
					},
					{
						fn:this.tijiao,
						msg:23,
						name:'消息',
						ico:'&#xe632;',
						url:'/pages/chat/list'
					},
					{
						fn:this.tijiao,
						msg:0,
						name:'我的',
						ico:'&#xe604;',
						url:'/pages/user/wode'
					}
				]
				
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
.tab-bar{
  position:fixed;
  bottom: 0;
  width: 100vw;
}
</style>