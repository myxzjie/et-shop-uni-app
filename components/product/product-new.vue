<template>
  <view class="product-swiper">
    <swiper
      :indicator-dots="false"
      :display-multiple-items="3"
    >
      <block v-for="(item, index) in list" :key="index">
        <swiper-item class="swiper-slide">
          <view class="product-swiper-item p-xs margin-bottom-sm mb-sm" @tap="onShopDetails(item)">
            <view class="title flex-sub bg-grey padding-xs margin-xs radius">
              <image :src="item.image" class="image" mode="widthFix" />
            </view>
            <view class="flex-sub bg-white padding-xs margin-xs radius">
              <view class="content">
                <view class="text text-xs">{{ item.storeName }}</view>
                <view class="price margin-top-xs ">
                  <text class="sale-price text-red">￥{{ item.price }}</text>
                </view>
                <view class="sales text-sm text-gray flex flex-wrap align-between">
                  <text class="raw-price">￥{{ item.otPrice || 0 }}</text>
                  <text class="sale-volume">已售 {{ item.sales }}{{ item.unitName }}</text>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isSort: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      images: {
        one: this.resURL + '/assets/images/one.png',
        two: this.resURL + '/assets/images/two.png',
        three: this.resURL + '/assets/images/three.png'
      }
    }
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
.product-swiper {
    white-space: nowrap;
    padding: 0 10upx;
    margin: 10upx;
    overflow: hidden;
    .product-swiper-item {
        // border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
      > .title {
        position: relative;
        background-color: #e9edef;
        > .image {
          width: 200upx;
          max-width: 200upx;
          max-height: 200upx;
          overflow: hidden;
        }
      }
      .content {
        > .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // width: 100%;
        }
        .raw-price {
           text-decoration: line-through;
        }
      }
    }
  }
</style>
