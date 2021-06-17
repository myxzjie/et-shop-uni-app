<template>
  <view>
    <cu-custom :is-back="true">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view>

        <tips-line :title="name" />

        <product-list :list="list" :is-sort="false" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TipsLine from '@/components/tips/tips-line'
import productList from '@/components/product/product-list'
import { getProductPromotion } from '@/api/store'
export default {
  components: {
    TipsLine,
    productList
  },
  data() {
    return {
      name: '',
      icon: '',
      type: null,
      list: []
    }
  },
  onLoad(option) {
    const that = this
    that.type = option.type
  },
  onShow() {
    const that = this
    that.titleSetting()
    that.loadProductPromotion()
  },
  methods: {
    titleSetting() {
      const that = this
      switch (that.type) {
        case '1': // 精品推荐
          that.name = '精品推荐'
          break
        case '2': // 热门榜单
          that.name = '热门榜单'
          break
        case '3': // 首发新品
          that.name = '首发新品'
          break
        default:
          uni.showToast({
            title: '信息错误: type[' + that.type + ']',
            icon: 'none',
            duration: 2000
          })
          break
      }
    },
    loadProductPromotion() {
      const that = this
      getProductPromotion(that.type)
        .then((res) => {
          that.list = res.data.list
        })
        .catch((res) => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    }
  }
}
</script>

