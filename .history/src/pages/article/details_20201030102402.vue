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
.newsDetail .picTxt {
  width: 6.9rem;
  height: 2rem;
  border-radius: 0.2rem;
  border: 1px solid #e1e1e1;
  position: relative;
  margin: 0.3rem auto 0 auto;
}
.newsDetail .picTxt .pictrue {
  width: 2rem;
  height: 2rem;
}
.newsDetail .picTxt .pictrue img {
  width: 100%;
  height: 100%;
  border-radius: 0.2rem 0 0 0.2rem;
  display: block;
}
.newsDetail .picTxt .text {
  width: 4.6rem;
}
.newsDetail .picTxt .text .name {
  font-size: 0.3rem;
  color: #282828;
}
.newsDetail .picTxt .text .money {
  font-size: 0.24rem;
  margin-top: 0.4rem;
  font-weight: bold;
}
.newsDetail .picTxt .text .money .num {
  font-size: 0.36rem;
}
.newsDetail .picTxt .text .y_money {
  font-size: 0.26rem;
  color: #999;
  text-decoration: line-through;
}
.newsDetail .picTxt .label {
  position: absolute;
  background-color: #303131;
  width: 1.6rem;
  height: 0.5rem;
  right: -0.07rem;
  border-radius: 0.25rem 0 0.06rem 0.25rem;
  text-align: center;
  line-height: 0.5rem;
  bottom: 0.24rem;
}
.newsDetail .picTxt .label .span {
  background-image: linear-gradient(to right, #fff71e 0%, #f9b513 100%);
  background-image: -webkit-linear-gradient(to right, #fff71e 0%, #f9b513 100%);
  background-image: -moz-linear-gradient(to right, #fff71e 0%, #f9b513 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.newsDetail .picTxt .label:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 0.08rem solid #303131;
  border-right: 0.08rem solid transparent;
  top: -0.08rem;
  right: 0;
}
.newsDetail .bnt {
  color: #fff;
  font-size: 0.3rem;
  width: 6.9rem;
  height: 0.9rem;
  border-radius: 0.45rem;
  margin: 0.48rem auto 0 auto;
  text-align: center;
  line-height: 0.9rem;
}
</style>