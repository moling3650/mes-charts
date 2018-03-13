<template>
  <div class="line" ref="line"></div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'LineChart',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      line: null
    }
  },
  watch: {
    'data': 'refresh',
    'label': 'refresh',
    'values': 'refresh'
  },
  methods: {
    refresh () {
      if (!this.data.length) {
        return
      }
      const series = this.values.map(value => {
        return {
          name: value,
          type: 'line',
          data: this.data.map(item => item[value])
        }
      })

      this.line.setOption({
        title: {
          text: 'ECharts 折线图'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: this.data.map(item => item[this.label])
        },
        yAxis: {
          max: value => value.max + (value.max - value.min) / 4,
          min: value => value.min - (value.max - value.min) / 4
        },
        series
      }, true)
    }
  },
  mounted () {
    this.line = echarts.init(this.$refs.line)
    this.refresh()
  }
}
</script>

<style lang="css" scoped>
  .line {
    width: 100%;
    height: 400px;
  }
</style>
