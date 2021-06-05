<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view v-show="domStatus" :class="[posterImageStatus ? 'noscroll product-con' : 'product-con']">
        <product-swiper :img-urls="imgUrls" />

        <view class="bg-white flex flex-wrap row-between  padding-sm">
          <view class="flex flex-wrap row-between row-bottom">
            <view class="price">
              <text class="sale-price text-red text-bold text-xl">
                ￥{{ storeInfo.price }}
              </text>
              <text class="raw-price text-decoration margin-left-xs">
                ￥{{ storeInfo.price }}
              </text>
            </view>
          </view>

          <view class="flex flex-wrap row-middle">
            <view class="times">
              <view>距秒杀结束仅剩</view>
              <count-down
                :is-day="false"
                :bay-text="' '"
                :hour-text="' : '"
                :minute-text="' : '"
                :datatime="datatime"
              />
            </view>
            <view class="cuIcon-right" />
          </view>
        </view>

        <view class="bg-white margin-top-sm padding-sm">
          <view class="introduce flex flex-wrap row-between">
            <view class="infor" v-text="storeInfo.title" />
            <view class="cuIcon-share text-green" @tap="setPosterImageStatus" />
          </view>
          <view class="label flex flex-wrap row-middle margin-top-sm">
            <view class="stock text-gray" v-text="'库存:' + storeInfo.stock + '件'" />
            <view class="margin-left-sm text-gray" v-text="'销量:' + storeInfo.sales + '件'" />
          </view>
        </view>

        <view class="padding bg-white">
          <view class="title text-center text-bold">产品介绍</view>
          <view class="conter padding-top-sm" v-html="storeInfo.description" />
        </view>

        <!-- <view class="footerRush acea-row row-between-wrapper">
          <view
            class="customerSer acea-row row-center-wrapper row-column"
            @click="$router.push({ path: '/pages/user/CustomerList/main' })"
          >
            <view class="iconfont icon-kefu" />
            <view>客服</view>
          </view>
          <view class="bnt bg-color-red" @click="tapBuy">立即购买</view>
        </view> -->
        <ProductWindow :attr="attr" @changeFun="changeFun" />

        <view class="cu-modal bottom-modal" :class="showModal ? 'show' : ''" @tap="hideModal">
          <view class="cu-dialog" @tap.stop="">
            <view class="cu-bar">
              <view class="action text-blue" />
              <view class="action" @tap="hideModal">
                <text class="cuIcon-roundclose" @click="hideModal" />
              </view>
            </view>
            <view class="dialog-content padding">
              <view class="flex flex-wrap row-between">
                <view class="pictrue">
                  <image :src="attr.productSelect.image" class="image" />
                </view>
                <view class="content">
                  <view class="name">{{ attr.productSelect.storeName }}</view>
                  <view class="sales text-left">
                    <text class="price text-red text-xl">￥{{ attr.productSelect.price }}</text>
                    <text class="stock margin-left">库存: {{ attr.productSelect.stock }}</text>
                  </view>
                </view>
              <!-- <view class="cuIcon-roundclose" @click="hideModal" /> -->
              </view>
            </view>

            <view v-if="attr.productAttr" class="attribute padding">
              <view v-for="(item, indexw) in attr.productAttr" :key="indexw" class="item">
                <view class="title text-left">{{ item.attrName }}</view>
                <view class="flex flex-wrap row-middle">
                  <view
                    v-for="(itemn, indexn) in item.attrValue"
                    :key="indexn"
                    class="name padding margin-xs"
                    :class="item.index == indexn ? 'active' : ''"
                    @tap="tapAttr(indexw, indexn)"
                  >
                    {{ itemn.attr }}
                  </view>
                </view>
              </view>
            </view>

            <view class="cart-quantity padding">
              <view class="title text-left">数量</view>
              <view class="flex flex-wrap row-left">
                <view
                  class="decrease"
                  :class="attr.productSelect.cartNum <= 1 ? 'disable' : ''"
                  @tap="ChangeCartNum(-1)"
                >-</view>
                <view class="quantity">{{ attr.productSelect.cartNum || 1 }}</view>
                <view
                  class="increase"
                  :class="attr.productSelect.cartNum >= attr.productSelect.stock? 'on': ''"
                  @tap="ChangeCartNum(1)"
                >+</view>
              </view>
            </view>

            <view class="cu-tabbar-height" />
          </view>
        </view>

        <StorePoster
          :poster-image-status="posterImageStatus"
          :poster-data="posterData"
          @setPosterImageStatus="setPosterImageStatus"
        />
      </view>
      <view class="cu-tabbar-height" />
    </scroll-view>
    <view class="cu-bar bg-white tabbar border shop foot">
      <button class="action text-green" @tap="onCollect">
        <view class="cuIcon-service">
          <!-- <view class="cu-tag badge" /> -->
        </view>
        客服
      </button>
      <view class="bg-orange submit" @tap="tapBuy">立即购买</view>
    </view>
  </view>
</template>
<style scoped>
.noscroll {
  height: 100%;
  overflow: hidden;
}
</style>
<script>
import ProductSwiper from '@/components/product/product-swiper'
import CountDown from '@/components/count-down'
// import ProductWindow from '@components/ProductWindow'
// import StorePoster from '@components/StorePoster'
import { getSeckillDetail } from '@/api/activity'
import { addCart } from '@/api/store'
import { imageBase64 } from '@/api/public'

