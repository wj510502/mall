<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product= 'item' />
    </scroll>

  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  computed:{
    cartList(){
      return this.$store.state.cartList
    }
  },
  components:{
    Scroll,
    CartListItem
  },
  activated() {
   // console.log('sssss')
   this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
    /* height: 100%; */
 /*    position: relative;
   /*  z-index: 9;
    background: #fff; */
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
 /*   position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  left: 0;
  right: 0; */
  height: 100% ;
  overflow: hidden;
  }
</style>
