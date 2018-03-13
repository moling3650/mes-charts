<template>
  <div class="bar" ref="bar"></div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'Bar',
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
      bar: null
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
          type: 'bar',
          data: this.data.map(item => item[value])
        }
      })

      this.bar.setOption({
        title: {
          text: 'ECharts 柱状图'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: this.data.map(item => item[this.label])
        },
        yAxis: {},
        series
      }, true)
    }
  },
  mounted () {
    this.bar = echarts.init(this.$refs.bar)
    this.refresh()
  }
}
</script>

<style lang="css" scoped>
  .bar {
    width: 100%;
    height: 400px;
  }
</style>
