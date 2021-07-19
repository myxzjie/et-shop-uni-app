<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="promoter-list">
        <view class="header">
          <view class="promoterHeader">
            <view class="headerCon acea-row row-between-wrapper text-grey">
              <view>
                <view class="name">推广人数</view>
                <view>
                  <text class="num">{{ first + second || 0 }}</text
                  >人
                </view>
              </view>
              <view v-if="spreadUser !== null">
                <view class="prom-info">
                  <view class="prom-row"
                    >推荐人ID: <text class="userid">{{ spreadUser.uid }}</text></view
                  >
                  <view class="prom-row"
                    >昵称: <text class="account">{{ spreadUser.account }}</text></view
                  >
                </view>
              </view>
            </view>
          </view>

          <scroll-view scroll-x class="bg-white nav">
            <view class="flex text-center">
              <view
                class="cu-item flex-sub"
                :class="screen.grade == 0 ? 'text-cyan ' : ''"
                @tap="checkGrade(0)"
              >
                金粉({{ first || 0 }})
              </view>

              <view
                class="cu-item flex-sub"
                :class="screen.grade == 1 ? 'text-cyan ' : ''"
                @tap="checkGrade(1)"
              >
                银粉({{ second || 0 }})
              </view>
            </view>
          </scroll-view>

          <!-- <view class="cu-bar bg-gradual-orange search">
            <view class="search-form round">
              <text class="cuIcon-search" />
              <input :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search" @focus="InputFocus" @blur="InputBlur"></input>
            </view>
            <view class="action">
              <button class="cu-btn bg-green shadow-blur round">搜索</button>
            </view>
          </view> -->

          <!-- <view class="nav acea-row row-around padding-sm">
          <view
            class="item"
            :class="screen.grade == 0 ? 'on' : ''"
            @tap="checkGrade(0)"
          >
            金粉({{ first||0 }})
          </view>
          <view
            class="item"
            :class="screen.grade == 1 ? 'on' : ''"
            @click="checkGrade(1)"
          >
            银粉({{ second||0 }})
          </view>
        </view> -->
          <!-- <view class="search acea-row row-between-wrapper">
          <form @submit.prevent="submitForm">
            <view class="input">
              <input v-model="screen.keyword" placeholder="点击搜索会员名称">
              <span class="iconfont icon-guanbi" />
            </view>
          </form>
          <view class="iconfont icon-sousuo2" />
        </view> -->
        </view>
        <view class="list">
          <view
            class="sortNav acea-row row-middle padding-sm"
            :class="fixedState === true ? 'on' : ''"
          >
            <view class="sortItem" @click="sort('childCount')">
              团队排序
              <image v-if="childCount == 1" :src="images.sort1" />
              <image v-if="childCount == 2" :src="images.sort2" />
              <image v-if="childCount == 3" :src="images.sort3" />
            </view>
            <view class="sortItem" @click="sort('numberCount')">
              金额排序
              <image v-if="numberCount == 1" :src="images.sort1" />
              <image v-if="numberCount == 2" :src="images.sort2" />
              <image v-if="numberCount == 3" :src="images.sort3" />
            </view>
            <view class="sortItem" @click="sort('orderCount')">
              订单排序
              <image v-if="orderCount == 1" :src="images.sort1" />
              <image v-if="orderCount == 2" :src="images.sort2" />
              <image v-if="orderCount == 3" :src="images.sort3" />
            </view>
          </view>
          <view :class="fixedState === true ? 'sortList' : ''">
            <view
              v-for="(val, spreadListIndex) in spreadList"
              :key="spreadListIndex"
              class="item flex flex-wrap align-between padding-sm"
            >
              <view class="picTxt flex flex-wrap align-between">
                <view class="pictrue">
                  <img :src="val.avatar" />
                </view>
                <view class="text padding-left-sm">
                  <view class="name line1">{{ val.nickname }}</view>
                  <view class="margin-top-sm">加入时间: {{ val.time }}</view>
                </view>
              </view>
              <view class="right">
                <view>
                  <span class="font-color-red">{{ val.childCount }}</span> 人
                </view>
                <view>{{ val.orderCount || 0 }} 单</view>
                <view>{{ val.numberCount ? val.numberCount : 0 }} 元</view>
              </view>
            </view>
          </view>
        </view>
        <Loading :loaded="loaded" :loading="loading" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getSpreadUser } from "@/api/user";
