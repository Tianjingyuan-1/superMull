<template>
  <!-- 判断是否传过来数据 -->
  <div v-if="Object.keys(goods).length!==0" class="infoBox">
    <div class="title">{{goods.title}}</div>
    <div class="price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      <span v-else></span>
    </div>
    <div class="other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="service">
      <span class="service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped>
.infoBox {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.infoBox > .title {
  font-weight: bold;
  color: #222;
  line-height: 25px;
  margin-bottom: 15px;
}
.price {
  margin-top: 10px;
}
.newPrice {
  font-size: 24px;
  color: var(--color-high-text);
}
.oldPrice {
  font-size: 13px;
  margin-left: 15px;
  text-decoration: line-through;
}
.discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}
.other {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 15px;
  line-height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.service-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.service-item span {
  font-size: 13px;
  color: #333;
}
</style>
