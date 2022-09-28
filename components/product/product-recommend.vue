<template>
  <view ref="recommend" class="recommend">
    <view class="title flex flex-wrap">
      <text class="text-grey">※※※</text>
      <text class="name">为你推荐</text>
      <text class="text-grey">※※※</text>
    </view>

    <view class="cu-list grid col-2 no-border">
      <view v-for="(item, index) in hostProduct" :key="index" class="cu-item" @tap="onProductDetails(item)">
        <view class="pictrue">
          <image class="image" :src="item.image" />
        </view>
        <text class="name">{{ item.storeName }}</text>
        <view class="sales flex flex-wrap margin-top-sm">
          <text class="sale-price text-xl text-red text-bold">￥{{ item.price }}</text>
          <text class="raw-price margin-left-xs">￥{{ item.otPrice || 0 }}</text>
        </view>
      </view>
    </view>
    <Loading :loaded="loadend" :loading="loading" />
  </view>
</template>
<script>
import { getProductRecommend } from '@/api/store'
import Loading from '@/components/loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      hostProduct: [],
      page: 1,
      limit: 20,
      loadTitle: '',
      loading: false,
      loadend: false
    }
  },
  // onLoad() {
  //   this.hostProducts()
  // },
  mounted() {
    this.hostProducts()
  },
  methods: {
    hostProducts() {
      const that = this
      if (that.loading) return // 阻止下次请求（false可以进行请求）；
      if (that.loadend) return // 阻止结束当前请求（false可以进行请求）；
      that.loading = true

      getProductRecommend(that.page, that.limit).then(res => {
        that.loading = false
        // apply();js将一个数组插入另一个数组;
        that.hostProduct.push.apply(that.hostProduct, res.data)
        that.loadend = res.data.length < that.limit // 判断所有数据是否加载完成；
        that.page = that.page + 1
      })
    },
    onProductDetails(item) {
      uni.navigateTo({
        url: '/pages/shop/details/index?id=' + item.id
      })
    }
  },
  onReachBottom() {
    !this.loading && this.hostProducts()
  }
}
</script>
<style lang="scss" scoped>
.recommend {
  // background-color: #eee;
  .title {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .cu-list {
    .pictrue {
      > .image {
        width: 324upx;
        height: 324upx;
      }
    }
    .cu-item {
      // margin: 0 2upx;
      border: 1upx solid rgba(0, 0, 0, 0.05);
      > .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        padding: 5upx;
      }
      > .sales {
        .sale-price {
          color: #e54d42;
          font-weight: bold;
          font-size: 36rpx;
        }
        .raw-price {
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
