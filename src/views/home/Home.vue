<template>
    <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

      <tab-control :titles="['流行','新款','精选']"
                   @itemClick="itemClick"
                   ref="tabControl1"
                   class="tab-control"
                    v-show="isTabFixed"></tab-control>
     <scroll class="content"
             ref="scroll"
             :probe-type="3"
             @scroll="createscroll"
             :pull-up-load="true"
             @pullingUp="loadMore">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
       <recommend-view :recommends="recommends"></recommend-view>
       <feature-view></feature-view>
       <tab-control :titles="['流行','新款','精选']"
                    @itemClick="itemClick"
                     ref="tabControl2"
       ></tab-control>
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
  import {debounce} from "common/utiles";

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
            isShow:false,
            tabOffsetTop:0, //1.定义tabOffsetTop来保存tabcontrol的offsetTop
            isTabFixed:false,
            saveY:0
          }

    },
    computed:{
      showGoods:function () {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted(){
      //3.监听item图片加载完成
      const  refresh = debounce(this.$refs.scroll.refresh,500)
      /**
       * 监听itemImageLoad方法 用防抖来优化  或者用第二种方法↓
       * this.$bus.$on('itemImageLoad', () =>{
         this.$refs.scroll.scroll.refresh()
      })
       */
      this.$bus.$on('itemImageLoad', () =>{
         refresh()
      })

    },
    destroyed(){ //销毁
      console.log('destroyed');
    },
    /**
     * 当页面活跃时记录页面Y轴的位置
     */
    activated(){//活跃
      this.$refs.scroll.scrollTo(0,this.saveY,0)
       this.$refs.scroll.refresh()
    },
    /**
     * 离开页面是记录页面当前Y轴的位置
     */
    deactivated(){//离开
     this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)
    },
    methods:{
          /**
          * 网络请求相关的方法
          * */

      /**
       *轮播图与下面小选项的网络请求
       */
          getHomeMultidata:function () {
            getHomeMultidata()
              .then(res =>{
                //console.log(res);
                //this.result = res
                this.banners = res.data.banner.list
               // console.log(this.banners)
                this.recommends = res.data.recommend.list
                //console.log(this.recommends)
              })
          },
      /**
       *商品详情的网络请求
       */
          getHomeGoods:function (type) {
           const page = this.goods[type].page + 1 // 默认设置成第一页
        getHomeGoods(type,page)
          .then(res =>{
           // console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page +=1
            /**
             * 多次上拉 默认只能一次 用finishPullUp方法
             */
            this.$refs.scroll.finishPullUp()
          })
      },
      /**
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
        //两个tab保持一致
        this.$refs.tabControl1.isIndex = index;
        this.$refs.tabControl2.isIndex = index;
      },
      // backClick:function () {
      //   this.$refs.scroll.scroll.scrollTo(0,0,1000)
      // }
      /**
       * backTop回到顶部
       */
      backClick:function () {
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      /**
       * 吸顶
       */
      createscroll:function (position) {
        //1.判断backtop是否显示
        this.isShow = (-position.y)>1000
        //3.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //上拉加载更多
      loadMore:function () {
        /**
         * 为当前选中类型加载更多
         */
        this.getHomeGoods(this.currentType) // 把对应的type传给getHomeGoods 然后在getHomeGoods中调用finishPullUp方法
      },
      /**
       * 吸顶
       */
      swiperImageLoad:function () {
        //2.获取tabControl的offsetTop
        //所有的组件都有一个属性$el:用户获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
    top: -1px;
  }
  /*.content{*/
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
    /*overflow: hidden;*/
  /*}*/
</style>
