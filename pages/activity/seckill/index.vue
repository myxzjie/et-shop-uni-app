<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>

    <view class="seckill">
      <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
        <view
          v-for="(item, index) in timeList"
          :key="index"
          class="cu-item"
          :class="index == active ? 'text-green cur' : ''"
          :data-id="index"
          @tap="onTabSelect"
        >
          {{ item.time }} {{ item.state }}
        </view>
      </scroll-view>
      <view
        v-for="(item, index) in timeList"
        v-if="index == active"
        :key="index"
        class="bg-white"
      >
        <!-- <view slot="title" class="text-center flex flex-wrap align-center bg-gray padding-sm">
          <view class="time">{{ item.time }}</view>
          <view class="state margin-left-sm">{{ item.state }}</view>
        </view> -->
        <view class="flex flex-wrap align-center bg-gray padding-sm">
          <view v-if="item.status === 0" class="activity">活动已结束</view>
          <count-down
            v-if="item.status === 1"
            :is-day="false"
            :day-text="' '"
            :tip-text="'距结束仅剩 '"
            :hour-text="' : '"
            :minute-text="' : '"

            :datatime="datatime"
          />
          <view v-if="item.status === 2" class="activity">活动即将开始</view>
        </view>

        <view class="seckill-list padding">
          <view
            v-for="(itemSeckill, indexSeckill) in seckillList"
            :key="indexSeckill"
            class="item flex flex-wrap align-between"
          >
            <view class="pictrue">
              <image :src="itemSeckill.image" class="image" mode="aspectFill" />
            </view>
            <view class="content flex flex-wrap row-column-around padding-left-xs">
              <view class="ellipsis-line" v-text="itemSeckill.title" />
              <view class="money padding-top-sm flex flex-wrap row-between ">
                <view>限时价
                  <text class="num text-red" v-text="'￥' + itemSeckill.price" />
                </view>

                <view
                  v-if="item.status === 1 && itemSeckill.stock > 0"
                  class="cu-btn bg-cyan sm"
                  @tap="goDetail(itemSeckill.id)"
                >马上抢</view>
                <view v-if="item.status === 1 && itemSeckill.stock <= 0" class="cu-btn sm">已售磬</view>
                <view v-if="item.status === 2" class="cu-btn bg-cyan sm">即将开始</view>
                <view v-if="item.status === 0" class="cu-btn bg-cyan sm">已结束</view>
              </view>
              <view class="progress margin-top-xs">
                <view class="bg-gradual-green" :style="{ width: loading ? itemSeckill.percent + '%' : '' }" />
                <view class="piece">
                  仅剩<text class="text-red">{{ itemSeckill.stock }}</text>件
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="flash-sale">
      <view v-if="headerImg" class="header">
        <img :src="headerImg">
      </view>
      <vant-tabs
        :active="active"
        :sticky="sticky"
        animated
        line-height="2"
        :ellipsis="false"
        @change="setTime"
      >
        <vant-tab
          v-for="(item, index) in timeList"
          :key="index"
          :ellipsis="false"
          :title="item.time + ' ' +item.state"
        >
          <view slot="title" class="timeItem">
            <view class="time">{{ item.time }}</view>
            <view class="state">{{ item.state }}</view>
          </view>
          <view class="countDown font-color-red acea-row row-center-wrapper">
            <view v-if="item.status === 0" class="activity">活动已结束</view>
            <count-down
              v-if="item.status === 1"
              :is-day="false"
              :tip-text="'距结束仅剩 '"
              :day-text="''"
              :hour-text="' : '"
              :minute-text="' : '"
              :second-text="''"
              :datatime="datatime"
            />
            <view v-if="item.status === 2" class="activity">活动即将开始</view>
          </view>
          <view class="list">
            <view
              v-for="(itemSeckill, indexSeckill) in seckillList"
              :key="indexSeckill"
              class="item acea-row row-between-wrapper"
            >
              <view class="pictrue">
                <img :src="itemSeckill.image">
              </view>
              <view class="text acea-row row-column-around">
                <view class="line1" v-text="itemSeckill.title" />
                <view class="money">
                  限时价
                  <span class="num font-color-red" v-text="'￥' + itemSeckill.price" />
                </view>
                <view class="progress cart-color">
                  <view class="bg-red" :style="{ width: loading ? itemSeckill.percent + '%' : '' }" />
                  <view class="piece font-color-red" v-text="'仅剩' + itemSeckill.stock + '件'" />
                </view>
              </view>
              <view
                v-if="item.status === 1 && itemSeckill.stock > 0"
                class="grab bg-color-red"
                @click="goDetail(itemSeckill.id)"
              >马上抢</view>
              <view v-if="item.status === 1 && itemSeckill.stock <= 0" class="grab">已售磬</view>
              <view v-if="item.status === 2" class="grab bg-color-red">即将开始</view>
              <view v-if="item.status === 0" class="grab bg-color-red">已结束</view>
            </view>
          </view>
          <view
            v-if="seckillList.length === 0 && page > 1"
            class="noCommodity"
            style="background-color: #fff;"
          >
            <view class="noPictrue">
              <image src="https://shop.cdn.dev56.com/assets/images/noGood.png" class="image" /></view>
          </view>
        </vant-tab>
      </vant-tabs>
    </view> -->
  </view>
