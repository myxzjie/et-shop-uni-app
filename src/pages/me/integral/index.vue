<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view ref="container" class="integral-details">
        <view class="header padding bg-cyan text-center">
          <view class="currentScore">当前积分</view>
          <view class="margin-top-sm text-xl">{{ info.integral }}</view>
          <!--<view class="nav acea-row">-->
          <!--<view class="item">-->
          <!--<view class="num">{{ info.sum_integral }}</view>-->
          <!--<view>累计积分</view>-->
          <!--</view>-->
          <!--<view class="item">-->
          <!--<view class="num">{{ info.deduction_integral }}</view>-->
          <!--<view>累计消费</view>-->
          <!--</view>-->
          <!--<view class="item">-->
          <!--<view class="num">{{ info.today_integral }}</view>-->
          <!--<view>今日获得</view>-->
          <!--</view>-->
          <!--</view>-->
        </view>
        <view class="wrapper bg-white">
          <view class="nav acea-row ">
            <view
              v-for="(item, navListIndex) in navList"
              :key="navListIndex"
              class="item acea-row row-center-wrapper padding-sm"
              :class="current === navListIndex ? 'on' : ''"
              @click="nav(navListIndex)"
            >
              <text :class="item.icon" />
              <text class="margin-left-xs">{{ item.name }}</text>
            </view>
          </view>
          <view class="list" :hidden="current !== 0">
            <!--<view class="tip acea-row row-middle">-->
            <!--<span class="iconfont icon-shuoming"></span-->
            <!--&gt;提示：积分数值的高低会直接影响您的会员等级-->
            <!--</view>-->
            <view
              v-for="(item, listIndex) in list"
              :key="listIndex"
              class="item acea-row row-between-wrapper padding-sm"
            >
              <view>
                <view class="state">{{ item.title }}</view>
                <view><data-format :data="item.addTime" /></view>
              </view>
              <view v-if="item.pm == 1" class="num text-cyan">+{{ item.number }}</view>
              <view v-if="item.pm == 0" class="num text-red">
                -{{ item.number }}
              </view>
            </view>
          </view>
          <!--<view class="list2" :hidden="current !== 1">-->
          <!--<view class="item acea-row row-between-wrapper" @click="$router.push('/pages/launch/main')">-->
          <!--<view class="pictrue"><img :src="$VUE_APP_RESOURCES_URL+'/images/score.png'" /></view>-->
          <!--<view class="name">购买商品可获得积分奖励</view>-->
          <!--<view class="earn">赚积分</view>-->
          <!--</view>-->
          <!--<view-->
          <!--class="item acea-row row-between-wrapper"-->
          <!--@click="$router.push('/pages/user/signIn/Sign/main')"-->
          <!--&gt;-->
          <!--<view class="pictrue"><img :src="$VUE_APP_RESOURCES_URL+'/images/score.png'" /></view>-->
          <!--<view class="name">每日签到可获得积分奖励</view>-->
          <!--<view class="earn">赚积分</view>-->
          <!--</view>-->
          <!--</view>-->
        </view>
        <Loading :loaded="loaded" :loading="loading" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getIntegralList, postSignUser } from '@/api/user'
import Loading from '@/components/loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      navList: [
        { name: '分值明细', icon: 'cuIcon-calendar' }
        // { name: "分值提升", icon: "icon-tishengfenzhi" }
      ],
      current: 0,
      where: {
        page: 1,
        limit: 15
      },
      data: {
        sign: 1,
        integral: 1,
        all: 1
      },
      list: [],
      info: [],
      loaded: false,
      loading: false
    }
  },
  onShow() {
    this.getIntegral()
    this.getInfo()
  },
  onReachBottom() {
    !this.loading && this.getInfo()
  },
  methods: {
    nav: function(index) {
      this.current = index
    },
    getInfo: function() {
      const that = this
      if (that.loaded == true || that.loading == true) return
      that.loading = true
      getIntegralList(that.where).then(
        res => {
          that.loading = false
          that.loaded = res.data.length < that.where.limit
          that.loadTitle = that.loaded ? '人家是有底线的' : '上拉加载更多'
          that.where.page = that.where.page + 1
          that.list.push.apply(that.list, res.data)
          that.$forceUpdate()
        },
        err => {
          that.$dialog.message(err.msg)
        }
      )
    },
    getIntegral: function() {
      const that = this
      postSignUser(that.data).then(
        res => {
          that.info = res.data
        },
        err => {
          that.$dialog.message(err.msg)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .list{
    border-top: 1upx solid #e8e8e8;
  }
</style>
