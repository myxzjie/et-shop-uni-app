<template>
  <view class="evaluateWtapper evaluate-wrap">
    <view v-for="(item, evaluateWtapperIndex) in reply" :key="evaluateWtapperIndex" class="evaluateItem item">
      <view class="pic-text flex flex-wrap row-middle">
        <view class="pictrue">
          <image :src="item.avatar" class="image" mode="aspectFill" /></view>
        <view class="content padding-sm flex flex-wrap row-middle">
          <text class="name ellipsis-line">{{ item.nickname }}</text>
          <view class="stars">
            <text
              v-for="star in item.star|toInt"
              class="cuIcon-favorfill text-yellow"
            />
          </view>
        </view>
      </view>
      <view class="time">
        <view class="text-sm">{{ item.addTime|dateFormat }}</view>
        <view v-if="item.suk !== null">{{ item.suk }}</view>
      </view>
      <view class="evaluate-infor">{{ item.comment }}</view>
      <view class="imgList acea-row">
        <view v-for="(itemn, eq) in item.picturesArr" :key="eq" class="pictrue">
          <image :src="itemn" class="image" />
        </view>
      </view>
      <!--<view class="reply" v-if="item.merchant_reply_content">-->
      <!--<span class="font-color-red">店小二</span>：{{-->
      <!--item.merchant_reply_content-->
      <!--}}-->
      <!--</view>-->
    </view>
  </view>
</template>
<script>
export default {
  filters: {
    toInt(value) {
      if (value instanceof Number) { return parseInt(value) }
      return value
    }
  },
  props: {
    reply: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.evaluate-wrap{
  .item {
    .pictrue {
      .image {
        width: 64upx;
        height: 64upx;
        border-radius: 50%;
        border:1upx solid #eee;
      }
    }
    .content{
      width: calc(100% - 64upx)
    }
  }
}
</style>
