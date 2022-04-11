<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <view class="buy-group">
      <view class="banner">
        <image mode="aspectFill" src="https://shop.cdn.dev56.com/assets/images/group.png" class="image" />
      </view>

      <view v-if="combinationList.length>0" class="list bg-white">
        <view
          v-for="(item, combinationListIndex) in combinationList"
          :key="combinationListIndex"
          class="item flex flex-wrap align-between padding"
        >
          <view class="pictrue">
            <image class="image" :src="item.image" mode="widthFix" />
          </view>
          <view class="content padding-left-sm">
            <view class="ellipsis-line" v-text="item.title" />
            <view class="flex flex-wrap margin-top-xs">
              <view class="price text-red">
                <text class="sale-price text-xl text-bold">
                  ￥{{ item.price }}
                </text>
                <text class="raw-price text-grey margin-left-sm">
                  ￥{{ item.productPrice }}
                </text>
              </view>

            </view>
            <view class="flex flex-wrap align-between margin-top-xs">
              <view class="team flex flex-wrap row-middle text-cyan">
                <text class="cuIcon-group" />
                <text class="text-df margin-left-xs">
                  {{ item.people }}人团
                </text>
              </view>
              <view
                class="btn bg-cyan padding-tb-xs padding-lr-sm"
                @tap="onBuyGroup(item.id)"
              >
                去拼团
                <text class="cuIcon-right" />
              </view>
            </view>
          </view>
        </view>
        <Loading :loaded="status" :loading="loadingList" />
      </view>
    </view>
  </view>
</template>
<script>
import { getCombinationList } from '@/api/activity'
import Loading from '@/components/loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      combinationList: [],
      status: false, // 砍价列表是否获取完成 false 未完成 true 完成
      loading: false, // 当前接口是否请求完成 false 完成 true 未完成
      page: 1, // 页码
      limit: 20, // 数量
      loadingList: false
    }
  },
  mounted() {
    // document.querySelector('body').setAttribute('style', 'background-color:#73CBB6');
    this.getCombinationList()
  },
  onReachBottom() {
    !this.loadingList && this.getCombinationList()
  },
  methods: {
    getCombinationList: function() {
      var that = this
      if (that.loading) return
      if (that.status) return
      getCombinationList({ page: that.page, limit: that.limit }).then(res => {
        that.status = res.data.length < that.limit
        that.combinationList.push.apply(that.combinationList, res.data)
        that.page++
        that.loading = false
      })
    },
    onBuyGroup(id) {
      uni.navigateTo({
        url: `/pages/activity/buy-group/details?id=${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.buy-group {
  .banner {
    max-height: 380upx;
    overflow: hidden;
    .image{
      width: 100%;
    }
  }
  .item {
    border-bottom: 1upx solid #eee;
    .pictrue{
      > .image {
        width: 160upx;
        height: 160upx;
        border-radius: 10upx;
        border: 1upx solid #eee;
      }
    }
    .content {
      width: calc(100% - 160upx);
      .team{
        padding: 5upx;
        .cuIcon-group {
          font-size: 48upx;
        }
      }
      .raw-price {
        text-decoration: line-through;
      }
    }
  }
}
.blank-space {
  position: fixed;
  height: 100%;
  .no-pictrue {
    text-align: center;
  }
}
</style>
