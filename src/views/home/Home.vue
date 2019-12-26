<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <top-control
      :titles="['流行', '新款','精选']"
      @tabClick="tabClick"
      ref="topContro1"
      class="top-control"
      v-show="isTapFixed"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <top-control :titles="['流行', '新款','精选']" @tabClick="tabClick" ref="topContro2" />
      <good-list :goods="showGoods" />
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TopControl from "components/content/topControl/TopControl";
import GoodList from "components/content/goods/GoodList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TopControl,
    GoodList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTapFixed: false,
      saveY :0
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //1.图片加载的事件监听
    // 通过bus监听item中图片加载完成
    //const refresh = this.debounce(this.$refs.scroll.scroll.refresh(), 500);
    this.$bus.$on("itemImageLoad", () => {
      //console.log('----')
      this.$refs.scroll.scroll.refresh()
      //refresh();
    });
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.scroll.y
    //取消全局事件监听
    //this.$bus.$off
  },
  methods: {
    /**
     *
     * 事件请求相关的
     **/

    //防抖
    debounce(func, delay) {
      let timer = null;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay);
      };
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.topContro1.currentIndex = index;
      this.$refs.topContro2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //console.log(position)
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //判断topContro是否吸顶(position : fixed)
      this.isTapFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      //console.log('aasc')
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //console.log(this.$refs.topContro.$el.offsetTop)
      this.tabOffsetTop = this.$refs.topContro2.$el.offsetTop;
    },
    /**
     *
     * 网络请求相关的
     **/

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上啦加载
        this.$refs.scroll.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  left: 0;
  right: 0;
}
/* .fixed{
  position: fixed;
  right: 0;
  left: 0;
  top: 44px;
} */
.top-control {
  position: relative;
  z-index: 9;
}
</style>
