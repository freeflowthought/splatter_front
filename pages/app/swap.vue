<template>
  <div id="swap">
    <!-- does this even work?
    <ModalsSwap ref="modal"></ModalsSwap>
    <ModalsTokens ref="tokens" :from="swapFrom" :to="swapTo"></ModalsTokens> -->

    <section id="swap-content" class="fwrap center divcol">
      <h1 class="swap-title">Swap Tokens</h1>
      <v-form ref="form">
        <div class="divrow mobile-column" style="gap:20px;">
        <!-- left -->
        <v-card class="swap-card divcol center jspace">

            <!-- <v-btn class="menu-btn">
              <img src="~/assets/sources/icons/menu-circle.svg" alt="menu">
            </v-btn> -->
            <span class="dm-400">
              From
            </span>
            <div class="swap-container">
              <v-select
                ref="select1"
                v-model="selectedItem1"
                :items="items1Filtered"
                item-text="text"
                item-value="value"
                class="input-auto"
                @change="balanceOf(selectedItem1)"
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

              <v-text-field
                v-model="tokenAmountIn"
                :rules="rules"
                class="input-number"
                :value="0"
                placeholder="0.00"
                @input="calculateMidPrice()"

              ></v-text-field>

              <v-btn  class="btn-max" @click="setMaxValue">max</v-btn>
            </div>

            <div class="divrow center jspace mobile-btn" style="width:350px;">
              <v-icon @click="swapValues()">mdi-swap-vertical</v-icon>
              <!-- <span class="dm-light">ETH > SPTL = 1290.03 UDC </span> -->
            </div>


            <span class="dm-400">
              To
            </span>

            <div class="swap-container swap-container2">
              <v-select
                ref="select2"
                v-model="selectedItem2"
                :items="items2Filtered"
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

              <v-text-field
                v-model="tokenAmountOut" :rules="rules" class="input-number" :value="0" placeholder="0.00"
              ></v-text-field>
            </div>

            <v-btn
              class="btn mobile-btn"
              style="width: 350px!important; height: 60px!important; margin-top: 15px;"
              @click="submitForm"
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
      </v-form>

      <div class="img-container">
        <img src="~/assets/sources/images/circleBottom.png" alt="Circle" class="circle-bottom">
      </div>
    </section>
  </div>
</template>

<script>
// import isMobile from '~/mixins/isMobile'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { numericFormat } from '@vuejs-community/vue-filter-numeric-format'
import routerV2ABI  from '~/static/abis/routerv2.json'
import factoryABI  from '~/static/abis/factory.json'
import ERC20ABI from '~/static/abis/erc20.json'
import scrollTokens from '~/static/tokens/scroll_alpha_tokens.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
let routerV2Address = "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"
let factoryV2Address = "0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545"
let routerV2;
let factory;

