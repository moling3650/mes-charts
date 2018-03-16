<template>
  <div class="hello">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input v-model="sql"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button @click="query">查询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        选择Label:
      </el-col>
      <el-col :span="20">
        <el-radio-group v-model="label" v-show="columns.length">
          <el-radio v-for="col in columns" :label="col" :key="col">{{col}}</el-radio>
        </el-radio-group>
        <div v-show="!columns.length">无</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        选择Values:
      </el-col>
      <el-col :span="20">
        <el-checkbox-group v-model="values" v-show="columns.length">
          <el-checkbox v-for="col in columns" :label="col" :key="col">{{col}}</el-checkbox>
        </el-checkbox-group>
        <div v-show="!columns.length">无</div>
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
      sql: '',
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
  methods: {
    query () {
      fetchData(this.sql).then(data => {
        this.data = data
      })
    }
  }
}
</script>

<style scoped>
</style>
