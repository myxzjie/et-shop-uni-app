<template>
  <view>
    <cu-custom
      :is-back="true"
      bg-color="bg-gradual-olive"
    >
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    
    <view v-if="collectProductList.length > 0" class="collection margin-top bg-white">
      <navigator
        v-for="(item, index) in collectProductList"
        :key="index"
        class="item flex flex-wrap row-between padding"
        :url="'/pages/shop/details/index?id='+item.pid"
      >
        <view class="pictrue">
          <image class="image" :src="item.image" mode="widthFix" />
        </view>
        <view class="content flex flex-wrap row-column-between padding-left-sm">
          <view class="name ellipsis-line">{{ item.storeName }}</view>
          <view class="flex flex-wrap row-between">
            <view class="price text-red">￥{{ item.price }}</view>
            <view class="delete" @tap.prevent="delCollection(index)">删除</view>
          </view>
        </view>
      </navigator>
    </view>

    <loading :loaded="loadend" :loading="loading" />

    <view
      v-if="collectProductList.length < 1 && page > 1"
      class="margin bg-white"
    >
      <view class="no-pictrue margin padding">
        <image src="https://shop.cdn.dev56.com/assets/images/noCollection.png" class="image" mode="widthFix" />
      </view>
      <product-recommend />
    </view>
  </view>
</template>
<script>
import ProductRecommend from '@/components/product/product-recommend'
import { getCollectUser, collectDelete } from '@/api/user'
import Loading from '@/components/loading'
export default {
  name: 'Collection',
  components: {
    ProductRecommend,
    Loading
  },
  data() {
    return {
      page: 1,
      limit: 20,
      collectProductList: [],
      loadTitle: '',
      loading: false,
      loadend: false
    }
  },
  onLoad() {},
  onShow() {
    this.getUserCollectProduct()
  },
  onReachBottom() {
    !this.loading && this.getUserCollectProduct()
  },
  methods: {
    getUserCollectProduct() {
      const that = this
      if (that.loading) return // 阻止下次请求（false可以进行请求）；
      if (that.loadend) return // 阻止结束当前请求（false可以进行请求）；
      that.loading = true
      getCollectUser(that.page, that.limit).then(res => {
        that.loading = false
        // apply();js将一个数组插入另一个数组;
        that.collectProductList.push.apply(that.collectProductList, res.data)
        that.loadend = res.data.length < that.limit // 判断所有数据是否加载完成；
        that.page = that.page + 1
      })
    },
    // 删除收藏；
    delCollection(index) {
      const that = this
      const { pid, category } = that.collectProductList[index]
      collectDelete(pid, category).then(() => {
        uni.showToast({
          title: '删除收藏成功!',
          icon: 'none',
          duration: 2000,
          success: () => {
            that.collectProductList.splice(index, 1)
            that.$set(that, 'collectProductList', that.collectProductList)
          }
        })
      })
    },
    onProduct(item) {
      uni.navigateTo({ url: '/pages/shop/GoodsCon/main?id=' + item.pid })
    }
  }
}
</script>

<style lang="scss" scoped>
.collection {
  .item {
    border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
    .pictrue {
      > .image {
        border: 1upx solid rgba(0, 0, 0, 0.05);
        width: 160upx;
        height: 160upx;
      }
    }
    .content {
      width: calc(100% - 160upx);
    }
  }
}
.no-pictrue {
  text-align: center;
}
</style>
