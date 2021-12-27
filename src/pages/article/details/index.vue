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
      <view id="comment-wrap">
        <comment />
      </view>
      <!--
      <comment-item
        style="padding-left: 68rpx;"
        :commentChildren="items"
        @child_up="handleCommentUp"
        @child_down="handleCommentDown"
        @child_reply="handleCommentInputPopupShow"/> -->
    </scroll-view>

    <view class="cu-bar tabbar input foot ">
      <view class="action">
        <view class="comment-wrap text-gray" @tap="handleComment">写评论...</view>
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
        <!-- <view class="cu-bar bg-white">
          <view class="action text-green">&nbsp</view>
          <view class="action text-blue" @tap="hideModal">
            <text class="cuIcon-close"/>
          </view>
        </view> -->
        <view class="padding-sm text-left">
          <textarea class="comment-content " placeholder-style="color:#aaa" :focus="hasFocus" placeholder="写评论..." />
          <view class="cu-bar btn-group">
            <button class="cu-btn bg-green shadow-blur round ">保存</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { getArticleDetails, saveArticleComment } from '@/api/public'
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
      this.hasModal = !this.hasModal
      if (this.hasModal) {
        this.hasFocus = true
      }
    },
    hideModal() {
      this.hasModal = false
    },
    togglePosition() {
      // const query = uni.createSelectorQuery().in(this)
      // query.select('#comment-wrap').boundingClientRect(data => {
      //   //console.log('节点离页面顶部的距离为' + data.top)
      //   uni.pageScrollTo({ duration: 100, // 过渡时间
      //     scrollTop: data.top - this.CustomBar // 到达距离顶部的top值
      //   })
      // }).exec()

      const query = uni.createSelectorQuery().in(this)
      query.select('#comment-wrap').boundingClientRect()
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
        // if (this.positionSelect) {
        //   this.positionSelect = false

        //   // 从评论区域回到顶部
        //   uni.createSelectorQuery().select('#comment-wrap').boundingClientRect(data => { // 目标位置的节点：类或者id
        //     uni.createSelectorQuery().select('.article').boundingClientRect(res => { // 最外层盒子的节点：类或者id
        //       debugger
        //       console.log('得到布局位置信息' + JSON.stringify(data))
        //       uni.pageScrollTo({
        //         duration: 100, // 过渡时间
        //         scrollTop: res.top - data.top // 返回顶部的top值
        //       })
        //     }).exec()
        //   }).exec()
        // } else {
        //   this.positionSelect = true

        //   // 从当前位置到达评论区域
        //   uni.createSelectorQuery().select('#comment-wrap').boundingClientRect(data => { // 目标位置的节点：类或者id
        //     uni.createSelectorQuery().select('.article').boundingClientRect(res => { // 最外层盒子的节点：类或者id
        //       uni.pageScrollTo({

        //         duration: 100, // 过渡时间

        //         scrollTop: data.top - res.top // 到达距离顶部的top值

        //       })
        //     }).exec()
        //   }).exec()
        // }
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
  .comment-wrap {
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
