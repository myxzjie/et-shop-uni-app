<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="cu-bar search">
        <view class="search-form round">
          <text class="cuIcon-search" />
          <form @submit.prevent="submitForm">
            <input type="text" confirm-type="search" :adjust-position="false" placeholder="搜索商品">
          </form>
        </view>
        <view class="action text-cyan">
          <text v-if="Switch" class="cuIcon-cascades" @tap="switchTap" />
          <text v-else class="cuIcon-list" @tap="switchTap" />
        </view>
      </view>

      <view class="productList">

        <view class="nav acea-row row-middle padding solid">
          <view
            class="item"
            :class="title ? 'font-color-red' : ''"
            @click="onScreenQuery(0)"
          >{{ title ? title : "默认" }}</view>
          <view class="item" @click="onScreenQuery(1)">
            价格
            <!-- <view class="flex flex-wrap align-center">
              <view>价格</view>
              <view>
            <view v-if="price === 1 || price === 0" class="cuIcon-triangleupfill"></view>
            <view v-if="price === 2 || price === 0" class="cuIcon-triangledownfill"></view>
            </view>
            </view> -->
            <!-- <image v-if="price === 0" :src="images.horn" /> -->
            <!-- <image v-if="price === 1" :src="images.up" /> -->
            <!-- <image v-if="price === 2" :src="images.down" /> -->
          </view>
          <view class="item" @click="onScreenQuery(2)">
            销量
            <!-- <image v-if="stock === 0" :src="images.horn" />
            <image v-if="stock === 1" :src="images.up" />
            <image v-if="stock === 2" :src="images.down" /> -->
          </view>
          <!-- down -->
          <view class="item" :class="nows ? 'font-color-red' : ''" @click="onScreenQuery(3)">新品</view>
        </view>

        <view class="padding-sm">
          <view class="cu-list grid no-border" :class="Switch === true ? 'col-2' : 'col-1'">
            <view v-for="(item, index) in productList" :key="index" class="cu-item" @tap="onShopDetails">
              <view class="solid" :class="Switch === true ? '':'flex flex-wrap row-between'">
                <view class="pictrue padding-xs">
                  <image :src="item.image" />
                </view>
                <view class="content padding-xs">
                  <view class="name ellipsis-line">{{ item.storeName }}</view>
                  <view class="price">
                    <text class="num">￥{{ item.price }}</text>
                  </view>
                  <view class="sales text-grey flex flex-wrap row-between">
                    <view class="text-decoration">￥{{ item.otPrice }}</view>
                    <view>已售{{ item.sales }}件</view>
                  </view>
                </view>
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
    </scroll-view>
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
      id: 0,
      title: '',
      keyword: '',
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
    that.id = option.id || 0
    that.keyword = option.wk
    that.title = option.title
    that.query.sid = that.id
    that.loadProductList()
  },
  onReachBottom() {
    !this.loading && this.loadProductList()
  },
  methods: {
    loadProductList() {
      const that = this
      if (that.loaded === true || that.loading === true) return
      that.loading = true
      that.queryParams()
      if (that.id !== this.query.sid || this.query.sid === 0) {
        this.query.keyword = that.keyword
        this.loaded = false
        this.loading = false
        this.query.page = 1
        this.query.sid = id
        this.title = that.title
        this.nows = false
        this.productList = []
        this.price = 0
        this.stock = 0
      }
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
<style lang="scss" scoped>
.cu-bar {
  .search-form {
    background-color: var(--white);
  }
}

.cu-list {
  .cu-item {
    .price {
      text-align: left;
      text {
        color: var(--red) !important;
        font-size: 32upx;
      }
    }
  }
  &.col-1 {
    .cu-item {
      display: block;
      flex-direction: initial;
      border-bottom: 1upx solid #eee;
      .solid::after {
        border: 0 solid transparent;
      }
      .pictrue {
        width: 160upx;
        height: 160upx;
        padding: 0;
        overflow: hidden;
        > image {
          width: 160upx;
          height: 160upx;
          border-radius: 5upx;
          border: 1upx solid #eee;
        }
      }
      .content {
        width: calc(100% - 160upx);
        .name {
          margin-top: 10upx;
          text-align: left;
        }
        .sales {
          margin-top: 10upx;
        }
      }

    }
  }
  &.col-2 {
    .cu-item {
      // border: 1upx solid #eee;
      padding: 20upx;
      .pictrue {
        > image {
          width: 100%;
          height: 340upx;
          border-radius: 5upx;
        }
      }
      .content {
        .price {
          text {
            color: var(--red) !important;
            font-size: 28upx;
          }
        }
        .name {
          font-size: 24upx;
        }
        .sales {
          font-size: 24upx;
        }
      }
    }
  }
}
.noCommodity {
  border-top: 3px solid #f5f5f5;
  padding-bottom: 1px;
}
</style>
