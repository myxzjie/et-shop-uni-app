<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <view class="evaluate-con evaluate-wrap">
      <view v-if="orderCon.productInfo" class="flex flex-wrap row-between padding bg-white">
        <view class="pictrue">
          <image :src="orderCon.productInfo.image" class="image" />
        </view>
        <view class="content row-between padding-sm">
          <view class="name ellipsis-line">{{ orderCon.productInfo.storeName }}</view>
          <view class="money margin-top-xs">
            <view class="text-lg text-red">￥{{ orderCon.productInfo.price }}</view>
            <view class="num text-gray margin-top-xs">数量: x{{ orderCon.cartNum }}</view>
          </view>
        </view>
      </view>
      <view class="score padding solid-top bg-white">
        <view
          v-for="(item, scoreListIndexw) in scoreList"
          :key="scoreListIndexw"
          class="item flex flex-wrap row-middle"
        >
          <view>{{ item.name }}</view>
          <view class="stars padding-sm text-xxl">
            <text
              v-for="(itemn, index) in item.stars"
              :key="index"
              class="margin-left-sm"
              :class="
                item.index >= index
                  ? 'cuIcon-favorfill text-yellow'
                  : 'cuIcon-favor text-gray'
              "
              @click="stars(index, scoreListIndexw)"
            />
          </view>
          <text class="evaluate">
            {{
              item.index === -1 ? "" : item.index + 1 + "分"
            }}
          </text>
        </view>
        <view class="textarea">
          <textarea v-model="expect" placeholder="商品满足你的期待么？说说你的想法，分享给想买的他们吧~" />
          <view class="list acea-row row-middle">
            <view
              v-for="(item, uploadPicturesIndex) in uploadPictures"
              :key="uploadPicturesIndex"
              class="pictrue"
            >
              <img :src="item">
              <span
                class="iconfont icon-guanbi1 font-color-red"
                @click="uploadPictures.splice(uploadPicturesIndex, 1)"
              />
            </view>
          <!-- <VueCoreImageUpload
            class="btn btn-primary"
            :crop="false"
            compress="80"
            @imageuploaded="imageuploaded"
            :headers="headers"
            :max-file-size="5242880"
            :credentials="false"
            inputAccept="image/*"
            inputOfFile="file"
            :url="url"
            v-if="uploadPictures.length < 8"
          >
            <view
              class="pictrue uploadBnt acea-row row-center-wrapper row-column"
            >
              <span class="iconfont icon-icon25201"></span>
              <view>上传图片</view>
            </view>
          </VueCoreImageUpload>-->
          </view>
        </view>
        <view class="cu-bar btn-group margin-sm">
          <button class="cu-btn bg-green shadow-blur round lg" @tap="submit">立即评价</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { postOrderProduct, postOrderComment } from '@/api/store'
import { trim } from '@/utils/index'
// import { VUE_APP_API_URL } from '@config'
import { required } from '@/utils/validate'
import { validatorDefaultCatch } from '@/utils/dialog'

export default {
  components: {},
  data() {
    return {
      orderCon: {
        cartProduct: {
          productInfo: {}
        }
      },
      scoreList: [
        {
          name: '商品质量',
          stars: ['', '', '', '', ''],
          index: -1
        },
        {
          name: '服务态度',
          stars: ['', '', '', '', ''],
          index: -1
        }
      ],
      url: `/api/qiNiuContent`,
      headers: {
        Authorization: 'Bearer ' + this.$store.state.token
      },
      uploadPictures: [],
      expect: '',
      unique: ''
    }
  },
  onLoad(option) {
    this.unique = option.id
  },
  onShow() {
    this.getOrderProduct()
  },
  methods: {
    getOrderProduct: function() {
      const that = this
      const unique = that.unique
      postOrderProduct(unique).then(res => {
        that.orderCon = res.data
      })
    },
    stars: function(indexn, indexw) {
      this.scoreList[indexw].index = indexn
    },
    imageuploaded(res) {
      if (res.errno !== 0) {
        uni.showToast({
          title: res.msg || '上传图片失败',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.uploadPictures.push(res.data[0])
    },
    async submit() {
      const expect = trim(this.expect)
      const product_score =
          this.scoreList[0].index + 1 === 0 ? '' : this.scoreList[0].index + 1
      const service_score =
          this.scoreList[1].index + 1 === 0 ? '' : this.scoreList[1].index + 1
      try {
        await this.$validator({
          product_score: [
            required('请选择商品质量分数', {
              type: 'number'
            })
          ],
          service_score: [
            required('请选择服务态度分数', {
              type: 'number'
            })
          ]
        }).validate({ product_score, service_score })
      } catch (e) {
        return validatorDefaultCatch(e)
      }
      postOrderComment({
        productScore: product_score,
        serviceScore: service_score,
        unique: this.unique,
        pics: this.uploadPictures.join(','),
        comment: expect
      }).then(() => {
        uni.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 2000
        })
        const id = this.orderCon.orderId
        uni.navigateTo({
          url: `/pages/order/details/index?id=${id}`
        })
      }).catch(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluate-wrap {
  .pictrue{
    .image{
      width: 160upx;
      height: 160upx;
    }
  }
  .content {
    width: calc(100% - 160upx);
  }

  .score .textarea {
    border-radius: 5upx;
    margin-top: 20upx;
    textarea {
      background: #eee;
      padding: 10upx;
      &:placeholder {
        color: #bbb;
      }
    }
  }
}
</style>

