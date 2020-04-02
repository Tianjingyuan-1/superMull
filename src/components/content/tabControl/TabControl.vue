<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles"
           class="tab-control-item"
           :class="{active:index === isIndex} "
      @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data(){
          return {
            isIndex:0
          }
        },
        props:{
          titles:{
            type:Array,
            default (){
              return []
            }
          }
        },
      methods:{
        itemClick:function (index) {
          this.isIndex = index;
          this.$emit('itemClick',index)
        }
      }
    }
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
}
  .tab-control-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
  .tab-control-item span{
    padding: 5px;
  }
</style>
