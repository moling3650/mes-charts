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
      pie: null
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
          name: this.label,
          type: 'pie',
          center: ['50%', '60%'],
          label: {
            normal: {
              // position: 'inner',
              formatter: '{d}%',
              textStyle: {
                // color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }
            }
          },
          data: this.data.map(item => ({
            name: item[this.label],
            value: item[this.values[0]]
          }))
        }]
      })
    }
  },
  mounted () {
    this.pie = echarts.init(this.$refs.pie)
    this.refresh()
  }
}
</script>

<style lang="css" scoped>
.pie {
  width: 100%;
  height: 400px;
}
</style>
