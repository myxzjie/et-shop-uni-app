<template>
  <div class="quality-recommend">
    <div class="title acea-row row-center-wrapper">
      <div class="line" />
      <div class="name">
        <text class="iconfont" :class="icon" />{{ name }}
      </div>
      <div class="line" />
    </div>
    <good-list :list="list" :is-sort="false" />
  </div>
</template>
<script>
import goodList from '@/components/shop/good-list'
import { getProductPromotion } from '@/api/store'
export default {
  components: {
    goodList
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
    debugger
    that.type = option.type
    that.titleSetting()
    that.loadProductPromotion()
  },
  methods: {
    titleSetting() {
      const that = this
      switch (that.type) {
        case '1': // 精品推荐
          that.name = '精品推荐'
          that.icon = 'icon-jingpintuijian'
          break
        case '2': // 热门榜单
          that.name = '热门榜单'
          that.icon = 'icon-remen'
          break
        case '3': // 首发新品
          that.name = '首发新品'
          that.icon = 'icon-xinpin'
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
      getProductPromotion(that.type).then(res => {
        that.list = res.data.list
      }).catch(res => {
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
