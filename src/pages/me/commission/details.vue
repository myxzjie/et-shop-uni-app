<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="card-wrap bg-white margin-sm">
        <view class="assets text-cyan">佣金明细</view>
        <view class="money">￥{{ commission || 0 }}</view>
      </view>

      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-title text-green" />推广佣金记录
        </view>
        <!-- <view class="action">
          <navigator class="action" url="design" hover-class="none">
            <text class="text-df">￥{{ orderStatusSum }}</text>
          </navigator>
        </view> -->
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
                <view class="text-gray">{{ val.title }}</view>
                <view class="text-grey text-xs">{{ val.addTime }}</view>
              </view>
              <view class="action">
                <text v-if="val.pm === 0" class="text-red text-sm">-{{ val.number }}</text>
                <text v-else class="text-green text-sm">+{{ val.number }}</text>
              </view>
            </view>
          </view>
        </view>

        <Loading :loaded="loaded" :loading="loading" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getCommissionInfo, getSpreadInfo } from '@/api/user'
import Loading from '@/components/loading'

export default {
  name: 'CommissionDetails',
  components: {
    Loading
  },
  data() {
    return {
      loaded: false,
      loading: false,
      list: [],
      commission: 0,
      query: {
        page: 1,
        limit: 3
      },
      types: 3
    }
  },
  onLoad() {},
  onShow() {
    this.getCommission()
    this.getIndex()
  },
  onReachBottom() {
    this.loading === false && this.getIndex()
  },
  methods: {
    getIndex() {
      const that = this
      if (that.loading == true || that.loaded == true) return
      that.loading = true
      getCommissionInfo(that.query, that.types).then(
        res => {
          that.loading = false
          that.loaded = res.data.length < that.query.limit
          that.loadTitle = that.loaded ? '人家是有底线的' : '上拉加载更多'
          that.query.page = that.query.page + 1
          that.list.push.apply(that.list, res.data)
        },
        error => {
          that.loading = false
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
