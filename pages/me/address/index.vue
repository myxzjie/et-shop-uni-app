<template>
  <view>
    <cu-custom :is-back="true">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action"> <text class="cuIcon-title text-orange " /> 地址管理 </view>
      </view>
      <view class="cu-list menu-avatar">
        <view
          v-for="(item, index) in addressList"
          :key="index"
          class="cu-item"
          :class="modalName == 'move-box-' + index ? 'move-cur' : ''"
          :data-target="'move-box-' + index"
          @touchstart="ListTouchStart"
          @touchmove="ListTouchMove"
          @touchend="ListTouchEnd"
        >
          <view class="content">
            <view class="text-grey">
              <text>收货人：{{ item.realName }}</text>
            </view>
            <view class="text-grey">
              <text>手机号：{{ item.phone }}</text>
            </view>
            <view class="text-gray text-sm">
              <text class="cuIcon-focus margin-right-xs" />
              <text>收货地址：{{ item.province }}{{ item.city }}{{ item.district
              }}{{ item.detail }}</text>
            </view>
          </view>
          <view class="action">
            <view v-if="item.isDefault" class="cu-tag line-grey">默认</view>
            <view v-else class="cu-tag line-olive" @tap="radioChange(index)">置默认</view>
          </view>
          <view class="move">
            <view class="bg-olive" @tap="editAddress(index)">编辑</view>
            <view class="bg-red" @tap="delAddress(index)">删除</view>
          </view>
        </view>
      </view>

      <view class="cu-bar btn-group margin-top">
        <button class="cu-btn bg-green shadow-blur round lg" @tap="addAddress">
          <text class="cuIcon-locationfill" />
          添加新地址
        </button>
      </view>

      <Loading :loaded="loadend" :loading="loading" />

      <view
        class="address-management"
        :class="addressList.length < 1 && page > 1 ? 'on' : ''"
      >
        <view v-if="addressList.length < 1 && page > 1" class="noCommodity">
          <view class="noPictrue">
            <img :src="'https://shop.cdn.dev56.com/assets/images/noAddress.png'" class="image">
          </view>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import {
  getAddressList,
  getAddressRemove,
  getAddressDefaultSet
} from '@/api/user'
import Loading from '@/components/loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      modalName: '',
      page: 1,
      limit: 20,
      addressList: [],
      loadTitle: '',
      loading: false,
      loadend: false,
      isWechat: false
    }
  },
  onLoad() {},
  onShow() {
    this.AddressList()
  },
  onReachBottom() {
    !this.loading && this.AddressList()
  },
  methods: {
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.listTouchStart = e.touches[0].pageX
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.listTouchDirection == 'left') {
        this.modalName = e.currentTarget.dataset.target
      } else {
        this.modalName = null
      }
      this.listTouchDirection = null
    },
    /**
     * 获取地址列表
     *
     */
    AddressList() {
      const that = this
      if (that.loading) return // 阻止下次请求（false可以进行请求）；
      if (that.loadend) return // 阻止结束当前请求（false可以进行请求）；
      that.loading = true
      getAddressList({ page: that.page, limit: that.limit }).then(res => {
        that.loading = false
        // apply();js将一个数组插入另一个数组;
        that.addressList.push.apply(that.addressList, res.data)
        that.loadend = res.data.length < that.limit // 判断所有数据是否加载完成；
        that.page = that.page + 1
      })
    },
    /**
     * 编辑地址
     */
    editAddress(index) {
      const that = this
      const id = that.addressList[index].id
      uni.navigateTo({
        url: `/pages/me/address/edit?id=${id}`
      })
    },
    /**
     * 删除地址
     */
    delAddress: function(index) {
      const that = this
      const address = this.addressList[index]
      const id = address.id
      getAddressRemove(id).then(() => {
        uni.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
          success: () => {
            that.addressList.splice(index, 1)
            that.$set(that, 'addressList', that.addressList)
          }
        })
      })
    },
    /**
     * 设置默认地址
     */
    radioChange(index) {
      const that = this
      const address = this.addressList[index]
      const id = address.id
      getAddressDefaultSet(id).then((res) => {
        for (var i = 0, len = that.addressList.length; i < len; i++) {
          if (i === index) { that.addressList[i].isDefault = 1 } else { that.addressList[i].isDefault = 0 }
        }
        that.$set(that, 'addressList', that.addressList)
        uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
      })
    },
    /**
     * 新增地址
     */
    addAddress() {
      uni.navigateTo({
        url: '/pages/me/address/edit'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cu-list.menu-avatar>.cu-item .content {
  left: 30rpx;
}
</style>
