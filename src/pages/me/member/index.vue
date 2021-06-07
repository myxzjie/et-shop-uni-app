<template>
  <view>
    <cu-custom :is-back="true">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <swiper
        class="card-swiper"
        :indicator-dots="false"
        interval="5000"
        duration="500"
        indicator-active-color="#0081ff"
        indicator-color="#8799a3"
        :current="activeIndex"
        @change="switchItem"
      >
        <swiper-item
          v-for="(item, index) in vipList"
          :key="index"
          :class="curSwiper == index ? 'cur' : ''"
        >
          <view class="swiper-item">
            <image :src="item.image" mode="aspectFill" />
            <view class="content text-white padding">
              <view class="name text-xxl">{{ item.name }}</view>
              <view class="discount margin-top padding-top">
                可享受商品折扣: {{ item.discount / 10 }}折
                <text class="cuIcon-creative" />
              </view>
              <view class="margin-top">
                <view v-if="item.grade == grade" class="nav acea-row">
                  <view v-for="(val, indexn) in vipComplete" :key="indexn" class="item">
                    <view class="num">{{ val.newNumber }}</view>
                    <view>{{ val.realName }}</view>
                  </view>
                </view>
                <view v-if="item.grade > grade" class="lock">
                  <text class="cuIcon-safe" />
                  该会员等级尚未解锁
                </view>
                <view v-if="item.grade < grade" class="lock">
                  <text class="cuIcon-safe text-cyan" />
                  已解锁更高等级
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <view class="member-center">
        <view class="wrapper padding bg-white ">
          <view class="title acea-row row-between-wrapper">
            <view>
              <text class="cuIcon-crown text-cyan" />
              <text class="margin-left-xs">会员升级要求</text>
            </view>
            <view class="num">
              <text class="current">{{ taskCount }}</text>
              <text>/</text>
              <text>{{ vipRequire.length }}</text>
            </view>
          </view>
          <view class="list">
            <view v-for="(item, index) in vipComplete" :key="index" class="item padding-xs">
              <view class="top acea-row row-between-wrapper">
                <view class="name">
                  {{ item.name }}
                  <text
                    v-if="item.illustrate"
                    class="iconfont icon-wenti"
                    @click="showGrow(item)"
                  />
                </view>
                <view>{{ item.finish ? "已满足条件" : "未满足条件" }}</view>
              </view>
              <view class="margin-top-sm">
                <view class="cu-progress round sm">
                  <view class="bg-red" :style="[{ width: item.speed + '%' }]" />
                </view>
              </view>
              <!-- <view class="cu-progress">
                <view class="bg-red" :style="{ width: item.speed + '%' }" />
              </view> -->
              <view class="experience acea-row row-between-wrapper margin-top-xs">
                <view class="text-sm">{{ item.taskTypeTitle }}</view>
                <view>
                  <text class="num text-cyan">{{ item.newNumber }}</text>
                  <text>/</text>
                  <text>{{ item.number }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <Recommend />
        <view class="growthValue" :class="growthValue === false ? 'on' : ''">
          <view class="pictrue">
            <img :src="'https://shop.cdn.dev56.com/assets/images/value.jpg'">
            <span class="iconfont icon-guanbi3" @click="growthTap" />
          </view>
          <view class="conter">{{ illustrate }}</view>
        </view>
        <view class="mask" :hidden="growthValue" @click="growthTap" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
// import Recommend from '@/components/Recommend'
import { getVipInfo, getVipTask, setDetection } from '@/api/user'
export default {
  components: {
    // Recommend
  },
  data() {
    return {
      vipList: [], // 等级列表
      vipRequire: [], // 等级要求
      vipComplete: [], // 完成情况
      taskCount: 0, // 任务数
      grade: 0, // 当前会员等级
      swiperVip: {
        speed: 1000,
        effect: 'coverflow',
        slidesPerView: 'auto',
        centeredSlides: true,
        // loop: true,
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: -20, // 拉伸   图片间左右的间距和密集度
          depth: 100, // 深度   切换图片间上下的间距和密集度
          modifier: 2, // 修正值 该值越大前面的效果越明显
          slideShadows: false // 页面阴影效果
        },
        observer: true,
        observeParents: true
      },
      loading: false,
      growthValue: true,
      illustrate: '',
      activeIndex: 0
    }
  },
  onShow() {
    const that = this
    setDetection()
    that.getInfo()
    // that.swiper.on("slideChange", function() {
    //   that.activeIndex = that.swiper.activeIndex;
    //   that.getTask();
    // });
  },
  methods: {
    growthTap() {
      this.growthValue = true
    },
    getInfo() {
      const that = this
      getVipInfo().then(res => {
        that.vipList = res.data.list
        that.vipRequire = res.data.task.list
        that.vipComplete = res.data.task.task
        that.taskCount = res.data.task.reachCount

        that.$forceUpdate()
      },
      err => {
        that.$dialog.message(err.msg)
      }
      )
    },
    getTask(index, isGrade) {
      const that = this
      let levelId = 0
      if (isGrade) {
        levelId = index
      } else {
        levelId = that.vipList[index].id
      }
      getVipTask(levelId).then(res => {
        that.vipRequire = res.data.list
        that.vipComplete = res.data.task
        that.taskCount = res.data.reachCount
      },
      err => {
        that.$dialog.message(err.msg)
      }
      )
    },
    showGrow(item) {
      if (this.illustrate != item.illustrate) this.illustrate = item.illustrate
      this.growthValue = false
    },
    switchItem(e) {
      const that = this
      const index = e.mp.detail.current
      that.getTask(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-swiper{
  height: 360rpx !important;
  swiper-item {
    left: 0;
     width: 750rpx !important;
    // left: 70rpx;
    // box-sizing: border-box;
    padding: 20rpx 0rpx 20rpx !important;
  }
  .swiper-item {
    // overflow: initial;
    .content {
      position: absolute;
      top: 0;
    }
  }

}

.banner swiper {
  height: 328rpx;
}
.swiper-slide{
  margin: 0 auto;
}
</style>
