<template>
  <view ref="container" class="newsList">
    <view v-for="(item, articleListIndex) in articles" :key="articleListIndex" class="list">
      <view
        class="item acea-row row-between-wrapper"
        @click="on$router.push({ path: '/pages/shop/news/NewsDetail/main',query:{id:item.id }})"
      >
        <view class="text acea-row row-column-between">
          <view class="name line2">{{ item.title }}</view>
          <view>{{ item.addTime }}</view>
        </view>
        <view class="pictrue">
          <image v-if="item.imageInput" :src="item.imageInput">
        </view>
      </view>
    </view>

    <!--暂无新闻-->
    <view v-if="articles.length === 0" class="noCommodity">
      <view class="noPictrue">
        <image :src="images.noNews" class="image">
      </view>
    </view>
  </view>
</template>
<script>
import { resURL } from '@/utils/config'
import { getArticleList } from '@/api/public'
export default {
  data() {
    return {
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
  onLoad() {
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
        that.articles.push.apply(that.articles, res.data)
        that.query.page++
        // 判断所有数据是否加载完成
        that.loadend = res.data.length < that.query.limit
      }, err => {}).finally(() => {
        debugger
        that.loading = false
      })
    }
    //src/pages/article/details.vue
    onNavigateTo
  }
}
</script>
