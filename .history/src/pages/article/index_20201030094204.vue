<template>
  <view ref="container" class="newsList">
    <view v-for="(item, articleListIndex) in articles" :key="articleListIndex" class="list">
      <view
        class="item acea-row row-between-wrapper"
        @click="$router.push({ path: '/pages/shop/news/NewsDetail/main',query:{id:item.id }})"
      >
        <view class="text acea-row row-column-between">
          <view class="name line2">{{ item.title }}</view>
          <view>{{ item.addTime }}</view>
        </view>
        <view class="pictrue">
          <img :src="item.imageInput">
        </view>
      </view>
    </view>

    <!--暂无新闻-->
    <view v-if="articles.length === 0" class="noCommodity">
      <view class="noPictrue">
        <img :src="images.noNews" class="image">
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
      page: 1,
      limit: 20,
      articles: [],
      images: {
        noNews: resURL + '/images/noNews.png'
      }
    }
  },
  onLoad() {
    this.loadArticle()
  },
  methods: {
    loadArticle() {
      getArticleList().then(res => {

      }, err => {})
    }
  }
}
</script>
