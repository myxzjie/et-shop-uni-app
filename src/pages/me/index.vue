<template>
  <view>
    <scroll-view scroll-y class="scrollPage">
      <view class="u-center" :style="{'padding-top':CustomBar + 'px'}">
        <view class="user">
          <view class=" flex flex-wrap align-between padding">
            <view class="flex flex-wrap align-between">
              <view class="pictrue">
                <image :src="userInfo.avatar" class="avatar" mode="widthFix" />
              </view>
              <view class="text-white padding-left">
                <view>
                  <view class="name text-lg">{{ userInfo.nickname }}</view>
                  <view class="flex flex-wrap row-middle">
                    <view v-if="userInfo.vip" class="member flex flex-wrap row-middle">
                      <image :src="userInfo.vipIcon" mode="widthFix" />
                      {{ userInfo.vipName }}
                    </view>
                    <view v-if="userInfo.roleGrade" class="member flex flex-wrap row-middle">
                      {{ userInfo.roleGradeName }}
                    </view>
                  </view>
                </view>
                <navigator
                  v-if="userInfo.phone"
                  class="id"
                  url="/pages/user/PersonalData/main"
                >
                  ID：{{ userInfo.uid || 0
                  }}
                  <text class="cuIcon-phone" />
                </navigator>
                <navigator v-else class="binding" url="/pages/user/BindingPhone/main">
                  <text>绑定手机号</text>
                </navigator>
              </view>
            </view>
            <view>
              <navigator url="/pages/user/PersonalData/main" hover-class="none">
                <text
                  class="cuIcon-settingsfill text-white"
                />
              </navigator>
            </view>
          </view>
        </view>

        <!-- <image :src="userInfo.avatar" class="avatar" mode="widthFix" />
        <view class="text-xl">{{ userInfo.nickname }}
          <text v-if="userInfo.vip" class="text-df">
            <image :src="userInfo.vipIcon" />
            {{ userInfo.vipName }}
          </text>

          <text v-if="userInfo.roleGrade" class="member acea-row row-middle">
            {{ userInfo.roleGradeName }}
          </text>
        </view>
        <view class="margin-top-sm">
          <text><view
                  v-if="userInfo.phone"
                  class="id"
                  @click="$router.push('/pages/user/PersonalData/main')"
                >
                  ID：{{ userInfo.uid || 0
                  }}
                  <text class="cuIcon-phone" />
                </view>
            <view v-else class="binding" @click="$router.push('/pages/user/BindingPhone/main')">
              <text>绑定手机号</text>
            </view>
          </text>
        </view> -->
        <image src="@/static/wave.gif" mode="scaleToFill" class="gif-wave" />
      </view>

      <view class="padding flex text-center text-grey bg-white shadow-warp">
        <navigator class="flex flex-sub flex-direction solid-right" url="/pages/me/account/index" hover-class="none">
          <view class="text-xxl text-orange">{{ userInfo.nowMoney || 0 }}</view>
          <view class="margin-top-sm">
            <!-- <text class="cuIcon-attentionfill" />  -->
            我的余额
          </view>
        </navigator>
        <navigator v-if="userInfo.isPromoter === 1 || userInfo.statu === 2" class="flex flex-sub flex-direction solid-right" url="/pages/user/promotion/UserPromotion/main" hover-class="none">
          <view class="text-xxl text-blue">{{ userInfo.brokeragePrice || 0 }}</view>
          <view class="margin-top-sm">
            <!-- <text class="cuIcon-favorfill" />  -->
            当前佣金
          </view>
        </navigator>
        <navigator class="flex flex-sub flex-direction" url="/pages/user/signIn/Integral/main" hover-class="none">
          <view class="text-xxl text-green">{{ userInfo.integral || 0 }}</view>
          <view class="margin-top-sm">
            <!-- <text class="cuIcon-fork" />  -->
            当前积分
          </view>
        </navigator>

        <navigator class="flex flex-sub flex-direction" url="/pages/user/gold/gold-record/main" hover-class="none">
          <view class="text-xxl text-green">{{ userInfo.gold || 0 }}</view>
          <view class="margin-top-sm">
            <!-- <text class="cuIcon-fork" />  -->
            核销金
          </view>
        </navigator>

        <navigator class="flex flex-sub flex-direction" url="/pages/user/coupon/UserCoupon/main" hover-class="none">
          <view class="text-xxl text-green">{{ userInfo.couponCount || 0 }}</view>
          <view class="margin-top-sm">优惠券</view>
        </navigator>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action"> <text class="cuIcon-title text-orange " /> 我的订单 </view>
        <navigator class="action" url="/pages/order/MyOrder/main" hover-class="none">
          <text>全部订单</text>
          <text class="cuIcon-right" />
        </navigator>
      </view>

      <view class="cu-list grid col-5 no-border">
        <view class="cu-item" url="/pages/order/MyOrder/main?type=0" hover-class="none">
          <view class="cuIcon-pay text-red">
            <view v-if="orderStatusNum.unpaidCount > 0" class="cu-tag badge">
              <block>{{ orderStatusNum.unpaidCount }}</block>
            </view>
          </view>
          <text>待付款</text>
        </view>

        <view class="cu-item" url="/pages/order/MyOrder/main?type=1" hover-class="none">
          <view class="cuIcon-send text-red">
            <view v-if="orderStatusNum.unshippedCount > 0" class="cu-tag badge">
              <block>{{ orderStatusNum.unshippedCount }}</block>
            </view>
          </view>
          <text>待发货</text>
        </view>

        <view class="cu-item" url="/pages/order/MyOrder/main?type=2" hover-class="none">
          <view class="cuIcon-deliver text-red">
            <view v-if="orderStatusNum.receivedCount > 0" class="cu-tag badge">
              <block>{{ orderStatusNum.receivedCount }}</block>
            </view>
          </view>
          <text>待收货</text>
        </view>

        <view class="cu-item" url="/pages/order/MyOrder/main?type=3" hover-class="none">
          <view class="cuIcon-evaluate text-red">
            <view v-if="orderStatusNum.evaluatedCount > 0" class="cu-tag badge">
              <block>{{ orderStatusNum.evaluatedCount }}</block>
            </view>
          </view>
          <text>待评价</text>
        </view>

        <view class="cu-item" url="/pages/order/ReturnList/main" hover-class="none">
          <view class="cuIcon-friendfavor text-red">
            <view v-if="orderStatusNum.refundCount > 0" class="cu-tag badge">
              <block>{{ orderStatusNum.refundCount }}</block>
            </view>
          </view>
          <text>售后/退款</text>
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action"> <text class="cuIcon-title text-orange " /> 我的服务 </view>
      </view>

      <view class="service cu-list grid col-4 no-border">
        <view v-for="(item, index) in MyMenus" :key="index" class="cu-item">
          <!-- <view class="cuIcon-cardboardfill text-red">
            <view class="cu-tag badge">
              <block>99</block>
            </view>
          </view> -->
          <view class="pictrue">
            <image :src="item.pic" mode="widthFix" />
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view>

      <view class="margin-top text-center">
        <view>© 2019-2020 鹰视科技·技术支持</view>
        <view> 闽ICP备2020018444号-1</view>
      </view>

      <view class="cu-tabbar-height" />

      <!---->

      <!-- <SwitchWindow
      :switch-active="switchActive"
      :login_type="userInfo.login_type"
      @changeswitch="changeswitch"
    /> -->
    </scroll-view>
  </view>
