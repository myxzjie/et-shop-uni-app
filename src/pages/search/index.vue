<template>
  <view>
    <cu-custom :is-back="true">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
<!-- 
  :style="[{width: Custom.width+'px', height: Custom.height+'px','margin-left': 'calc(750rpx - '+Custom.right+'px)'}]" -->
    

    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search" />
        <input v-model="search" :adjust-position="false" type="text" placeholder="搜索商品" confirm-type="search"></input>
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round" @tap="submit">搜索</button>
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">热门搜索 </view>
    </view>
    <view class="padding-sm flex flex-wrap">
      <view
        v-for="(item, index) of keywords"
        :key="index"
        class="padding-xs"
      >
        <view class="cu-tag" :class="'line-'+ colors[index%7]" @tap="toSearch(item)">{{ item }}</view>
      </view>
    </view>

  </view>
</template>
<script>
// import GoodList from "@components/GoodList";
import { getSearchKeyword } from '@/api/store'
import { trim } from '@/utils'
// import Recommend from "@components/Recommend";
export default {
  components: {
    // Recommend,
    // GoodList
  },
  data() {
    return {
      Custom: this.Custom,
      CustomBar: this.CustomBar,
      StatusBar: this.StatusBar,
      keywords: [],
      search: '',
      colors: ['green', 'pink', 'orange', 'red', 'blue', 'yellow', 'grey']
    }
  },
  onLoad() {},
  mounted() {},
  onShow() {
    this.loadSearchKeyword()
  },
  methods: {
    submit() {
      const search = trim(this.search) || ''
      if (!search) return
      this.toSearch(search)
    },
    toSearch(wk) {
      this.search = wk
      uni.navigateTo({ url: `/pages/shop/product/index?wk=${wk}` })
    },
    loadSearchKeyword() {
      getSearchKeyword().then(res => {
        this.keywords = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-wrap {
	.search {
    .search-wk{
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      > input {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
      }
    }
  }
}

</style>
