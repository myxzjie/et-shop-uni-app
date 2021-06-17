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
      <view class="group-con">
        <view class="header flex flex-wrap row-between padding-sm">
          <view class="pictrue">
            <image class="image" :src="storeCombination.image" /></view>
          <view class="content padding-left-sm">
            <view class="ellipsis-line" v-text="storeCombination.title" />
            <view class="money margin-top-sm">
              <text class="num text-red margin-right-sm">￥{{ storeCombination.price }}</text>
              <text class="team cart-color" v-text="storeCombination.people + '人拼'" />
            </view>
            <view v-if="pinkBool === -1" class="iconfont icon-pintuanshibai" />
            <view v-else-if="pinkBool === 1" class="iconfont icon-pintuanchenggong font-color-red" />
          </view>
        </view>
        <view class="wrapper">
          <view class="tips tips-line">
            <view class="tips-line-title">
              <view class="flex flex-wrap align-between">
                剩余
                <count-down
                  :is-day="false"
                  :tip-text="' '"
                  :day-text="' '"
                  :hour-text="' : '"
                  :minute-text="' : '"
                  :second-text="' '"
                  :datatime="pinkT.stopTime"
                />结束
              </view>
            </view>
          </view>

          <view class="text-center text-bold">
            <view v-if="pinkBool === 1" class="text-red">恭喜您拼团成功</view>
            <view v-else-if="pinkBool === -1" class="text-red">还差{{ count }}人，拼团失败</view>
            <view v-else-if="pinkBool === 0" class="text-red">拼团中，还差{{ count }}人拼团成功</view>
          </view>
          <view
            class="buyers-wrap flex flex-wrap align-center margin-top"
            :class="[
              pinkBool === 1 || pinkBool === -1 ? 'result' : '',
              iShidden ? 'on' : ''
            ]"
          >
            <view class="pictrue">
              <image class="image" :src="pinkT.avatar" /></view>
            <view v-if="pinkAll.length > 0" class="acea-row row-middle">
              <view v-for="(item, pinkAllIndex) in pinkAll" :key="pinkAllIndex" class="pictrue">
                <image class="image" :src="item.avatar" /></view>
            </view>
            <view v-for="countIndex in count" :key="countIndex" class="pictrue">
              <image class="image" src="https://shop.cdn.dev56.com/assets/images/vacancy.png" /></view>
          </view>

          <view
            v-if="(pinkBool === 1 || pinkBool === -1) && count > 9"
            class="lookAll acea-row row-center-wrapper"
            @click="lookAll"
          >
            {{ iShidden ? "收起" : "查看全部" }}
            <span
              class="iconfont"
              :class="iShidden ? 'icon-xiangshang' : 'icon-xiangxia'"
            />
          </view>

          <view class="cu-bar btn-group margin-top">
            <button
              v-if="pinkBool === 0 && userBool === 1"
              class="cu-btn bg-red shadow-blur round lg"
              @tap="getCombinationRemove"
            >
              取消开团
            </button>

            <button
              v-if="userBool === 1 && isOk == 0 && pinkBool === 0"
              class="cu-btn bg-green shadow-blur round lg"
              open-type="share"
            >
              邀请好友参团
            </button>

            <button
              v-else-if="userBool === 0 && pinkBool === 0 && count > 0"
              class="cu-btn bg-green shadow-blur round lg"
              @tap="pay"
            >我要参团</button>

            <button
              v-if="pinkBool === 1 || pinkBool === -1"
              class="cu-btn bg-green shadow-blur round lg"
              @tap="goDetail(storeCombination.id)"
            >再次开团</button>

            <button
              v-if="pinkBool === 1"
              class="cu-btn bg-green shadow-blur round lg"
              @tap="goOrder"
            >
              查看订单信息
              <!-- <text class="iconfont icon-xiangyou" /> -->
            </button>

          </view>

          <!-- <view
        v-if="userBool === 1 && isOk == 0 && pinkBool === 0"
        class="teamBnt bg-color-red"
        @click="goPoster"
      >邀请好友参团</view> -->

        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import CountDown from '@/components/count-down'
