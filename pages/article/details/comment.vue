<template>
  <view class="commentComponent">
    <!-- 评论组件 Component -->
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action"> <text class="cuIcon-title text-orange " /> 精彩评论 </view>
      <!-- <picker class="write" :value="commentTypeIndex" :range="commentType" @change="bindPickerChange">
        {{ commentType[commentTypeIndex] }}
        <view class="icon_arrow" />
      </picker> -->
    </view>
    <!-- <view class="commentComponent extra-class"> -->
    <!-- 填写评论区域 -->
    <!-- <view class="writeCommentWrap">
        <text class="comment">精彩评论</text>
        <picker class="write" @change="bindPickerChange" :value="commentTypeIndex" :range="commentType">
          {{commentType[commentTypeIndex]}}
          <view class="icon_arrow"></view>
        </picker>
      </view> -->
    <!-- </view> -->
    <block v-if="comments.length>0">
      <!-- 评论模块 -->
      <block v-for="(item,index) in data" :key="index">
        <view class="commentItem" catchtap="_goToReply" :data-contentid="item.id" :data-replyid="item.id" :data-battle-tag="item.displayName">
          <view class="titleWrap">
            <image class="logo" :src="item.avatar||'这里替换默认图'" />
            <view class="authorWrap">
              <view class="author">{{ item.nickName }}</view>
              <view class="time">{{ item.createDate | dateFormat }}</view>
            </view>
            <view class="starWrap" catchtap="_clickLike" :data-index="index" :data-like="item.like" :data-contentid="item.id" :data-topicid="item.topicId">
              <text class="count">{{ item.praise || "" }}</text>
              <view class="workSprite icon "-item-like-star-icon-has-click-:-star-icon- />
            </view>
          </view>
          <view class="text">
            {{ item.content }}
          </view>
        </view>
        <!-- 评论的评论 -->
        <block v-for="(itemReply,indexReply) in item.replyContents" :key="indexReply">
          <view class="commentItem commentItemReply" catchtap="_goToReply" :data-contentid="itemReply.id" :data-replyid="item.id" :data-battle-tag="itemReply.displayName">
            <view class="titleWrap">
              <image class="logo" :src="itemReply.headPortrait||'这里替换默认图'" />
              <view class="authorWrap">
                <view class="author">{{ itemReply.displayName }}</view>
                <view class="time">{{ itemReply.createTime }}</view>
              </view>
              <view class="starWrap" catchtap="_clickLike" :data-index="index" :data-index-reply="indexReply" :data-like="itemReply.like" :data-contentid="itemReply.id" :data-topicid="itemReply.topicId">
                <text class="count">{{ itemReply.likeTotal||"" }}</text>
                <view class="workSprite icon "-item-reply-like-star-icon-has-click-:-star-icon- />
              </view>
            </view>
            <view class="text">
              {{ itemReply.contentText }}
            </view>
          </view>
        </block>
      </block>
    </block>
  </view>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    dateFormat(value) {
      // value = value / 1000
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      comments: [
        {
          'contentText': '喜欢就关注我', // 评论内容
          'createTime': 1560158823647, // 评论时间
          'displayName': '智酷方程式', // 用户名
          'headPortrait': 'https://blz.nosdn.127.net/1/weixin/zxts.jpg', // 用户头像
          'id': '46e0fb0066666666', // 评论ID  用于回复和举报
          'likeTotal': 2, // 点赞数
          'replyContents': [ // 回复评论
            {
              'contentText': '@智酷方程式  喜欢就回复我', // 回复评论内容
              'createTime': 1560158986524, // 回复时间
              'displayName': '神秘的前端开发', // 回复的用户名
              'headPortrait': 'https://blz.nosdn.127.net/1/2018cosplay/fourth/tesss.jpg', // 回复的用户头像
              'id': '46e0fb00111111111', // 回复评论的ID
              'likeTotal': 2, // 回复评论的点赞数
              'replyContents': [], // 回复的回复 盖楼
              'replyId': '46e0fb001ec222222222' // 回复评论的独立ID，用于统计
            },
            {
              'contentText': '@智酷方程式： 威武，学习学习',
              'createTime': 1560407232814,
              'displayName': '神秘的前端开发',
              'headPortrait': 'https://blz.nosdn.127.net/1/2018cosplay/fourth/tesss.jpg',
              'id': '46e0fb00111111111',
              'likeTotal': 0,
              'replyContents': [],
              'replyId': '46e0fb001ec222222222'
            }
          ],
          'replyId': '',
          'topicId': '46e0fb001ec3333333'
        }, {
          'contentText': '喜欢就关注我', // 评论内容
          'createTime': 1560158823647, // 评论时间
          'displayName': '智酷方程式', // 用户名
          'headPortrait': 'https://blz.nosdn.127.net/1/weixin/zxts.jpg', // 用户头像
          'id': '46e0fb0066666666', // 评论ID  用于回复和举报
          'likeTotal': 2, // 点赞数
          'replyContents': [ // 回复评论
            {
              'contentText': '@智酷方程式  喜欢就回复我', // 回复评论内容
              'createTime': 1560158986524, // 回复时间
              'displayName': '神秘的前端开发', // 回复的用户名
              'headPortrait': 'https://blz.nosdn.127.net/1/2018cosplay/fourth/tesss.jpg', // 回复的用户头像
              'id': '46e0fb00111111111', // 回复评论的ID
              'likeTotal': 2, // 回复评论的点赞数
              'replyContents': [], // 回复的回复 盖楼
              'replyId': '46e0fb001ec222222222' // 回复评论的独立ID，用于统计
            },
            {
              'contentText': '@智酷方程式： 威武，学习学习',
              'createTime': 1560407232814,
              'displayName': '神秘的前端开发',
              'headPortrait': 'https://blz.nosdn.127.net/1/2018cosplay/fourth/tesss.jpg',
              'id': '46e0fb00111111111',
              'likeTotal': 0,
              'replyContents': [],
              'replyId': '46e0fb001ec222222222'
            }
          ],
          'replyId': '',
          'topicId': '46e0fb001ec3333333'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/* 评论组件 Css */

.commentComponent {
  font-size: 0;
  background: #fff;
}

.commentComponent .writeCommentWrap {
  position: relative;
  height: 48rpx;
  line-height: 48rpx;
  background: #f2f2f2;
  padding:0 26rpx;
  font-size: 22rpx;
}

.commentComponent .writeCommentWrap .comment {
  color: #a1a8b3;
}

.commentComponent .writeCommentWrap .write {
  color: #507da7;
  float: right;
  font-size: 22rpx;
}
.icon_arrow {
  height: 12rpx;
  width: 12rpx;
  display: inline-block;
  vertical-align: top;
  margin:16rpx 0 0 8rpx;
  border-right: 1px solid #507da7;
  border-bottom: 1px solid #507da7;
  transform: rotateZ(45deg);
}

.commentComponent .commentItem {
  background: #fff;
  padding: 40rpx 0 0 36rpx;
  border-top: 1rpx solid #ededee;
}

.commentComponent .commentItem .titleWrap {
  position: relative;
  height: 66rpx;
  font-size: 0;
}

.commentComponent .commentItem .titleWrap .logo {
  box-sizing: border-box;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  border: 2rpx solid #f0f0f0;
  vertical-align: middle;
}

.commentComponent .commentItem .titleWrap .authorWrap {
  display: inline-block;
  height: 52rpx;
  vertical-align: middle;
  font-size: 0;
  margin-left: 12rpx;
}

.commentComponent .commentItem .titleWrap .authorWrap .author {
  color: #a1a8b3;
  font-size: 24rpx;
}

.commentComponent .commentItem .titleWrap .authorWrap .time {
  color: #c5cad2;
  font-size: 18rpx;
}

.commentComponent .commentItem .titleWrap .starWrap {
  display: inline-block;
  position: absolute;
  right: 0;
  top: -15rpx;
  line-height: 30rpx;
  padding: 20rpx 44rpx 0 0;
  height:80rpx;
  width:100rpx;
  text-align:right;
}

.commentComponent .commentItem .titleWrap .starWrap .count {
  color: #a6a6a8;
  font-size: 20rpx;
  line-height: 30rpx;
  vertical-align: top;
  display: inline-block;
  margin-top: 10rpx;
}

.commentComponent .commentItem .titleWrap .starWrap .icon {
  margin:6rpx auto auto 9rpx;
  vertical-align: top;
}

.commentComponent .commentItem .text {
  color: #434345;
  font-size: 28rpx;
  padding: 25rpx 44rpx 40rpx 75rpx;
  line-height: 34rpx;
  word-break:break-word;
}
.commentComponent .commentItemReply {
  width: 650rpx;
  margin-left: 100rpx;
}
.commentComponent .commentItemReply.commentItem {
  padding: 20rpx 0 0 20rpx;
  background: #f1f1f1;
}

.commentBlock {
  padding: 80rpx;
  font-size: 30rpx;
  line-height: 50rpx;
  color: #4b4b4b;
  text-align: center;
  background: #fff;
}
.commentBlock .commentBlockBtn {
  height: 62rpx;
  width: 220rpx;
  border: 2px solid #1cb7f9;
  border-radius: 30rpx;
  margin: 30rpx auto;
  font-size: 26rpx;
  color: #1cb7f9;
  font-weight: bold;
  background: #fff;
  line-height: 56rpx;
}
.more {
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  background: #f2f2f2;
  color: #666;
}

/* 自定义pop弹窗 */

.popWrap {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.popCont {
  width: 560rpx;
  height: 300rpx;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -170rpx 0 0 -280rpx;
  background: #fff;
  border-radius: 10rpx;
  text-align: center;
}

.popText {
  color: #000;
  line-height: 36rpx;
  font-size: 30rpx;
  padding: 80rpx 0 40rpx;
}

.popCont button {
  width: 310rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 24rpx;
  background: #00aeff;
  border-radius: 35rpx;
  text-align: center;
  color: #fff;
}
</style>
