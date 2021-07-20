<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <view ref="container" class="commission-details">
      <view class="promoterHeader padding-sm">
        <view class="headerCon acea-row row-between-wrapper">
          <view>
            <view class="name">提现记录</view>
            <view class="money margin-top-sm">
              总佣金 ￥<span class="num">{{ commission }}</span>
            </view>
          </view>
          <text class="cuIcon-moneybag" />
        </view>
      </view>
      <view ref="content" class="sign-record">
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
      </view>
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
      info: [],
      commission: 0,
      where: {
        page: 1,
        limit: 3
      },
      types: 4,
      loaded: false,
      loading: false
    }
  },
  onLoad(options) {},
  onShow() {
    this.getCommission()
    this.getIndex()
  },
  onReachBottom() {
    this.loading === false && this.getIndex()
  },
  methods: {
    getIndex: function() {
      const that = this
      if (that.loading == true || that.loaded == true) return
      that.loading = true
      getCommissionInfo(that.where, that.types).then(
        res => {
          that.loading = false
          that.loaded = res.data.length < that.where.limit
          that.where.page = that.where.page + 1
          that.info.push.apply(that.info, res.data)
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
    getCommission: function() {
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
