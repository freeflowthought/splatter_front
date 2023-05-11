<template>
  <div id="swap">
    <ModalsSwap ref="modal"></ModalsSwap>
    <ModalsTokens ref="tokens" :from="swapFrom" :to="swapTo"></ModalsTokens>

    <section id="swap-content" class="fwrap center">
      <!-- left -->
      <v-card ref="target_swap_chart" class="left card">
        <AppChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></AppChartsSwapChart>
      </v-card>


      <!-- right -->
      <v-card class="right card divcol" style="max-width: 318px !important; gap: 14px 0">
        <div class="divcol center" style="gap: 6px">
          <h3 class="p" style="--fw: 700">Trending Coins</h3>
          <label>Drag your token to swap</label>
        </div>
        
        <div class="grid" style="gap: inherit">
          <div v-for="(item, i) in dataTokens" :key="i" class="divcol center">
            <v-img class="aspect" style="--w: 50px">
              <template #default>
                <img
                  v-show="item.img" :src="item.img" :alt="`${item.name} token`" style="--w: 100%; --of: cover">
              </template>
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
            <label class="tup">{{item.name}}</label>
          </div>
        </div>
      </v-card>
    </section>
  </div>
</template>

<script>
// import isMobile from '~/mixins/isMobile'

export default {
  name: "SwapPage",
  data() {
    return {
      heightChart: undefined,
      swapFrom: {
        img: require('~/assets/sources/tokens/database.svg'),
        name: "bear",
        amount: undefined,
      },
      swapTo: {
        img: require('~/assets/sources/tokens/btc.svg'),
        name: "btc",
        amount: undefined,
      },
      dataTokens: [
        {
          img: require('~/assets/sources/tokens/hny.svg'),
          name: "hny",
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "coin name",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "coin name",
        },
      ],
      currentDrag: undefined,
    }
  },
  head() {
    const title = 'Swap';
    return {
      title,
    }
  },
  mounted() {
    this.styles()
    window.addEventListener("resize", this.styles)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.styles)
  },
  methods: {
    styles() {
      // height chart calculator
      const
        container = this.$refs.target_swap_chart.$el,
        header = container.querySelector(".charts-header"),
        footer = container.querySelector(".charts-footer");
      this.heightChart = `
        ${container.getBoundingClientRect().height -
        (header.getBoundingClientRect().height + footer.getBoundingClientRect().height + 48 + 15)}px
      `
    },
    switchTokens() {
      [this.swapFrom.img, this.swapFrom.name, this.swapTo.img, this.swapTo.name]
      = [this.swapTo.img, this.swapTo.name, this.swapFrom.img, this.swapFrom.name]
    },
    calcPriceTo(event) {
      const item = this.swapFrom
      console.log(item)
      this.swapTo.amount = (event / 1.5).toFixed(2)
    },
    swap() {
      if (!(this.swapFrom.amount && this.swapTo.amount)) return;
      const data = {
        tokenFrom: this.swapFrom.name,
        priceFrom: this.swapFrom.amount,
        tokenTo: this.swapTo.name,
        priceTo: this.swapTo.amount,
      }

      this.$store.commit("setSwapReview", data)
      this.$router.push(this.basePath('/swap-review'))
    }
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
