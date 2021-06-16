<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="logistics">
        <view
          v-for="cart in cartInfo"
          :key="cart.id"
          class="header acea-row row-between row-top"
        >
          <view class="pictrue">
            <img :src="cart.productInfo.image" />
          </view>
          <view class="text acea-row row-between">
            <view class="name line2">{{ cart.productInfo.store_name }}</view>
            <view class="money">
              <view>￥{{ cart.truePrice }}</view>
              <view>x{{ cart.cart_num }}</view>
            </view>
          </view>
        </view>
        <view class="logisticsCon bg-white margin-bottom-sm" >
          <view class="company flex flex-wrap align-between padding-sm">
            <view class="picTxt flex flex-wrap align-between">
              <view class="text-xxl">
              <text class="cuIcon-deliver_fill text-olive" />
              </view>
              <view class="text padding-left-sm">
                <view>
                  <text class="name">物流公司：</text>
                  {{ orderInfo.deliveryName }}
                </view>
                <view class="express">
                  <text class="name">快递单号：</text>
                  {{ orderInfo.deliveryId }}
                </view>
              </view>
            </view>
            <view
              class="cu-btn line-olive sm"
              @tap="copyClipboard(orderInfo.deliveryId)"
              >复制单号</view
            >
          </view>
          <view
            v-for="(express, expressListIndex) in expressList"
            :key="expressListIndex"
            class="item"
          >
            <view class="circular" :class="expressListIndex === 0 ? 'on' : ''" />
            <view class="text">
              <view :class="expressListIndex === 0 ? 'font-color-red' : ''">{{
                express.status
              }}</view>
              <view class="data">{{ express.time }}</view>
            </view>
          </view>
        </view>

        <!-- 物流进度条 -->
        <view class="padding-sm bg-white">
          <view class="cu-timeline">
          <view class="cu-time">物流跟踪</view>
          <view class="cu-item text-olive cur" v-for="(item,index) in logisticsList" :key="index">
            <view v-if="logisticsList.length>0" class="content bg-cyan shadow-blur">
              <text>{{ item.acceptTime }}</text>
              {{ item.acceptStation }}
            </view>
          </view>
          <!-- <view class="cu-item text-red cuIcon-attentionforbidfill">
            <view class="content bg-red shadow-blur">
              这是第一次，我家的铲屎官走了这么久。久到足足有三天！！
            </view>
          </view>
          <view class="cu-item text-grey cuIcon-evaluate_fill">
            <view class="content bg-grey shadow-blur">
              这是第一次，我家的铲屎官走了这么久。
            </view>
          </view>
          <view class="cu-item text-blue">
            <view class="bg-blue content">
              <text>20:00</text> 【月球】快件已到达月球，准备发往地球
            </view>
            <view class="bg-cyan content">
              <text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
            </view>
          </view> -->
        </view>


          <!--物流跟踪-->
          <view style="margin-bottom: 5px">
            <view
              class="bg-white"
              style="
                width: 92%;
                margin-left: 4%;
                margin: auto;
                padding-left: 15px;
                padding-right: 15px;
                padding-top: 10px;
              "
            >
              <!-- <view style="color: #111111; margin: 5px 0">
                物流跟踪
              </view> -->
              <!-- <view>
                <view class="track-rcol">
                  <view class="track-list">
                    <ul>
                      <view
                        v-for="(item, logisticsListindex) in logisticsList"
                        :key="logisticsListindex"
                      >
                        <li v-if="logisticsListindex === 0" class="active">
                          <view />
                          <i class="node-icon" />
                          <span class="txt">{{ item.acceptStation }}</span>
                          <span class="time">{{ item.acceptTime }}</span>
                        </li>
                        <li
                          v-if="
                            logisticsListindex > 0 &&
                            logisticsListindex !== logisticsList.length - 1
                          "
                        >
                          <i class="node-icon" />
                          <span class="txt">{{ item.acceptStation }}</span>
                          <span class="time">{{ item.acceptTime }}</span>
                        </li>
                        <li
                          v-if="logisticsListindex === logisticsList.length - 1"
                          class="finall"
                        >
                          <i class="view-spilander" />
                          <i class="node-icon" />
                          <span class="txt">{{ item.acceptStation }}</span>
                          <span class="time">{{ item.acceptTime }}</span>
                        </li>
                      </view>
                    </ul>
                  </view>
                </view>
              </view> -->
            </view>
          </view>
        </view>

        <view v-if="loaded && !expressList.length" class="no-express">
          <image src="https://shop.cdn.dev56.com/assets/images/noExpress.png" />
        </view>
        <Recommend />
      </view>
    </scroll-view>
  </view>
