<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="bargain-list">
        <view class="padding-sm">
          <image :src="images.cutBg" alt="" /></view>
        <view v-if="bargainLis.length > 0" class="bg-white bargain-wrap padding">
          <view
            v-for="(item, bargainLisIndex) in bargainLis"
            :key="bargainLisIndex"
            class="item flex flex-wrap align-between padding-tb-sm"
          >
            <view class="pictrue">
              <img :src="item.image">
            </view>
            <view class="content flex flex-wrap row-column-around padding-left-sm">
              <view class="ellipsis-line" v-text="item.title" />
              <view class="margin-top-xs">
                <view class="text-gray">
                  <text class="cuIcon-group" />
                  <text class="margin-left-xs">{{ item.people }}</text>
                  <text class="margin-left-xs">人正在参与</text>
                </view>

              </view>
              <view class="flex flex-wrap row-between margin-top-xs">
                <view>
                  <text>价格: </text>
                  <text class="price text-red">￥{{ item.price }}</text>
                </view>
                <view class="cu-btn bg-cyan sm" @tap="goDetail(item.id)">
                  <text class="cuIcon-remind" />
                  <text class="margin-left-xs">参与砍价</text>
                </view>
              </view>
            </view>

          </view>
          <view v-if="!status" class="load font-color-red" @click="getBargainList">点击加载更多</view>
        </view>

        <view v-if="bargainLis.length === 0" class="noCommodity" style="background-color: #fff;">
          <view class="noPictrue">
            <img :src="images.noGood" class="image">
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getBargainList } from '@/api/activity'
export default {
  components: {},
  data() {
    return {
      bargainLis: [], // 砍价列表
      status: false, // 砍价列表是否获取完成 false 未完成 true 完成
      loading: false, // 当前接口是否请求完成 false 完成 true 未完成
      page: 1, // 页码
      limit: 20, // 数量
      images: {
        noGood: 'https://shop.cdn.dev56.com/assets/images/noGood.png',
        cutBg: 'https://shop.cdn.dev56.com/assets/images/cut-bg.png'
      }
    }
  },
  onShow() {
    this.getBargainList()
  },
  methods: {
    getBargainList() {
      var that = this
      if (that.loading) return
      if (that.status) return
      that.loading = true
      getBargainList({ page: that.page, limit: that.limit }).then(res => {
        that.status = res.data.length < that.limit
        that.bargainLis.push.apply(that.bargainLis, res.data)
        that.page++
        that.loading = false
      })
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/activity/bargain/details?id=${id}&partake=0`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #73cbb6;
}
.bargain-wrap {
  .item {
    border-bottom:1upx solid #eeeeee;
    .pictrue {
      > image {
        width: 160upx;
        height: 160upx;
      }
    }
    .content {
      width: calc(100% - 160upx);
    }
  }
}
</style>
