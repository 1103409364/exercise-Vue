<template>
  <!-- 带标记功能的日历 -->
  <table class="calendar" :style="{ width: width }">
    <thead class="calendar-head">
      <tr class="title">
        <th class="prevY" @click="prevYear">
          <i class="iconfont">&#xe743;</i>
        </th>
        <th class="prevM" @click="prevMonth">
          <i class="iconfont">&#xe742;</i>
        </th>
        <th colSpan="3" class="cur">
          {{ `${selecYear} 年 ${this.formatNum(selecMonth + 1)} 月` }}
        </th>
        <th class="nextM" @click="nextMonth">
          <i class="iconfont">&#xe74c;</i>
        </th>
        <th class="nextY" @click="nextYear">
          <i class="iconfont">&#xe74d;</i>
        </th>
      </tr>
      <tr class="day">
        <th
          :class="item === '六' || item === '日' ? 'weekend' : 'working-day'"
          v-for="item in DAYARR"
          :key="item"
        >
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody class="calendar-body">
      <tr v-for="i in trArr" :key="i">
        <td
          :class="
            item.M !== selecMonth
              ? 'noThisM'
              : item.D === tdDate
              ? 'today'
              : 'thisM'
          "
          v-for="(item, index) in tdArr.slice(i * 7, i * 7 + 7)"
          :key="index"
          @click="selectDate(item)"
        >
          <span
            :class="
              item.D === selecDate && item.M === selecMonth ? 'selecD' : ''
            "
            >{{ item.D }}</span
          >
          <i :class="recordDate.includes(item.D) ? 'iconfont mark' : 'hideMark'"
            >&#xe607;</i
          >
        </td>
      </tr>
    </tbody>
    <tfoot class="calendar-footer">
      <tr>
        <td colSpan="7" @click="setSelecDate(tdYear, tdMonth, tdDate, true)">
          {{
            `返回今天 ${tdYear}-${this.formatNum(tdMonth + 1)}-${this.formatNum(
              tdDate
            )} 周${DAYARR[tdDay]}`
          }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const dateNow = new Date()
const LEN = 42
export default {
  name: 'calendar',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    recordDate: {
      type: Array,
      default() {
        return []
      }
    },
    callback: {
      type: Function,
      default(params) {
        console.log(params)
      }
    }
  },
  data() {
    return {
      dateNow: dateNow,
      DAYARR: ['日', '一', '二', '三', '四', '五', '六'],
      trArr: [...Array(7).keys()],
      tdYear: dateNow.getFullYear(),
      tdMonth: dateNow.getMonth(), // 与真实月份差 1
      tdDate: dateNow.getDate(),
      tdDay: dateNow.getDay(),
      selecYear: dateNow.getFullYear(),
      selecMonth: dateNow.getMonth(),
      selecDate: dateNow.getDate()
    }
  },
  computed: {
    // 计算标记日期

    // 计算一页日期，42格
    tdArr() {
      let tdArr = []
      // 这个月的天数
      let thisMonDays = this.getMonDays(this.selecYear, this.selecMonth)
      // 上个月的天数
      let prevMonDays = this.getMonDays(this.selecYear, this.selecMonth - 1)
      // 当前月，根据当前月天数生成，每天都用 {} 表示
      let thisMonArr = [...Array(thisMonDays + 1).keys()]
        .slice(1)
        .map(item => ({
          Y: this.selecYear,
          M: this.selecMonth,
          D: item
        }))
      // 上个月
      // 根据每月1号是周几，填充数组开头部分,需要显示的上月日期
      for (let i = 0; i < this.get1day(this.selecYear, this.selecMonth); i++) {
        tdArr.unshift({
          Y: this.selecYear,
          M: this.selecMonth - 1,
          D: prevMonDays - i
        })
      }
      tdArr = tdArr.concat(thisMonArr)
      // 下个月
      // 剩余长度
      let l = LEN - tdArr.length
      for (let j = 0; j < l; j++) {
        tdArr.push({
          Y: this.selecYear,
          M: this.selecMonth + 1,
          D: j + 1
        })
      }
      return tdArr
    }
  },
  methods: {
    // 计算某月的天数,计算方法：下月的上一天,也就是本月的最后一天，就是天数
    getMonDays(Y, M) {
      // 下月的第 0 天就是这个月的最后一天
      let d = new Date(Y, M + 1, 0)
      return d.getDate()
    },
    // 计算某月一号是星期几
    get1day(Y, M) {
      let d = new Date(Y, M, 1)
      return d.getDay()
    },
    // 设置新的日期,show 参数为 Boolean 值，表示日历是否该显示。点击切换按钮应该保持日历显示状态
    setSelecDate(Y, M, D, show) {
      D = D !== undefined ? D : this.selecDate

      let d = new Date(Y, M, D)
      this.selecYear = d.getFullYear()
      this.selecMonth = d.getMonth()
      this.selecDate = d.getDate()
      // changeYear(d.getFullYear())
      // changeMonth(d.getMonth())
      // changeDate(d.getDate())

      // let selec = {
      //   year: d.getFullYear(),
      //   month: d.getMonth() + 1,
      //   date: d.getDate(),
      //   day: d.getDay(),
      //   // 是否保持显示状态，比如切换月份的时候应该保持显示，选中日期时隐藏
      //   show: show
      // }

      this.callback(`${this.selecYear}-${this.formatNum(this.selecMonth + 1)}`)

      // 回调函数，参数为选中的年月日周组成的对象
      // props.callback(selec)
      // console.log(selec)
    },
    // 最后一个参数 true 表示日历保持显示状态
    nextMonth() {
      this.setSelecDate(this.selecYear, this.selecMonth + 1, undefined, true)
    },
    nextYear() {
      this.setSelecDate(this.selecYear + 1, this.selecMonth, undefined, true)
    },
    prevMonth() {
      this.setSelecDate(this.selecYear, this.selecMonth - 1, undefined, true)
    },
    prevYear() {
      this.setSelecDate(this.selecYear - 1, this.selecMonth, undefined, true)
    },
    // 判断当前日历页，是不是当前月
    // isThisMon() {
    //   if (this.tdYear === this.selecYear && this.tdMonth === this.selecMonth) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    selectDate(date) {
      console.log(date)
      this.selecYear = date.Y
      this.selecMonth = date.M
      this.selecDate = date.D
      let dateStr = `${date.Y}-${this.formatNum(date.M + 1)}-${this.formatNum(
        date.D
      )}`
      this.callback(dateStr)
      this.$emit('selectDate', dateStr)
    },
    formatNum(num) {
      if (num < 10) {
        return '0' + num
      }
      return num
    }
  },
  created() {}
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.calendar
  border-collapse collapse
  border-spacing 0
  background-color #fff
  th, td
    border-collapse: collapse;
    border-spacing: 0;
  .weekend
    color red
  .today
    color #FFA63E
    font-weight bold
    .selecD
      color #fff
  .thisM
    color #000
  .selecD
    position absolute
    left 50%
    top 50%
    transform translate3D(-50%, -50%, 0)
    display block
    width rem(35)
    // height rem(35)
    line-height rem(35)
    text-align center
    color #fff
    background-color #FFA63E
    border-radius 50%
  .mark
    display block
    position absolute
    left 50%
    top 50%
    transform translate3D(-50%, -30%, 0)
    color #75D370
  .hideMark
    display none
  .noThisM
    color #999
  .calendar-head
    width 100%
    .title, .day
      width 100%
      th
        width 14%
        line-height rem(50)
    .title
      font-size rem(18)
      th
        font-weight normal
    .day th
      font-weight bold
  .calendar-footer,.calendar-body
    text-align center
    td
      position relative
      line-height rem(44)
      // display flex
      // align-items center
</style>
