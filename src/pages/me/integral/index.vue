<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="card-wrap bg-white margin-sm">
        <view class="assets text-cyan">当前积分</view>
        <view class="money">{{ info.integral }}</view>
        <!-- <view class="cu-bar bg-white">
          <view class="action">
            <view>累计积分</view>
            <view class="text-black text-bold">{{ info.sum_integral || 0 }}</view>
          </view>
          <view class="action">
            <view>累计消费</view>
            <view class="text-black text-bold">{{ info.deduction_integral ||  0 }}</view>
          </view>
          <view class="action">
            <view>今日获得</view>
            <view class="text-black text-bold">{{ info.today_integral || 0 }}</view>
          </view>
        </view> -->
      </view>

      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-calendar text-green" />分值明细
        </view>
      </view>

      <view class="card-list">
        <view class="cu-list menu" style="font-size: 28rpx;">
          <view v-for="(val, key) in list" :key="key" class="cu-item" style="min-height: 80rpx; padding: 0 20rpx;">
            <view class="content padding-xs" style="line-height: 1.4em;">
              <view class="text-gray">{{ val.title }}</view>
              <view class="text-grey text-xs"><data-format :data="val.addTime" /></view>
            </view>
            <view class="action">
              <text v-if="val.pm === 0" class="text-red text-sm">-{{ val.number }}</text>
              <text v-else class="text-green text-sm">+{{ val.number }}</text>
            </view>
          </view>
        </view>

        <Loading :loaded="loaded" :loading="loading" />
      </view>

      <view ref="container" class="integral-details">
        <view class="wrapper bg-white">

          <view class="list" :hidden="current !== 0">
            <!--<view class="tip acea-row row-middle">-->
            <!--<span class="iconfont icon-shuoming"></span-->
            <!--&gt;提示：积分数值的高低会直接影响您的会员等级-->
            <!--</view>-->

          <!--<view class="list2" :hidden="current !== 1">-->
          <!--<view class="item acea-row row-between-wrapper" @click="$router.push('/pages/launch/main')">-->
          <!--<view class="pictrue"><img :src="$VUE_APP_RESOURCES_URL+'/images/score.png'" /></view>-->
          <!--<view class="name">购买商品可获得积分奖励</view>-->
          <!--<view class="earn">赚积分</view>-->
          <!--</view>-->
          <!--<view-->
          <!--class="item acea-row row-between-wrapper"-->
          <!--@click="$router.push('/pages/user/signIn/Sign/main')"-->
          <!--&gt;-->
          <!--<view class="pictrue"><img :src="$VUE_APP_RESOURCES_URL+'/images/score.png'" /></view>-->
          <!--<view class="name">每日签到可获得积分奖励</view>-->
          <!--<view class="earn">赚积分</view>-->
          <!--</view>-->
          <!--</view>-->
          </view>
        </view>
      </view></scroll-view>
  </view>
</template>

<script>
import { getIntegralList, postSignUser } from '@/api/user'
import Loading from '@/components/loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      current: 0,
      where: {
        page: 1,
        limit: 15
      },
      data: {
        sign: 1,
        integral: 1,
        all: 1
      },
      list: [],
      info: [],
      loaded: false,
      loading: false
    }
  },
  onShow() {
    this.getIntegral()
    this.getInfo()
  },
  onReachBottom() {
    !this.loading && this.getInfo()
  },
  methods: {
    nav(index) {
      this.current = index
    },
    getInfo() {
      const that = this
      if (that.loaded == true || that.loading == true) return
      that.loading = true
      getIntegralList(that.where).then(
        res => {
          that.loading = false
          that.loaded = res.data.length < that.where.limit
          that.loadTitle = that.loaded ? '人家是有底线的' : '上拉加载更多'
          that.where.page = that.where.page + 1
          that.list.push.apply(that.list, res.data)
          that.$forceUpdate()
        },
        err => {
          that.$dialog.message(err.msg)
        }
      )
    },
    getIntegral() {
      const that = this
      postSignUser(that.data).then(
        res => {
          that.info = res.data
        },
        err => {
          that.$dialog.message(err.msg)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .list{
    border-top: 1upx solid #e8e8e8;
  }
</style>

<style lang="scss" scoped>
.card-wrap{
  border-radius: 20upx;
  padding: 40upx;
  .assets {
    margin-top: 50upx;
    text-align: center;
    color: #999;
    font-size: 32upx;
    letter-spacing: 2upx;
  }
  .money {
    text-align: center;
    font-size: 48upx;
    margin: 20upx 0 40upx 0;
    letter-spacing: 2upx;
  }
  .action {
    display: inline-block;
    text-align: center;
  }
}
.card-list {
  :first-child {
    margin-top: 0;
  }
}
</style>
