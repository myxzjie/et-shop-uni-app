<template>
  <view class="tips tips-line">
    <view class="tips-line-title">
      <view>{{ title }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  &-line {
    display: flex;
    margin: 1.5em auto;
    width: 65%;
    justify-content: center;
    align-items: center;
    &::before, &::after{
      flex: 1;
      background: var(--gray);
      content: "";
      height: 1upx;
      margin: 0 20upx;
    }

    &-title {
      display: inline-block;
      vertical-align: middle;
    }
  }
}

</style>
