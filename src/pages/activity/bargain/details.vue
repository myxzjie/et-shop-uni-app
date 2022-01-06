<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="bargain bg-gray">
        <!-- 在header上加 on 为请求支援 -->
        <view class="text-blue" :class="[bargainPartake != userInfo.uid ? 'header on' : 'header']">
          <view class="people padding-tb">{{ lookCount }}人查看 丨 {{ shareCount }}人分享 丨 {{ userCount }}人参与</view>
          <!-- 帮助砍价、帮砍成功：-->
          <!-- <view v-if="bargainPartake != userInfo.uid" class="pictxt acea-row row-center-wrapper">
            <view class="pictrue">
              <img :src="bargainUserInfo.avatar">
            </view>
            <view class="text">
              {{ bargainUserInfo.nickname }}
              <span>邀请您帮忙砍价</span>
            </view>
          </view> -->
          <count-down
            :is-day="true"
            :tip-text="'倒计时 '"
            :day-text="' 天 '"
            :hour-text="' 时 '"
            :minute-text="' 分 '"
            :second-text="' 秒'"
            :datatime="datatime"
          />
        </view>
        <view class="wrapper product margin-lr padding-ms">
          <view class="flex flex-wrap row-between padding-sm">
            <view class="pictrue">
              <image :src="bargain.image" />
            </view>
            <view class="content text-black flex flex-wrap row-column-around">
              <view class="ellipsis-line text-bold" v-text="bargain.title" />
              <view class="money text-cyan">
                已砍至: ￥
                <span class="num" v-text="price" />
              </view>
              <view class="text-grey flex flex-wrap row-middle">
                <view class="successNum" v-text="'原价' + bargain.price" />
                <view class="successNum" v-text="'已有' + bargainSumCount + '人砍价成功'" />
              </view>
            </view>
          </view>
          <view class="margin-lr-sm">
            <view class="cu-progress round sm">
              <view class="bg-red" :style="[{ width: loading ? pricePercent + '%' : '' }]" />
            </view>

            <view class="flex flex-wrap align-between text-grey text-xs margin-top-xs">
              <view v-text="'已砍' + alreadyPrice + '元'" />
              <view v-if="surplusPrice === 0">砍价成功</view>
              <view v-else v-text="'还剩' + surplusPrice + '元'" />
            </view>
          </view>

          <!-- 帮助砍价、帮砍成功：-->
          <!--<view class='bargainSuccess'><span class='iconfont icon-xiaolian'></span>已成功帮助好友砍价</view>-->
          <view class="margin-sm text-center padding-top">
            <button
              v-if="bargainPartake === userInfo.uid && surplusPrice > 0"
              class="cu-btn block round bg-gradual-orange margin-top-sm"
              open-type="share"
            >邀请好友帮砍价</button>

            <button
              v-else-if="bargainPartake != userInfo.uid"
              class="cu-btn block round bg-gradual-orange margin-top-sm"
              @click="getBargainHelp"
            >帮好友砍一刀</button>
            <button v-if="bargainPartake != userInfo.uid" class="cu-btn block round bg-gradual-orange margin-top-sm" @click="getBargainStart">开启砍价</button>

            <!-- 立即支付 -->
            <button
              v-if="surplusPrice === 0 && bargainPartake === userInfo.uid && userBargainStatus === 1"
              class="cu-btn block round bg-gradual-orange margin-top-sm"
              @click="goPay"
            >立即支付</button>

            <view class="cu-btn block round line-cyan margin-top-sm" @tap="goList">抢更多商品</view>
          </view>
          <view class="margin-bottom text-grey text-center">
            已有
            <text class="text-red" v-text="helpCount" />
            位好友成功帮您砍价
          </view>
          <view class="lock" />
        </view>

        <view class="bargainGang margin-lr margin-top-sm padding-ms">
          <view class="title text-sm text-bold text-cyan flex flex-wrap align-center margin-top">
            <view class="pictrue">
              <image :src="images.left" /></view>
            <view class="titleCon">砍价帮</view>
            <view class="pictrue on">
              <image :src="images.left" /></view>
          </view>
          <view class="list">
            <view
              v-for="(item, bargainHelpListIndex) in bargainHelpList"
              :key="bargainHelpListIndex"
              class="item acea-row row-between-wrapper"
            >
              <view class="pictxt acea-row row-between-wrapper">
                <view class="pictrue">
                  <image :src="item.avatar" /></view>
                <view class="text">
                  <view class="name line1" v-text="item.nickname" />
                  <view class="line1" v-text="item.add_time" />
                </view>
              </view>
              <view class="money font-color-red">
                <span class="iconfont icon-kanjia" />
                砍掉{{ item.price }}元
              </view>
            </view>
          </view>
          <view
            v-if="!helpListStatus && !helpListLoading"
            class="text-sm text-cyan text-center margin-tb-sm"
            @click="getBargainHelpList"
          >点击加载更多</view>
          <view class="lock" />
        </view>

        <view class="goodsDetails margin-lr margin-top-sm padding-ms">
          <view class="title text-sm text-bold text-cyan flex flex-wrap align-center margin-top">
            <view class="pictrue">
              <image :src="images.left" /></view>
            <view class="titleCon">商品详情</view>
            <view class="pictrue on">
              <image :src="images.left" /></view>
          </view>
          <view class="margin-tb-sm margin-lr" v-html="bargain.description" />
          <view class="lock" />
        </view>
        <view class="goodsDetails margin-lr margin-top-sm padding-ms">
          <view class="title text-sm text-bold text-cyan flex flex-wrap align-center margin-top">
            <view class="pictrue">
              <image :src="images.left" /></view>
            <view class="titleCon">活动规则</view>
            <view class="pictrue on">
              <image :src="images.left" /></view>
          </view>
          <view class="margin-tb-sm margin-lr" v-html="bargain.rule" />
        </view>
        <view class="bargainTip" :class="active === true ? 'on' : ''">
          <view class="pictrue">
            <img :src="images.bargainBg">
            <view class="iconfont icon-guanbi" @click="close" />
          </view>
          <view v-if="bargainPartake === userInfo.uid" class="cutOff">
            您已砍掉
            <span class="font-color-red" v-text="bargainHelpPrice" />元，听说分享次数越多砍价成功的机会越大哦！
          </view>
          <view v-else class="cutOff on">
            <view class="help font-color-red" v-text="'成功帮砍' + bargainHelpPrice + '元'" />，您也可以砍价低价拿哦，快去挑选心仪的商品吧~
          </view>

          <button v-if="bargainPartake === userInfo.uid" class="tipBnt" open-type="share">邀请好友帮砍价</button>
          <button v-else class="tipBnt" @tap="getBargainStart">我也要参与</button>
        </view>
        <view class="mask" :hidden="active === false" @touchmove.prevent @click="close" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