</template>
<script>
import { resURL } from '@/utils/config'
import { getUser, getMenuUser, getUserInfo } from '@/api/user'

// import SwitchWindow from '@components/SwitchWindow'

export default {
  components: {
    // SwitchWindow
  },
  data() {
    return {
      CustomBar: this.CustomBar,
      userInfo: {},
      orderStatusNum: {},
      MyMenus: [],
      switchActive: false,
      isWeixin: false,
      // images: {
      //   payment: resURL + '/assets/images/payment.png',
      //   deliver: resURL + '/assets/images/deliver.png',
      //   receive: resURL + '/assets/images/receive.png',
      //   appraise: resURL + '/assets/images/appraise.png',
      //   postSale: resURL + '/assets/images/post-sale.png'
      // },
      orderState: [
        {
          index: 0,
          type: 0,
          path: '/pages/order/MyOrder/main',
          name: '待付款',
          image: '',
          count: 0
        },
        {
          index: 1,
          type: 1,
          path: '/pages/order/MyOrder/main',
          name: '待发货',
          image: '',
          count: 0
        }
      ]
    }
  },
  // watch: {
  //   $route(n) {
  //     if (n.name === NAME) this.User()
  //   }
  // },
  // mounted() {
  //   this.User()
  //   this.MenuUser()
  //   this.loadUserInfo()
  //   this.isWeixin = isWeixin()
  // },
  mounted() {
  //   this.isWeixin = isWeixin()
    const that = this
    that.loadUser()
    that.loadMenuUser()
  },
  methods: {
    changeswitch: function(data) {
      this.switchActive = data
    },
    loadUser() {
      const that = this
      getUser().then(res => {
        that.userInfo = res.data
        that.orderStatusNum = res.data.orderStatusNum
      })
    },
    loadMenuUser: function() {
      const that = this
      getMenuUser().then(res => {
        that.MyMenus = res.data.routine_my_menus
      })
    },
    loadUserInfo() {
      getUserInfo().then(res => {

      })
    },
    goPages: function(index) {
      const url = this.MyMenus[index].wxapp_url
      // console.log('user:'+this.userInfo.statu)
      if (
        url === '/pages/user/promotion/UserPromotion/main' &&
        this.userInfo.statu === 1
      ) {
        if (!this.userInfo.isPromoter) { return this.$dialog.toast({ mes: '您还没有推广权限！！' }) }
      }

      if (
        url === '/pages/orderAdmin/OrderIndex/main' &&
        !this.userInfo.adminid
      ) {
        return this.$dialog.toast({ mes: '您还不是管理员！！' })
      }

      this.$router.push({ path: this.MyMenus[index].wxapp_url })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-center {
  background-image: url('/static/bg.jpg');
  // background-size: cover;
  // height: 550rpx;
  // display: flex;
  // justify-content: center;
  // padding-top: 40rpx;
  // overflow: hidden;
  position: relative;
  // flex-direction: column;
  // align-items: center;
  // color: #fff;
  // font-weight: 300;
  // text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  text {
    opacity: 0.8;
  }
  .avatar {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
  }
  .user {
    .cuIcon-settingsfill {
      font-size: 72upx;
    }
    .pictrue {
      .avatar{
        width: 160upx;
        height: 160upx;
      }
    }
    .binding {
      margin-top:10upx;
      padding: 3upx 10upx;
      background-color: #ca1f10;
      border-radius: 50px;
      font-size: 18upx;
      border: 1px solid #e8695e;
      color: #ffffff;
    }
  }
  .gif-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100rpx;
    mix-blend-mode: screen;
  }
}

.service {
  .cu-item {
    .pictrue {
      > image {
        width: 100upx;
        height: 100upx;
      }
    }
  }
}

.footer-line-height {
  height: 1rem;
}
.order-status-num {
  min-width: 0.8rem;
  background-color: #fff;
  color: #73cbb6;
  border-radius: 50%;
  position: absolute;
  right: -0.14rem;
  top: -0.15rem;
  font-size: 0.5rem;
  padding: 0.01rem 0.08rem 0;
  border: 1px solid #73cbb6;
}

.switch-h5 {
  margin-left: 0.2rem;
}

</style>
