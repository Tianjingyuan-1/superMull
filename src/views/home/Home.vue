<template>
    <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <scroll class="content"
             ref="scroll"
             :probe-type="3"
             @scroll="createscroll"
             :pull-up-load="true"
             @pullingUp="loadMore">
       <home-swiper :banners="banners"></home-swiper>
       <recommend-view :recommends="recommends"></recommend-view>
       <feature-view></feature-view>
       <tab-control class="tab-control" :titles="['流行','新款','精选']" @itemClick="itemClick"></tab-control>
       <goods-list :goods="showGoods"></goods-list>
     </scroll>
      <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from 'views/home/childComps/HomeSwiper'
  import RecommendView from 'views/home/childComps/RecommendView'
  import FeatureView from 'views/home/childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'
  import {getHomeMultidata,getHomeGoods} from "network/home"


  export default {
        name: "Home",
      components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
    data(){
          return {
            //2.保存res      result:null //用来保存res 以免res被回收
            banners:[],
            recommends:[],
            goods:{
              'pop':{page: 0, list:[]},
              'new':{page: 0, list:[]},
              'sell':{page: 0, list:[]},
            },
            currentType:'pop',
            isShow:false
          }

    },
    computed:{
      showGoods:function () {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
          /*
          * 网络请求相关的方法
          * */
          getHomeMultidata:function () {
            getHomeMultidata()
              .then(res =>{
                console.log(res);
                //this.result = res
                this.banners = res.data.banner.list
                console.log(this.banners)
                this.recommends = res.data.recommend.list
                console.log(this.recommends)
              })
          },
      getHomeGoods:function (type) {
           const page = this.goods[type].page + 1
        //console.log(type)
        getHomeGoods(type,page)
          .then(res =>{
            console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page +=1

            this.$refs.scroll.finishPullUp()
          })
      },
      /*
          * 事件监听相关的方法
          * */
      itemClick:function (index) {
        if(index === 0){
          this.currentType = 'pop'
         // console.log(this.currentType);
        }else if(index === 1){
          this.currentType = 'new'
         // console.log(this.currentType);
        }else if(index === 2){
          this.currentType = 'sell'
         // console.log(this.currentType);
        }
      },
      // backClick:function () {
      //   this.$refs.scroll.scroll.scrollTo(0,0,1000)
      // }
      backClick:function () {
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      createscroll:function (position) {
        this.isShow = (-position.y)>1000
      },
      //上拉加载更多
      loadMore:function () {
        this.getHomeGoods(this.currentType) // 把对应的type传给getHomeGoods 然后在getHomeGoods中调用finishPullUp方法
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content{*/
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
    /*overflow: hidden;*/
  /*}*/
</style>
