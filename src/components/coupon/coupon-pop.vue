<template>
  <view>
    <view class="cu-modal bottom-modal" :class=" value ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">优惠券</view>
          <view class="action text-blue" @tap="onClose">
            <text class="cuIcon-close" />
          </view>
        </view>
        <view class="coupon padding-ms">
          <view v-if="couponList.length > 0">
            <view
              v-for="(item, index) in couponList"
              :key="index"
              class="item flex flex-wrap row-between margin-lr bg-white"
              @tap="click(item)"
            >
              <view class="coupon-price flex flex-wrap align-center text-xxl" :class="item.isUse ? 'coupon-gray' : ''">
                ￥ <text class="price">{{ item.couponPrice }}</text>
              </view>
              <view class="content padding-xs">
                <view class="condition ellipsis-line text-lg padding-xs">{{ item.couponTitle }}</view>
                <view class="data flex flex-wrap align-between padding-top-sm">
                  <view v-if="item.endTime === 0">不限时</view>
                  <view v-else>
                    {{ item.addTime | dateFormat }} - {{ item.endTime | dateFormat }}
                  </view>

                  <view v-if="checked === item.id" class="cuIcon-roundcheckfill text-green" />
                  <view v-else class="cuIcon-round" />
                </view>
              </view>
            </view>
            <view class="padding">
              <button class="cu-btn block bg-green margin-tb-sm lg" type="" @tap="couponNo">不使用优惠券</button>
            </view>
            <!-- <div class="couponNo bg-color-red" @click="couponNo">不使用优惠券</div> -->
          </view>
          <div v-if="!couponList.length && loaded">
            <div class="pictrue">
              <img :src="images.noCoupon" class="image">
            </div>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderCoupon } from '@/api/order'
import moment from 'moment'

export default {
  name: 'CouponListWindow',
  components: {},
  filters: {
    dateFormat(value) {
      value = +value * 1000
      return moment(value).format('YYYY/MM/DD')
    }
  },
  props: {
    value: Boolean,
    checked: Number,
    price: {
      type: [Number, String],
      default: undefined
    }
  },
  data() {
    return {
      couponList: [],
      loaded: false,
      images: {
        noCoupon: this.resURL + '/assets/images/no-coupon.png'
      }
    }
  },
  watch: {
    price(value) {
      if (value === undefined || value == null) return
      this.getCoupon()
    }
  },
  mounted() {},
  methods: {
    onClose() {
      this.$emit('input', false)
      this.$emit('close')
    },
    getCoupon() {
      getOrderCoupon(this.price).then(res => {
        this.couponList = res.data
        this.loaded = true
      })
    },
    click(coupon) {
      this.$emit('checked', coupon)
      this.$emit('input', false)
    },
    couponNo() {
      this.$emit('checked', null)
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.cu-modal {
  bottom: 100upx;
}

.coupon {
  .item {
    margin-bottom: 20upx;
    border-radius: 10upx;
    border: 1upx solid #eeeeee;
    .coupon-price{
      background-image: url('/static/coupon-red.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 200upx;
      max-width: 200upx;
      color: #fff;
      font-weight: bold;
      text-align: center;
      flex: 1;
      &.coupon-gray{
        background-image: url('/static/coupon-gray.png');
      }
    }
    .content {
      width: calc(100% - 200upx);
      .condition {
        border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
      }
    }
  }
}
.couponNo {
  /* font-size: 0.3rem; */
  font-weight: bold;
  color: #fff;
  /* width: 6.9rem; */
  /* height: 0.86rem; */
  /* border-radius: 0.43rem; */
  text-align: center;
  /* line-height: 0.86rem; */
  /* margin: 0.6rem auto; */
}
</style>
