<template>
  <div class="hello">
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
import { fetchData } from '@/apis'

export default {
  name: 'HelloWorld',
  data () {
    return {
      data: []
    }
  },
  mounted () {
    fetchData().then(data => console.log(data))
  }
}
</script>

<style scoped>
</style>
