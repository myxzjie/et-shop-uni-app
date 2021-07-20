<template>
  <view>
    <cu-custom :is-back="true" bg-color="bg-gradual-olive">
      <block slot="backText">返回</block>
      <block slot="content">{{ BaseName }}</block>
    </cu-custom>
    <divider-line
      title="兑换核销金"
    />
    <view class="margin-top">
      <view class="form-warp">
        <form>
          <view class="cu-form-group">
            <view class="title">账号ID</view>
            <input v-model="post.excUid" name="excUid" type="number" placeholder="输入账号ID">
          </view>

          <view class="cu-form-group">
            <view class="title">提现</view>
            <input v-model="post.gold" name="gold" type="number" placeholder="输入核销金">
          </view>

        </form>
      </view>
      <view class="tip padding-lr padding-top-xs">当前核销金: {{ userInfo.gold }}</view>
      <view class="cu-bar btn-group margin-top-sm">
        <button
          class="cu-btn block bg-gradual-green shadow-blur round lg"
          @tap="submitted"
        >
          提现
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import { getUser, goldExchange } from '@/api/user'
import { required } from '@/utils/validate'
import { DividerLine } from '@/components/divider-line'

export default {
  components: { DividerLine },
  props: {},
  data() {
    return {
      post: {
        excUid: null,
        gold: null
      },
      userInfo: {}
    }
  },
  onLoad(options) {
  },
  onShow() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      const that = this
      getUser().then(res => {
        that.userInfo = res.data
      })
    },
    async submitted() {
      const that = this

      if (parseFloat(that.post.gold) <= 0) {
        uni.showToast({
          title: '输入兑换核销金不能小于等于0',
          icon: 'none',
          duration: 2000
        })
        return
      }

      if (parseFloat(that.post.gold) > parseFloat(that.userInfo.gold) || parseFloat(that.userInfo.gold) === 0) {
        uni.showToast({
          title: '兑换核销金不足',
          icon: 'none',
          duration: 2000
        })
        return
      }

      try {
        await this.$validator({
          excUid: [required(required.message('请输入兑换的账号ID'))],
          gold: [required(required.message('输入兑换核销金不能小于等于0'))]
        }).validate({ excUid: that.post.excUid, gold: that.post.gold })

        that.save(that.post)
      } catch ({ errors, fields }) {
        uni.showToast({
          title: errors[0].message,
          icon: 'none',
          duration: 2000
        })
        return
      }
    },
    save(data) {
      goldExchange(data).then(
        res => {
           uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          uni.navigateTo({url:'/pages/me/gold/index'})
        },
        error => {
          uni.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000
          })
        }
      )
    }
  }
}
</script>
