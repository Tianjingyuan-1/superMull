<template>
    <div id="home">
     <nav-bar class="home-nav">
       <div slot="center">购物街</div>
     </nav-bar>
  <home-swiper :banners="banners"></home-swiper>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from "network/home"
  import HomeSwiper from 'views/home/childComps/HomeSwiper'

  export default {
        name: "Home",
      components:{
        NavBar,
        HomeSwiper
      },
    data(){
          return {
            //2.保存res      result:null //用来保存res 以免res被回收
            banners:[],
            recommends:[]
          }
    },
    created() {
      //1.请求多个数据
      getHomeMultidata()
        .then(res =>{
          console.log(res);
          //this.result = res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
