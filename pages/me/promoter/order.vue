<template>
  <view>
    <cu-custom :is-back="true">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="card-wrap bg-white margin-sm">
        <view class="assets text-cyan">累计推广订单</view>
        <view class="money">{{ count || 0 }}单</view>
      </view>

      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-title text-green" />推广订单记录
        </view>
      </view>

      <view ref="container" class="promoter-order">
        <view class="list">
          <tips-line v-if="!list||list.length<=0" title="无内容" />

          <view v-for="(item, listIndex) in list" :key="listIndex" class="item">
            <view class="title padding-lr-sm acea-row row-column row-center">
              <view class="data">{{ item.time }}</view>
              <view class="text-xs margin-top-xs">本月累计推广订单：{{ item.count ? item.count : 0 }}单</view>
            </view>
            <view class="listn">
              <view v-for="(val, indexn) in item.child" :key="indexn" class="itenm padding-sm">
                <view class="top acea-row row-between-wrapper">
                  <view class="pictxt acea-row row-between-wrapper">
                    <view class="pictrue">
                      <image :src="val.avatar" />
                    </view>
                    <view class="text margin-left-xs">{{ val.nickname }}</view>
                  </view>
                  <view class="money">
                    返佣：
                    <text class="font-color-red">￥{{ val.number ? val.number : 0 }}</text>
                  </view>
                </view>
                <view class="bottom">
                  <view class="margin-top-xs"><text class="name">订单号：</text>{{ val.orderId }}</view>
                  <view class="margin-top-xs"><text class="name">下单时间：</text>{{ val.time }}</view>
                </view>
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
import { getSpreadOrder } from '@/api/user'

import Loading from '@/components/loading'
import TipsLine from '@/components/tips/tips-line'
export default {
  name: 'PromoterOrder',
  components: {
    Loading,
    TipsLine
  },
  data() {
    return {
      list: [],
      where: {
        page: 1,
        limit: 15
      },
      loaded: false,
      loading: false,
      loadTitle: '',
      count: ''
    }
  },
  onLoad() {},
  onShow() {
    this.getIndex()
  },
  onReachBottom() {
    !this.loading && this.getIndex()
  },
  methods: {
    getIndex: function() {
      const that = this
      if (that.loaded == true || that.loading == true) return
      that.loading = true
      getSpreadOrder(that.where).then(
        res => {
          that.loading = false
          that.loaded = res.data.list.length < that.where.limit
          that.loadTitle = that.loaded ? '人家是有底线的' : '上拉加载更多'
          that.where.page = that.where.page + 1
          that.list.push.apply(that.list, res.data.list)
          that.count = res.data.count
          // that.$forceUpdate()
        },
        error => {
          uni.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000
          })
        },
        300
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