export default {
  name: "SwapPage",
  data() {
    return {
      selectedItem1: null,
      selectedItem2: null,
      tokenInAmountUser: 0,
      tokenAmountIn: 0,
      tokenAmountOut: 0,
      items1: scrollTokens,
      items2: scrollTokens,
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
      rules: [
        v => !!v || 'Field is required',
        v => /^\d+(\.\d+)?$/.test(v) || 'Invalid numeric input',
        v => v > 0 || 'Value must be positive',
      ],
      numericFormatConfig: {
        decimalSeparator: ".",
        fractionDigitsMax: 2,
        fractionDigitsMin: 2,
        fractionDigitsSeparator: "",
        thousandsDigitsSeparator: ","
      },
    }
  },
  head() {
    const title = 'Swap';
    return {
      title,
    }
  },
  computed: {
    items1Filtered() {
      return scrollTokens.filter(item => item !== this.selectedItem2 ?? '')
    },
    items2Filtered() {
      return scrollTokens.filter(item => item !== this.selectedItem1 ?? '')
    }
  },
  mounted() {
    this.$metamask.checkConnection()
    this.$metamask.detectMetamask()
    this.styles()

    routerV2Address = this.$protocolAddresses.getRouterAddress(this.$metamask.userCurrentChainId)
    factoryV2Address = this.$protocolAddresses.getFactoryAddress(this.$metamask.userCurrentChainId)
    routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);
    factory = new web3.eth.Contract(factoryABI, factoryV2Address);
    window.addEventListener("resize", this.styles)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.styles)
  },
  methods: {

    submitForm() {
     if (this.$refs.form.validate()){
      this.swapTokensForTokens(
        this.$refs.select1.internalValue,
        this.$refs.select2.internalValue
      )
     }
    },

    setMaxValue() {
      this.tokenAmountIn = this.tokenInAmountUser | numericFormat(this.numericFormatConfig);
      this.calculateMidPrice()
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
      const temp = this.selectedItem1
      this.selectedItem1 = this.selectedItem2
      this.selectedItem2 = temp
    },
    calcPriceTo(event) {
      const item = this.swapFrom
      console.log(item)
      this.swapTo.amount = (event / 1.5).toFixed(2)
    },



    swapValues() {
      const temp = this.$refs.select1.internalValue;
      this.$refs.select1.internalValue = this.$refs.select2.internalValue;
      this.$refs.select2.internalValue = temp;
    },

    // we have problems using uniSDK have to about think about some ways of getting an oracle working
    // so we have amountOut in order to use a direct contract call

    async approve(tokenAddress, amount) {
      const tokenInContract = new web3.eth.Contract(ERC20ABI, tokenAddress);
      await tokenInContract.methods.approve(routerV2Address, amount).send({ from: this.$metamask.userAccount }).then(
        function (value) {

        },
        function (reason) {

        },
      );
    },

    async balanceOf(token) {
      const tokenContract = new web3.eth.Contract(ERC20ABI, token.address);
      const balance = await tokenContract.methods.balanceOf(this.$metamask.userAccount).call()
      this.tokenInAmountUser = balance / 10 ** token.decimals
    },

    async getPair(addressA, addressB){
      const pairAddress = await factory.methods.getPair(addressA,addressB).call()
      const pairExist = pairAddress !== '0x0000000000000000000000000000000000000000'
      if (pairExist) {
        return pairAddress
      } else {
        this.$alert('cancel', 'Pair does not exist')

      }
    },

    async getReserves(tokenInAddress, tokenOutAddress) {

      const pairAddress = await this.getPair(tokenInAddress, tokenOutAddress)
      const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pairAddress)
      const res = await pairContract.methods.getReserves().call()
      return res
    },

    async calculateMidPrice() {
      if(this.tokenAmountIn > 0 && this.tokenAmountIn && this.selectedItem1 != null && this.selectedItem2 != null) {
        const reserves = await this.getReserves(this.selectedItem1.address, this.selectedItem2.address)
        const midPrice = await (routerV2.methods.getAmountOut((this.tokenAmountIn * 10 ** this.selectedItem1.decimals).toString(), reserves.reserve0, reserves.reserve1).call())
        this.tokenAmountOut = midPrice / 10 ** this.selectedItem2.decimals

      }
    },

    async swapTokensForTokens(tokenIn, tokenOut) {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      this.approve(tokenIn.address, (this.tokenAmountIn * 10 ** tokenIn.decimals).toString())
      const path = [tokenIn.address, tokenOut.address]
      await routerV2.methods.swapExactTokensForTokens(
        (this.tokenAmountIn * 10 ** tokenIn.decimals).toString().slice(0, tokenIn.decimals).replace(/[.,]/g),
        (this.tokenAmountOut * 10 ** tokenIn.decimals).toString().slice(0, tokenOut.decimals).replace(/[.,]/g),
        path,
        this.$metamask.userAccount,
        deadline).send({from: this.$metamask.userAccount})
    },

    swapETHForTokens() {},
    swapTokensForETH() {},
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
