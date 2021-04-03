<template>
  <view
    v-if="loading || !loaded"
    class="Loads acea-row row-center-wrapper"
    style="margin-top: .2rem;"
  >
    <template v-if="loading">
      <view
        class="iconfont icon-jiazai loading acea-row row-center-wrapper"
      />
      正在加载中
    </template>
    <template v-else>
      上拉加载更多
    </template>
  </view>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loaded: Boolean,
    loading: Boolean
  }
}
</script>
