<template>
  <view>
    <u-sticky>
      <scroll-view scroll-x class="bg-gray tabs">
        <view class="flex text-center">
          <view
            v-for="(option, idx) in res.list[0].tabs"
            :key="idx"
            class="cu-item flex-sub "
            :class="tabIndex === option.___index ? 'text-cyan cur' : ''"
            @tap="handleTabChange(option)"
          >
            <view>{{ option.title }}<text v-if="option.tag" class="text-red text-xs">{{ option.tag }}</text></view>
            <view class="description text-gray text-xs">{{ option.desc }}</view>
          </view>
        </view>
      </scroll-view>
    </u-sticky>

    <view class="product-wrap cu-list grid col-2 no-border">
      <view v-for="(option, idx) in list" :key="idx" class="cu-item" @tap="onShopDetails(option)">
        <view class="product-content">
          <view class="image-wrap">
            <!-- <u-image class="image" :src="option.image" height="350rpx" mode="aspectFit" width="100%" :lazy-load="true" :fade="true" duration="450">
              <u-loading slot="loading" />
            </u-image> -->
            <image style="height: 350rpx;" mode="aspectFit" :src="option.image" />
          </view>
          <view class="content">
            <view class="title"> {{ option.storeName }} </view>
            <view class="price-wrap flex flex-wrap align-between">
              <view class="flex flex-wrap">
                <text class="sale-price ">¥{{ option.price || 0 }}</text>
                <text class="raw-price text-xs margin-left-xs">￥{{ option.otPrice || 0 }}</text>
              </view>
              <view>
                <text class="sale-volume">已售: {{ option.sales }}{{ option.unitName }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { modelNavigateTo } from '@/utils'
export default {
  props: {
    res: {
      type: Object,
      default: undefined
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    handleNavigationPage(item) {
      modelNavigateTo(item)
    },
    handleTabChange(item) {
      this.tabIndex = item.___index
      this.$emit('change', this.tabIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
// image {
//   will-change: transform;
// }
// ::v-deep .u-image {
//   will-change: transform;
//   transition: all 0 ease 0
// }
.tabs {
  .cu-item {
    height: inherit;
    line-height: initial;
    margin: 0 10upx;
    padding: 20upx 20upx;
  }
}
.product-wrap {
  .cu-item {
    .product-content{
      margin: 0rpx 8rpx;
      border-radius: 10rpx;
      border: 1rpx #eee solid;
      .image-wrap{
        padding: 10rpx;
      }
      .content {
        text-align: left;
        padding: 8rpx;
        .title {
          height: 70rpx;
          overflow: hidden;
          display: -webkit-box;
          text-overflow:ellipsis;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          /*! autoprefixer: ignore next */
          -webkit-box-orient: vertical;
        }
        .sale-price {
          color: #ff5c58;
          line-height: 2;
        }
        .raw-price {
          line-height: 3;
          font-size: 20rpx;
          text-decoration: line-through;
        }
        .sale-volume{
          text-align:right;
          line-height: 2;
          padding-right: 8rpx;
        }
      }
    }
  }
}
</style>
