<template>
  <div class="hello">
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column
        v-for="col in columns"
        :prop="col"
        :label="col"
        :key="col">
      </el-table-column>
    </el-table>
    <component :is="'BarChart'" :data="data"></component>
  </div>
</template>

<script>
import BarChart from '@/components/Bar'
import LineChart from '@/components/Line'
import PieChart from '@/components/Pie'
import { fetchData } from '@/apis'

export default {
  name: 'HelloWorld',
  data () {
    return {
      data: []
    }
  },
  components: {
    BarChart,
    LineChart,
    PieChart
  },
  computed: {
    columns () {
      return (this.data && this.data.length) ? Object.keys(this.data[0]) : []
    }
  },
  mounted () {
    fetchData().then(data => {
      this.data = data
    })
  }
}
</script>

<style scoped>
</style>
