<template>
  <view class="time">
    {{ tipText }}
    <text v-if="isDay === true" class="styleAll">{{ day }}</text>
    <text class="timeTxt">{{ dayText }}</text>
    <text class="styleAll">{{ hour }}</text>
    <text class="timeTxt">{{ hourText }}</text>
    <text class="styleAll">{{ minute }}</text>
    <text class="timeTxt">{{ minuteText }}</text>
    <text class="styleAll">{{ second }}</text>
    <text class="timeTxt">{{ secondText }}</text>
  </view>
</template>
<script>
export default {
  name: 'CountDown',
  props: {
    // 距离开始提示文字
    tipText: {
      type: String,
      default: '倒计时'
    },
    dayText: {
      type: String,
      default: '天'
    },
    hourText: {
      type: String,
      default: '时'
    },
    minuteText: {
      type: String,
      default: '分'
    },
    secondText: {
      type: String,
      default: '秒'
    },
    datatime: {
      type: Number,
      default: 0
    },
    isDay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      day: '00',
      hour: '00',
      minute: '00',
      second: '00'
    }
  },
  created() {
    this.showTime()
  },
  mounted() {},
  methods: {
    showTime: function() {
      const that = this
      that.runTime()
      setInterval(that.runTime, 1000)
    },
    runTime() {
      const that = this
      // 时间函数
      const intDiff = that.datatime - Date.parse(new Date()) / 1000 // 获取数据中的时间戳的时间差；
      let day = 0
      let hour = 0
      let minute = 0
      let second = 0
      if (intDiff > 0) {
        // 转换时间
        if (that.isDay === true) {
          day = Math.floor(intDiff / (60 * 60 * 24))
        } else {
          day = 0
        }
        hour = Math.floor(intDiff / (60 * 60)) - day * 24
        minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60
        second =
          Math.floor(intDiff) -
          day * 24 * 60 * 60 -
          hour * 60 * 60 -
          minute * 60
        if (hour <= 9) hour = '0' + hour
        if (minute <= 9) minute = '0' + minute
        if (second <= 9) second = '0' + second
        that.day = day
        that.hour = hour
        that.minute = minute
        that.second = second
      } else {
        that.day = '00'
        that.hour = '00'
        that.minute = '00'
        that.second = '00'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  .styleAll {
    font-weight: bold;
    background-color: #ffcfcb;
    padding: 0.04rem 0.07rem;
    border-radius: 0.03rem;
    color: #fc4141;
  }
}

</style>
