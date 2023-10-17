<template>
  <div id="swap">
    <ModalsSwap ref="modal"></ModalsSwap>
    <ModalsTokens ref="tokens" :from="swapFrom" :to="swapTo"></ModalsTokens>

    <section id="swap-content" class="fwrap center divcol">
      <h1 class="swap-title">Swap Tokens</h1>
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
                ref="select1"
                :items="items"
                item-text="text"
                item-value="value"
                class="input-auto"
              >
              <template #item="{ item }">
                <v-img :src="item.logoURI" style="max-width: 20px;"></v-img>
                <span style="margin-left: 10px;">{{ item.name }}</span>
              </template>
              <template #selection="{ item }">
                <v-img v-if="item" :src="item.logoURI" style="max-width: 20px;"></v-img>
                <span v-if="item" style="margin-left: 10px;">{{ item.symbol }}</span>
              </template>
              </v-select>

              <v-text-field class="input-number" :value="inputNumber" placeholder="0.00"
              ></v-text-field>

              <v-btn class="btn-max" @click="setMaxValue">max</v-btn>
            </div>

            <div class="divrow center jspace mobile-btn" style="width:350px;">
              <v-icon @click="swapValues()">mdi-swap-vertical</v-icon>
              <span class="dm-light">ETH > SPTL = 1290.03 UDC </span>
            </div>

            <span class="dm-400">
              To
            </span>

            <div class="swap-container swap-container2">
              <v-select
                ref="select2"
                :items="items"
                item-text="text"
                item-value="value"
                class="input-auto"
              >
              <template #item="{ item }">
                <v-img :src="item.logoURI" style="max-width: 20px;"></v-img>
                <span style="margin-left: 10px;">{{ item.name }}</span>
              </template>
              <template #selection="{ item }">
                <v-img v-if="item" :src="item.logoURI" style="max-width: 20px;"></v-img>
                <span v-if="item" style="margin-left: 10px;">{{ item.symbol }}</span>
              </template>
              </v-select>

              <v-text-field class="input-number" :value="inputNumber" placeholder="0.00"
              ></v-text-field>
            </div>

            <v-btn
              class="btn mobile-btn"
              style="width: 350px!important; height: 60px!important; margin-top: 15px;"
              @click="swapTokensForTokens(
                $refs.select1.selected,
                '0xB2a1216856880D07eee9C4f71756FA8f72036e1E',
                10,
                1
              )"
            >Swap
            </v-btn>

            <div class="center">
              <a href="" class="atag">Add Splatter To Wallet</a>
              <div class="div-linea"></div>
            </div>
        </v-card>

        <!-- right -->
        <v-card v-if="false" ref="target_swap_chart" class="right card">
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
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import routerV2ABI  from '~/static/abis/routerv2.json'
import factoryABI  from '~/static/abis/factory.json'
import ERC20ABI from '~/static/abis/erc20.json'
import scrollTokens from '~/static/tokens/scroll_tokens.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
const routerV2Address = "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"
const factoryAddress = "0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545"
const routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);

export default {
  name: "SwapPage",
  data() {
    return {
      selectedItem: null,
      selectedItem2: null,
      inputNumber: 1,
      items: scrollTokens,
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
    this.$metamask.checkConnection()
    this.$metamask.detectMetamask()
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
      /* const
        container = this.$refs.target_swap_chart.$el,
        header = container.querySelector(".charts-header"),
        footer = container.querySelector(".charts-footer");
      this.heightChart = `
        ${container.getBoundingClientRect().height -
        (header.getBoundingClientRect().height + footer.getBoundingClientRect().height + 48 + 15)}px
      ` */
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
    },

    swapValues() {
      const temp = this.$refs.select1.internalValue;
      this.$refs.select1.internalValue = this.$refs.select2.internalValue;
      this.$refs.select2.internalValue = temp;
    },

    // we have problems using uniSDK have to about think about some ways of getting an oracle working
    // so we have amountOut in order to use a direct contract call


    async getPair(addressA, addressB){
      const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress)
      const pairAddress = await factoryContract.methods.getPair(addressA,addressB).call()
      const pairExist = pairAddress !== 0x0000000000000000000000000000000000000000
      if (pairExist) {
        return pairAddress
      } else {
        console.log("----- pair not found-----")
      }
    },

    async getReserves(tokenInAddress, tokenOutAddress) {
      const pairAddress = await this.getPair(tokenInAddress, tokenOutAddress)
      console.log(pairAddress, "<---- pair address")

      const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pairAddress)
      const reserves = await pairContract.methods.getReserves().call()
      return reserves
    },

    /* calculateMidPrice(reserves) {
      const token0= reserves[0]
      const token1= reserves[1]
      const dToken0 = 10 **18

    }, */

    async swapTokensForTokens(tokenInAddress, tokenOutAddress, amountIn, amountOut) {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time

      console.log(tokenInAddress, "<---------address")
      const path = [tokenInAddress, tokenOutAddress]

      // const OMin = trade.minimumAmountOut(slippageTolerance).raw
      const tokenInContract = new web3.eth.Contract(ERC20ABI, routerV2Address);
      await tokenInContract.methods.approve(routerV2Address, amountIn).send({ from: this.$metamask.userAccount }).then(
        function (value) {
        console.log(value, "<------- approve")
        },
        function (reason) {
        console.log(reason, "<------- approve")

        },
      );
      await routerV2.methods.swapExactTokensForTokens(amountIn, amountOut, path, this.$metamask.userAccount, deadline).send({from: this.$metamask.userAccount})
    },

    swapETHForTokens() {},
    swapTokensForETH() {},

  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