</template>
<script>
// import Recommend from '@components/Recommend'
import { express, orderDetail } from "@/api/order";

export default {
  components: {
    // Recommend
  },
  data() {
    return {
      id: "",
      cartInfo: [],
      orderInfo: {},
      expressList: [],
      loaded: false,
      logisticsList: [
        // {
        //   message: "暂无数据",
        //   messageDate: "",
        // },
      ],
    };
  },
  onLoad(option) {
    this.id = option.id;
  },
  onShow() {
    this.getExpress();
  },
  methods: {
    copyClipboard(deliveryId) {
      uni.setClipboardData({
        data: deliveryId,
        success: (res) => {
          uni.showToast({
            title: "复制成功",
          });
        },
      });
    },
    getExpressInfo() {
      const params = {
        orderCode: this.id,
        shipperCode: this.orderInfo.deliverySn,
        logisticCode: this.orderInfo.deliveryId,
      };
      express(params)
        .then((res) => {
          this.logisticsList = res.data.traces.reverse();
        })
        .catch((err) => {
          uni.showToast({
            title: err.msg || "加载失败",
            icon: "none",
            duration: 2000,
          });
          return;
        });
    },
    getExpress() {
      const that = this;
      if (!that.id) {
        uni.showToast({
          title: "订单不存在",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      that.loaded = false
      orderDetail(that.id)
        .then((res) => {
          that.orderInfo = {
            deliveryId: res.data.deliveryId,
            deliveryName: res.data.deliveryName,
            deliverySn: res.data.deliverySn,
          };
          that.getExpressInfo();
          // const result = res.data.express.result || {};
          // this.cartInfo = res.data.order.cartInfo;
          // this.expressList = result.list || [];
          // this.loaded = true;
        })
        .catch((err) => {
          uni.showToast({
            title: err.msg || "加载失败",
            icon: "none",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style scoped>
.no-express {
  margin: 1.5rem 0;
}

.no-express img {
  width: 6rem;
  margin: 0 auto;
  display: block;
}
.message-text {
  font-family: MicrosoftYaHei;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 3rem;
  letter-spacing: 0rem;
  color: #333333;
  width: 50%;
}
.fontblack {
  color: #999999;
}
.img2 {
  width: 0.81rem;
  height: 0.8rem;
  float: right;
}
.addressshow2 {
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 75%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 1rem;
}
.addressshow1 {
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 75%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 1rem;
}
.orderTitle {
  font-size: 1rem;
  color: #333333;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  height: 2.5rem;
}
.orderDetail {
  font-size: 0.26rem;
  color: #666666;
  text-align: left;
}
.border-ceter {
  width: 92%;
  padding-left: 15px;
  padding-right: 15px;
}
.pay-button {
  width: 88%;
  height: 2.6rem;
  position: relative;
  background-color: red;
  color: white;

  margin-left: 6%;
}
ul li {
  list-style: none;
  font-size: 0.24rem;
}

.track-list {
  position: relative;
}
.track-list li {
  position: relative;
  padding: 0 0 0.5rem 5px;
  line-height: 0.3rem;
  border-left: 1px solid #d9d9d9;
  color: #999;
}
.track-list li.first {
  color: red;
  padding-top: 0;
  width: 100%;
  text-align: left;
  border-left: 1px solid #d9d9d9;
}
.track-list li .node-icon {
  position: absolute;
  left: -6.5px;
  border-radius: 50%;
  width: 0.2rem;
  height: 0.2rem;
  top: 4px;
  background-color: #b2b2b2;
}
.track-list li.active .node-icon {
  background-position: 0-72px;
  background-color: #ea7c0a;
  width: 0.3rem;
  z-index: 2;
  height: 0.3rem;
  position: absolute;
  left: -0.19rem;
  top: 0;
  border-radius: 50%;
}
.track-list li .time {
  margin-right: 20px;
  position: relative;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
  color: #999;
  width: 100%;
  text-align: left;
}
.track-list li .txt {
  position: relative;
  display: inline-block;
  vertical-align: top;
  color: #999;
  left: 0.2rem;
  top: 0.04rem;
}
.track-list li.first .time {
  text-align: left;
  width: 94%;
  color: red;
}
.track-list li.first .txt {
  color: red;
  text-align: left;
  width: 94%;
}
.track-list li.finall {
  position: relative;
  padding: 0px 0 0.5rem 5px;
  line-height: 18px;
  border-color: white;
  border-left: 1px solid #ffffff;
  color: #999;
}
.track-list li.finall .div-spilander {
  width: 1px;
  position: absolute;
  left: -1.5px;
  height: 0.5rem;
  background-color: #d9d9d9;
}
</style>