export default {
  components: {
    ProductSwiper,
    CountDown
    // ProductWindow,
    // StorePoster
  },
  data() {
    return {
      id: null,
      showModal: false,
      domStatus: false,
      posterData: {
        image: '',
        title: '',
        price: '',
        code: ''
      },
      posterImageStatus: false,
      action: '',
      imgUrls: [],
      storeInfo: [],
      replyCount: 0,
      reply: [],
      cartNum: 1,
      attr: {
        cartAttr: false,
        productSelect: {
          image: '',
          storeName: '',
          price: '',
          stock: '',
          unique: '',
          cartNum: 1
        }
      },
      datatime: 0
    }
  },
  onLoad(option) {
    const that = this
    that.id = option.id
    that.datatime = option.time
    // that.datatime = parseInt(option.time)
  },
  onShow() {
    this.mountedStart()
  },
  methods: {
    hideModal() {
      this.showModal = false
    },
    mountedStart() {
      var that = this
      // that.datatime = parseInt(that.$route.query.time)
      getSeckillDetail(that.id).then(res => {
        that.$set(that, 'storeInfo', res.data.storeInfo)
        that.$set(that, 'imgUrls', res.data.storeInfo.sliderImageArr)
        that.$set(that, 'replyCount', res.data.replyCount)
        that.$set(that, 'reply', res.data.reply)
        that.posterData.image = that.storeInfo.image
        if (that.storeInfo.title.length > 30) {
          that.posterData.title = that.storeInfo.title.substring(0, 30) + '...'
        } else {
          that.posterData.title = that.storeInfo.title
        }
        that.posterData.price = that.storeInfo.price
        that.posterData.code = that.storeInfo.code_base
        that.setProductSelect()
        that.domStatus = true
        that.getImageBase64()
      })
    },
    getImageBase64() {
      const that = this
      imageBase64(that.posterData.image, that.posterData.code).then(res => {
        if (res.data) {
          that.posterData.image = res.data.image
          that.posterData.code = res.data.code
        }
      })
    },
    setPosterImageStatus() {
      this.posterImageStatus = !this.posterImageStatus
    },
    // 将父级向子集多次传送的函数合二为一；
    changeFun(opt) {
      if (typeof opt !== 'object') opt = {}
      const action = opt.action || ''
      const value = opt.value === undefined ? '' : opt.value
      this[action] && this[action](value)
    },
    changeattr(res) {
      var that = this
      that.attr.cartAttr = res
    },
    ChangeCartNum(res) {
      const that = this
      debugger
      if (res) {
        if (that.attr.productSelect.cartNum < that.storeInfo.stock) {
          that.attr.productSelect.cartNum++
        }
      } else {
        if (that.attr.productSelect.cartNum > 1) {
          that.attr.productSelect.cartNum--
        }
      }
    },
    setProductSelect() {
      var that = this
      var attr = that.attr
      attr.productSelect.image = that.storeInfo.image
      attr.productSelect.storeName = that.storeInfo.title
      attr.productSelect.price = that.storeInfo.price
      attr.productSelect.stock = that.storeInfo.stock
      attr.cartAttr = false
      that.$set(that, 'attr', attr)
    },
    selecAttrTap: function() {
      this.cartAttr = true
    },
    tapBuy() {
      const that = this
      // if (that.attr.cartAttr == false) {
      // that.attr.cartAttr = !this.attr.attrcartAttr
      if (!that.showModal) {
        that.showModal = true
        return
      } else {
        const data = {}
        data.productId = that.storeInfo.productId
        data.cartNum = that.attr.productSelect.cart_num
        data.uniqueId = that.attr.productSelect.unique
        data.secKillId = that.storeInfo.id
        data.new = 1
        addCart(data).then(res => {
          uni.navigateTo({
            url: '/pages/order/submit/index?ids=' + res.data.cartId
          })
        }).catch(err => {
          this.$dialog.error(err.response.data.msg)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .product-con .nav {
//   padding: 0 0.2rem;
// }
.cu-modal {
  z-index:1020;
  .pictrue {
    > .image {
      width: 160upx;
      height:160upx;
      border-radius: 5upx;
      border:1upx solid #e8e8e8;
    }
  }
  .dialog-content {
    padding-top: 0;
  }
  .content {
    width: calc(100% - 160upx);
    padding-left: 10upx;
    .name {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  }
  .cuIcon-roundclose{
    font-size: 32upx;
  }
  .attribute {
    .item {
      .name {
        border: 1px solid #bbb;
        font-size: 28upx;
        // color: #282828;
        padding: 10upx 28upx;
        border-radius: 5upx;
        margin: 10upx 0 10upx 10upx;
        &:first-child {
          margin-left: 0;
        }
        &.active{
          color: #fff;
          background-color: #73CBB6;
          border-color: #73CBB6;
        }
      }

    }
  }
  .cart-quantity {
    padding-top:0;
    .quantity, .decrease, .increase {
      padding: 10upx 20upx;
      border: 1upx solid #282828;
    }
    & .disable {
      border: 1upx solid #dedede;
    }
    .decrease {
      border-right: 0;
    }
    .increase {
      border-left: 0;
    }
  }
}
</style>
