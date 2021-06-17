<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view v-show="domStatus" :class="[posterImageStatus ? 'noscroll product-con' : 'product-con']">
        <product-swiper :img-urls="imgUrls" />

        <view class="bg-white padding-sm">
          <view class="flex flex-wrap row-between row-bottom">
            <view class="price">
              <text class="sale-price text-red text-bold text-xl">
                ￥{{ storeInfo.price }}
              </text>
              <text class="raw-price">
                ￥{{ storeInfo.productPrice }}
              </text>
            </view>
          </view>

          <view class="introduce margin-top text-lg text-bold">{{ storeInfo.title }}</view>
          <view class="flex flex-wrap align-between margin-top">
            <view v-text="'类型:' + storeInfo.people + '人团'" />
            <view v-text="'库存:' + storeInfo.stock + storeInfo.unitName" />
            <view v-text="'已拼:' + storeInfo.sales + storeInfo.unitName" />
          </view>
        </view>

        <!-- <view class="wrapper">
          <view class="share acea-row row-between row-bottom">
            <view class="money font-color-red">
              ￥
              <span class="num" v-text="storeInfo.price" />
              <span class="y-money" v-text="'￥' + storeInfo.productPrice" />
            </view>
          </view>
          <view class="introduce" v-text="storeInfo.title" />
          <view class="label acea-row row-between-wrapper">
            <view v-text="'类型:' + storeInfo.people + '人团'" />
            <view v-text="'库存:' + storeInfo.stock + storeInfo.unitName" />
            <view v-text="'已拼:' + storeInfo.sales + storeInfo.unitName" />
          </view>
        </view> -->
        <view class="cu-bar notification-bar bg-white">
          <view class="cu-avatar bg-white">
            <text class="cuIcon-notificationfill text-sm text-olive" />
            <text class="text-sm padding-left-sm">已拼{{ storeInfo.sales }}{{ storeInfo.unitName }}</text>
          </view>
          <view class="bar-swiper">
            <swiper class="swiper" :indicator-dots="false" autoplay circular vertical>
              <block v-for="(item, index) in itemNew" :key="index">
                <swiper-item class="swiper-slide">
                  <view
                    class="swiper-item"
                  >
                    <view class="text">
                      <view class="">{{ item }}</view>
                    </view>
                  <!-- <view>
                    <text class="cuIcon-right" />
                  </view> -->
                  </view>
                </swiper-item>
              </block>
            </swiper>
          </view>
        </view>

        <!-- <view class="notice flex flex-wrap row-middle padding-sm">
          <view class="text-cyan">
            <text class="cuIcon-notification" >
            已拼{{ storeInfo.sales}}{{ storeInfo.unitName }}
            </text>
            <text class="line">|</text>
          </view>
          <view class="swiper-no-swiping swiper">
            <swiper class="swiper-wrapper" :options="swiperTip" :autoplay="true" :interval="3000">
              <block v-for="(item, itemNewIndex) in itemNew" :key="itemNewIndex">
                <swiper-item>
                  <view class="line1">{{ item }}</view>
                </swiper-item>
              </block>
            </swiper>
          </view>
        </view> -->
        <view class="assemble">
          <view v-for="(item, groupListindex) in groupList" :key="groupListindex">
            <view v-if="groupListindex < groupListCount" class="item acea-row row-between-wrapper padding-xs solid-bottom">
              <view class="goup-user acea-row row-between-wrapper">
                <view class="pictrue">
                  <image :src="item.avatar" class="image" />
                </view>
                <view class="name margin-left-sm" v-text="item.nickname" />
              </view>
              <view class="right acea-row row-middle ">
                <view class="margin-right-sm">
                  <view class="lack">
                    还差
                    <text class="text-red" v-text="item.count" />人成团
                  </view>
                  <count-down
                    :is-day="false"
                    :tip-text="'剩余 '"
                    :day-text="' '"
                    :hour-text="':'"
                    :minute-text="':'"
                    :second-text="' '"
                    :datatime="item.stopTime"
                  />
                </view>
                <view class="cu-btn bg-red round sm" @tap="groupRule(item.id)">
                  去拼单
                  <text class="cuIcon-right" />
                </view>
              </view>
            </view>
          </view>
          <view v-if="groupList.length > groupListCount" class="more" @click="setGroupListCount">
            查看更多
            <span class="iconfont icon-xiangxia" />
          </view>
        </view>

        <view class="group-rule bg-white padding-sm">
          <view class="title flex flex-wrap align-between padding-bottom-sm">
            <view>拼团玩法</view>
          </view>
          <view class="rule flex flex-wrap row-middle padding-top-sm">
            <view class="item">
              <text class="num margin-right-xs">①</text>开团/参团
            </view>
            <view class="cuIcon-right margin-lr" />
            <view class="item">
              <text class="num margin-right-xs">②</text>邀请好友
            </view>
            <view class="cuIcon-right margin-lr" />
            <view class="item">
              <view>
                <text class="num margin-right-xs">③</text>满员发货
              </view>
            </view>
          </view>
        </view>

        <!-- <view class="playWay">
          <view class="title acea-row row-between-wrapper">
            <view>拼团玩法</view>
          </view>
          <view class="way acea-row row-middle">
            <view class="item">
              <span class="num">①</span>开团/参团
            </view>
            <view class="iconfont icon-arrow" />
            <view class="item">
              <span class="num">②</span>邀请好友
            </view>
            <view class="iconfont icon-arrow" />
            <view class="item">
              <view>
                <span class="num">③</span>满员发货
              </view>
            </view>
          </view>
        </view> -->
        <view class="user-evaluation bg-white padding-sm">
          <view class="title flex flex-wrap align-between">
            <view v-text="'用户评价(' + replyCount + ')'" />
            <view class="praise" @click="goReply">
              <text class="font-color-red" v-text="replyChance + '%'" />
              <text>好评率</text>
              <text class="cuIcon-right" />
            </view>
          </view>
          <evaluation :reply="reply" />
        </view>

        <view class="padding bg-white">
          <view class="title text-center text-bold">产品介绍</view>
          <view class="conter padding-top-sm" v-html="storeInfo.description" />
        </view>

        <!-- <view class="product-intro">
          <view class="title">产品介绍</view>
          <view class="conter" v-html="storeInfo.description" />
        </view> -->

        <!-- <view class="footer-group acea-row row-between-wrapper">
          <view class="customerSer acea-row row-center-wrapper row-column">
            <view class="iconfont icon-kefu" />
            <view>客服</view>
          </view>
          <view class="bnt bg-color-violet" @click="openAlone">单独购买</view>
          <view class="bnt bg-color-red" @click="openTeam">立即开团</view>
        </view> -->
        <product-window :attr="attr" @changeFun="changeFun" />
        <StorePoster
          :poster-image-status="posterImageStatus"
          :poster-data="posterData"
          @setPosterImageStatus="setPosterImageStatus"
        />
      </view>

      <view class="cu-tabbar-height" />
    </scroll-view>

    <view class="cu-bar bg-white tabbar border shop foot">
      <button class="action" @tap="onCollect">
        <view class="cuIcon-service" :class="storeInfo.userCollect?'text-red':'text-grey'">
          <view v-if="storeInfo.userCollect" class="cu-tag badge" />
        </view>
        客服
      </button>
      <view class="bg-orange submit" @tap="openAlone">单独购买</view>
      <view class="bg-red submit" @tap="openTeam">立即开团</view>
    </view>
  </view>
