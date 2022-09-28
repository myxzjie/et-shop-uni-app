<template>
  <view>
    <cu-custom :is-back="true">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <!--
          <view class="item acea-row row-between-wrapper">
            <view class="name">所在地区</view>
            <view class="picker acea-row row-between-wrapper select-value form-control">
              <view class="address">
                <view slot="right" @click.stop="show2 = true">{{ model2 || "请选择收货地址" }}</view>
                <vant-popup :show="show2" position="bottom" @close="closeaArea">
                  <vant-area
                    :area-list="district"
                    :columns-num="3"
                    :columns-placeholder="['请选择', '请选择', '请选择']"
                    title="请选择"
                    @confirm="result2"
                  />
                </vant-popup>
              </view>
              <view class="iconfont icon-dizhi font-color-red" />
            </view>
          </view> -->
      <form>
        <view class="cu-form-group margin-top">
          <view class="title">姓名</view>
          <input v-model="userAddress.realName" required placeholder="请输入姓名" name="realName"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">联系电话</view>
          <input v-model="userAddress.phone" placeholder="请输入联系电话" name="phone" required></input>
        </view>
        <!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
        <view class="cu-form-group">
          <view class="title">所在地区</view>
          <picker mode="region" :value="region" @change="RegionChange">
            <view class="picker">
              {{ model2 || "请选择收货地址" }}
              <!-- {{region[0]}}，{{region[1]}}，{{region[2]}} -->
            </view>
          </picker>
        </view>
        <!-- #endif -->
        <view class="cu-form-group">
          <view class="title">详细地址</view>
          <input v-model="userAddress.detail" placeholder="请填写详细地址" name="detail" required></input>
        </view>
        <!-- <view class="cu-form-group">
				<view class="title">收货地址</view>
				<input placeholder="输入框带个图标" name="input"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view> -->

        <!-- <view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入框带标签" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view> -->

        <checkbox-group class="block" @change="ChangeIsDefault">
          <!-- #ifndef MP-ALIPAY -->
          <view class="cu-form-group">
            <view class="title">设置为默认地址</view>
            <checkbox class="round blue" :class="userAddress.isDefault?'checked':''" :checked="userAddress.isDefault?true:false" />
          </view>
          <!-- #endif -->
        </checkbox-group>

        <view class="cu-bar btn-group margin-top">
          <button class="cu-btn bg-green shadow-blur round lg" @tap="submit">
            立即保存
          </button>
        </view>
      </form>

      <view class="addAddress absolute">
        <view class="list">
          <!-- <view class="item acea-row row-between-wrapper">
            <view class="name">姓名</view>
            <input v-model="userAddress.realName" type="text" placeholder="请输入姓名" required>
          </view> -->
          <!-- <view class="item acea-row row-between-wrapper">
            <view class="name">联系电话</view>
            <input v-model="userAddress.phone" type="text" placeholder="请输入联系电话" required>
          </view> -->
          <!-- <view class="item acea-row row-between-wrapper">
            <view class="name">所在地区</view>
            <view class="picker acea-row row-between-wrapper select-value form-control">
              <view class="address">
                <view slot="right" @click.stop="show2 = true">{{ model2 || "请选择收货地址" }}</view>
                <vant-popup :show="show2" position="bottom" @close="closeaArea">
                  <vant-area
                    :area-list="district"
                    :columns-num="3"
                    :columns-placeholder="['请选择', '请选择', '请选择']"
                    title="请选择"
                    @confirm="result2"
                  />
                </vant-popup>
              </view>
              <view class="iconfont icon-dizhi font-color-red" />
            </view>
          </view> -->
          <!-- <view class="item acea-row row-between-wrapper">
            <view class="name">详细地址</view>
            <input v-model="userAddress.detail" type="text" placeholder="请填写具体地址" required>
          </view> -->
        </view>
        <!-- <view class="default acea-row row-middle">
          <view class="select-btn">
            <view class="checkbox-wrapper">
              <checkbox-group @change="ChangeIsDefault">
                <label class="well-check">
                  <checkbox value :checked="userAddress.isDefault ? true : false" />
                  <span class="def">设置为默认地址</span>
                </label>
              </checkbox-group>
            </view>
          </view>
        </view>
        <view /> -->
        <!-- <view class="keepBnt bg-color-red" @click="submit">立即保存</view> -->
        <!-- <view v-if="isWechat && !id" class="wechatAddress" @click="getAddress">导入微信地址</view> -->
      </view>
    </scroll-view>
  </view>
