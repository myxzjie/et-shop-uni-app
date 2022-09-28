<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang='scss'>
  @import "@/assets/css/base.css";
  @import '@/assets/css/icon.scss';
</style>
<style lang='scss'>
  @import "@/assets/css/reset.css";
</style>
<style lang='scss'>
  @import "@/assets/css/style.css";
</style>
<style>
  @import '@/assets/iconfont/iconfont.wxss';
</style>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<style>
  @import 'colorui/main.css';
  @import 'colorui/icon.css';
	/*每个页面公共css */
	/* #ifdef MP-WEIXIN */
	  page {
		height: 100%;
	  }
	  /* #endif */
	  /* 2021-03-10 */
	  .nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 40upx 0;
		justify-content: space-between;
	  }

	  .nav-li {
		position: relative;
		z-index: 1;
		width: 45%;
		padding: 30upx;
		margin: 0 2.5% 40upx;
		background: #fff;
		background-position: center;
		background-size: cover;
		border-radius: 12upx;
	  }

	  .nav-li::after {
		position: absolute;
		bottom: -10%;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: inherit;
		border-radius: 10upx;
		content: '';
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	  }

	  .nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	  }

	  .nav-title {
		font-size: 32upx;
		font-weight: 300;
	  }

	  .nav-title::first-letter {
		margin-right: 4upx;
		font-size: 40upx;
	  }

	  .nav-name {
		position: relative;
		margin-top: 20upx;
		font-size: 28upx;
		text-transform: capitalize;
	  }

	  .nav-name::before {
		position: absolute;
		right: 0;
		bottom: 0;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		content: '';
		opacity: 0.5;
	  }

	  .nav-name::after {
		position: absolute;
		right: 40upx;
		bottom: 0;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		content: '';
		opacity: 0.3;
	  }

	  .nav-name::first-letter {
		margin-right: 1px;
		font-size: 36upx;
		font-weight: bold;
	  }

	  .nav-li text {
		position: absolute;
		top: 30upx;
		right: 30upx;
		width: 60upx;
		height: 60upx;
		font-size: 52upx;
		line-height: 60upx;
		text-align: center;
	  }

	  .text-light {
		font-weight: 300;
	  }

	  @keyframes show {
		0% {
		  transform: translateY(-50px);
		}

		60% {
		  transform: translateY(40upx);
		}

		100% {
		  transform: translateY(0);
		}
	  }

	  @-webkit-keyframes show {
		0% {
		  transform: translateY(-50px);
		}

		60% {
		  transform: translateY(40upx);
		}

		100% {
		  transform: translateY(0);
		}
	  }
</style>