import Loading from "@/components/loading";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      fixedState: false,
      screen: {
        page: 1,
        limit: 15,
        grade: 0,
        keyword: "",
        sort: "",
      },
      childCount: 2,
      numberCount: 2,
      orderCount: 2,
      loaded: false,
      loading: false,
      spreadUser: null,
      spreadList: [],
      loadTitle: "",
      first: "",
      second: "",
      images: {
        sort1: "http://shop.cdn.dev56.com/assets/images/sort1.png",
        sort2: "http://shop.cdn.dev56.com/assets/images/sort2.png",
        sort3: "http://shop.cdn.dev56.com/assets/images/sort3.png",
      },
    };
  },
  onLoad() {},
  onShow() {
    this.getSpreadUsers();
  },
  onReachBottom() {
    !this.loading && this.getSpreadUsers();
  },
  methods: {
    handleScroll: function () {
      // var scrollTop =
      //   document.documentElement.scrollTop || document.body.scrollTop;
      // var offsetTop = document.querySelector(".header").clientHeight;
      // if (scrollTop >= offsetTop) {
      //   this.fixedState = true;
      // } else {
      //   this.fixedState = false;
      // }
    },
    submitForm() {
      this.screen.page = 0;
      this.loaded = false;
      this.loading = false;
      this.spreadList = [];
      this.getSpreadUsers();
    },
    getSpreadUsers() {
      const that = this;
      const screen = that.screen;
      if (that.loaded || that.loading) return;
      that.loading = true;
      getSpreadUser(screen).then(
        (res) => {
          that.loading = false;
          that.spreadList.push.apply(that.spreadList, res.data.list);
          that.loaded = res.data.list.length < that.screen.limit; // 判断所有数据是否加载完成；
          that.loadTitle = that.loaded ? "人家是有底线的" : "上拉加载更多";
          that.screen.page = that.screen.page + 1;
          that.first = res.data.total;
          that.second = res.data.totalLevel;
          that.spreadUser = res.data.spreadUser;
        },
        (error) => {
          that.loading = false;
          uni.showToast({
            title: error.msg,
            icon: "none",
            duration: 2000,
          })
        },
        300
      );
    },
    checkGrade(val) {
      if (val == this.screen.grade) return;
      else {
        this.screen.page = 1;
        this.screen.grade = val;
        this.loading = false;
        this.loaded = false;
        this.spreadList = [];
        this.getSpreadUsers();
      }
    },
    sort: function (types) {
      const that = this;
      switch (types) {
        case "childCount":
          if (that.childCount == 2) {
            that.childCount = 1;
            that.orderCount = 2;
            that.numberCount = 2;
            that.screen.sort = "childCount DESC";
          } else if (that.childCount == 1) {
            that.childCount = 3;
            that.orderCount = 2;
            that.numberCount = 2;
            that.screen.sort = "childCount ASC";
          } else if (that.childCount == 3) {
            that.childCount = 2;
            that.orderCount = 2;
            that.numberCount = 2;
            that.screen.sort = "";
          }
          break;
        case "numberCount":
          if (that.numberCount == 2) {
            that.numberCount = 1;
            that.orderCount = 2;
            that.childCount = 2;
            that.screen.sort = "numberCount DESC";
          } else if (that.numberCount == 1) {
            that.numberCount = 3;
            that.orderCount = 2;
            that.childCount = 2;
            that.screen.sort = "numberCount ASC";
          } else if (that.numberCount == 3) {
            that.numberCount = 2;
            that.orderCount = 2;
            that.childCount = 2;
            that.screen.sort = "";
          }
          break;
        case "orderCount":
          if (that.orderCount == 2) {
            that.orderCount = 1;
            that.numberCount = 2;
            that.childCount = 2;
            that.screen.sort = "orderCount DESC";
          } else if (that.orderCount == 1) {
            that.orderCount = 3;
            that.numberCount = 2;
            that.childCount = 2;
            that.screen.sort = "orderCount ASC";
          } else if (that.orderCount == 3) {
            that.orderCount = 2;
            that.numberCount = 2;
            that.childCount = 2;
            that.screen.sort = "";
          }
          break;
        default:
          that.screen.sort = "";
      }

      this.screen.page = 0;
      this.loaded = false;
      this.loading = false;
      this.spreadList = [];
      this.getSpreadUsers();
    },
  },
};
</script>

<style>
.prom-info .prom-row {
  /* font-size: 0.24rem; */
  padding: 3px 0;
}
</style>
