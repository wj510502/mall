<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked = 'isSlectAll' class="check-button"  @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计{{totalPrice}}
    </div>
    <div class="calculate"> 去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    totalPrice() {
      return '￥' +this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      /* .filters(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0) */
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSlectAll() {
      if(this.$store.state.cartList.length === 0) return false
      return !(this.$store.state.cartList.filter(item => !item.checked).length)
    }
  },
  methods:{
    checkClick() {
      //console.log('sss');
      if(this.isSlectAll) { // 全部选中
        this.$store.state.cartList.forEach( item => {
          item.checked = false
        });
      } else {
        this.$store.state.cartList.forEach( item => {
          item.checked = true
        })
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;

    display: flex
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price{
    margin-left: 30px;
    flex: 1
  }
  .calculate{
    width: 99px;
    text-align: center;
    color: #fff;
    background-color: #23a;
  }
</style>
