<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="card-wrap bg-white margin-sm">
        <view class="assets text-cyan">总佣金</view>
        <view class="money">￥{{ commission }}</view>
      </view>

      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-title text-green" />提现记录
        </view>
      </view>

      <view class="card-list">
        <view v-for="(item, index) in list" :key="index" class="margin-top-sm">
          <view class="cu-bar bg-white dashed-bottom dashed-top" style="min-height: 60rpx;">
            <view class="action">
              <text class="cuIcon-time text-olive" style="font-size: 28rpx;" />
              {{ item.time }}
            </view>
          </view>

          <view class="cu-list menu" style="font-size: 28rpx;">
            <view v-for="(val, key) in item.list" :key="key" class="cu-item" style="min-height: 80rpx; padding: 0 20rpx;">
              <view class="content padding-xs" style="line-height: 1.4em;">
                <view class="text-grey">{{ val.title }}</view>
                <view class="text-gray text-xs">{{ val.addTime }}</view>
              </view>
              <view class="action">
                <text v-if="val.pm === 0" class="text-red text-sm">-{{ val.number }}</text>
                <text v-else class="text-green text-sm">+{{ val.number }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view ref="container" class="commission-details">
      <!-- <view class="promoterHeader padding-sm">
        <view class="headerCon acea-row row-between-wrapper">
          <view>
            <view class="name">提现记录</view>
            <view class="money margin-top-sm">
              总佣金 ￥<span class="num">{{ commission }}</span>
            </view>
          </view>
          <text class="cuIcon-moneybag" />
        </view>
      </view> -->
      <!-- <view ref="content" class="sign-record">
        <view class="list">
          <view v-for="(item, infoIndex) in info" :key="infoIndex" class="item">
            <view class="data padding-sm padding-bottom-xs">{{ item.time }}</view>
            <view v-for="(val, indexn) in item.list" :key="indexn" class="listn">
              <view class="itemn padding-sm acea-row row-between-wrapper">
                <view>
                  <view class="name line1">{{ val.title }}</view>
                  <view class="margin-top-xs">{{ val.addTime }}</view>
                </view>
                <view v-if="val.pm == 1" class="num">+{{ val.number }}</view>
                <view v-if="val.pm == 0" class="num font-color-red">
                  -{{ val.number }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view> -->
      <Loading :loaded="loaded" :loading="loading" />
    </view>
  </view>
</template>
<script>
import { getCommissionInfo, getSpreadInfo } from '@/api/user'
import Loading from '@/components/loading'

export default {
  name: 'CashRecord',
  components: {
    Loading
  },
  data() {
    return {
      loaded: false,
      loading: false,
      commission: 0,
      list: [],
      query: {
        page: 1,
        limit: 3
      },
      types: 4
    }
  },
  onLoad(options) {},
  onShow() {
    this.getCommission()
    this.loadCommissionInfo()
  },
  onReachBottom() {
    this.loading === false && this.loadCommissionInfo()
  },
  methods: {
    loadCommissionInfo() {
      const that = this
      if (that.loading == true || that.loaded == true) return
      that.loading = true
      getCommissionInfo(that.query, that.types).then(res => {
        that.loading = false
        that.loaded = res.data.length < that.query.limit
        that.query.page = that.query.page + 1
        that.list.push.apply(that.list, res.data)
      },
      error => {
        uni.showToast({
          title: error.msg,
          icon: 'none',
          duration: 2000
        })
      }
      )
    },
    getCommission() {
      const that = this
      getSpreadInfo().then(
        res => {
          that.commission = res.data.commissionCount
        },
        error => {
          uni.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000
          })
        }
      )
    }
  }
}
</script>

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
}
.card-list {
  :first-child {
    margin-top: 0;
  }
}
</style>
