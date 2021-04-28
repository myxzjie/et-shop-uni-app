<template>
  <view class="promotion padding bg-white">
    <view v-for="(item,index) in list" :key="index" class="promotion-item flex p-xs margin-bottom-sm mb-sm" @tap="onShopDetails(item)">
      <view class="title flex-sub bg-grey padding-xs margin-xs radius">
        <image :src="item.image" class="image" />
      </view>
      <view class="flex-twice bg-white padding-xs margin-xs radius">
        <view class="content">
          <view class="text text-df">{{ item.storeName }}</view>
          <view class="price margin-tb">
            <text class="sale-price padding-xs text-white ">
              促销价:<text class="text-bold">￥{{ item.price }}</text>
            </text>
          </view>
          <view class="sales flex flex-wrap margin-top-sm">
            <text class="raw-price">原价: ￥{{ item.otPrice || 0 }}</text>
            <text class="sale-volume">仅剩: {{ item.stock }}{{ item.unitName }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    onShopDetails(item) {
      const url = '/pages/shop/details/index?id=' + item.id
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.promotion {
  .promotion-item {
    border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
    > .title {
      position: relative;
      background-color: #e9edef;
      > .image {
        width: 207upx;
        max-width: 207upx;
        max-height: 207upx;
        overflow: hidden;
      }
    }
    .content {
        > .text {
            white-space: initial;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            box-orient: vertical;
            line-clamp: 2;
            display: -webkit-box;
        }
        > .sales {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
        }
        .sale-price {
          background-color: #73cbb6;
          border-radius: 0.5rem 0.03rem;
        }
        .raw-price {
          text-decoration: line-through;
        }
    }
  }
}
</style>
