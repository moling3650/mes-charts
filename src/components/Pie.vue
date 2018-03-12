<template>
  <div class="pie" ref="pie"></div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'Pie',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      pie: null
    }
  },
  watch: {
    'data': 'refresh'
  },
  methods: {
    refresh () {
      if (!this.data.length) {
        return
      }

      this.pie.setOption({
        title: {
          text: 'ECharts 饼状图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {},
        series: [{
          name: Object.keys(this.data[0])[0],
          type: 'pie',
          center: ['50%', '50%'],
          label: {
            normal: {
              position: 'inner',
              formatter: '{b} : {c}\n{d}%',
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }
            }
          },
          data: this.data.map(item => ({
            name: Object.values(item)[0],
            value: Object.values(item)[1]
          }))
        }]
      })
    }
  },
  mounted () {
    this.pie = echarts.init(this.$refs.pie)
  }
}
</script>

<style lang="css" scoped>
.pie {
  width: 100%;
  height: 400px;
}
</style>
