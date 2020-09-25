<template>
  <view class="productSort">
    <form @submit.prevent="submitForm">
      <view ref="header" class="header acea-row row-center-wrapper">
        <view class="acea-row row-between-wrapper input">
          <text class="iconfont icon-sousuo" />
          <input v-model="search" type="text" placeholder="搜索商品信息">
        </view>
      </view>
    </form>
    <view class="aside">
      <view
        v-for="(item, categoryDivindex) in category"
        :key="categoryDivindex"
        class="item acea-row row-center-wrapper"
        :class="categoryDivindex === navActive ? 'on' : ''"
        @click="asideTap(categoryDivindex)"
      >
        <span>{{ item.cateName }}</span>
      </view>
    </view>
    <view class="conter">
      <view v-for="(item, eq) in category" :key="eq" class="listw">
        <view v-if="eq === navActive">
          <view ref="title" class="title acea-row row-center-wrapper">
            <view class="line" />
            <view class="name">{{ item.cateName }}</view>
            <view class="line" />
          </view>
          <view class="list acea-row">
            <view
              v-for="(child, categoryIndex) in item.children"
              :key="categoryIndex"
              class="item acea-row row-column row-middle"
              @click="$router.push({path: '/pages/shop/GoodsList/main',query: { id: child.id, title: child.cateName }})"
            >
              <view class="picture">
                <img :src="child.pic">
              </view>
              <view class="name line1">{{ child.cateName }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view style="height:1.2rem;" />
  </view>
</template>

<script>
export default {
  data() {},
  onLoad() {
  }
}
</script>
