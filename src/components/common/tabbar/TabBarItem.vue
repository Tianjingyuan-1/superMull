<template>
  <div class="tab-bar-item" @click="itemclick">
   <div v-if="!isActive" > <slot name="item-icon"></slot></div>
   <div v-else > <slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
      props:{
          path:String,
          activeColor:{
            type:String,
            default:'red'
          }
      },
      data:function () {
        return{
          //isActive:true
        }
      },
      computed:{
          //TabBar 切换
        isActive:function () {
          return this.$route.path.indexOf(this.path) !== -1
        },
        //颜色切换
        activeStyle:function () {
          return this.isActive ?{color:this.activeColor}: {}
        }
      },
      methods:{
        itemclick:function () {
          this.$router.replace(this.path)
          console.log(this.path)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  .active{
    color: red;
  }
</style>
