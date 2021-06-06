<template>
  <view>
    <cu-custom
      :is-back="true"
      bg-color="bg-gradual-olive"
    >
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>

    <scroll-view scroll-y class="scrollPage">
      <view class="clockin">
        <view class="header flex flex-wrap align-between padding ">
          <view class="left flex flex-wrap align-between">
            <view class="pictrue">
              <image class="image" :src="userInfo.avatar" />
            </view>
            <view class="content padding-left">
              <view class="ellipsis-line">{{ userInfo.nickname }}</view>
              <view class="integral flex flex-wrap padding-top-xs">
                <text>积分: {{ userInfo.integral }}</text>
              </view>
            </view>
          </view>
          <navigator
            class="clockin-record flex flex-wrap row-middle text-yellow bg-white"
            url="/pages/clockin/details"
          >
            <view class="cuIcon-sort" />
            <view>明细</view>
          </navigator>
        </view>

        <view class="padding bg-white">
          <view class="clockin-wrap flex flex-wrap row-between">
            <view
              v-for="(item, index) in signSystemList"
              :key="index"
              class="item"
            >
              <view
                class="name"
                :class="index + 1 === signSystemList.length ? 'round bg-orange' : ''"
              >{{ item.day }}</view>
              <view
                class="stars"
                :class="
                  (index + 1 === signSystemList.length ? 'active' : '') +
                    ' ' +
                    (sign_index >= index + 1 ? 'current' : '')
                "
              />
              <view
                class="score"
                :class="sign_index >= index + 1 ? 'text-orange' : ''"
              >+{{ item.sign_num }}</view>
            </view>
          </view>

          <view class="flex flex-wrap align-center padding-top">
            <button
              class="cu-btn round margin-top"
              :class="userInfo.isDaySign ? '' : 'bg-green'"
              @tap="goSign"
            >{{ userInfo.isDaySign ? "已签到" : "立即签到" }}
            </button>
          </view>
        </view>

        <view class="padding bg-white margin-top-sm">
          <view class="tip text-center padding">已累计签到</view>

          <view class="flex flex-wrap align-center">
            <view
              v-for="(item, signCountIndex) in signCount"
              :key="signCountIndex"
              class="item bg-cyan margin-xs padding-xs"
            >{{ item || 0 }}</view>
            <view class="data">天</view>
          </view>

          <view class="text-gray text-center padding text-xs">
            连续签到第{{ day }}天可获得超额积分，一定要坚持签到哦~~~
          </view>

          <view class="record-list">
            <view
              v-for="(item, signListIndex) in signList"
              :key="signListIndex"
              class="item flex flex-wrap row-between"
            >
              <view>
                <view class="name padding-tb-sm">{{ item.title }}</view>
                <view class="data text-gray padding-bottom-sm">{{ item.addTime }}</view>
              </view>
              <view class="score text-red padding-top-sm">+{{ item.number }}</view>
            </view>
            <!-- <view
              v-if="signList.length > 0"
              class="Loads flex flex-wrap row-center"
              @click="$router.push('/pages/user/signIn/SignRecord/main')"
            >
              点击加载更多
              <text class="cuIcon-right" />
            </view> -->
          </view>

        </view>

        <view class="clockin-tip-wrap flex flex-wrap align-center" :class="active ? 'active' : ''">
          <view class="clockin-tip flex flex-wrap align-center">
            <view class="pictrue">
              <image class="image loading-image" src="https://shop.cdn.dev56.com/assets/images/light.png" /></view>
            <view class="content">
              <view class="state">签到成功</view>
              <view class="integral">获得{{ integral }}积分</view>
              <view class="padding flex flex-direction">
                <button class="cu-btn bg-orange round sm" @tap="close">好的</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import {
  postSignUser,
  getSignConfig,
  postSignIntegral,
  getSignList
} from '@/api/user'
// import { add } from '@/utils/bc'

