<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="gold">
        <view class="header padding text-white">
          <view class="name acea-row row-center-wrapper padding-top-xs">
            <view>核销金</view>
          </view>
          <view class="num text-center">{{ userInfo.gold || 0 }}</view>
        </view>

        <view class="text-center">
          <button class="cu-btn round bg-cyan" @tap="toExchange">兑换核销金</button>
        </view>
        <view>
          <view class="wrapper margin-top-sm">
            <view class="nav">
              <view class="list">
                <view
                  v-for="(item, listIndex) in list"
                  :key="listIndex"
                  class="item margin-top-xs padding-sm bg-white acea-row row-between-wrapper"
                >
                  <view>
                    <view class="state">{{ item.title }}</view>
                    <view class="time"><data-format :data="item.addTime" /></view>
                  </view>
                  <view v-if="item.pm == 1" class="num">+{{ item.number }}</view>
                  <view v-if="item.pm == 0" class="num font-color-red">
                    -{{ item.number }}
                  </view>
                  <view class="mark padding-top-sm text-sm">描述: {{ item.mark }}</view>
                </view>
              </view>
            </view>

          </view>
          <Loading v-if="list.length > 0" :loaded="loaded" :loading="loading" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getUser, goldRecord } from '@/api/user'
import Loading from '@/components/loading'

export default {
  components: { Loading },
  props: {},
  data() {
    return {
      loaded: false,
      loading: false,
      current: 0,
      where: {
        page: 1,
        limit: 15
      },
      userInfo: {},
      list: [],
      Info: {
        lastDayCount: 0,
        extractCount: 0,
        commissionCount: 0
      }
    }
  },
  onLoad(query) {
  },
  onShow() {
    this.loadUser()
    this.loadGoldRecord()
  },
  onReachBottom() {
    !this.loading && this.loadGoldRecord()
  },
  // onShow() {
  //   !this.loading && this.loadGoldRecord()
  // },
  methods: {
    loadUser() {
      const that = this
      getUser().then(res => {
        that.userInfo = res.data
      })
    },
    loadGoldRecord() {
      const that = this
      if (that.loaded == true || that.loading == true) return
      that.loading = true
      goldRecord(that.where).then(
        res => {
          that.loading = false
          that.loaded = res.data.length < that.where.limit
          that.loadTitle = that.loaded ? '人家是有底线的' : '上拉加载更多'
          that.where.page = that.where.page + 1

          res.data.map(item => {
            if (item.title === '配送核销金') {
              const arr = item.mark.split(',')
              item.mark = arr[0]
            }
          })

          that.list.push.apply(that.list, res.data)
        },
        err => {
          uni.showToast({
            title: err.msg,
            icon: 'none',
            duration: 2000
          })
        }
      )
    },
    toExchange() {
      uni.navigateTo({ url: '/pages/me/gold/cash' })
    }
  }
}
</script>

<style lang="scss" scoped>
.gold {
  .header {
    background-image: url("http://shop.cdn.dev56.com/assets/images/promotion-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // width: 100%;
    // height: 3.75rem;
    .name {

    }
  }
}

// .gold .header .num {
//   text-align: center;
//   color: #fff;
//   margin-top: 0.25rem;
//   font-size: 0.9rem;
//   font-family: 'GuildfordProBook 5';
// }

.gold .wrapper .nav {
  flex: 1;
  -o-flex: 1;
  -ms-flex: 1;
  // width: 6.9rem;
  // border-radius: 0.2rem 0.2rem 0 0;
  // margin: 0.3rem auto 0 auto;
  // background-color: #f7f7f7;
  /* height: 0.96rem; */
  // font-size: 0.3rem;
  color: #bbb;
}

.gold .wrapper .nav .item {
  text-align: center;
  width: 100%;
}

.gold .wrapper .nav .item.on {
  background-color: #fff;
  color: #73CBB6;
  font-weight: bold;
  border-radius: 0.2rem .2rem 0 0;
}

.gold .wrapper .nav .item .iconfont {
  font-size: 0.38rem;
  margin-right: 0.1rem;
}

.gold .wrapper .list {
  // background-color: #fff;
  // padding: 0.24rem 0.3rem;
}

.gold .wrapper .list .item {
  // padding: 5rpx;
  border-bottom: 1px solid #eee;
  color: #999;
}

.gold .wrapper .list .item .state,
.gold .wrapper .list .item .time {
  text-align: left;
}

.gold .wrapper .list .item .state {
  color: #282828;
  margin-bottom: 0.08rem;

}

.gold .wrapper .list .item .mark {
  border-top: 1px #eee dashed;
  display: block;
  width: 100%;
  text-align: left;
  color: #999;
  // padding: 15rpx 10rpx;
}

.gold .wrapper .list .item .num {
  color: #16ac57;
}
</style>