</template>

<script>
import ProductSwiper from '@/components/product/product-swiper'
import Evaluation from '@/components/evaluation/index'
// import ProductConSwiper from '@components/ProductConSwiper'
import CountDown from '@/components/count-down'

// import ProductWindow from '@components/ProductWindow'
// import StorePoster from '@components/StorePoster'
import { getCombinationDetail } from '@/api/activity'
import { addCart } from '@/api/store'
// import { imageBase64 } from '@api/public'

export default {
  components: {
    // // swiper,
    // // swiperSlide,
    ProductSwiper,
    Evaluation,
    // ProductConSwiper,
    CountDown,
    // ProductWindow,
    // StorePoster
  },
  data() {
    return {
      id: '',
      domStatus: false,
      posterData: {
        image: '',
        title: '',
        price: '',
        code: ''
      },
      posterImageStatus: false,
      reply: [],
      replyCount: 0,
      replyChance: 0,
      imgUrls: [],
      storeInfo: {},
      itemNew: {},
      groupListCount: 2,
      groupList: {},
      swiperTip: {
        direction: 'vertical',
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      },
      isOpen: false, // 是否打开属性组件
      attr: {
        cartAttr: false,
        productSelect: {
          image: '',
          store_name: '',
          price: '',
          stock: '',
          unique: '',
          cart_num: 1
        }
      },
      steps: [{
        index: 1,
        name: '开团/参团'
      }, {
        index: 2,
        name: '邀请好友'
      }, {
        index: 3, name: '满员发货'
      }]
    }
  },
  // watch: {
  //   $route: function(n) {
  //     var that = this
  //     console.log(n)
  //     if (n.name === NAME) {
  //       that.mountedStart()
  //     }
  //   }
  // },
  onLoad(options) {
    this.id = options.id
  },
  onShow() {
    this.mountedStart()
  },
  methods: {
    openAlone() {
      uni.navigateTo({
        url: '/pages/shop/details/index?id=' + this.storeInfo.productId
      })
    },
    mountedStart() {
      const that = this
      getCombinationDetail(that.id).then(res => {
        that.$set(that, 'storeInfo', res.data.storeInfo)
        that.$set(that, 'imgUrls', res.data.storeInfo.sliderImageArr)
        that.$set(that, 'itemNew', res.data.pinkOkList)
        that.$set(that, 'groupList', res.data.pink)
        that.$set(that, 'reply', res.data.reply ? [res.data.reply] : [])
        that.$set(that, 'replyCount', res.data.replyCount)
        that.$set(that, 'replyChance', res.data.replyChance)
        that.setProductSelect()
        that.posterData.image = that.storeInfo.image
        if (that.storeInfo.title.length > 30) {
          that.posterData.title = that.storeInfo.title.substring(0, 30) + '...'
        } else {
          that.posterData.title = that.storeInfo.title
        }
        that.posterData.price = that.storeInfo.price
        that.posterData.code = that.storeInfo.code_base
        that.domStatus = true
        // that.getImageBase64();
      })
    },
    getImageBase64: function() {
      const that = this
      imageBase64(this.posterData.image, that.posterData.code).then(res => {
        that.posterData.image = res.data.image
        that.posterData.code = res.data.code
      })
    },
    setPosterImageStatus: function() {
      // var sTop = document.body || document.documentElement;
      // sTop.scrollTop = 0;
      this.posterImageStatus = !this.posterImageStatus
    },
    groupRule: function(id) {
      var that = this
      that.$router.push({
        path: '/pages/activity/GroupRule/main',
        query: { id }
      })
    },
    goReply: function() {
      var that = this
      that.$router.push({
        path: '/pages/shop/EvaluateList/main',
        query: { id: that.storeInfo.product_id }
      })
    },
    setGroupListCount: function() {
      this.groupListCount = this.groupListCount + 2
    },
    // 将父级向子集多次传送的函数合二为一；
    changeFun: function(opt) {
      if (typeof opt !== 'object') opt = {}
      const action = opt.action || ''
      const value = opt.value === undefined ? '' : opt.value
      this[action] && this[action](value)
    },
    changeattr: function(res) {
      var that = this
      that.attr.cartAttr = res
    },
    ChangeCartNum: function(res) {
      var that = this
      console.log(res)
      that.attr.productSelect.cart_num = 1
      that.$dialog.message('每人每次限购1' + that.storeInfo.unitName)
    },
    setProductSelect() {
      const that = this
      const attr = that.attr
      attr.productSelect.image = that.storeInfo.image
      attr.productSelect.store_name = that.storeInfo.title
      attr.productSelect.price = that.storeInfo.price
      attr.productSelect.stock = that.storeInfo.stock
      attr.cartAttr = false
      that.$set(that, 'attr', attr)
    },
    openTeam() {
      const that = this
      if (that.attr.cartAttr == false) {
        that.attr.cartAttr = !that.attr.cartAttr
        // that.$set(that, 'attr', that.attr)
      } else {
        const data = {}
        data.productId = that.storeInfo.productId
        data.cartNum = that.attr.productSelect.cart_num
        data.uniqueId = that.attr.productSelect.unique
        data.combinationId = that.storeInfo.id
        data.new = 1
        addCart(data)
          .then(res => {
            uni.navigateTo({
              url: '/pages/order/submit/index?ids=' + res.data.cartId
            })
          })
          .catch(err => {
            uni.showToast({
              title: err.response.data.msg,
              icon: 'none',
              duration: 2000
            })
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .noscroll {
//   height: 100%;
//   overflow: hidden;
// }
// .product-con .footer-group .bnt {
//   width: 43%;
// }
// .product-con .footer-group .bnt.bg-color-violet {
//   background-color: #fa8013;
// }
// .product-con .wrapper {
//   padding-bottom: 0.26rem;
// }

  .raw-price {
    text-decoration: line-through;
  }

  .notification-bar {
    min-height: 60upx;
    border-top: 1upx solid rgba(0, 0, 0, 0.05);
    border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
    .cu-avatar {
      width: 170upx;
      &:first-child {
        margin-left: 0;
      }
    }
    .bar-swiper{
      display: flex;
      flex: 1;
      .swiper {
        width: 100%;
        height: 60upx;
        .swiper-slide {
          .swiper-item {
            border-left: 1upx solid rgba(0, 0, 0, 0.05);
            padding: 10upx 20upx 0;
            overflow: hidden;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .group-rule {
    border-bottom: 1upx solid #eee;
    .title {
      border-bottom: 1upx solid #eee;
    }
  }

  .assemble {
    .item {
      .pictrue {
        .image {
          width: 32upx;
          height: 32upx;
          border-radius: 50%;
        }
      }
    }
  }
</style>
