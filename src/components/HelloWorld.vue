<template>
  <div class="hello">
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
