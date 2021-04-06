<template>
  <view ref="container" class="recommend">
    <view class="title acea-row row-center-wrapper">
      <span class="iconfont icon-zhuangshixian" />
      <span class="name">为你推荐</span>
      <span class="iconfont icon-zhuangshixian lefticon" />
    </view>
    <view class="recommendList acea-row row-between-wrapper">
      <view
        v-for="(item, recommendIndex) in hostProduct"
        :key="recommendIndex"
        class="item"
        @click="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.id} })"
      >
        <view class="pictrue">
          <img :src="item.image" class="image">
        </view>
        <view class="name line1">{{ item.storeName }}</view>
        <view class="money font-color-red">
          ￥
          <span class="num">{{ item.price }}</span>
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
    }
  },
  onReachBottom() {
    !this.loading && this.hostProducts()
  }
}
</script>
