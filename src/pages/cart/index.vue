<template>
  <view class="container">
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <view class="cart">
      <view class="service-policy flex flex-wrap padding-xs">
        <view class="item">
          <text class="cuIcon-safe padding-right-xs" />
          100%正品保证
        </view>
        <view class="item">
          <text class="cuIcon-roundcheck padding-right-xs" />
          所有商品精挑细选
        </view>
        <view class="item">
          <text class="cuIcon-creative padding-right-xs" />
          售后无忧
        </view>
      </view>

      <!--购物车暂无商品-->
      <view v-if="cartList.valid.length === 0 && cartList.invalid.length === 0" class="no-cart">
        <view class="pictrue">
          <img class="margin-bottom-xl" :src="images.noCart">
        </view>
        <product-recommend />
      </view>

      <view v-else>
        <!--  -->
        <view class="flex flex-wrap align-between padding bg-white">
          <view>
            购物数量(<text class="quantity text-red">{{ count }}</text>)
          </view>
          <view
            v-if="cartList.valid.length > 0"
            @click="manage"
          >{{ footerswitch ? "取消" : "管理" }}</view>
        </view>
      </view>

      <view class="margin-top">

        <view class="cart-list cu-list bg-white">
          <view v-for="(item, index) in validList" :key="index" class="cu-item">
            <!-- -->
            <view class="content align-between flex flex-wrap">
              <view class="padding-left-sm">
                <checkbox value :checked="item.checked" />
              </view>
              <view
                class="pictrue"
                @tap="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.productId }})"
              >
                <image v-if="item.productInfo.attrInfo" :src="item.productInfo.attrInfo.image" />
                <image v-else :src="item.productInfo.image" />
              </view>
              <view class="content-info margin-lr-xs">
                <view class="name padding-xs">{{ item.productInfo.storeName }}</view>
                <view v-if="item.productInfo.attrInfo">属性：{{ item.productInfo.attrInfo.suk }}</view>
                <view class="price text-xl text-red padding-tb-xs">￥{{ item.truePrice }}</view>
                <view class="cart-quantity flex flex-wrap ">
                  <view class="decrease disable">-</view>
                  <view class="quantity">1</view>
                  <view class="increase">+</view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="cu-bar bg-white tabbar border shop foot">
          <view class="action" style="width:210upx">
            <!-- <view class="well-check"> -->
            <checkbox value :checked="isAllSelect && cartCount > 0" @change="allChecked" />
            <!-- <text class="checkAll">全选 ({{ cartCount }})</text> -->
            <!-- </view> -->
            <!-- <view class="cuIcon-service text-green">
              <view class="cu-tag badge"></view>
            </view> -->
            <text class="margin-lr-xs text-df">全选 ({{ cartCount }})</text>
          </view>
          <!-- <view class="action text-orange">
            <view class="cuIcon-favorfill"></view> 已收藏
          </view> -->
          <view class="action" style="width:122px">
            <!-- <view class="cuIcon-cart">
              <view class="cu-tag badge">99</view>
            </view>
            购物车 -->
            <text class="text-df text-red">￥{{ countmoney }}</text>
          </view>
          <view class="bg-red submit">立即订购</view>
        </view>
      </view>
    </view>

    <view class="shoppingCart">
      <view v-if="validList.length > 0 || cartList.invalid.length > 0">
        <view class="list">
          <!-- <view
            v-for="(item, cartListValidIndex) in validList"
            :key="cartListValidIndex"
            class="item acea-row row-between-wrapper"
          >
            <view class="select-btn">
              <view class="checkbox-wrapper">
                <checkbox-group @change="switchSelect(cartListValidIndex)">
                  <label class="well-check">
                    <checkbox value :checked="item.checked" />
                  </label>
                </checkbox-group>
              </view>
            </view>
            <view class="picTxt acea-row row-between-wrapper">
              <view
                class="pictrue"
                @click="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.productId }})"
              >
                <image v-if="item.productInfo.attrInfo" :src="item.productInfo.attrInfo.image" />
                <image v-else :src="item.productInfo.image" />
              </view>
              <view class="text">
                <view class="line1">{{ item.productInfo.storeName }}</view>
                <view
                  v-if="item.productInfo.attrInfo"
                  class="infor line1"
                >属性：{{ item.productInfo.attrInfo.suk }}</view>
                <view class="money font-color-red">￥{{ item.truePrice }}</view>
              </view>
              <view class="carnum acea-row row-center-wrapper">
                <view
                  class="reduce"
                  :class="validList[cartListValidIndex].cartNum <= 1 ? 'on' : ''"
                  @click.prevent="reduce(cartListValidIndex)"
                >-</view>
                <view class="num">{{ item.cartNum }}</view>
                <view
                  v-if="validList[cartListValidIndex].attrInfo"
                  class="plus"
                  :class="
                    validList[cartListValidIndex].cartNum >=
                      validList[cartListValidIndex].attrInfo.stock
                      ? 'on'
                      : ''
                  "
                  @click.prevent="plus(cartListValidIndex)"
                >+</view>
                <view
                  v-else
                  class="plus"
                  :class="
                    validList[cartListValidIndex].cartNum >= validList[cartListValidIndex].stock
                      ? 'on'
                      : ''
                  "
                  @click.prevent="plus(cartListValidIndex)"
                >+</view>
              </view>
            </view>
          </view> -->
        </view>
        <view v-if="cartList.invalid.length > 0" class="invalidGoods">
          <view class="goodsNav acea-row row-between-wrapper">
            <view @click="goodsOpen">
              <text
                class="iconfont"
                :class="goodsHidden === true ? 'icon-xiangyou' : 'icon-xiangxia'"
              />失效商品
            </view>
            <view class="del" @click="delInvalidGoods">
              <text class="iconfont icon-shanchu1" />清空
            </view>
          </view>
          <view class="goodsList" :hidden="goodsHidden">
            <view v-for="(item, cartListinvalidIndex) in cartList.invalid" :key="cartListinvalidIndex">
              <view
                v-if="item.productInfo"
                class="item acea-row row-between-wrapper"
                @click="$router.push({ path: '/pages/shop/GoodsCon/main',query:{id:item.productId }})"
              >
                <view class="invalid acea-row row-center-wrapper">失效</view>
                <view class="pictrue">
                  <img v-if="item.productInfo.attrInfo" :src="item.productInfo.attrInfo.image">
                  <img v-else :src="item.productInfo.image">
                </view>
                <view class="text acea-row row-column-between">
                  <view class="line1">{{ item.productInfo.storeName }}</view>
                  <view
                    v-if="item.productInfo.attrInfo"
                    class="infor line1"
                  >属性：{{ item.productInfo.attrInfo.suk }}</view>
                  <view class="acea-row row-between-wrapper">
                    <view class="end">该商品已下架</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view v-if="cartList.valid.length > 0" class="footer acea-row row-between-wrapper">
        <!-- <view>
          <view class="select-btn">
            <view class="checkbox-wrapper">
              <checkbox-group @change="allChecked">
                <view class="well-check">
                  <checkbox value :checked="isAllSelect && cartCount > 0" />
                  <text class="checkAll">全选 ({{ cartCount }})</text>
                </view>
              </checkbox-group>
            </view>
          </view>
        </view> -->
        <view v-if="footerswitch === false" class="money acea-row row-middle">
          <text class="font-color-red">￥{{ countmoney }}</text>
          <view class="placeOrder bg-color-red" @click="placeOrder">立即下单</view>
        </view>
        <view v-else class="button acea-row row-middle">
          <view class="bnt cart-color" @click="onCollectAll">收藏</view>
          <view class="bnt" @click="onCartDelete">删除</view>
        </view>

      </view>
    </view>

  </view>
