<template>
  <view class="search acea-row row-middle" @click="onSearch">
    <text class="iconfont icon-xiazai5" />{{placeholder}}
  </view>
</template>

<script>
export default {
  props:{
    placeholder: {
      type: String,
      default: '搜索商品'
    }
  },
  methods: {
    onSearch() {
      this.$emit('click')
    }
  }
}
</script>
