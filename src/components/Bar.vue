<template>
  <div class="bar" ref="bar"></div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Bar',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted () {
    const bar = echarts.init(this.$refs.bar)
    setTimeout(() => {
      bar.setOption({
        title: {
          text: 'ECharts 示例'
        },
        tooltip: {},
        xAxis: {
          data: this.data.map(item => Object.values(item)[0])
        },
        yAxis: {},
        series: [{
          type: 'bar',
          data: this.data
        }]
      })
    }, 20)
  }
}
</script>

<style lang="css" scoped>
  .bar {
    width: 100%;
    height: 400px;
  }
</style>
