<template>
  <view>
    <view v-if="showTip" class="tips-box" :style="'top:'+ CustomBar +'px'">
      <view class="tips-content" @tap="hideTip">
        <text>{{ tip }}</text>
      </view>
    </view>
  </view>
</template>

<script>
const SHOW_TIP = 'tip_pop'
export default {
  props: {
    tip: {
      type: String,
      default: '点击「添加小程序」,使用便捷',
      required: true
    },
    duration: {
      type: Number,
      default: 5,
      required: false
    }
  },
  data() {
    return {
      CustomBar: this.CustomBar,
      showTip: false
    }
  },
  mounted() {
    this.showTip = !uni.getStorageInfoSync().keys.includes(SHOW_TIP)
    setTimeout(() => {
      this.showTip = false
    }, this.duration * 1000)
  },
  methods: {
    hideTip() {
      uni.setStorageSync(SHOW_TIP, true)
      this.showTip = false
    }
  }
}
</script>

<style lang="scss" scoped>
	$themeColor: var(--green); // #8dc63f; //主题色
	.tips-box {
	  position: fixed;
	  top:0;
	  right: 0;
	  z-index: 99999;
	  opacity: 0.8;
	  display: flex;
	  justify-content: flex-end;
	  align-items: flex-end;
	  flex-direction: column;
	  width: 600upx;
	  animation: opacityC 1s linear infinite;
	}
	.tips-content::before{
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		top:-38upx;
		right:105upx;
		border-width: 20upx;
		border-style: solid;
		display: block;
		border-color:  transparent transparent $themeColor transparent;
	}
	.tips-content {
	  border-width: 0upx;
	  margin-top: 20upx;
	  position: relative;
	  background-color: $themeColor;
	  box-shadow: 0 10upx 20upx -10upx $themeColor;
	  border-radius: 12upx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding: 18upx 20upx;
	  margin-right: 40upx;
	}
	.tips-content > text {
	  color: #fff;
	  font-size: 28upx;
	  font-weight: 400;
	}
	@keyframes opacityC{
		0%{opacity: 0.8;}
		50%{opacity: 1;}
	}
</style>
