<template>
    <div>
      <div class="active" @click="btnclick">
        <img src="~assets/img/tabbar/category.svg" alt="" v-show="isTrue">
        <img src="~assets/img/tabbar/category_active.svg" alt="" v-show="!isTrue">
      </div>
    </div>
</template>

<script>
    export default {
        name: "Cart",
      data(){
          return{
            isTrue:false
          }
      },
      methods:{
        btnclick:function () {
          this.isTrue = !this.isTrue
        }
      }
    }
</script>

<style scoped>
.active{
  width: 100px;
  height: 100px;
}
.active img{
  width: 100%;
  height: 100%;
}
</style>
