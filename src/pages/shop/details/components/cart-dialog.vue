<template>
  <view class="cu-modal bottom-modal" :class="showModal ? 'show' : ''" @tap="hideModal">
    <view class="cu-dialog" @tap.stop="">
      <!-- <view class="cu-bar bg-white">
            <view class="action text-green"></view>
            <view class="action " @tap="hideModal">x</view>
            </view> -->
      <view class="padding">
        <view class="flex flex-wrap row-between">
          <view class="pictrue">
            <image :src="attr.productSelect.image" class="image" />
          </view>
          <view class="content">
            <view class="name">{{ attr.productSelect.store_name }}</view>
            <view class="sales text-left">
              <text class="price text-red text-xl">￥{{ attr.productSelect.price }}</text>
              <text class="stock margin-left">库存: {{ attr.productSelect.stock }}</text>
            </view>
          </view>
          <view class="cuIcon-roundclose" @click="hideModal" />
        </view>
      </view>

      <view class="attribute padding">
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
            @click="onCartNumDes"
          >-</view>
          <view class="quantity">{{ attr.productSelect.cartNum || 1 }}</view>
          <view
            class="increase"
            :class="attr.productSelect.cartNum >= attr.productSelect.stock? 'on': ''"
            @click="onCartNumAdd"
          >+</view>
        </view>
      </view>

      <view class="cu-tabbar-height" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    },
    attr: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    hideModal() {
      debugger
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cu-modal {
  z-index:1020;
  .pictrue {
    > .image {
      width: 120upx;
      height:120upx;
    }
  }
  .content {
    .name {
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
