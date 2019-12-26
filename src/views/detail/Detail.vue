<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  @titleClick='titleClick'  ref="detailNav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images ='topImages' />
      <detail-base-info :goods ='goods' />
      <detail-shop-info :shop = 'shop' />
      <detail-goods-info :detail-info = 'detailInfo' @detailImageLoad='detailImageLoad' />
      <detail-param-info :param-info = 'paramInfo' ref="param" />
      <detail-comment-info  :comment-info = 'commentInfo'  ref="comment"/>
      <good-list :goods ='recommendList'  ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart = 'addToCart'/>
  </div>
</template>

<script>
import DetailNavBar from'./childComps/DetailNavBar'
import DetailSwiper from'./childComps/DetailSwiper'
import DetailBaseInfo from'./childComps/DetailBaseInfo'
import DetailShopInfo from'./childComps/DetailShopInfo'
import DetailGoodsInfo from'./childComps/DetailGoodsInfo'
import DetailParamInfo from'./childComps/DetailParamInfo'
import DetailCommentInfo from'./childComps/DetailCommentInfo'
import DetailBottomBar from'./childComps/DetailBottomBar'


import Scroll from "components/common/scroll/Scroll"
import GoodList from 'components/content/goods/GoodList'

import{getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import { log } from 'util'

export default {
  name: 'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll
  },
  data() {
    return{
      iid: null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      currentIndex: 0
    }
  },
  created() {
    //保存拿到的id
    this.iid = this.$route.params.iid
    //根据id请求数据
    getDetail(this.iid).then((res)=>{
      const data = res.result
      //console.log(res);
      //获取顶部轮播数据
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services)
      //获取商家信息
      this.shop = new Shop(data.shopInfo)
      //获取图片详情信息
      this.detailInfo = data.detailInfo
      //获取商品参数信息
      this.paramInfo = new GoodsParam (data.itemParams.info,data.itemParams.rule)
      // 保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }


/*       this.$nextTick(() =>{
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      }) */

    }),
    getRecommend().then((res,error)=>{
      if (error) return
      this.recommendList = res.data.list
    })
  },
/*   updated() {
    this.themeTopYs = []
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.themeTopYs)
  }, */
  methods:{
    detailImageLoad() {
      this.$refs.scroll.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //console.log(this.themeTopYs)
    },
    titleClick(index) {
      //console.log(index)
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position) {
      //console.log(position)
      //获取滑动的Y
      const positionY = -position.y
      //和主题的Y对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length;i++) {
        if( this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] ) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }

    },
    addToCart() {
      //console.log('aaaa')
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      //将商品添加到购物车里
      this.$store.dispatch('addCart',product).then((res) =>{
        console.log(res);

      })

    }
  }
}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background: #fff;
   height: 100vh;
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background: #fff;
 }
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  left: 0;
  right: 0;
}
</style>
