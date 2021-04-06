<template>
  <view :class="[posterImageStatus ? 'noscroll product-con' : 'product-con']">
    <product-swiper :img-urls="storeInfo.sliderImageArr" />
    <view class="wrapper">
      <view class="share acea-row row-between row-bottom">
        <view class="money font-color-red">
          ￥
          <span class="num">{{ storeInfo.price }}</span>
          <!-- <span
            v-if="storeInfo.vipPrice && storeInfo.vipPrice > 0"
            class="vip-money"
          >￥{{ storeInfo.vipPrice }}</span> -->
          <!-- <img
            v-if="storeInfo.vipPrice && storeInfo.vipPrice > 0"
            :src="$VUE_APP_RES_URL+'/assets/images/vip.png'"
            class="image"
          > -->
        </view>
        <!-- 分享海报 -->
        <!-- <view class="iconfont icon-fenxiang" @click="listenerActionSheet" /> -->
      </view>
      <view class="introduce">{{ storeInfo.storeName }}</view>
      <view class="label acea-row row-between-wrapper">
        <view>原价:￥{{ storeInfo.otPrice }}</view>
        <view>库存:{{ storeInfo.stock }}{{ storeInfo.unitName }}</view>
        <view>销量:{{ storeInfo.sales }}{{ storeInfo.unitName }}</view>
      </view>
      <view v-if="couponList.length" class="coupon acea-row row-between-wrapper" @click="couponTap">
        <view class="hide line1 acea-row">
          优惠券：
          <view
            v-for="(item, couponListEq) in couponList"
            :key="couponListEq"
            class="activity"
          >满{{ item.use_min_price }}减{{ item.coupon_price }}</view>
        </view>
        <view class="iconfont icon-jiantou" />
      </view>
    </view>
    <view class="attribute acea-row row-between-wrapper" @click="onSelecAttrTap">
      <view>
        {{ attrTxt }}：
        <text class="atterTxt">{{ attrValue }}</text>
      </view>
      <view class="iconfont icon-jiantou" />
    </view>
    <view v-if="system_store.id !== undefined" class="store-info">
      <view class="title">门店信息</view>
      <view class="info acea-row row-between-wrapper">
        <view class="picTxt acea-row row-between-wrapper">
          <view class="pictrue">
            <img :src="system_store.image">
          </view>
          <view class="text">
            <view class="name line1">{{ system_store.name }}</view>
            <view class="address acea-row row-middle" @click="showChang">
              <span class="addressTxt line1">
                {{
                  system_store._detailed_address
                }}
              </span>
              <span class="iconfont icon-youjian" />
            </view>
          </view>
        </view>
        <!-- <a class="iconfont icon-dadianhua01 font-color-red" :href="'tel:' + system_store.phone"></a> -->
      </view>
    </view>
    <view v-if="replyCount" class="userEvaluation">
      <view class="title acea-row row-between-wrapper">
        <view>用户评价({{ replyCount }})</view>
        <view
          class="praise"
          @click="$router.push({ path: '/pages/shop/EvaluateList/main',query:{id}})"
        >
          <span class="font-color-red">{{ replyChance }}%</span>好评率
          <span class="iconfont icon-jiantou" />
        </view>
      </view>
      <user-evaluation :reply="reply" />
    </view>
    <view class="superior">
      <view class="title acea-row row-center-wrapper">
        <img :src="images.ling">
        <view class="titleTxt">优品推荐</view>
        <img :src="images.ling">
      </view>
      <template>
        <view class="slider-banner banner">
          <swiper v-if="goodList.length > 0" :options="swiperRecommend">
            <swiper-slide v-for="(item, eq2) in goodList" :key="eq2">
              <view class="list acea-row row-middle">
                <view v-for="val in item.list" :key="val.image" class="item">
                  <view class="pictrue">
                    <img :src="val.image">
                  </view>
                  <view class="name line1">{{ val.store_name }}}</view>
                  <view class="money font-color-red">¥{{ val.price }}</view>
                </view>
              </view>
            </swiper-slide>
            <view slot="pagination" class="swiper-pagination" />
          </swiper>
        </view>
      </template>
    </view>
    <view class="product-intro">
      <view class="title">产品介绍</view>
      <view class="conter" v-html="storeInfo.description" />
    </view>
    <view style="height:1.2rem;" />
    <view class="footer acea-row row-between-wrapper">
      <!--<view class="item" @click="$router.push({ path: '/pages/user/CustomerList/main' })">-->
      <!--<view class="iconfont icon-kefu"></view>-->
      <!--<view>客服</view>-->
      <!--</view>-->
      <view class="item" @click="onCollect">
        <view class="iconfont" :class="storeInfo.userCollect ? 'icon-shoucang1' : 'icon-shoucang'" />
        <view class="name">收藏</view>
      </view>
      <view
        class="item animated"
        :class="animated === true ? 'bounceIn' : ''"
        @click="onCart()"
      >
        <view class="iconfont icon-gouwuche1">
          <span v-if="cartCount > 0" class="num bg-color-red">
            {{
              cartCount
            }}
          </span>
        </view>
        <view>购物车</view>
      </view>
      <view class="bnt acea-row">
        <view class="joinCart" @click="onJoinCart">加入购物车</view>
        <view class="buy" @click="tapBuy">立即购买</view>
      </view>
    </view>
    <CouponPop :coupon="coupon" @changeFun="changeFun" />
    <product-window :attr="attr" @changeFun="changeFun" />
    <StorePoster
      :poster-image-status="posterImageStatus"
      :poster-data="posterData"
      @setPosterImageStatus="setPosterImageStatus"
    />
    <ShareInfo :share-info-status="shareInfoStatus" @setShareInfoStatus="setShareInfoStatus" />
    <view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
      <view v-if="weixinStatus === true" class="item" @click="setShareInfoStatus">
        <view class="iconfont icon-weixin3" />
        <view class>发送给朋友</view>
      </view>
      <view class="item" @click="setPosterImageStatus">
        <view class="iconfont icon-haibao" />
        <view class>生成海报</view>
      </view>
    </view>
    <view v-show="posters" class="mask" @touchmove.prevent @click="listenerActionClose" />
    <view v-if="mapShow" class="geoPage">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        :src="'https://apis.map.qq.com/uri/v1/geocoder?coord=' +system_store.latitude +',' +system_store.longitude +'&referer=' +mapKey"
      />
    </view>
  </view>
