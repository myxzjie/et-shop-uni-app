<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <!-- <block slot="backText">返回</block> -->
      <!-- <block slot="content">{{ BaseName }}</block> -->
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="article">
        <view class="title padding text-blod text-xxl">{{ article.title }}</view>
        <view class="article-bar flex flex-wrap row-middle padding-tb-sm padding-lr">
          <view class="item zone text-red">{{ article.cateName }}</view>
          <view class="item">
            <text class="cuIcon-time" />
            <text class="padding-left-xs">{{ article.createDate | dateFormat }}</text>
          </view>
          <view class="item">
            <text class="cuIcon-attention" />
            <text class="padding-left-xs">{{ article.visit || 0 }}</text>
          </view>
          <view class="item">
            <text class="cuIcon-attention" />
            <text class="padding-left-xs">{{ article.praise || 0 }} </text>
          </view>
        </view>
        <view class="content padding" v-html="article.content" />
      </view>
      <!-- 评论 -->
      <comment />
      <!--
      <comment-item
        style="padding-left: 68rpx;"
        :commentChildren="items"
        @child_up="handleCommentUp"
        @child_down="handleCommentDown"
        @child_reply="handleCommentInputPopupShow"/> -->
    </scroll-view>

    <view class="cu-bar input foot">
      <!-- <view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
				<view class="action">
					<text class="cuIcon-roundaddfill text-grey"></text>
				</view> -->
      <input placeholder="说...." :adjust-position="false" class="solid-bottom" maxlength="300" cursor-spacing="10" @click="handleComment"></input>
      <view class="action">
        <text class="cuIcon-emojifill text-grey" />
      </view>
      <button class="cu-btn bg-green shadow-blur">发送</button>
    </view>

    <view class="cu-modal bottom-modal" :class="bottomModal?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white">
          <view class="action text-green">确定</view>
          <view class="action text-blue" @tap="hideModal">取消</view>
        </view>
        <view class="padding-xl">
          <input :focus="isFocus1" placeholder=""></input>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { getArticleDetails } from '@/api/public'
import Comment from './comment'
export default {
  components: { Comment },
  filters: {
    dateFormat(value) {
      // value = value / 1000
      return moment(value).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  data() {
    return {
      id: -1,
      article: {},
      bottomModal: false,
      isFocus1: false,
      items: [{
        criticImg: '',
        criticName: 'vito',
        reCriticName: 'dffddffd',
        comment: 'dsdsd'
      }]
    }
  },
  onLoad(option) {
    const that = this
    that.id = option.id
  },
  onShow() {
    this.articleDetails()
  },
  methods: {
    articleDetails() {
      const that = this
      getArticleDetails(that.id).then(res => {
        that.article = res.data
      })
    },
    handleComment() {
      this.bottomModal = !this.bottomModal
      if (this.bottomModal) {
        this.isFocus1 = true
      }
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
