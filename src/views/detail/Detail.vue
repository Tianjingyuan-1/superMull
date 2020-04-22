<template>
  <div id="detail">
  <detail-nav-bar class="detali-nav"></detail-nav-bar>
    <scroll class="scroll" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shops="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
     <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from  './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

  export default {
        name: "Detail",
      data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{}
          }
      },
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll
      },
      created() {
          //1.保存传入的iid
          this.iid = this.$route.params.iid
          this.getDetail(this.iid)
      },
    methods:{
          getDetail(iid){
            //2.根据iid请求详情数据
            getDetail(iid)
              .then(res => {
                const data = res.result;
                console.log(res)
                //1.获取顶部轮播数据
                this.topImages = res.result.itemInfo.topImages
               // console.log(this.topImages)
                //2.获取商品信息
                this.goods = new Goods(data.itemInfo ,data.columns ,data.shopInfo.services)
               // console.log(data.itemInfo.price )
                //3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)
                //4.保存商品的详情数据
               this.detailInfo = data.detailInfo
                //5.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
                console.log(this.paramInfo)
              })
          },
      imageLoad(){
        this.$refs.scroll.refresh()
      }
      }

    }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background: #ffffff;
  height: 100vh;
}
.detali-nav{
  position: relative;
  z-index: 9;
  background: #ffffff;
}
  .scroll{
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
