<template>
  <view>
    <view class="product-window" :class="attr.cartAttr === true ? 'on' : ''">
      <view class="textpic acea-row row-between-wrapper">
        <view class="pictrue">
          <image :src="attr.productSelect.image" class="image" />
        </view>
        <view class="text">
          <view class="line1">{{ attr.productSelect.store_name }}</view>
          <view class="money font-color-red">
            ￥
            <text class="num">{{ attr.productSelect.price }}</text>
            <text class="stock">库存: {{ attr.productSelect.stock }}</text>
          </view>
        </view>
        <view class="cuIcon-roundclose" @click="closeAttr" />
      </view>
      <view class="productWinList" v-if="attr.productAttr">
        <view v-for="(item, indexw) in attr.productAttr" :key="indexw" class="item">
          <view class="title">{{ item.attrName }}</view>
          <view class="listn acea-row row-middle">
            <view
              v-for="(itemn, indexn) in item.attrValue"
              :key="indexn"
              class="itemn"
              :class="item.index == indexn ? 'on' : ''"
              @click="tapAttr(indexw, indexn)"
            >
              {{ itemn.attr }}
            </view>
          </view>
        </view>
      </view>
      <view class="cart">
        <view class="title">数量</view>
        <view class="carnum acea-row row-left">
          <view
            class="item reduce"
            :class="attr.productSelect.cartNum <= 1 ? 'on' : ''"
            @click="onCartNumDes"
          >-</view>
          <view class="item num">{{ attr.productSelect.cartNum || 1 }}</view>
          <view
            class="item plus"
            :class="attr.productSelect.cartNum >= attr.productSelect.stock? 'on': ''"
            @click="onCartNumAdd"
          >+</view>
        </view>
      </view>
    </view>
    <view class="mask" :hidden="attr.cartAttr === false" @touchmove.prevent @click="closeAttr" />
  </view>
</template>
<script>
export default {
  name: 'ProductWindow',
  props: {
    attr: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      productAttr: this.$props.attr.productAttr,
      goodsAttr: this.$props.attr,
      quantity: this.$props.attr.productSelect.cartNum || 1
    }
  },
  // watch: {
  //   '$props.attr.productAttr'(props) {
  //     this.productAttr = this.attr.productAttr
  //     this.goodsAttr = this.attr
  //   }
  // },
  methods: {
    closeAttr: function() {
      this.$emit('changeFun', { action: 'changeattr', value: false })
    },
    onCartNumDes() {
      this.$emit('changeFun', { action: 'ChangeCartNum', value: -1 })
      // this.quantity = this.goodsAttr.productSelect.cartNum
    },
    onCartNumAdd() {
      this.$emit('changeFun', { action: 'ChangeCartNum', value: 1 })
      // this.quantity = this.goodsAttr.productSelect.cartNum
    },
    tapAttr(indexw, indexn) {
      debugger
      this.attr.productAttr[indexw].index = indexn
      // this.productAttr[indexw].index = indexn
      // const attr = {
      //   ...this.goodsAttr
      // }
      // this.goodsAttr = {
      //   cartAttr: false,
      //   productAttr: [],
      //   productSelect: []
      // }
      // this.goodsAttr = attr
      const value = this.getCheckedValue()
        .sort()
        .join(',')
      this.$emit('changeFun', { action: 'ChangeAttr', value: value })
    },
    // 获取被选中属性；
    getCheckedValue() {
      const productAttr = this.attr.productAttr
      // console.log(productAttr)
      const value = []
      for (let i = 0; i < productAttr.length; i++) {
        for (let j = 0; j < productAttr[i].attrValueArr.length; j++) {
          if (productAttr[i].index === j) {
            value.push(productAttr[i].attrValueArr[j])
          }
        }
      }
      return value
    }
  }
}
</script>
