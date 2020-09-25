<template>
	<view class="uni-flex tui" style="flex-direction: column;justify-content: space-between;position: relative;">
		<view style="box-sizing: border-box;flex: 1;"  :style="'height:+'+contentHeight+'px'">
			<page-home   :windowHeight="contentHeight" v-if="index=='0'"></page-home>	
			<page-order :winHeight="winHeight"  :contentHeight="contentHeight" v-if="index=='1'"></page-order>
			<page-chat :winHeight="winHeight" :contentHeight="contentHeight"  v-if="index=='2'"></page-chat>
			<page-wode :winHeight="winHeight" :contentHeight="contentHeight" v-if="index=='3'"></page-wode>
		</view>
		<view class="uni-flex" style="height: 98upx; border-top:1px solid #DDDDDD;" >
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
  
}
</script>