</template>
<script type="text/babel">
// import { CitySelect } from "vue-ydui/dist/lib.rem/cityselect";
// import District from "@utils/area";
import { getAddress, postAddress, district } from '@/api/user'
import attrs, { required, chs_phone } from '@/utils/validate'
// import { validatorDefaultCatch } from '@/utils/dialog'
// import { openAddress } from "@libs/wechat";
// import { isWeixin } from '@/utils'

export default {
  components: {
    // CitySelect
  },
  data() {
    return {
      id: '',
      show2: false,
      model2: '',
      district: {},
      id: 0,
      userAddress: { isDefault: 0 },
      address: {},
      isWechat: false,
      region: ['广东省', '广州市', '海珠区']
    }
  },
  onLoad(option) {
    this.id = option.id
  },
  onShow() {
    // document.title = !id ? "添加地址" : "修改地址";
    this.getUserAddress()
    district().then(res => {
      this.district = res.data
    })
  },
  methods: {
    RegionChange(e) {
      this.region = e.detail.value
      this.address.province = this.region[0] || ''
      this.address.city = this.region[1] || ''
      this.address.district = this.region[2] || ''
      this.model2 = this.address.province + ' ' + this.address.city + ' ' + this.address.district
    },
    getUserAddress: function() {
      if (!this.id) return false
      const that = this
      getAddress(that.id).then(res => {
        that.userAddress = res.data
        that.model2 =
          res.data.province + ' ' + res.data.city + ' ' + res.data.district
        that.address.province = res.data.province
        that.address.city = res.data.city
        that.address.district = res.data.district
        that.region = [res.data.province, res.data.city, res.data.district]
      })
    },
    getAddress() {},
    async submit() {
      const name = this.userAddress.realName
      const phone = this.userAddress.phone
      const model2 = this.model2
      const detail = this.userAddress.detail
      const isDefault = this.userAddress.isDefault
      try {
        await this.$validator({
          name: [
            required(required.message('姓名')),
            attrs.range([2, 16], attrs.range.message('姓名'))
          ],
          phone: [
            required(required.message('联系电话')),
            chs_phone(chs_phone.message())
          ],
          model2: [required('请选择地址')],
          detail: [required(required.message('具体地址'))]
        }).validate({ name, phone, model2, detail })
      } catch (e) {
        console.log('>>>', e)
        uni.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
        return false
      }
      try {
        const that = this
        const data = {
          id: that.id,
          real_name: name,
          phone: phone,
          address: this.address,
          detail: detail,
          is_default: isDefault,
          post_code: ''
        }
        postAddress(data).then(() => {
          if (that.id) {
            uni.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 2000
            })
          } else {
            uni.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 2000
            })
          }
          const pages = getCurrentPages()
          const beforePage = pages[pages.length - 2]
          uni.navigateBack({
            success: () => {
              // beforePage.onShow() // 执行前一个页面的onLoad方法
            }
          })
        })
      } catch (e) {
        uni.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    ChangeIsDefault() {
      this.userAddress.isDefault = !this.userAddress.isDefault
    },
    closeaArea() {
      this.show2 = false
    },
    result2(ret) {
      const values = ret.mp.detail.values
      this.closeaArea()
      this.address.province = values[0].name || ''
      this.address.city = values[1].name || ''
      this.address.district = values[2].name || ''
      this.model2 =
        this.address.province + this.address.city + this.address.district
    }
  }
}
</script>
