<template>
  <view>
    <cu-custom :is-back="true">
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">

      <view class="card-wrap bg-white margin-sm">
        <view class="assets text-cyan">总资产(元)</view>
        <view class="money">￥{{ now_money | 0 }}</view>
        <view class="action">
          <!-- <button class="cu-btn bg-gradual-olive shadow-blur lg" @tap="submit">
            充 值
          </button> -->
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-title text-green" />累计消费(元)
        </view>
        <view class="action">
          <navigator class="action" url="design" hover-class="none">
            <!-- <text class="cuIcon-skinfill"></text> -->
            <text class="text-df">￥{{ orderStatusSum }}</text>
          </navigator>
        </view>
      </view>

      <scroll-view scroll-x class="bg-white nav">
        <view class="flex text-center solid-bottom">
          <view class="cu-item flex-sub" :class="tabIndex === 0 ?'text-olive cur':''" @tap="onTabSelect(0)">
            账单记录
          </view>
          <view class="cu-item flex-sub" :class="tabIndex === 1?'text-olive cur':''" @tap="onTabSelect(1)">
            消费记录
          </view>
        </view>
      </scroll-view>

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

        <Loading :loaded="loaded" :loading="loading" />
        <!-- <Recommend /> -->
      </view>
    </scroll-view>
  </view>
</template>
<script>
// import Recommend from '@/components/Recommend'
import Loading from '@/components/loading'
import { getActivityStatus, getBalance, getCommissionInfo } from '@/api/user'
export default {
  components: {
    Loading
  },
  data() {
    return {
      loaded: false,
      loading: false,
      tabIndex: 0,
      now_money: 0,
      orderStatusSum: 0,
      recharge: 0,
      activity: {
        is_bargin: false,
        is_pink: false,
        is_seckill: false
      },
      types: '',
      query: {
        page: 1,
        limit: 5
      },
      list: []
    }
  },
  onShow() {
    this.loadBalance()
    this.getActivity()
    this.loadCommissionInfo()
  },
  onReachBottom() {
    const that = this
    !that.loading && that.loadCommissionInfo()
  },
  methods: {
    loadBalance() {
      const that = this
      getBalance().then(
        res => {
          that.now_money = res.data.now_money
          that.orderStatusSum = res.data.orderStatusSum
          that.recharge = res.data.recharge
        },
        err => {
          uni.showToast({
            title: err.msg, icon: 'none', duration: 2000
          })
        }
      )
    },
    getActivity() {
      const that = this
      getActivityStatus().then(
        res => {
          that.activity.is_bargin = res.data.is_bargin
          that.activity.is_pink = res.data.is_pink
          that.activity.is_seckill = res.data.is_seckill
        },
        err => {
          uni.showToast({
            title: err.msg, icon: 'none', duration: 2000
          })
        }
      )
    },
    loadCommissionInfo() {
      const that = this
      if (that.loaded == true || that.loading == true) return
      that.loading = true
      that.types = that.tabIndex
      getCommissionInfo(that.query, that.types).then(res => {
        that.loading = false
        that.loaded = res.data.length < that.query.limit
        that.query.page = that.query.page + 1
        that.list.push.apply(that.list, res.data)
      },
      err => {
        uni.showToast({
          title: err.msg, icon: 'none', duration: 2000
        })
      }
      )
    },
    onTabSelect(index) {
      const that = this
      that.tabIndex = index
      that.loaded = false
      that.loading = false
      that.query.page = 1
      that.list = []
      that.loadCommissionInfo()
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
  .action {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.card-list {
  :first-child {
    margin-top: 0;
  }
}
</style>