export default {
  name: 'Sign',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
      integral: 0,
      signCount: [],
      sign_index: 0,
      signSystemList: [],
      signList: [],
      page: 1,
      limit: 3,
      active: false,
      day: ''
    }
  },
  mounted: function() {
    this.signUser()
    this.signConfig()
    this.getSignList()
  },
  methods: {
    // js给数字补0；num：需要补0的数字，length：长度（补到多少位）；
    PrefixInteger: function(num, length) {
      return (Array(length).join('0') + num).slice(-length).split('')
    },
    // 数字转中文
    Rp(n) {
      var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      var s = ''
      n = '' + n // 数字转为字符串
      for (var i = 0; i < n.length; i++) {
        s += cnum[parseInt(n.charAt(i))]
      }
      return s
    },
    // 获取用户信息
    signUser: function() {
      const that = this
      postSignUser({ sign: 1 }).then(res => {
        res.data.integral = parseInt(res.data.integral)
        var sumSginDay = res.data.sumSignDay
        that.userInfo = res.data
        that.signCount = that.PrefixInteger(sumSginDay, 4)
        that.sign_index = parseInt(res.data.signNum)
      })
    },
    // 签到配置
    signConfig: function() {
      const that = this
      getSignConfig().then(res => {
        that.signSystemList = res.data
        that.day = that.Rp(that.signSystemList.length)
      })
    },
    //  用户签到
    goSign() {
      const that = this
      const sumSginDay = that.userInfo.sumSignDay
      if (that.userInfo.is_day_sgin) { return that.$dialog.toast({ mes: '您今日已签到!' }) }
      postSignIntegral().then(res => {
        that.active = true
        that.integral = res.data.integral
        const sign_index = parseInt(that.sign_index + 1)
        that.sign_index =
          sign_index > that.signSystemList.length ? 1 : sign_index
        that.signCount = that.PrefixInteger(sumSginDay + 1, 4)
        that.userInfo.is_day_sgin = true
        that.userInfo.integral = add(that.userInfo.integral, res.data.integral)
        that.getSignList()
      })
    },
    //  获取签到列表;
    getSignList() {
      const that = this
      getSignList(that.page, that.limit).then(res => {
        that.signList = res.data
      })
    },
    close() {
      this.active = false
    }
  }
}
</script>

<style lang="scss" scoped>
.clockin {
  .header {
    padding-right: 0;
    .pictrue {
      .image {
        width: 120upx;
        height: 120upx;
        border-radius: 50%;
      }
    }
    .clockin-record {
      padding: 5upx 10upx 5upx 20upx;
      border-radius: 20upx 0 0 20upx;
    }
  }
  .clockin-wrap {
    .item {
      text-align:center;
      > .name {
        padding: 3rpx 10rpx;
      }
      .stars {
        background-image: url('https://shop.cdn.dev56.com/assets/images/stars2.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 60upx;
        height: 60upx;
        margin: 10upx auto;
        &.current {
          background-image: url('https://shop.cdn.dev56.com/assets/images/stars1.png');
        }
        &.active {
          background-image: url('https://shop.cdn.dev56.com/assets/images/stars3.png');
          width: 80upx;
        }
      }
    }
  }
  .clockin-tip-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 55;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
    &.active {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
      .clockin-tip {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    .clockin-tip {
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
      &.active {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      .pictrue {
        width: 100%;
        text-align: center;
        > .image {
          width: 300upx;
          height: 300upx;
        }
      }
      .content {
        background-image: url(https://shop.cdn.dev56.com/assets/images/register.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 300upx;
        height: 300upx;
        margin-top: -200upx;
        text-align: center;
        z-index: 2;
        .state {
          color: #fff;
          margin-top: 80upx;
          padding-top: 20upx;
        }
        .integral {
          color: rgba(255, 255, 255, 0.6);
          margin-top: 20upx;
        }
      }
    }
  }
  .record-list{
    border-top: 1upx dashed #eee;
    .item {
      border-bottom: 1upx solid #eee;
    }
  }
}
</style>
