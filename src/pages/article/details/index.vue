<template>
  <view>
    <cu-custom bg-image="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="article">
         <view class="title padding text-blod text-xxl">{{ article.title }}</view>
         <view class="article-bar flex flex-wrap row-middle padding-tb-sm padding-lr">
           <view class="item zone text-red">新闻专区</view>
          <view class="item">
            <text class="cuIcon-time"></text>
            <text class="padding-left-xs">{{ article.addTime }}</text>
          </view>
          <view class="item">
            <text class="cuIcon-attention"></text>
            <text class="padding-left-xs">{{ article.visit }}</text>
          </view>
         </view>
         <view class="content padding" v-html="article.content" />
      </view>

    </scroll-view>
  </view>
</template>

<script>
import { getArticleDetails } from '@/api/public'
export default {
  data() {
    return {
      id: -1,
      article: {}
    }
  },
  onLoad(option) {
    const that = this
    that.id = option.id
  },
  onShow(){
    this.articleDetails()
  },
  methods: {
    articleDetails() {
      const that = this
      getArticleDetails(that.id).then(res => {
        that.article = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  .article-bar {
    .item {
      margin-right: 20upx;
      &.zone {
        border: 1upx solid red;
        padding: 3upx 10upx;
      } 
    } 
  }
}

</style>
