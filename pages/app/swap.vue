<template>
  <div id="swap">
    <ModalsSwap ref="modal"></ModalsSwap>
    <ModalsTokens ref="tokens" :from="swapFrom" :to="swapTo"></ModalsTokens>

    <section id="swap-content" class="fwrap center divcol">
      <h1 class="swap-title">Swap tokens</h1>
      <div class="divrow mobile-column" style="gap:20px;">
        <!-- left -->
        <v-card class="swap-card divcol center jspace">
            <v-btn class="menu-btn">
              <img src="~/assets/sources/icons/menu-circle.svg" alt="menu">
            </v-btn>
            <span class="dm-400">
              From
            </span>
            <div class="swap-container">
              <v-select
                v-model="selectedItem"
                :items="items"
                item-text="text"
                item-value="value"
                class="input-auto"
              >
              <template #item="{ item }">
                <v-img :src="item.icon" style="max-width: 20px;"></v-img>
                <span style="margin-left: 10px;">{{ item.text }}</span>
              </template>
              <template #selection="{ item }">
                <v-img v-if="item" :src="item.icon" style="max-width: 20px;"></v-img>
                <span v-if="item" style="margin-left: 10px;">{{ item.text }}</span>
              </template>
              </v-select>

              <v-text-field class="input-number" :value="inputNumber" placeholder="0.00"
              ></v-text-field>

              <v-btn class="btn-max" @click="setMaxValue">max</v-btn>  
            </div>

            <div class="divrow center jspace mobile-btn" style="width:350px;">
              <v-icon>mdi-swap-vertical</v-icon>
              <span class="dm-light">ETH > SPTL = 1290.03 UDC </span>
            </div>

            <span class="dm-400">
              To
            </span>

            <div class="swap-container swap-container2">
              <v-select
                v-model="selectedItem"
                :items="items"
                item-text="text"
                item-value="value"
                class="input-auto"
              >
              <template #item="{ item }">
                <v-img :src="item.icon" style="max-width: 20px;"></v-img>
                <span style="margin-left: 10px;">{{ item.text }}</span>
              </template>
              <template #selection="{ item }">
                <v-img v-if="item" :src="item.icon" style="max-width: 20px;"></v-img>
                <span v-if="item" style="margin-left: 10px;">{{ item.text }}</span>
              </template>
              </v-select>

              <v-text-field class="input-number" :value="inputNumber" placeholder="0.00"
              ></v-text-field>
            </div>

            <v-btn class="btn mobile-btn" style="width: 350px!important; height: 60px!important; margin-top: 15px;">Swap</v-btn>

            <a href="" class="atag">Add Splatter To Wallet</a>
        </v-card>

        <!-- right -->
        <v-card ref="target_swap_chart" class="right card">
          <AppChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></AppChartsSwapChart>
        </v-card>

        <v-btn
        class="showmobile connect-btn bold"
        @click="!isLogged ? $store.dispatch('modalConnect') : ''"
        >
        <template v-if="isLogged">
          {{user.accountId}}
        </template>
        
        <template v-else>Connect wallet</template>
        </v-btn>
      </div>

      <div class="img-container">
        <img src="~/assets/sources/images/circleBottom.png" alt="Circle" class="circle-bottom">
      </div>
    </section>
  </div>
</template>

<script>
// import isMobile from '~/mixins/isMobile'

export default {
  name: "SwapPage",
  data() {
    return {
      selectedItem: null,
      inputNumber: 1,
      items: [
        { text: 'Ethereum', value: 1, icon: require('~/assets/sources/icons/Ellipse.svg') },
        { text: 'Splatter', value: 2, icon: require('~/assets/sources/icons/Ellipse.svg') },
      ],
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
    setMaxValue() {
      this.inputNumber = 9999;
    },

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
