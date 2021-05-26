<template>
  <view>
    <cu-custom bg-image="/static/sylb2244.jpeg" bg-color="bg-gradual-green">
      <view slot="content">{{ BaseName }}</view>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="distribution-posters">
        <view class="slider-banner banner">
          <swiper
            :indicator-dots="indicatorDots"
            :indicator-color="indicatorColor"
            :indicator-active-color="indicatorActiveColor"
          >
            <block v-for="(item, infoIndex) in info" :key="infoIndex">
              <swiper-item>
                <image class="slide-image" :src="item.wap_poster" mode="widthFix" show-menu-by-longpress />
              </swiper-item>
            </block>
          </swiper>
        </view>
        <view class="cu-bar btn-group margin-top">
          <button class="cu-btn bg-green shadow-blur round lg" @tap="saveImg">
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
      indicatorDots: true,
      indicatorColor: 'transparent',
      indicatorActiveColor: 'transparent',
      swiperPosters: {
        speed: 1000,
        effect: 'coverflow',
        slidesPerView: 'auto',
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: -20, // 拉伸   图片间左右的间距和密集度
          depth: 100, // 深度   切换图片间上下的间距和密集度
          modifier: 3, // 修正值 该值越大前面的效果越明显
          slideShadows: false // 页面阴影效果
        },
        observer: true,
        observeParents: true
      },
      info: {},
      activeIndex: 0
    }
  },
  onShow() {
    this.getIndex()
  },
  methods: {
    getIndex() {
      const that = this
      getSpreadImg().then(
        res => {
          that.info = res.data
        },
        err => {
          that.$dialog.message(err.msg)
        }
      )
    },
    downloadIamge(imgsrc, name) {
      // let image = new Image();
      // image.setAttribute("crossOrigin", "anonymous");
      // image.onload = function() {
      //   // let canvas = document.createElement("canvas");
      //   // canvas.width = image.width;
      //   // canvas.height = image.height;
      //   // let context = canvas.getContext("2d");
      //   // context.drawImage(image, 0, 0, image.width, image.height);
      //   // let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      //   // let a = document.createElement("a"); // 生成一个a元素
      //   // let event = new MouseEvent("click"); // 创建一个单击事件
      //   // a.download = name || "photo"; // 设置图片名称
      //   // a.href = url; // 将生成的URL设置为a.href属性
      //   // a.dispatchEvent(event); // 触发a的单击事件
      // };
      // image.src = imgsrc;

      var that = this
      this.isDown = true
      var downloadUrl = imgsrc

      if (!wx.saveImageToPhotosAlbum) {
        wx.showModal({
          title: '提示',
          content:
            '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
        that.openDialogVisible = true

        return
      }

      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            that.openDialogVisible = true

            // 接口调用询问
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                that.downloadImage(downloadUrl)
              },
              fail() {
                // 用户拒绝了授权
                // 打开设置页面
                wx.openSetting({
                  success: function(data) {},
                  fail: function(data) {}
                })
              }
            })
          } else {
            that.downloadImage(downloadUrl)
          }
        },
        fail(res) {
          that.openDialogVisible = true
        }
      })
    },
    saveImg: function() {
      console.log(this.info[this.activeIndex].wap_poster)
      this.downloadIamge(
        this.info[this.activeIndex].wap_poster,
        'poster' + this.activeIndex
      )
    }
  }
}
</script>

<style scoped>
.distribution-posters {
  height: 100%;
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