</template>
<script>
import { getSeckillConfig, getSeckillList } from '@/api/activity'
import CountDown from '@/components/count-down'
// import { Tab, Tabs } from "vant-weapp";
import Loading from '@/components/loading'

export default {
  components: {
    CountDown
  },
  data() {
    return {
      headerImg: '',
      timeList: [],
      sticky: false,
      loading: false,
      datatime: 0,
      active: 0,
      scrollLeft: 0,
      seckillList: [],
      status: false, // 砍价列表是否获取完成 false 未完成 true 完成
      loadingList: false, // 当前接口是否请求完成 false 完成 true 未完成
      page: 1, // 页码
      limit: 5, // 数量
      title: []
    }
  },
  onShow() {
    this.mountedStart()
  },
  onReachBottom() {
    !this.loadingList && this.getSeckillList()
  },
  methods: {
    onTabSelect(e) {
      this.active = e.currentTarget.dataset.id
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 90
    },
    mountedStart() {
      var that = this
      wx.showLoading()
      getSeckillConfig().then(res => {
        that.$set(that, 'headerImg', res.data.lovely)
        that.$set(that, 'timeList', res.data.seckillTime)
        that.$set(that, 'active', res.data.seckillTimeIndex)

        // let title = []
        // title = res.data.seckillTime.map((item, index) => {
        //   return {
        //     name: 'div',
        //     attrs: {
        //       class: 'timeItem'
        //     },
        //     children: [
        //       {
        //         name: 'div',
        //         attrs: {
        //           class: 'time'
        //         },
        //         children: [
        //           {
        //             type: 'text',
        //             text: item.time
        //           }
        //         ]
        //       },
        //       {
        //         name: 'div',
        //         attrs: {
        //           class: 'state'
        //         },
        //         children: [
        //           {
        //             type: 'text',
        //             text: item.state
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // })
        // console.log(title)
        // that.$set(that, 'title', title)
        that.datatime = that.timeList[that.active].stop
        that.getSeckillList()
        that.$nextTick(function() {
          that.sticky = true
          uni.hideLoading()
        })
      })
    },
    setTime(event) {
      const that = this
      that.active = event.mp.detail.index
      that.datatime = that.timeList[that.active].stop
      that.getSeckillList()
    },
    getSeckillList() {
      const that = this
      if (that.loadingList) return
      if (that.status) return
      const time = that.timeList[that.active].id
      getSeckillList(time, { page: that.page, limit: that.limit }).then(res => {
        that.status = res.data.length < that.limit
        that.seckillList.push.apply(that.seckillList, res.data)
        that.page++
        uni.hideLoading()
      })
    },
    goDetail(id) {
      const that = this
      const time = that.timeList[that.active].stop
      uni.navigateTo({
        url: `/pages/activity/seckill/details?id=${id}&time=${time}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.seckill {
  .nav {
    border-bottom: 1upx solid #e8e8e8;
  }

  .seckill-list {
    .item {
      border-bottom: 1upx solid #e8e8e8;
      .pictrue {
        .image {
          width: 160upx;
          height: 160upx;
          border: 1upx solid #e8e8e8;
          border-radius: 5upx;
        }
      }
      .content {
        width: calc(100% - 160upx);
      }
    }
  }
}

// .timeItem .time {
//   font-size: 0.32rem;
//   font-weight: bold;
//   height: 0.37rem;
//   line-height: 0.37rem;
// }
// .timeItem .state {
//   height: 0.37rem;
//   line-height: 0.37rem;
// }
// .activity {
//   color: #333;
// }
// .flash-sale .list .item .grab {
//   background-color: #999;
// }
</style>
