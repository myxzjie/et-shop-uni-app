<template>
  <div class="newsDetail">
    <div class="title">{{ articleInfo.title }}</div>
    <div class="list acea-row row-middle">
      <div class="label cart-color line1">新闻专区</div>
      <div class="item">
        <span class="iconfont icon-shenhezhong" />{{ articleInfo.addTime }}
      </div>
      <div class="item">
        <span class="iconfont icon-liulan" />{{ articleInfo.visit }}
      </div>
    </div>
    <div class="conter" v-html="articleInfo.content" />
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

</style>