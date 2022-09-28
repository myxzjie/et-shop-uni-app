<template>
  <view>
    <cu-custom :is-back="false" bg-color="bg-gradual-green">
      <!-- <block slot="backText">返回</block> -->
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="user">
        <view class="header bg-gradual-green acea-row row-between-wrapper">
          <view class="picTxt acea-row row-between-wrapper">
            <view class="pictrue">
              <img :src="userInfo.avatar">
            </view>
            <view class="text">
              <view>
                <view class="name line1">{{ userInfo.nickname }}</view>
                <view class="acea-row row-middle">
                  <view v-if="userInfo.vip" class="member acea-row row-middle">
                    <image :src="userInfo.vipIcon" />
                    {{ userInfo.vipName }}
                  </view>
                  <view v-if="userInfo.roleGrade" class="member acea-row row-middle">
                    {{ userInfo.roleGradeName }}
                  </view>
                </view>
              </view>
              <view
                v-if="userInfo.phone"
                class="id"
                @click="$router.push('/pages/user/PersonalData/main')"
              >
                ID：{{ userInfo.uid || 0
                }}
                <span class="iconfont icon-bianji1" />
              </view>
              <view v-else class="binding" @click="$router.push('/pages/user/BindingPhone/main')">
                <span>绑定手机号</span>
              </view>
            </view>
          </view>
          <span
            class="iconfont icon-shezhi"
            @click="$router.push({ path: '/pages/user/PersonalData/main' })"
          />
        </view>
        <view class="wrapper">
          <view class="nav acea-row row-middle">
            <view class="item" @click="$router.push({ path: '/pages/user/UserAccount/main' })">
              <view>我的余额</view>
              <view class="num">{{ userInfo.nowMoney || 0 }}</view>
            </view>
            <view
              v-if="userInfo.isPromoter === 1 || userInfo.statu === 2"
              class="item"
              @click="$router.push('/pages/user/promotion/UserPromotion/main')"
            >
              <view>当前佣金</view>
              <view class="num">{{ userInfo.brokeragePrice || 0 }}</view>
            </view>
            <view v-else class="item" @click="$router.push('/pages/user/signIn/Integral/main')">
              <view>当前积分</view>
              <view class="num">{{ userInfo.integral || 0 }}</view>
            </view>
            <view class="item" @click="$router.push('/pages/user/gold/gold-record/main')">
              <view>核销金</view>
              <view class="num">{{ userInfo.gold || 0 }}</view>
            </view>
            <view class="item" @click="$router.push('/pages/user/coupon/UserCoupon/main')">
              <view>优惠券</view>
              <view class="num">{{ userInfo.couponCount || 0 }}</view>
            </view>
          </view>
          <view class="myOrder">
            <view class="title acea-row row-between-wrapper">
              <view>我的订单</view>
              <view class="allOrder" @click="$router.push('/pages/order/MyOrder/main')">
                全部订单
                <span class="iconfont icon-jiantou" />
              </view>
            </view>
            <view class="orderState acea-row row-middle">
              <view
                class="item"
                @click="$router.push({ path: '/pages/order/MyOrder/main',query:{type:0}})"
              >
                <view class="pictrue">
                  <img :src="images.payment">
                  <span
                    v-if="orderStatusNum.unpaidCount > 0"
                    class="order-status-num"
                  >{{ orderStatusNum.unpaidCount }}</span>
                </view>
                <view>待付款</view>
              </view>
              <view
                class="item"
                @click="$router.push({ path: '/pages/order/MyOrder/main',query:{type:1} })"
              >
                <view class="pictrue">
                  <img :src="images.deliver">
                  <span
                    v-if="orderStatusNum.unshippedCount > 0"
                    class="order-status-num"
                  >{{ orderStatusNum.unshippedCount }}</span>
                </view>
                <view>待发货</view>
              </view>
              <view
                class="item"
                @click="$router.push({ path: '/pages/order/MyOrder/main',query:{type:2}})"
              >
                <view class="pictrue">
                  <img :src="images.receive">
                  <span
                    v-if="orderStatusNum.receivedCount > 0"
                    class="order-status-num"
                  >{{ orderStatusNum.receivedCount }}</span>
                </view>
                <view>待收货</view>
              </view>
              <view
                class="item"
                @click="$router.push({ path: '/pages/order/MyOrder/main',query:{type:3} })"
              >
                <view class="pictrue">
                  <img :src="images.appraise">
                  <span
                    v-if="orderStatusNum.evaluatedCount > 0"
                    class="order-status-num"
                  >{{ orderStatusNum.evaluatedCount }}</span>
                </view>
                <view>待评价</view>
              </view>
              <view class="item" @click="$router.push('/pages/order/ReturnList/main')">
                <view class="pictrue">
                  <img :src="images.postSale">
                  <span
                    v-if="orderStatusNum.refundCount > 0"
                    class="order-status-num"
                  >{{ orderStatusNum.refundCount }}</span>
                </view>
                <view>售后/退款</view>
              </view>
            </view>
          </view>
          <view class="myService">
            <view class="title acea-row row-middle">我的服务</view>
            <view class="serviceList acea-row row-middle">
              <template v-for="(item, MyMenusIndex) in MyMenus">
                <view v-if="item.url" :key="MyMenusIndex" class="item" @click="goPages(MyMenusIndex)">
                  <view class="pictrue">
                    <img :src="item.pic">
                  </view>
                  <view>{{ item.name }}</view>
                </view>
              </template>
              <!--<view-->
              <!--class="item"-->
              <!--@click="changeswitch(true)"-->
              <!--v-if="userInfo.phone && isWeixin"-->
              <!--&gt;-->
              <!--<view class="pictrue"><img :src="$VUE_APP_RESOURCES_URL+'/images/switch.png'" /></view>-->
              <!--<view>账号切换</view>-->
              <!--</view>-->
            </view>
          </view>
        </view>
        <p style="text-align: center;margin-top: 1rem;font-size: 0.7rem;">© 2019-2020 鹰视科技·技术支持</p>
        <p style="text-align: center;font-size: 0.7rem;"> 闽ICP备2020018444号-1</p>
        <view class="footer-line-height" />
        <!-- <SwitchWindow
      :switch-active="switchActive"
      :login_type="userInfo.login_type"
      @changeswitch="changeswitch"
    /> -->
      </view>
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
      userInfo: {},
      orderStatusNum: {},
      MyMenus: [],
      switchActive: false,
      isWeixin: false,
      images: {
        payment: resURL + '/assets/images/payment.png',
        deliver: resURL + '/assets/images/deliver.png',
        receive: resURL + '/assets/images/receive.png',
        appraise: resURL + '/assets/images/appraise.png',
        postSale: resURL + '/assets/images/post-sale.png'
      }
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
  onLoad() {
    const that = this
    that.loadUser()
    that.loadMenuUser()
  },
  onShow() {
  // const that = this
    // that.loadUser()
  //   this.MenuUser()
  //   this.isWeixin = isWeixin()
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

<style>
page {
  background-color: rgb(245, 245, 245);
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

.pictrue {
  position: relative;
}
.switch-h5 {
  margin-left: 0.2rem;
}
.binding {
  display: inline-block;
  padding: 0.05rem 0.2rem;
  background-color: #ca1f10;
  border-radius: 50px;
  font-size: 0.14rem;
  border: 1px solid #e8695e;
  color: #ffffff;
}
</style>
