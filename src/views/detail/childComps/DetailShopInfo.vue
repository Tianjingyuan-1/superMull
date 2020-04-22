<template>
  <div class="shops-info">
    <!-- 显示商家信息开始 -->
    <h3 class="shops-top">
      <img :src="shops.logo" alt />
      <span>{{shops.name}}</span>
    </h3>
    <div class="shops-middle">
      <div class="shops-middle-left">
        <div class="info-sell">
          <div class="sell-count">{{shops.sells|overTenThousand}}</div>
          <div class="sell-text">总销量</div>
        </div>

        <div class="info-goods">
          <div class="goods-count">{{shops.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shops-middle-right">
        <table>
          <tr v-for="(item, index) in shops.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better' :item.isBetter}">{{item.score|addZero}}</td>
            <td class="better" :class="{'better-more' :item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>

    </div>

  </div>


</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shops: {
      type: Object,
      default: {}
    }
  },
  filters: {
    //   补零
    addZero(value) {
        // console.log(value.toString().length);
      if(value.toString().length<=1){
        //   评分为一位数
          return value+"."+String.prototype.padEnd(2, "0")
      }
      else if(value.toString().length<=3){
          //   评分为三位数
          return value+String.prototype.padEnd(1, "0")
      }
      else{
          return value
      }
    },
    // 销量过万
    overTenThousand(value){
        return value >= 1000 ? (value/10000).toFixed(1)+"万" : value;
    }
  }
};
</script>

<style scoped>
.shops-top {
  display: flex;
}
.shops-top > img {
  width: 20%;
  height: 10%;
  display: block;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 5px 20px 0px 15px;
}
.shops-top > span {
  display: block;
  margin-top: 30px;

}
.shops-middle {
  display: flex;
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
}
.shops-middle-left {
  flex: 1;
  border-right: 5px solid #cccccc;
  display: flex;
}
.shops-middle-right {
  flex: 1;
  margin-left: 15px;
}
.info-sell {
  flex: 1;
}
.info-goods {
  flex: 1;
}

.sell-count {
  margin-bottom: 5px;
}
.goods-count {
  margin-bottom: 5px;
}
.shops-middle-right > table {
  width: 100%;
}
.shops-middle-right > table > tr {
  display: flex;

  padding: 5px;
  justify-content: space-evenly;
}
.shops-middle-right > table > tr > td {
  display: block;
}
.score {
  color: #5ea732;
}
.better {
  background-color: #5ea732;
  color: #fff;
}
.score-better {
  color: #f13e3a;
}
.better-more {
  background-color: #f13e3a;
  color: #fff;
  /* text-align: center; */
}
.shop-bottom{
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.shop-bottom>.enter-shop{
    background-color: rgba(0,0,0,.1);
    width: 50%;
  border-radius: 10px;
    text-align: center;
    padding: 10px 0;
}
</style>
