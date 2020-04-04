<template>
    <div>
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles"
               class="title-item"
               @click="itemClick(index)"
               :class="{itemStyle:isIndex === index}">{{item}}</div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
      data(){
        return{
          titles:['商品','参数','评论','推荐'],
          isIndex:0
        }
      },
      components:{
        NavBar
      },
      methods:{
        itemClick:function (index) {
            this.isIndex = index
        },
        backClick:function () {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
  .title-item{
    flex: 1;
  }
  .itemStyle{
    color: #ff8198;
  }
  .back img{
    display: block;
    margin:  0 auto;
    margin-top: 12px;
  }
</style>
