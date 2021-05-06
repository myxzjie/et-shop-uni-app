<template>
  <view
    v-if="loading || !loaded"
    class="loading-wrap flex flex-wrap align-center margin-top"
  >
    <template v-if="loading">
      <view
        class="cuIcon-loading loading flex flex-wrap align-center"
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
<style lang="scss" scoped>
.loading-wrap{
  // height: 0.8rem;
  // font-size: 0.7rem;
  // color: #000;
  /*加载动画*/
  @keyframes load {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .loadingpic {
    animation: load 3s linear 1s infinite;
  }
  .loading {
    animation: load linear 1s infinite;
  }
}
</style>
