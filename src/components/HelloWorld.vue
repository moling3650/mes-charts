<template>
  <div class="hello">
    <el-row :gutter="20">
      <el-col :span="4">
        选择Label
      </el-col>
      <el-col :span="20">
        <el-radio-group v-model="label">
          <el-radio v-for="col in columns" :label="col" :key="col">{{col}}</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        选择Values
      </el-col>
      <el-col :span="20">
        <el-checkbox-group v-model="values">
          <el-checkbox v-for="col in columns" :label="col" :key="col">{{col}}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>

    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column
        v-for="col in columns"
        :prop="col"
        :label="col"
        :key="col">
      </el-table-column>
    </el-table>

    <div v-if="label && values.length > 0">
      <component v-for="c in charts" :is="c" :key="c" :data="data" :label="label" :values="values"/>
    </div>
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
      data: [],
      label: '',
      values: [],
      charts: ['BarChart', 'LineChart', 'PieChart']
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
    const sql = `
    SELECT TOP 5 order_no, SFC, SUM(qty) AS totalQty, SUM(initqty) AS totalInitQty
      FROM P_SFC_Process_IOLog
      GROUP BY order_no, SFC
      ORDER BY totalQty DESC
    `
    fetchData(sql).then(data => {
      this.data = data
    })
  }
}
</script>

<style scoped>
</style>
