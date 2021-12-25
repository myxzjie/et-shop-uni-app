<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <!-- <block slot="backText">返回</block> -->
      <!-- <block slot="content">{{ BaseName }}</block> -->
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="cu-card article no-card">
        <view v-for="(item, index) in articles" :key="index" class="cu-item shadow" @tap="onDetails(item)">
          <view class="title">
            <view class="text-cut">{{ item.title }}</view>
          </view>
          <view class="content">
            <image
              :src="item.image"
              mode="aspectFill"
            />
            <view class="desc">
              <view class="text-content" v-html="item.description" />
              <view>
                <view class="text-gray text-sm">
                  <text class="cuIcon-time margin-lr-xs">{{ item.createDate | dateFormat }}</text>
                  <text class="cuIcon-attentionfill margin-lr-xs"> {{ article.visit || 0 }}</text>
                  <text class="cuIcon-appreciatefill margin-lr-xs"> {{ article.praise || 0 }} </text>
                  <!-- <text class="cuIcon-messagefill margin-lr-xs"></text> 30 -->
                </view>
                <!-- <view class="cu-tag bg-red light sm round">正义天使</view> -->
                <!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--暂无新闻-->
      <view v-if="articles.length === 0" class="hothing margin">
        <view class="pictrue">
          <image :src="images.noNews" class="image" mode="aspectFill" />
        </view>
      </view>

    </scroll-view>

  </view>
</template>
<script>
import moment from 'moment'
import { resURL } from '@/utils/config'
import { getArticleList } from '@/api/public'
export default {
  components: {},
  filters: {
    dateFormat(value) {
      // value = value / 1000
      return moment(value).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  data() {
    return {
      isBack: false,
      loading: false,
      loadend: false,
      query: {
        page: 1,
        limit: 20
      },
      articles: [],
      images: {
        noNews: resURL + '/assets/images/noNews.png'
      }
    }
  },
  onLoad(option) {
    this.isBack = !!option.isBack
  },
  mounted() {
    const that = this
    that.loadArticle()
  },
  onReachBottom() {
    const that = this
    !that.loading && that.loadArticle()
  },
  methods: {
    loadArticle() {
      const that = this
      if (that.loading || that.loadend) {
        return
      }
      that.loading = true
      getArticleList(that.query).then(res => {
        const { data } = res
        that.articles.push.apply(that.articles, data.records)
        that.query.page++
        // 判断所有数据是否加载完成
        that.loadend = res.data.length < that.query.limit
      }, err => { console.error(err) }).finally(() => {
        that.loading = false
      })
    },
    onDetails(item) {
      uni.navigateTo({ url: '/pages/article/details/index?id=' + item.id })
    },
    cardSwiper() {}
  }
}
</script>

<style lang="scss" scoped>
.cu-card {
  >.cu-item {
    border-bottom: 1upx dotted #ddd;
  }
}
</style>