</template>
<script>
import { mul, add } from '@/utils/math'
import { cartCheckedKey } from '@/utils/config'
import ProductRecommend from '@/components/product/product-recommend'
import {
  getCartList,
  cartDelete,
  changeCartNum,
  getCartCount
} from '@/api/store'
import { collectBatchAdd } from '@/api/user'
// import debounce from 'lodash.debounce'

export default {
  components: {
    ProductRecommend
  },
  data() {
    return {
      cartList: { invalid: [], valid: [] },
      validList: [],
      isAllSelect: false,
      cartCount: 0,
      countmoney: 0,
      goodsHidden: true,
      footerswitch: false,
      count: 0,
      checkedIds: [],
      loaded: false,
      images: {
        noCart: this.resURL + '/assets/images/noCart.png'
      }
    }
  },
  watch: {
    cartList(list) {
      this.validList = list.valid
    }
  },
  mounted() {
    const that = this
    uni.hideTabBar()
    wx.hideTabBar()
    that.carnum()
    that.countMoney()
    that.loadCartList()
    that.gainCount()
  },
  methods: {
    loadCartList: function() {
      const that = this
      getCartList().then(res => {
        that.cartList = res.data
        let checkedIds = uni.getStorageSync(cartCheckedKey) || []
        if (!Array.isArray(checkedIds)) checkedIds = []
        this.cartList.valid.forEach(cart => {
          if (checkedIds.indexOf(cart.id) !== -1) cart.checked = true
        })
        if (checkedIds.length) {
          that.checkedIds = checkedIds
          that.isAllSelect = checkedIds.length === this.cartList.valid.length
          that.carnum()
          that.countMoney()
        }
        this.loaded = true
      })
    },
    // 删除商品；
    onCartDelete() {
      const that = this
      const id = []
      const valid = []
      const list = that.cartList.valid
      list.forEach((val) => {
        if (val.checked === true) {
          id.push(val.id)
        }
      })
      if (id.length === 0) {
        uni.showToast({
          title: '请选择产品!',
          icon: 'none',
          duration: 2000 })
        return
      }
      cartDelete(id).then(() => {
        list.forEach(function(val, i) {
          if (val.checked === false || val.checked === undefined) { valid.push(list[i]) }
        })
        that.$set(that.cartList, 'valid', valid)
        that.carnum()
        that.countMoney()
        that.gainCount()
        that.loadCartList()
      })
    },
    // //获取数量
    gainCount() {
      const that = this
      getCartCount().then(res => {
        that.count = res.data.count
      })
    },
    // 清除失效产品；
    delInvalidGoods() {
      const that = this
      const id = []
      const list = that.cartList.invalid
      list.forEach((val) => {
        id.push(val.id)
      })
      cartDelete(id).then(() => {
        list.splice(0, list.length)
        that.gainCount()
        that.loadCartList()
      })
    },
    // 批量收藏;
    onCollectAll() {
      const that = this
      const data = { ids: [], category: '' }
      const list = that.cartList.valid
      list.forEach((val) => {
        if (val.checked === true) {
          data.ids.push(val.productId)
          data.category = val.type
        }
      })
      if (data.ids.length === 0) {
        uni.showToast({
          title: '请选择产品!',
          icon: 'none',
          duration: 2000 })
        return
      }
      collectBatchAdd(data).then(() => {
        uni.showToast({
          title: '收藏成功!',
          icon: 'none',
          duration: 2000 })
      })
    },
    // 立即下单；
    placeOrder: function() {
      const that = this
      const list = that.cartList.valid
      const ids = []
      list.forEach(function(val) {
        if (val.checked === true) {
          ids.push(val.id)
        }
      })
      if (ids.length === 0) {
        uni.showToast({
          title: '请选择产品',
          icon: 'none',
          duration: 2000 })
        return
      }
      this.$router.push({
        path: '/pages/order/OrderSubmission/main',
        query: { ids: ids.join(',') }
      })
    },
    manage: function() {
      const that = this
      that.footerswitch = !that.footerswitch
    },
    goodsOpen: function() {
      const that = this
      that.goodsHidden = !that.goodsHidden
    },
    // 加
    plus: function(index) {
      const that = this
      const list = that.cartList.valid[index]
      list.cartNum++
      if (list.attrInfo) {
        if (list.cartNum >= list.attrInfo.stock) {
          that.$set(list, 'cartNum', list.attrInfo.stock)
        }
      } else {
        if (list.cartNum >= list.stock) {
          that.$set(list, 'cartNum', list.stock)
        }
      }
      that.carnum()
      that.countMoney()
      that.syncCartNum(list)
    },
    // 减
    reduce: function(index) {
      const that = this
      const list = that.cartList.valid[index]
      if (list.cartNum <= 1) {
        uni.showToast({
          title: '购物数量至少为1',
          icon: 'none',
          duration: 2000 })
        return
      }
      list.cartNum--
      if (list.cartNum < 1) {
        that.$set(list, 'cartNum', 1)
      }
      that.carnum()
      that.countMoney()
      that.syncCartNum(list)
    },
    syncCartNum(cart) {
      if (!cart.sync) {
        changeCartNum(cart.id, Math.max(cart.cartNum, 1) || 1)
          .then(res => {
            this.loadCartList()
          }).catch(error => {
            uni.showToast({
              title: error.response.data.msg,
              icon: 'none',
              duration: 2000 })
          })
      }
    },
    // 单选
    switchSelect: function(index) {
      const that = this
      const cart = that.cartList.valid[index]
      const i = this.checkedIds.indexOf(cart.id)
      cart.checked = !cart.checked

      if (i !== -1) this.checkedIds.splice(i, 1)
      if (cart.checked) {
        this.checkedIds.push(cart.id)
      }
      const len = that.cartList.valid.length
      const selectnum = []
      for (let i = 0; i < len; i++) {
        if (that.cartList.valid[i].checked === true) {
          selectnum.push(true)
        }
      }
      that.isAllSelect = selectnum.length === len
      that.$set(that, 'cartList', that.cartList)
      that.$set(that, 'isAllSelect', that.isAllSelect)

      uni.setStorageSync(cartCheckedKey, that.checkedIds)

      that.carnum()
      that.countMoney()
    },
    // 全选
    allChecked(e) {
      const that = this
      const selectAllStatus = !!e.mp.detail.value[0]
      // let selectAllStatus = that.isAllSelect;
      const checkedIds = []
      // for (let i = 0; i < array.length; i++) {
      //   array[i].checked = selectAllStatus;
      //   checked.push()
      // }
      that.cartList.valid.forEach(cart => {
        cart.checked = selectAllStatus
        if (selectAllStatus) {
          checkedIds.push(cart.id)
        }
      })
      const cartList = {
        ...that.cartList
      }
      that.cartList = []
      that.cartList = cartList
      this.$set(this, 'cartList', this.cartList)
      this.$set(this, 'isAllSelect', selectAllStatus)
      this.checkedIds = checkedIds

      uni.setStorageSync(cartCheckedKey, checkedIds)
      that.carnum()
      that.countMoney()
    },
    // 数量
    carnum() {
      const that = this
      var carnum = 0
      var array = that.cartList.valid
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          carnum += parseInt(array[i].cartNum)
        }
      }
      that.$set(that, 'cartCount', carnum)
    },
    // 总共价钱；
    countMoney() {
      const that = this
      let carmoney = 0
      const array = that.cartList.valid
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          carmoney = add(carmoney, mul(array[i].cartNum, array[i].truePrice))
        }
      }
      that.countmoney = carmoney
    }
  }
}
</script>
<style lang="scss">
.cart {
  .service-policy {
    color: #8c8c8c;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  }
  .no-cart {
    padding: 20upx 0;
    > .pictrue {
      text-align: center;
      margin-top: 200upx;
      > image {
        width: 414upx;
        height: 336upx;
      }
    }
  }
  .cart-list {
    .pictrue {
      > image {
        width: 150upx;
        height: 150upx;
      }
    }
    .cu-item {
      border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
      padding: 10upx 0;
      .content-info {
        width: calc(100% - 280upx);
        .name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cart-quantity {
          position: absolute;
          right: 30upx;
          bottom: 20upx;
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
    }
  }
}
</style>
