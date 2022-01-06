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
      <view class="comment-wrap">
        <comment :data="commentItems" />
      </view>
      <view class="cu-tabbar-height" />
    </scroll-view>

    <view class="cu-bar tabbar input foot ">
      <view class="action">
        <view class="comment text-gray" @tap="handleComment">写评论...</view>
      </view>
      <view class="action" @tap="togglePosition">
        <view class="cuIcon-mark text-gray">
          <view class="cu-tag badge">99</view>
        </view>
      </view>
      <view class="action text-gray">
        <view class="cuIcon-appreciate">
          <view class="cu-tag badge">99</view>
        </view>
      </view>
      <view class="action">
        <text class="cuIcon-forward text-grey" />
      </view>
    </view>

    <view class="cu-modal bottom-modal" :class="hasModal?'show':''" @tap="hideModal">
      <view class="cu-dialog" @tap.stop="">
        <view class="padding-sm text-left">
          <textarea v-model="comment.content" class="comment-content " placeholder-style="color:#aaa" placeholder="写评论..." :focus="hasFocus" />
          <view class="cu-bar btn-group">
            <button class="cu-btn bg-green shadow-blur round" @tap="onSaveArticleComment">保存</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { getArticleDetails, saveArticleComment, getArticleComment } from '@/api/public'
import Comment from './comment'
export default {
  components: { Comment },
  filters: {
    dateFormat(value) {
      value = value / 1000
      return moment(value).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  data() {
    return {
      id: -1,
      article: {},
      hasModal: false,
      hasFocus: false,
      positionSelect: false,
      scroll: 0,
      comment: {
        content: undefined
      },
      commentItems: [],
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
        that.loadArticleComment()
      })
    },
    loadArticleComment() {
      const that = this
      getArticleComment(that.article.id).then(res => {
        that.commentItems = res.data
      })
    },
    handleComment() {
      this.hasModal = !this.hasModal
      if (this.hasModal) {
        this.hasFocus = true
      }
    },
    hideModal() {
      this.hasModal = false
    },
    togglePosition() {
      const query = uni.createSelectorQuery().in(this)
      query.select('.comment-wrap').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        if (this.positionSelect) {
          this.positionSelect = false
          uni.pageScrollTo({
            scrollTop: (res[0].top - this.CustomBar) + this.scroll,
            duration: 300
          })
        } else {
          if (res[0] && res[1]) {
            this.positionSelect = true
            uni.pageScrollTo({
              scrollTop: res[0].top + res[1].scrollTop - this.CustomBar,
              duration: 500
            })
          }
        }
      })
    },
    onSaveArticleComment() {
      const that = this
      const data = that.comment
      data.articleId = that.article.id
      saveArticleComment(data).then(res => {
        that.hideModal()
        that.loadArticleComment()
      })
    },
    onPageScroll(e) { // 根据距离顶部距离是否显示回到顶部按钮
      if (!this.positionSelect) {
        this.scroll = e.scrollTop
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
.cu-bar {
  .comment {
    background: #eee;
    border-radius: 25upx;
    padding: 15upx;
    padding-left: 30upx;
    min-width: 300upx;
    flex-shrink: 0;
    font-size: 26upx;
    text-align: left;
    justify-content: start;
  }
}

.comment-content {
  border: 1upx solid #eee;
  border-radius: 10upx;
  background: #eee;
  padding: 15upx;
}

</style>
