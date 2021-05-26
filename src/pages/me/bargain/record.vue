<template>
  <view>
    <cu-custom bg-image="/static/sylb2244.jpeg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="bargain-record">
        <view v-for="(item, index) in bargain" :key="index" class="item padding-sm">
          <view class=" acea-row row-between-wrapper padding-sm">
            <view class="pictrue">
              <image :src="item.image" />
            </view>
            <view class="content acea-row row-column-around padding-sm">
              <view class="line1 margin-bottom-xs">{{ item.title }}</view>
              <count-down
                :is-day="true"
                :tip-text="'倒计时 '"
                :day-text="' 天 '"
                :hour-text="' 时 '"
                :minute-text="' 分 '"
                :second-text="' 秒'"
                :datatime="item.datatime"
              />
              <view class="money text-cyan margin-top-xs">
                已砍至
                <text class="symbol text-red">￥</text>
                <text class="num text-red">{{ item.residuePrice }}</text>
              </view>
            </view>
          </view>
          <view class="bottom acea-row row-between-wrapper padding-sm">
            <view v-if="item.status === 1" class="purple">活动进行中</view>
            <view v-else-if="item.status === 3" class="success">砍价成功</view>
            <view v-else class="end">活动已结束</view>
            <view class="acea-row row-middle row-right">
              <view
                v-if="item.status === 1"
                class="cu-btn bg-gray round"
                @click="getBargainUserCancel(item.bargainId)"
              >取消活动</view>
              <view
                v-if="item.status === 1"
                class="cu-btn bg-cyan round margin-left-sm"
                @click="goDetail(item.bargainId)"
              >继续砍价</view>
              <view v-else class="cu-btn bg-cyan round margin-left-sm" @click="goList">重开一个</view>
            </view>
          </view>
        </view>
        <Loading :loaded="status" :loading="loadingList" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
import CountDown from '@/components/count-down'
import { getBargainUserList, getBargainUserCancel } from '@/api/activity'
import Loading from '@/components/loading'

export default {
  components: {
    CountDown,
    Loading
  },
  data() {
    return {
      bargain: [],
      status: false, // 砍价列表是否获取完成 false 未完成 true 完成
      loadingList: false, // 当前接口是否请求完成 false 完成 true 未完成
      page: 1, // 页码
      limit: 20 // 数量
    }
  },
  onShow() {
    this.getBargainUserList()
  },
  onReachBottom() {
    !this.loadingList && this.getBargainUserList()
  },
  methods: {
    goDetail: function(id) {
      this.$router.push({
        path: '/pages/activity/DargainDetails/main',
        query: { id, partake: 0 }
      })
    },
    goList: function() {
      this.$router.push({
        path: '/pages/activity/GoodsBargain/main'
      })
    },
    getBargainUserList: function() {
      var that = this
      if (that.loadingList) return
      if (that.status) return
      getBargainUserList({ page: that.page, limit: that.limit })
        .then(res => {
          that.status = res.data.length < that.limit
          that.bargain.push.apply(that.bargain, res.data)
          that.page++
          that.loadingList = false
        })
        .catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    getBargainUserCancel: function(bargainId) {
      var that = this
      getBargainUserCancel({ bargainId: bargainId })
        .then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          })
          that.status = false
          that.loadingList = false
          that.page = 1
          that.bargain = []
          that.getBargainUserList()
        })
        .catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.bargain-record {
  .item {
    .pictrue {
      > image {
        width: 160upx;
        height: 160upx;
      }
    }
    .content {
      width: calc(100% - 160upx);
    }
    .bottom {
      border-top: 1upx solid #eee;
    }
  }
}
</style>