import CountDown from '@/components/count-down'
import {
  getBargainDetail,
  getBargainShare,
  getBargainStart,
  getBargainHelp,
  getBargainHelpPrice,
  getBargainHelpList,
  getBargainHelpCount,
  getBargainStartUser
} from '@/api/activity'
import { postCartAdd } from '@/api/store'
import { mapGetters } from 'vuex'
export default {
  components: {
    CountDown
  },
  data() {
    return {
      price: 0,
      bargainId: 0, // 砍价编号
      bargainPartake: 0, // 参与砍价
      bargain: [], // 砍价产品信息
      partake: null,
      bargainSumCount: 0, // 砍价成功人数
      activeMsg: '',
      active: false,
      loading: false,
      datatime: 0,
      lookCount: 0, // 查看人数
      shareCount: 0, // 分享人数
      userCount: 0, // 参与人数
      bargainHelpPrice: 0, // 砍掉金额
      bargainHelpList: [],
      helpListStatus: false, // 砍价列表是否获取完成 false 未完成 true 完成
      helpListLoading: false, // 当前接口是否请求完成 false 完成 true 未完成
      page: 1, // 页码
      limit: 2, // 数量
      helpCount: 0, // 砍价帮总人数
      surplusPrice: 0, // 剩余金额
      alreadyPrice: 0, // 已砍掉价格
      pricePercent: 0, // 砍价进度条
      bargainUserInfo: [], // 砍价 开启砍价用户信息
      userBargainStatus: 2, // 砍价状态,
      images: {
        bargainBg: 'https://shop.cdn.dev56.com/assets/images/bargainBg.jpg',
        left: 'https://shop.cdn.dev56.com/assets/images/left.png'
      }
    }
  },
  computed: { ...mapGetters(['userInfo']) },
  watch: {},
  mounted(options) {
    console.log('mounted options>', options)
  },
  onLoad(options) {
    const that = this
    that.mountedStart(options)
    setTimeout(() => {
      that.loading = true
    }, 500)
  },
  onShow() {

  },
  methods: {
    mountedStart(options) {
      const that = this
      if (options) {
        that.bargainId = options.id
        that.partake = options.partake
      } else {
        that.bargainId = that.$route.query.id
        that.partake = parseInt(that.$route.query.partake)
      }
      console.log('>>' + that.bargainId + that.partake)
      // partake == 0 不是分享
      if (this.partake === undefined || this.partake <= 0 || isNaN(this.partake)) {
        that.bargainPartake = that.userInfo.uid
      } else {
        that.bargainPartake = parseInt(this.partake)
      }
      that.getBargainDetail()
      that.getBargainShare(0)
      if (that.bargainPartake === that.userInfo.uid) {
        that.getBargainStart()
      } else {
        that.getBargainStartUser()
      }
    },
    goPay() {
      const that = this
      const data = {}

      data.productId = that.bargain.productId
      data.cartNum = that.bargain.num
      data.uniqueId = ''
      data.bargainId = that.bargainId
      data.new = 1
      postCartAdd(data).then(res => {
        uni.navigateTo({
          url: `/pages/order/submit/index?ids=${res.data.cartId}`
        })
      }).catch(err => {
        uni.showToast({
          title: err.response.data.msg,
          icon: 'none',
          duration: 2000
        })
      })
    },
    goList() {
      uni.navigateTo({
        url: '/pages/activity/bargain/index'
      })
    },
    // 砍价分享
    // bargainId 0  获取 查看人数 分享人数 参与人数
    // bargainId 砍价产品编号 添加分享次数  获取 查看人数 分享人数 参与人数
    getBargainShare: function(bargainId) {
      var that = this
      getBargainShare({ bargainId: bargainId }).then(res => {
        that.lookCount = res.data.lookCount
        that.shareCount = res.data.shareCount
        that.userCount = res.data.userCount
      })
    },
    // 获取产品详情
    getBargainDetail() {
      const that = this
      getBargainDetail(that.bargainId)
        .then(res => {
          that.$set(that, 'bargain', res.data.bargain)
          that.datatime = that.bargain.stopTime
          that.getBargainHelpCount()
        }).catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    // 开启砍价
    getBargainStart() {
      const that = this
      getBargainStart({ bargainId: that.bargainId })
        .then(() => {
          that.bargainPartake = that.userInfo.uid
          that.getBargainHelp()
        })
        .catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    // 参与砍价
    getBargainHelp() {
      const that = this
      if (that.surplusPrice === 0 && that.bargainPartake !== that.userInfo.uid) {
        debugger
        uni.showToast({
          title: '好友已经砍价成功',
          icon: 'success',
          duration: 2000
        })
        return
      }
      const data = {
        bargainId: that.bargainId,
        bargainUserUid: that.bargainPartake
      }
      getBargainHelp(data).then(res => {
        that.activeMsg = res.data.status
        if (res.data.status === 'SUCCESSFUL' && that.bargainPartake !== that.userInfo.uid) {
          debugger
          uni.showToast({ title: '您已经砍过了' })
          return
        }
        that.helpListStatus = false
        that.page = 1
        that.bargainHelpList = []
        // 获取砍掉的金额
        that.getBargainHelpPrice()
      })
        .catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    // 获取砍掉的金额
    getBargainHelpPrice() {
      const that = this
      getBargainHelpPrice({ bargainId: that.bargainId, bargainUserUid: that.bargainPartake })
        .then(res => {
          that.bargainHelpPrice = res.data.price
          that.getBargainHelpCount()
          that.getBargainHelpList()
          switch (that.activeMsg) {
            case 'SUCCESSFUL':
              break
            case 'SUCCESS':
              that.active = true
              break
          }
        })
        .catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    // 砍价帮
    getBargainHelpList() {
      var that = this
      if (that.helpListLoading === true) return
      if (that.helpListStatus === true) return
      that.helpListLoading = true
      getBargainHelpList({
        bargainId: that.bargainId,
        bargainUserUid: that.bargainPartake,
        page: that.page,
        limit: that.limit
      })
        .then(res => {
          that.helpListStatus = res.data.length < that.limit
          that.helpListLoading = false
          that.page++
          that.bargainHelpList.push.apply(that.bargainHelpList, res.data)
        })
        .catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    getBargainHelpCount() {
      const that = this
      const params = { bargainId: that.bargainId, bargainUserUid: that.bargainPartake }
      getBargainHelpCount(params).then(res => {
        that.userBargainStatus = res.data.status
        that.helpCount = res.data.count
        that.surplusPrice = res.data.price
        that.alreadyPrice = res.data.alreadyPrice
        that.pricePercent = res.data.pricePercent
        that.price = (that.bargain.price - that.alreadyPrice).toFixed(2)
      })
        .catch(() => {
          that.bargainPartake = that.userInfo.uid
        })
    },
    getBargainStartUser() {
      const that = this
      getBargainStartUser({
        bargainId: that.bargainId,
        bargainUserUid: that.bargainPartake
      })
        .then(res => {
          that.bargainUserInfo = res.data
          that.getBargainHelpList()
        })
        .catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    close() {
      this.active = false
    }
  },
  onShareAppMessage(options) {
    const that = this
    const price = that.bargain.price
    let title = '砍价求助'
    if ((price * 0.3) >= that.surplusPrice) {
      title = '还差[¥' + that.surplusPrice + ']即可砍价成功'
    }
    const uri = `/pages/activity/bargain/details?id=${that.bargainId}&partake=${that.bargainPartake}`

    return {
      title: title,
      path: uri,
      success: (res) => {
        console.log('>>>success', res)
      },
      fail: (err) => {
        console.error('>>>fail', err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: rgb(233, 51, 35)!important;
}
.product {
  .pictrue {
    > image {
      width: 160upx;
      height: 160upx;
      border-radius: 5upx;
      border: 1upx solid #282828;
    }
  }
  .content {
    width: calc(100% - 160upx);
    padding-left: 20upx
  }
}

  .lock {
    background-image: url(https://shop.cdn.dev56.com/assets/images/lock.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 90%;
    height: 70rpx;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: -50upx;
    z-index: 5;
  }

.bargain .bargainGang .title .pictrue image,
.bargain .goodsDetails .title .pictrue image {
  width: 30upx;
  height: 20upx;
}

.bargainBnts {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
