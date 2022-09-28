<template>
  <view>
    <view class="cu-modal bottom-modal" :class="value ? 'show' : ''" @tap="onClose">
      <view class="cu-dialog" @tap.stop="">
        <view class="cu-bar bg-white">
          <view class="action text-green" />
          <view class="action ">选择地址</view>
          <view class="action text-blue" @tap="onClose">
            <text class="cuIcon-close" />
          </view>
        </view>
        <view class="margin-top-sm">
          <view v-if="addressList.length" class="list">
            <view
              v-for="(item, index) in addressList"
              :key="index"
              class="item flex flex-wrap align-between padding-sm bg-white"
              :class="item.id === checked ? 'text-cyan' : ''"
              @tap="tapAddress(index)"
            >
              <view class="cuIcon-location" :class="item.id === checked ? 'text-cyan' : ''" />
              <view class="content text-left padding-left-sm">
                <view class="name">
                  {{ item.realName }}
                  <text class="phone">{{ item.phone }}</text>
                </view>
                <view class="ellipsis-line margin-top-xs">
                  {{ item.province }}{{ item.city }}{{ item.district
                  }}{{ item.detail }}
                </view>
              </view>
              <text class="cuIcon-check" :class="item.id === checked ? 'text-cyan' : ''" />
            </view>
          </view>
          <view v-if="addressList.length < 1" class="flex-sub text-center">
            <view class="solid-bottom text-xs padding">
              <text class="text-gray">没可选地址，请点击添加地址</text>
            </view>
          </view>
          <view class="cu-bar btn-group margin-sm">
            <button class="cu-btn bg-green shadow-blur round lg" @tap="goAddressPages">新加地址</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getAddressList } from '@/api/user'

export default {
  props: {
    value: Boolean,
    checked: Number
  },
  data() {
    return {
      addressList: [],
      current: 0,
      cartId: 0,
      pinkId: 0,
      couponId: 0
    }
  },
  mounted() {},
  methods: {
    getAddressList() {
      const that = this
      getAddressList().then(res => {
        that.addressList = res.data
      })
    },
    onClose() {
      this.$emit('input', false)
    },
    goAddressPages() {
      uni.navigateTo({ url: '/pages/me/address/edit' })
      this.$emit('redirect')
    },
    tapAddress(index) {
      this.$emit('change', this.addressList[index])
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>

.list {
  max-height: 600upx;
  overflow-y: auto;
  overflow-x: hidden;
  .item {
    border-bottom: 1px solid #eee;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;

    [class^="cuIcon"] {
      width: 30upx;
    }
    .content {
      width: calc(100% - 60upx);
    }
  }
}
</style>
