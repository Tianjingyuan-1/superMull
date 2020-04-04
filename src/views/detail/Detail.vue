<template>
  <div id="detail">
  <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
    export default {
        name: "Detail",
      data(){
          return{
          }
      },
      components:{
        DetailNavBar
      },
    }
</script>

<style scoped>

</style>
