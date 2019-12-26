<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物街({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    cartLength() {
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  }
</style>
