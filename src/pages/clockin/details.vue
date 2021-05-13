<template>
  <view>
    <cu-custom
      :is-back="true"
      bg-image="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg"
      bg-color="bg-gradual-green"
    >
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="clockin-wrap bg-white">
        <view class="list record-list">
          <view v-for="(item, signListIndex) in signList" :key="signListIndex" class="item">
            <view class="data padding bg-gray">{{ item.time }}</view>
            <view class="padding-lr">
              <view
                v-for="(itemn, indexn) in item.list"
                :key="indexn"
                class="item flex flex-wrap row-between"
              >
                <view>
                  <view class="name padding-tb-sm">{{ itemn.title }}</view>
                  <view class="text-gray padding-bottom-sm">{{ itemn.addTime }}</view>
                </view>
                <view class="score text-red padding-top-sm">+{{ itemn.number }}</view>
              </view>
            </view>
          </view>
        </view>
        <Loading :loaded="loadend" :loading="loading" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getSignMonth } from '@/api/user'
import Loading from '@/components/loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      page: 1,
      limit: 3,
      signList: [],
      loading: false,
      loadend: false,
      active: false
    }
  },
  onLoad() {},
  onShow() {
    this.signListTap()
  },
  onReachBottom() {
    !this.loading && this.signListTap()
  },
  methods: {
    signListTap: function() {
      const that = this
      if (that.loading) return // 阻止下次请求（false可以进行请求）；
      if (that.loadend) return // 阻止结束当前请求（false可以进行请求）；
      that.loading = true
      getSignMonth(that.page, that.limit).then(res => {
        that.loading = false
        // apply();js将一个数组插入另一个数组;
        that.signList.push.apply(that.signList, res.data)
        that.loadend = res.data.length < that.limit // 判断所有数据是否加载完成；
        that.page = that.page + 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.clockin-wrap {
  .record-list{
    .item {
      border-bottom: 1upx solid #eee;
    }
  }
}
</style>
