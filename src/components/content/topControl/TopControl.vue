<template>
  <div class="topControl">
    <div v-for="(item, index) in titles" :key="index"
      class="topControl-item"
      :class="{active: index === currentIndex}"
      @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopControl',
  props: {
    titles:{
      typr: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .topControl{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .topControl-item{
    flex: 1;
    height: 40px;
    line-height: 40px;

  }
  .active{
    color: var(--color-high-text);

  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
    padding: 5px;
  }
</style>