</template>

<script>
import ProductSwiper from '@/components/shop/product-swiper'
import ProductWindow from '@/components/shop/product-window'
// import UserEvaluation from '@components/UserEvaluation'
// import CouponPop from '@components/CouponPop'
// import StorePoster from '@components/StorePoster'
// import ShareInfo from '@components/ShareInfo'
import {
  getProductDetail,
  addCart,
  getCartCount,
  getProductCode
} from '@/api/store'
import {
  getCoupon,
  collectAdd,
  collectDelete,
  getUserInfo
} from '@/api/user'
// import { isWeixin } from '@utils/index'
// // import { wechatEvevt } from "@libs/wechat";
// import { imageBase64 } from '@api/public'
// import { mapGetters } from 'vuex'
export default {
  components: {
    ProductSwiper,
    ProductWindow
    // UserEvaluation,
    // CouponPop,
    // StorePoster,
    // ShareInfo
  },
  data() {
    return {
      id: 0,
      shareInfoStatus: false,
      weixinStatus: false,
      mapShow: false,
      mapKey: '',
      posterData: {
        image: '',
        title: '',
        price: '',
        code: ''
      },
      posterImageStatus: false,
      animated: false,
      coupon: {
        coupon: false,
        list: []
      },
      attr: {
        cartAttr: false,
        productAttr: [],
        productSelect: {}
      },
      isOpen: false, // 是否打开属性组件
      productValue: [],

      storeInfo: {},
      couponList: [],
      attrTxt: '请选择',
      attrValue: '',
      cartNum: 1, // 购买数量
      replyCount: '',
      replyChance: '',
      reply: [],
      priceName: 0,
      cartCount: 0,
      posters: false,
      banner: [{}, {}],
      swiperRecommend: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: false,
        loop: false,
        speed: 1000,
        observer: true,
        observeParents: true
      },
      goodList: [],
      system_store: {},
      qqmapsdk: null,
      images: {
        ling: this.resURL + '/assets/images/ling.png'
      }
    }
  },
  // computed: mapGetters(['isLogin']),
  onLoad(option) {
    const that = this
    this.id = option.id
    that.loadProductDetails()
  },
  mounted() {
    // Object.assign(this.$data, this.$options.data())
    // this.id = this.$route.query.id
    // this.productCon()
    // this.coupons();
  },
  methods: {
    showChang: function() {
      if (isWeixin()) {
        const config = {
          latitude: this.system_store.latitude,
          longitude: this.system_store.longitude,
          name: this.system_store.name,
          address: this.system_store._detailed_address
        }
        // wechatEvevt("openLocation", config)
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(res => {
        //     if (res.is_ready) {
        //       res.wx.openLocation(config);
        //     }
        //   });
      } else {
        if (!this.mapKey) {
          return this.$dialog.error(
            '暂无法使用查看地图，请配置您的腾讯地图key'
          )
        }
        this.mapShow = true
      }
    },
    updateTitle() {
      // document.title = this.storeInfo.storeName || this.$route.meta.title;
    },
    setOpenShare: function() {
      // var data = this.storeInfo;
      // var href = location.href;
      // if (isWeixin()) {
      //   if (this.isLogin) {
      //     getUserInfo().then(res => {
      //       href =
      //         href.indexOf("?") === -1
      //           ? href + "?spread=" + res.data.uid
      //           : href + "&spread=" + res.data.uid;
      //       var configAppMessage = {
      //         desc: data.store_info,
      //         title: data.store_name,
      //         link: href,
      //         imgUrl: data.image
      //       };
      //       wechatEvevt(
      //         ["updateAppMessageShareData", "updateTimelineShareData"],
      //         configAppMessage
      //       )
      //         .then(res => {
      //           console.log(res);
      //         })
      //         .catch(res => {
      //           console.log(res);
      //           if (res.is_ready) {
      //             res.wx.updateAppMessageShareData(configAppMessage);
      //             res.wx.updateTimelineShareData(configAppMessage);
      //           }
      //         });
      //     });
      //   } else {
      //     var configAppMessage = {
      //       desc: data.store_info,
      //       title: data.store_name,
      //       link: href,
      //       imgUrl: data.image
      //     };
      //     wechatEvevt(
      //       ["updateAppMessageShareData", "updateTimelineShareData"],
      //       configAppMessage
      //     )
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(res => {
      //         console.log(res);
      //         if (res.is_ready) {
      //           res.wx.updateAppMessageShareData(configAppMessage);
      //           res.wx.updateTimelineShareData(configAppMessage);
      //         }
      //       });
      //   }
      // }
    },
    setShareInfoStatus: function() {
      this.shareInfoStatus = !this.shareInfoStatus
      this.posters = false
    },
    shareCode: function() {
      var that = this
      getProductCode(that.id).then(res => {
        that.posterData.code = res.data.code
        that.listenerActionSheet()
      })
    },
    setPosterImageStatus: function() {
      return this.$dialog.toast({ mes: '开发中....' })
    },
    // 产品详情接口；
    loadProductDetails() {
      const that = this
      getProductDetail(that.id)
        .then(res => {
          const { data } = res
          that.storeInfo = data.storeInfo
          that.attr.productAttr = data.productAttr
          that.productValue = data.productValue
          that.replyCount = data.replyCount
          that.replyChance = data.replyChance
          that.reply = res.data.reply ? [res.data.reply] : []
          // that.reply=that.reply
          that.priceName = data.priceName
          that.posterData.image = that.storeInfo.image_base
          if (that.storeInfo.storeName.length > 30) {
            that.posterData.title =
              that.storeInfo.storeName.substring(0, 30) + '...'
          } else {
            that.posterData.title = that.storeInfo.storeName
          }
          that.posterData.price = that.storeInfo.price

          // that.posterData.code = that.storeInfo.code_base;
          // that.system_store = res.data.system_store;
          const good_list = res.data.goodList || []
          const goodArray = []
          const count = Math.ceil(good_list.length / 6)
          for (let i = 0; i < count; i++) {
            var list = good_list.slice(i * 6, 6)
            if (list.length) goodArray.push({ list: list })
          }

          that.mapKay = res.data.mapKay
          that.goodList = goodArray
          that.updateTitle()
          that.loadDefaultSelect()
          that.loadCartCount()
          // that.getImageBase64();
          // that.setOpenShare();
          // that.$forceUpdate()
        })
        .catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        })
    },
    getImageBase64: function() {
      const that = this
      imageBase64(this.posterData.image, that.posterData.code)
        .then(res => {
          that.posterData.image = res.data.image
          that.posterData.code = res.data.code
        })
        .catch(() => {})
    },
    // 默认选中属性；
    loadDefaultSelect() {
      const that = this
      const productAttr = that.attr.productAttr
      const value = []
      // productAttr.forEach((element, index, iterable)=>{
      //   debugger
      //    that.$set(element, 'index', 0)
      // })
      for (let i = 0; i < productAttr.length; i++) {
        that.$set(productAttr[i], 'index', 0)
        value.push(productAttr[i].attrValueArr[0])
      }
      debugger
      // sort();排序函数:数字-英文-汉字；
      const productSelect = this.productValue[value.sort().join(',')]
      if (productSelect && productAttr.length) {
        this.$set(
          this.attr.productSelect,
          'store_name',
          this.storeInfo.storeName
        )
        console.log('productSelect:' + productSelect)
        this.$set(this.attr.productSelect, 'image', productSelect.image)
        this.$set(this.attr.productSelect, 'price', productSelect.price)
        this.$set(this.attr.productSelect, 'stock', productSelect.stock)
        this.$set(this.attr.productSelect, 'unique', productSelect.unique)
        this.$set(this.attr.productSelect, 'cartNum', 1)
        this.$set(this, 'attrValue', value.sort().join(','))
        this.$set(this, 'attrTxt', '已选择')
      } else if (!productSelect && productAttr.length) {
        this.$set(
          this.attr.productSelect,
          'store_name',
          this.storeInfo.storeName
        )
        this.$set(this.attr.productSelect, 'image', this.storeInfo.image)
        this.$set(this.attr.productSelect, 'price', this.storeInfo.price)
        this.$set(this.attr.productSelect, 'stock', 0)
        this.$set(this.attr.productSelect, 'unique', '')
        this.$set(this.attr.productSelect, 'cartNum', 0)
        this.$set(this, 'attrValue', '')
        this.$set(this, 'attrTxt', '请选择')
      } else if (!productSelect && !productAttr.length) {
        this.$set(
          this.attr.productSelect,
          'store_name',
          this.storeInfo.storeName
        )
        this.$set(this.attr.productSelect, 'image', this.storeInfo.image)
        this.$set(this.attr.productSelect, 'price', this.storeInfo.price)
        this.$set(this.attr.productSelect, 'stock', this.storeInfo.stock)
        this.$set(
          this.attr.productSelect,
          'unique',
          this.storeInfo.unique || ''
        )
        this.$set(this.attr.productSelect, 'cartNum', 1)
        this.$set(this, 'attrValue', '')
        this.$set(this, 'attrTxt', '请选择')
      }
    },
    // 购物车；
    ChangeCartNum(changeValue) {
      debugger
      // changeValue:是否 加|减
      // 获取当前变动属性
      let productSelect = this.productValue[this.attrValue]
      // 如果没有属性,赋值给商品默认库存
      if (productSelect === undefined && !this.attr.productAttr.length) { productSelect = this.attr.productSelect }
      // 无属性值即库存为0；不存在加减；
      if (productSelect === undefined) return
      const stock = productSelect.stock || 0
      const num = this.attr.productSelect
      if (changeValue > 0) {
        num.cartNum += changeValue
        // this.$set(this.attr.productSelect, 'cartNum', num.cartNum)
        if (num.cartNum > stock) {
          this.$set(this.attr.productSelect, 'cartNum', stock)
          this.$set(this, 'cartNum', stock)
        }
      } else {
        num.cartNum--
        if (num.cartNum < 1) {
          this.$set(this.attr.productSelect, 'cartNum', 1)
          this.$set(this, 'cartNum', 1)
        }
      }
    },
    // 将父级向子集多次传送的函数合二为一；
    changeFun(opt) {
      debugger
      if (typeof opt !== 'object') opt = {}
      const action = opt.action || ''
      const value = opt.value === undefined ? '' : opt.value
      this[action] && this[action](value)
    },
    // 打开优惠券插件；
    couponTap() {
      const that = this
      that.coupons()
      that.coupon.coupon = true
    },
    changecoupon(msg) {
      this.coupon.coupon = msg
      this.coupons()
    },
    currentcoupon(res) {
      const that = this
      that.coupon.coupon = false
      that.$set(that.coupon.list[res], 'is_use', true)
    },
    // 可领取优惠券接口；
    coupons() {
      const that = this; const q = { page: 1, limit: 20 }
      getCoupon(q).then(res => {
        that.$set(that, 'couponList', res.data || [])
        that.$set(that.coupon, 'list', res.data)
      })
    },
    // 打开属性插件；
    onSelecAttrTap() {
      this.attr.cartAttr = true
      this.isOpen = true
    },
    changeattr(msg) {
      this.attr.cartAttr = msg
      this.isOpen = false
    },
    // 选择属性；
    ChangeAttr: function(res) {
      console.log(res)
      const productSelect = this.productValue[res]
      console.log(this.productValue)
      console.log(productSelect)
      if (productSelect) {
        this.$set(this.attr.productSelect, 'image', productSelect.image)
        this.$set(this.attr.productSelect, 'price', productSelect.price)
        this.$set(this.attr.productSelect, 'stock', productSelect.stock)
        this.$set(this.attr.productSelect, 'unique', productSelect.unique)
        this.$set(this.attr.productSelect, 'cartNum', 1)
        this.$set(this, 'attrValue', res)
        this.$set(this, 'attrTxt', '已选择')
      } else {
        this.$set(this.attr.productSelect, 'image', this.storeInfo.image)
        this.$set(this.attr.productSelect, 'price', this.storeInfo.price)
        this.$set(this.attr.productSelect, 'stock', 0)
        this.$set(this.attr.productSelect, 'unique', '')
        this.$set(this.attr.productSelect, 'cartNum', 0)
        this.$set(this, 'attrValue', '')
        this.$set(this, 'attrTxt', '请选择')
      }
    },
    // 购物车
    onCart() {
      uni.switchTab({
        url: '/pages/cart/index'
      })
    },
    // 收藏商品
    onCollect() {
      const that = this
      const id = that.storeInfo.id
      const category = 'product'
      if (that.storeInfo.userCollect) {
        collectDelete(id, category).then(() => {
          that.storeInfo.userCollect = !that.storeInfo.userCollect
        })
      } else {
        collectAdd(id, category).then(() => {
          that.storeInfo.userCollect = !that.storeInfo.userCollect
        })
      }
    },
    //  点击加入购物车按钮
    onJoinCart() {
      // 0=加入购物车
      this.goCat(0)
    },
    // 加入购物车；
    goCat(news) {
      const that = this
      debugger
      const productSelect = that.productValue[this.attrValue]
      // 打开属性
      if (that.attrValue) {
        // 默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
        that.attr.cartAttr = !that.isOpen
      } else {
        if (that.isOpen) {
          that.attr.cartAttr = true
        } else {
          that.attr.cartAttr = !that.attr.cartAttr
        }
      }
      // 只有关闭属性弹窗时进行加入购物车
      if (that.attr.cartAttr === true && that.isOpen === false) {
        return (that.isOpen = true)
      }
      // 如果有属性,没有选择,提示用户选择
      if (
        that.attr.productAttr.length &&
        productSelect === undefined &&
        that.isOpen === true
      ) {
        return that.$dialog.toast({ mes: '产品库存不足，请选择其它' })
      }
      const query = {
        productId: that.id,
        cartNum: that.attr.productSelect.cartNum,
        new: news,
        uniqueId:
          that.attr.productSelect !== undefined
            ? that.attr.productSelect.unique
            : ''
      }
      addCart(query).then((res) => {
        that.isOpen = false
        that.attr.cartAttr = false
        if (news) {
          that.$router.push({
            path: '/pages/order/OrderSubmission/main',
            query: { ids: res.data.cartId }
          })
        } else {
          uni.showToast({
            title: '添加购物车成功',
            icon: 'none',
            duration: 2000,
            success: () => {
              that.loadCartCount(true)
            }
          })
        }
      }).catch(res => {
        that.isOpen = false
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取购物车数量
    loadCartCount(isAnima) {
      const that = this
      const isLogin = that.isLogin
      // if (isLogin) {
      getCartCount({ numType: 0 }).then(res => {
        that.cartCount = res.data.count
        // 加入购物车后重置属性
        if (isAnima) {
          that.animated = true
          setTimeout(() => {
            that.animated = false
          }, 500)
        }
      })
      // }
    },
    // 立即购买；
    tapBuy() {
      //  1=直接购买
      this.goCat(1)
    },
    listenerActionSheet: function() {
      if (isWeixin() === true) {
        this.weixinStatus = true
      }
      this.posters = true
    },
    listenerActionClose: function() {
      this.posters = false
    }
  }
}
</script>

<style scoped>
.geoPage {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10000;
}
.product-con .store-info {
  margin-top: 0.2rem;
  background-color: #fff;
}
.product-con .store-info .title {
  padding: 0 0.3rem;
  font-size: 0.28rem;
  color: #282828;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 0.01rem solid #f5f5f5;
}
.product-con .store-info .info {
  padding: 0 0.3rem;
  height: 1.26rem;
}
.product-con .store-info .info .picTxt {
  width: 6.15rem;
}
.product-con .store-info .info .picTxt .pictrue {
  width: 0.76rem;
  height: 0.76rem;
}
.product-con .store-info .info .picTxt .pictrue img {
  width: 100%;
  height: 100%;
  border-radius: 0.06rem;
}
.product-con .store-info .info .picTxt .text {
  width: 5.22rem;
}
.product-con .store-info .info .picTxt .text .name {
  font-size: 0.3rem;
  color: #282828;
}
.product-con .store-info .info .picTxt .text .address {
  font-size: 0.24rem;
  color: #666;
  margin-top: 0.03rem;
}
.product-con .store-info .info .picTxt .text .address .iconfont {
  color: #707070;
  font-size: 0.18rem;
  margin-left: 0.1rem;
}
.product-con .store-info .info .picTxt .text .address .addressTxt {
  width: 4.8rem;
}
.product-con .store-info .info .iconfont {
  font-size: 0.4rem;
}
.product-con .superior {
  background-color: #fff;
  margin-top: 0.4rem;
}
.product-con .superior .title {
  height: 2rem;
}
.product-con .superior .title img {
  width: 0.8rem;
  height: 0.8rem;
}
.product-con .superior .title .titleTxt {
  margin: 0 0.4rem;
  font-size: 0.8rem;
  background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
  background-image: -webkit-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
  background-image: -moz-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.product-con .superior .slider-banner {
  width: 6.9rem;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.product-con .superior .slider-banner .list {
  width: 100%;
  padding-bottom: 0.2rem;
}
.product-con .superior .slider-banner .list .item {
  width: 2.15rem;
  margin: 0 0.22rem 0.3rem 0;
  font-size: 0.8rem;
}
.product-con .superior .slider-banner .list .item:nth-of-type(3n) {
  margin-right: 0;
}
.product-con .superior .slider-banner .list .item .pictrue {
  width: 100%;
  height: 2.15rem;
}
.product-con .superior .slider-banner .list .item .pictrue img {
  width: 100%;
  height: 100%;
  border-radius: 0.06rem;
}
.product-con .superior .slider-banner .list .item .name {
  color: #282828;
  margin-top: 0.12rem;
}
.product-con .superior .slider-banner .swiper-pagination-bullet {
  background-color: #999;
}
.product-con .superior .slider-banner .swiper-pagination-bullet-active {
  background-color: #e93323;
}

.mask {
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
}
.footer .icon-shoucang1 {
  color: #73cbb6;
}
/* .product-con .product-intro .conter div {
  width: 100% !important;
} */
.generate-posters {
  width: 100%;
  height: 1.7rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  transform: translate3d(0, 100%, 0);
  -webkit-transform: translate3d(0, 100%, 0);
  -ms-transform: translate3d(0, 100%, 0);
  -moz-transform: translate3d(0, 100%, 0);
  -o-transform: translate3d(0, 100%, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -webkit-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -moz-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -o-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}
.generate-posters.on {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
}
.generate-posters .item {
  flex: 50%;
  -webkit-flex: 50%;
  -ms-flex: 50%;
  text-align: center;
}
.generate-posters .item .iconfont {
  font-size: 0.8rem;
  color: #5eae72;
}
.generate-posters .item .iconfont.icon-haibao {
  color: #5391f1;
}
.noscroll {
  height: 100%;
  overflow: hidden;
}
</style>