import { getCombinationPink, getCombinationRemove } from '@/api/activity'
import { postCartAdd } from '@/api/store'
// import { isWeixin, parseQuery, handleQrCode } from '@/utils/index'

export default {
  components: {
    CountDown
  },
  data() {
    return {
      currentPinkOrder: '', // 当前拼团订单
      isOk: 0, // 判断拼团是否完成
      pinkBool: 0, // 判断拼团是否成功|0=失败,1=成功
      userBool: 0, // 判断当前用户是否在团内|0=未在,1=在
      pinkAll: [], // 团员
      pinkT: [], // 团长信息
      storeCombination: [], // 拼团产品
      pinkId: 0,
      count: 0, // 拼团剩余人数
      iShidden: false
    }
  },
  onLoad(option) {
    const that = this
    // const url = handleQrCode()
    // if (url) {
    //   that.pinkId = url.pinkId
    // } else {
    that.pinkId = option.id
    // }
    that.getCombinationPink()
  },
  methods: {
    pay() {
      const that = this
      const data = {}
      data.productId = that.storeCombination.productId
      data.cartNum = that.pinkT.totalNum
      data.uniqueId = ''
      data.combinationId = that.storeCombination.id
      data.new = 1
      postCartAdd(data).then(res => {
        uni.navigateTo({
          url: `/pages/order/submit/index?ids=${res.data.cartId}&pinkid=${that.pinkId}`
        })
      }).catch(err => {
        uni.showToast({
          title: err.msg,
          icon: 'none',
          duration: 2000
        })
      })
    },
    // goPoster() {
    //   var that = this
    //   this.$router.push({
    //     path: '/pages/activity/Poster/main',
    //     query: { id: that.pinkId, type: 1 }
    //   })
    // },
    goOrder() {
      const that = this
      uni.navigateTo({
        url: `/pages/order/details/index?id=${that.currentPinkOrder}`
      })
    },
    // 拼团详情
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/activity/buy-group/details?id=${id}`
      })
    },
    // 拼团信息
    getCombinationPink() {
      const that = this
      getCombinationPink(that.pinkId).then(res => {
        that.$set(that, 'storeCombination', res.data.storeCombination)
        that.$set(that, 'pinkT', res.data.pinkT)
        that.$set(that, 'pinkAll', res.data.pinkAll)
        that.$set(that, 'count', res.data.count)
        that.$set(that, 'userBool', res.data.userBool)
        that.$set(that, 'pinkBool', res.data.pinkBool)
        that.$set(that, 'isOk', res.data.isOk)
        that.$set(that, 'currentPinkOrder', res.data.currentPinkOrder)
      })
    },
    // 拼团取消
    getCombinationRemove() {
      const that = this
      const data = { id: that.pinkId, cid: that.storeCombination.id }
      getCombinationRemove(data).then(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }).catch(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    lookAll() {
      this.iShidden = !this.iShidden
    }
  },
  onShareAppMessage(options) {
    const that = this
    const title = `拼团，还差${that.count}人拼团成功`
    const imageUrl = that.storeCombination.image
    const uri = `pages/activity/buy-group/rule?id=${that.pinkId}`
    return {
      title: title,
      imageUrl: imageUrl,
      path: uri
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .pictrue {
    .image {
      width: 160upx;
      height: 160upx;
      border: 1upx solid #eee;
      border-radius: 5upx;
    }
  }
  .content{
    width: calc(100% - 160upx);
  }
}

.buyers-wrap {
  .pictrue {
    margin: 10upx;
    .image {
      width: 120upx;
      height: 120upx;
      border: 1upx solid #eee;
      border-radius: 50%;
    }
  }

}
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
