<template>
  <view>
    <cu-custom>
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="my-promotion">
        <view class="header padding">
          <view class="name acea-row row-center-wrapper padding-top-xs">
            <view class="text-xl">总佣金</view>
            <view class="record" @click="$router.push('/pages/user/promotion/CashRecord/main')">
              提现记录
              <span class="cuIcon-right" />
            </view>
          </view>
          <view class="num margin-top-sm">{{ Info.commissionCount }}</view>
          <view class="profit acea-row row-between-wrapper">
            <view class="item">
              <view>昨日收益</view>
              <view class="money">{{ Info.lastDayCount }}</view>
            </view>
            <view class="item">
              <view>累积已提</view>
              <view class="money">{{ Info.extractCount }}</view>
            </view>
          </view>
        </view>
        <view class="text-center">
          <button class="cu-btn bg-cyan round sm" @click="toCash">立即提现</button>
        </view>
        <view class="margin">
          <view class="cu-list grid col-2 no-border">
            <view class="cu-item">
              <view class="item-wrap margin-sm margin-bottom bg-white">
                <navigator class="padding-tb" url="/pages/user/promotion/Poster/main">
                  <view class="cuIcon-qr_code text-cyan" />
                  <view class="margin-tb">推广名片</view>
                </navigator>
              </view>

            </view>

            <view class="cu-item">
              <view class="item-wrap margin-sm margin-bottom bg-white">
                <navigator class="padding-tb" url="/pages/user/promotion/PromoterList/main">
                  <view class="cuIcon-rankfill text-cyan" />
                  <view class="margin-tb">推广人统计</view>
                </navigator>
              </view>
            </view>

            <view class="cu-item">
              <view class="item-wrap margin-sm margin-bottom bg-white">
                <navigator class="padding-tb" url="/pages/user/promotion/CommissionDetails/main">
                  <view class="cuIcon-sponsorfill text-cyan" />
                  <view class="margin-tb">佣金明细</view>
                </navigator>
              </view>

            </view>

            <view class="cu-item">
              <view class="item-wrap margin-sm margin-bottom bg-white">
                <navigator class="padding-tb" url="/pages/user/promotion/PromoterOrder/main">
                  <view class="cuIcon-form text-cyan" />
                  <view class="margin-tb">推广人订单</view>
                </navigator>
              </view>
            </view>
          </view>
        </view>
        <!-- <view class="list acea-row row-between-wrapper margin">
          <view
            class="item acea-row row-center-wrapper row-column"
            @click="$router.push('/pages/user/promotion/Poster/main')"
          >
            <span class="iconfont icon-erweima" />
            <view>推广名片</view>
          </view>
          <view
            class="item acea-row row-center-wrapper row-column"
            @click="$router.push('/pages/user/promotion/PromoterList/main')"
          >
            <span class="iconfont icon-tongji" />
            <view>推广人统计</view>
          </view>
          <view
            class="item acea-row row-center-wrapper row-column"
            @click="$router.push('/pages/user/promotion/CommissionDetails/main')"
          >
            <span class="iconfont icon-qiandai" />
            <view>佣金明细</view>
          </view>
          <view
            class="item acea-row row-center-wrapper row-column"
            @click="$router.push('/pages/user/promotion/PromoterOrder/main')"
          >
            <span class="iconfont icon-dingdan" />
            <view>推广人订单</view>
          </view>
        </view> -->
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getSpreadInfo } from '@/api/user'

export default {
  components: {},
  props: {},
  data() {
    return {
      Info: {
        lastDayCount: 0,
        extractCount: 0,
        commissionCount: 0
      }
    }
  },
  onShow() {
    this.getInfo()
  },
  methods: {
    getInfo: function() {
      const that = this
      getSpreadInfo().then(
        res => {
          that.Info = res.data
        },
        function(err) {
          that.$dialog.message(err.msg)
        }
      )
    },
    toCash: function() {
      this.$router.push({ path: '/pages/user/promotion/UserCash/main' })
    }
  }
}
</script>

<style lang="scss" scoped>

.cu-list{
  &.grid {
    background-color:transparent;
  }
  .item-wrap{
    border-radius: 5upx;
  }
}
</style>
