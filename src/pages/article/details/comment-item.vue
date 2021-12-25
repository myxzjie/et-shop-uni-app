<template>
  <view class="reply-content-wrapper">
    胖胖胖
    <view v-for="(item,index) in commentChildren" :key="index" class="comment-reply-data">
      <view class="comment-reply-user">
        <view class="comment-root-header flex-row">
          <image :src="item.criticImg" mode="" />
          <view class="username">
            {{ item.criticName }}
          </view>
        </view>
        <view class="replycomment-content">
          <text>回复</text><text class="replyer">{{ item.reCriticName }}</text>
          <text>{{ item.comment }}</text>
        </view>
        <view class="comment-data flex-row-space">
          <view class="create-time">
            {{ formatDate(item.createTime) }}
          </view>
          <view class="operation-icon flex-row">
            <view class="operation-item">
              <i class="icon iconzan_before" @tap="handleCommentUp(item.id)" />
              <text>{{ item.supportCount }}</text>
            </view>
            <view class="operation-item">
              <i class="icon iconcai_before" @tap="handleCommentDown(item.id)" />
              <text>{{ item.opposeCount }}</text>
            </view>
            <view class="operation-item">
              <i class="icon iconpinglun" @tap="handleCommentInputPopupShow(item)" />
            </view>
          </view>
        </view>
      </view>
      <replyComment
        v-if="item.children"
        :comment-children="item.children"
        @child_up="handleCommentUp"
        @child_down="handleCommentDown"
        @child_reply="handleCommentInputPopupShow"
      />
    </view>
  </view>
</template>

<script>
// import {
//     formateTime
// } from '../../utils/index.js'
export default {
  name: 'ReplyComment',
  props: {
    commentChildren: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 格式化时间
    formatDate(time) {
      if (!time) {
        return ''
      }
      return formateTime(time)
    },
    handleCommentUp(id) {
      this.$emit('child_up', id)
    },
    handleCommentDown(id) {
      this.$emit('child_down', id)
    },
    handleCommentInputPopupShow(item) {
      this.$emit('child_reply', item)
    }
  }
}
</script>

<style lang="scss" scoped>
    .comment-reply-data {
        .comment-root-header {
            color: #333333;
            margin: 27rpx 0;

            image {
                width: 48rpx;
                height: 48rpx;
                border-radius: 40rpx;
                margin-right: 20rpx;
            }
        }

        .comment-root-user {
            border-bottom: 2rpx solid #eee;
        }

        image {
            width: 48rpx;
            height: 48rpx;
            border-radius: 40rpx;
            margin-right: 20rpx;
        }

        .replycomment-content {
            margin-bottom: 20rpx;
            word-break: break-all;

            .replyer {
                display: inline-block;
                padding: 0 12rpx;
                color: #333333;
                position: relative;
                bottom: 2rpx;
            }
        }

        .comment-data {
            color: #666;
            line-height: 20rpx;
            font-size: 20rpx;
            padding-bottom: 28rpx;
            border-bottom: 2rpx solid #EDEDED;

            .operation-icon {
                .operation-item {
                    margin-left: 49rpx;

                    .icon {
                        font-size: 22rpx;
                    }
                }
            }

            // 点赞
            .active-support {
                animation-name: support;
                animation-duration: 500ms;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
            }
        }
    }
</style>
