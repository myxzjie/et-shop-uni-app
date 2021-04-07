<template>
  <view class="product padding bg-white">
    <view v-for="(item,index) in list" :key="index" class="product-item flex p-xs margin-bottom-sm mb-sm" @tap="onShopDetails(item)">
      <view class="title flex-sub bg-grey padding-xs margin-xs radius">
        <image :src="item.image" class="image" />
        <image v-if="isSort === true && index === 0" :src="images.one" class="star" />
        <image v-if="isSort === true && index === 1" :src="images.two" class="star" />
        <image v-if="isSort === true && index === 2" :src="images.three" class="star" />
      </view>
      <view class="flex-twice bg-white padding-xs margin-xs radius">
        <view class="content">
          <view class="text text-df">{{ item.storeName }}</view>
          <view class="price margin-tb">
            <text class="sale-price text-xl text-red text-bold ">￥{{ item.price }}</text>
          </view>
          <view class="sales flex flex-wrap margin-top-sm">
            <text class="raw-price">原价: ￥{{ item.otPrice || 0 }}</text>
            <text class="sale-volume">已售: {{ item.sales }}{{ item.unitName }}</text>
          </view>
          <!-- <view class="sales ">
            <text class="sale-volume">已售{{ item.sales }}{{ item.unitName }}</text>
          </view> -->
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
.product {
    .product-item {
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
        > .star {
          position: absolute;
          left: 15upx;
          top: 15upx;
          width: 30upx;
          height: 30upx;
          border-radius: 50%;
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
        .raw-price {
          text-decoration: line-through;
        }
      }
    }
  }
</style>
