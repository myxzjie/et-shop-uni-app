<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>

    <scroll-view scroll-y class="scrollPage">
      <view class="evaluate-list">
        <view class="header">
          <view class="generalComment acea-row row-between-wrapper bg-white padding-sm">
            <view class="acea-row row-middle font-color-red">
              <view class="evaluate">评分</view>
              <view class="stars">
                <text
                  v-for="star in replyData.replySstar|toInt"
                  class="cuIcon-favorfill text-yellow"
                />
              </view>
            </view>
            <view>
              <text class="text-red">{{ replyData.replyChance || 0 }}%</text>好评率
            </view>
          </view>

          <!-- <view class="nav acea-row row-middle padding">
            <view
              v-for="(item, navListIndex) in navList"
              :key="navListIndex"
              class="acea-row row-center-wrapper"
              @click="changeType(navListIndex)"
            >
              <view
                v-if="item.num"
                class="item"
                :class="currentActive === navListIndex ? 'bg-color-red' : ''"
              >
                {{ item.evaluate }}({{ item.num }})
              </view>
            </view>
          </view> -->

        </view>
        <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
          <view
            v-for="(item, index) in navList"
            :key="index"
            class="cu-item"
            :class="index === currentActive ? 'text-green cur' : ''"
            :data-id="index"
            @tap="changeType(index)"
          >
            {{ item.evaluate }}({{ item.num }})
          </view>
        </scroll-view>
        <view class="bg-white padding">
          <evaluation :reply="reply" />
        </view>
        <loading :loaded="loadend" :loading="loading" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
import evaluation from '@/components/evaluation/index'
// import UserEvaluation from '@/components/UserEvaluation'
import { getReplyConfig, getReplyList } from '@/api/store'
import Loading from '@/components/loading'

export default {
  components: {
    evaluation,
    Loading
  },
  filters: {
    toInt(value) {
      if (value instanceof Number) return parseInt(value)
      return value
    }
  },
  data() {
    return {
      productId: 0,
      replyData: {},
      navList: [
        { evaluate: '全部', num: 0 },
        { evaluate: '好评', num: 0 },
        { evaluate: '中评', num: 0 },
        { evaluate: '差评', num: 0 }
      ],
      currentActive: 0,
      page: 1,
      limit: 8,
      reply: [],
      loadTitle: '',
      loading: false,
      loadend: false
    }
  },
  onLoad(option) {
    this.productId = option.id
  },
  onShow() {
    this.getProductReplyCount()
    this.getProductReplyList()
  },
  onReachBottom() {
    !this.loading && this.getProductReplyList()
  },
  methods: {
    getProductReplyCount: function() {
      const that = this
      getReplyConfig(that.productId).then(res => {
        that.$set(that, 'replyData', res.data)
        that.navList[0].num = res.data.sumCount
        that.navList[1].num = res.data.goodCount
        that.navList[2].num = res.data.inCount
        that.navList[3].num = res.data.poorCount
      })
    },
    getProductReplyList: function() {
      const that = this
      if (that.loading) return // 阻止下次请求（false可以进行请求）；
      if (that.loadend) return // 阻止结束当前请求（false可以进行请求）；
      that.loading = true
      const q = { page: that.page, limit: that.limit, type: that.currentActive }
      getReplyList(that.productId, q).then(res => {
        that.loading = false
        // apply();js将一个数组插入另一个数组;
        that.reply.push.apply(that.reply, res.data)
        that.loadend = res.data.length < that.limit // 判断所有数据是否加载完成；
        that.page = that.page + 1
      })
    },
    changeType(index) {
      const that = this
      that.currentActive = index
      that.page = 1
      that.loadend = false
      that.$set(that, 'reply', [])
      that.getProductReplyList()
    }
  }
}
</script>
<style scoped>
.noCommodity {
  height: 8rem;
  background-color: #fff;
}
</style>
