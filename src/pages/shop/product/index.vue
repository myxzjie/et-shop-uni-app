<template>
  <view ref="container" class="productList">
    <view>
      <form @submit.prevent="submitForm">
        <view class="search bg-color-red acea-row row-between-wrapper">
          <view class="input acea-row row-between-wrapper">
            <span class="iconfont icon-sousuo" />
            <input v-model="where.keyword" placeholder="搜索商品信息">
          </view>
          <view
            class="iconfont"
            :class="Switch === true ? 'icon-pailie' : 'icon-tupianpailie'"
            @click="switchTap"
          />
        </view>
      </form>
    </view>
    <view class="nav acea-row row-middle">
      <view
        class="item"
        :class="title ? 'font-color-red' : ''"
        @click="onScreenQuery(0)"
      >{{ title ? title : "默认" }}</view>
      <view class="item" @click="onScreenQuery(1)">
        价格
        <image v-if="price === 0" :src="images.horn" />
        <image v-if="price === 1" :src="images.up" />
        <image v-if="price === 2" :src="images.down" />
      </view>
      <view class="item" @click="onScreenQuery(2)">
        销量
        <image v-if="stock === 0" :src="images.horn" />
        <image v-if="stock === 1" :src="images.up" />
        <image v-if="stock === 2" :src="images.down" />
      </view>
      <!-- down -->
      <view class="item" :class="nows ? 'font-color-red' : ''" @click="onScreenQuery(3)">新品</view>
    </view>
    <view
      ref="container"
      class="list acea-row row-between-wrapper"
      :class="Switch === true ? '' : 'on'"
    >
      <view
        v-for="(item, productListIndex) in productList"
        :key="productListIndex"
        class="item"
        :class="Switch === true ? '' : 'on'"
        :title="item.storeName"
        @click="onShopDetails(item)"
      >
        <view class="pictrue" :class="Switch === true ? '' : 'on'">
          <image :src="item.image" :class="Switch === true ? '' : 'on'" /></view>
        <view class="text" :class="Switch === true ? '' : 'on'">
          <view class="name line1">{{ item.storeName }}</view>
          <view class="money font-color-red" :class="Switch === true ? '' : 'on'">
            ￥
            <span class="num">{{ item.price }}</span>
          </view>
          <view class="vip acea-row row-between-wrapper" :class="Switch === true ? '' : 'on'">
            <view class="vip-money">￥{{ item.otPrice }}</view>
            <view>已售{{ item.sales }}件</view>
          </view>
        </view>
      </view>
    </view>
    <Loading :loaded="loaded" :loading="loading" />
    <view
      v-if="productList.length === 0 && where.page > 1"
      class="noCommodity"
      style="background-color: #fff;"
    >
      <view class="noPictrue">
        <img :src="images.noGood" class="image">
      </view>
    </view>
    <product-recommend v-if="productList.length === 0 && where.page > 1" />
  </view>
</template>
<script>
import ProductRecommend from '@/components/shop/product-recommend'
import { getProducts } from '@/api/store'
// import debounce from 'lodash.debounce'
import Loading from '@/components/loading'

export default {
  components: {
    ProductRecommend,
    Loading
  },
  data() {
    return {
      id: '',
      title: '',
      loading: false,
      loaded: false,
      hostProduct: [],
      productList: [],
      Switch: true,
      query: {
        page: 1,
        limit: 8,
        keyword: '',
        sid: 0, // 二级分类id
        news: 0,
        priceOrder: '',
        salesOrder: ''
      },
      loadTitle: '',
      price: 0,
      stock: 0,
      nows: false,
      images: {
        noGood: this.resURL + '/assets/images/noGood.png',
        horn: this.resURL + '/assets/images/horn.png',
        up: this.resURL + '/assets/images/up.png',
        down: this.resURL + '/assets/images/down.png'
      }
    }
  },
  onLoad(option) {
    const that = this
    that.id = option.id
    that.title = option.title
    that.query.sid = that.id
    that.loadProductList()
  },
  onReachBottom() {
    debugger
    !this.loading && this.loadProductList()
  },
  methods: {
    loadProductList() {
      const that = this
      if (that.loaded == true || that.loading == true) return
      that.loading = true
      that.queryParams()
      // if (id !== this.query.sid) {
      //   // this.query.keyword = ''
      //   this.loaded = false
      //   this.loading = false
      //   this.query.page = 1
      //   this.query.sid = id
      //   this.title = that.title
      //   this.nows = false
      //   this.productList = []
      //   this.price = 0
      //   this.stock = 0
      // }
      getProducts(that.query).then(res => {
        that.loading = false
        that.productList.push.apply(that.productList, res.data)
        that.loaded = res.data.length < that.query.limit // 判断所有数据是否加载完成；
        that.query.page = that.query.page + 1
      })
    },
    submitForm: function() {
      this.$set(this, 'productList', [])
      this.query.page = 1
      this.loaded = false
      this.loading = false
      this.loadProductList()
    },
    // 点击事件处理
    onScreenQuery(index) {
      debugger
      const that = this
      switch (index) {
        case 0:
          uni.navigateBack({})
          return
        case 1:
          if (that.price === 0) that.price = 1
          else if (that.price === 1) that.price = 2
          else if (that.price === 2) that.price = 0
          that.stock = 0
          break
        case 2:
          if (that.stock === 0) that.stock = 1
          else if (that.stock === 1) that.stock = 2
          else if (that.stock === 2) that.stock = 0
          that.price = 0
          break
        case 3:
          that.nows = !that.nows
          break
        default:
          break
      }
      that.productList = []
      that.query.page = 1
      that.loaded = false
      that.loadProductList()
    },
    // 设置where条件
    queryParams() {
      const that = this

      if (that.price === 0) {
        that.query.priceOrder = ''
      } else if (that.price === 1) {
        that.query.priceOrder = 'asc'
      } else if (that.price === 2) {
        that.query.priceOrder = 'desc'
      }
      if (that.stock === 0) {
        that.query.salesOrder = ''
      } else if (that.stock === 1) {
        that.query.salesOrder = 'asc'
      } else if (that.stock === 2) {
        that.query.salesOrder = 'desc'
      }
      that.query.news = that.nows ? 1 : 0
    },
    switchTap: function() {
      const that = this
      that.Switch = !that.Switch
    },
    onShopDetails(item) {
      const url = '/pages/shop/details/index?id=' + item.id
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>
<style scoped>
.noCommodity {
  border-top: 3px solid #f5f5f5;
  padding-bottom: 1px;
}
</style>
