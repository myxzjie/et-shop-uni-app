<template>
  <view>
    <cu-custom :is-back="true">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="distribution-posters">
        <u-image mode="widthFix" :src="image" />
        <view class="cu-bar btn-group margin-top">
          <button class="cu-btn bg-green shadow-blur round lg" @tap="downloadImage">
            保存海报
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { getSpreadImg } from '@/api/user'

export default {
  components: {
  },
  data() {
    return {
      BaseName: '分享海报',
      image: '',
    }
  },
  onShow() {
    this.load()
  },
  methods: {
    load() {
      const that = this
      getSpreadImg().then(
        res => {
          that.image = res.data
        },
        err => {
          uni.showToast({
            title: err.error || '请求失败',
            icon: 'none'
          })
        }
      )
    },
    downloadImage() {
      const that = this
      if (!uni.saveImageToPhotosAlbum) {
        uni.showModal({
          title: '提示',
          content:
            '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
        that.openDialogVisible = true
        return
      }

      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
      uni.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            that.openDialogVisible = true
            // 接口调用询问
            uni.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                that.saveImgToLocal(downloadUrl)
              },
              fail() {
                // 用户拒绝了授权, 打开设置页面
                uni.openSetting({
                  success: (data) => {},
                  fail: (data) => {}
                })
              }
            })
          } else {
            that.saveImgToLocal()
          }
        },
        fail(res) {
          that.openDialogVisible = true
        }
      })
    },
    saveImgToLocal() {
      const that = this
      uni.showModal({
        title: '提示',
        content: '确定保存到相册吗',
        success: (res) => {
          if (res.confirm) {
            uni.downloadFile({
              url: that.image, // 图片地址
              success: (res) => {
                if (res.statusCode !== 200) {
                  uni.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                  return
                }
                uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: () => {
                    uni.showToast({
                      title: '保存成功',
                      icon: 'none'
                    })
                  },
                  fail: (err) => {
                    console.error(err)
                    uni.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              }
            })
          } else if (res.cancel) {
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* >>>page {
   height:100vh;
} */
.distribution-posters {
  height:100vh;
  .image {
    width: 100%;
    height: auto;
  }
}
.banenr {
  height: 100%;
}
.banner swiper {
  height: 100%;
}
.banner .slide-image {
  width: 100%;
  height: auto;
}
/* 指示点 */
.wx-swiper-dots .wx-swiper-dot {
  display: none;
}
</style>
