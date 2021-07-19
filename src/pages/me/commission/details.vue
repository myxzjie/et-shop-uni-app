<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view ref="container" class="commission-details">
        <view class="promoterHeader padding-sm">
          <view class="headerCon acea-row row-between-wrapper">
            <view>
              <view class="name">佣金明细</view>
              <view class="money">
                ￥<span class="num">{{ commission || 0 }}</span>
              </view>
            </view>
          </view>
        </view>
        <view ref="content" class="sign-record">
          <view class="list">
            <view v-for="(item, infoIndex) in info" :key="infoIndex" class="item">
              <view class="data padding-sm">{{ item.time }}</view>
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
  props: {},
  data() {
    return {
      info: [],
      commission: 0,
      where: {
        page: 1,
        limit: 3
      },
      types: 3,
      loaded: false,
      loading: false
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
      getCommissionInfo(that.where, that.types).then(
        res => {
          that.loading = false
          that.loaded = res.data.length < that.where.limit
          that.loadTitle = that.loaded ? '人家是有底线的' : '上拉加载更多'
          that.where.page = that.where.page + 1
          that.info.push.apply(that.info, res.data)
        },
        error => {
          that.loading = false
          that.$dialog.message(error.msg)
        }
      )
    },
    getCommission: function() {
      const that = this
      getSpreadInfo().then(
        res => {
          that.commission = res.data.commissionCount
        },
        error => {
          uni.showToast({
            title: error.msg,
            icon: "none",
            duration: 2000,
          })
        }
      )
    }
  }
}
</script>
