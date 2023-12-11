<template>
  <div id="swap">

    <section id="swap-content" class="fwrap center divcol">
      <h1 class="swap-title">Swap Tokens</h1>
      <v-form ref="form">
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
              <v-autocomplete
                ref="select1"
                v-model="selectedItem1"
                :items="items1Filtered"
                item-text="text"
                item-value="value"
                class="input-auto"
                append-icon="mdi-chevron-down"
                @change="balanceOf(selectedItem1), getPricing()"
              >
                <template #item="{ item }">
                  <v-img :src="item.logoURI" style="max-width: 20px;"></v-img>
                  <span style="margin-left: 10px; color: #000!important;">{{ item.name }}</span>
                </template>
                <template #selection="{ item }">
                  <v-img v-if="item" :src="item.logoURI" style="max-width: 20px;"></v-img>
                  <span v-if="item" style="margin-left: 10px; color: #000!important;">{{ item.symbol }}</span>
                </template>
              </v-autocomplete>

              <v-text-field
                v-model="tokenAmountIn"
                :rules="rules"
                class="input-number"
                :value="0"
                placeholder="0.00"
                @input="calculateTokenAmount(1)"
              ></v-text-field>

              <v-btn  class="btn-max" @click="setMaxValue">max</v-btn>
            </div>

            <div class="divrow center jspace mobile-btn" style="width:350px;">
              <v-icon @click="swapValues()">mdi-swap-vertical</v-icon>
              <span v-if=" token0?.symbol && midPrice2 && token1?.symbol" class="dm-light">{{ token0?.symbol }} = {{ midPrice2 | numericFormat(numericFormatConfig) }} {{ token1?.symbol }} </span>
            </div>


            <span class="dm-400">
              To
            </span>

            <div class="swap-container swap-container2">
              <v-autocomplete
                ref="select2"
                v-model="selectedItem2"
                :items="items2Filtered"
                append-icon="mdi-chevron-down"
                item-text="text"
                item-value="value"
                class="input-auto"
                @change="getPricing()"
              >
              <template #item="{ item }">
                <v-img :src="item.logoURI" style="max-width: 20px;"></v-img>
                <span style="margin-left: 10px; color: #000!important;">{{ item.name }}</span>
              </template>
              <template #selection="{ item }">
                <v-img v-if="item" :src="item.logoURI" style="max-width: 20px;"></v-img>
                <span v-if="item" style="margin-left: 10px; color: #000!important;">{{ item.symbol }}</span>
              </template>
              </v-autocomplete>

              <v-text-field
                v-model="tokenAmountOut"
                :rules="[rules]"
                class="input-number"
                :value="0" placeholder="0.00"
                @input="calculateTokenAmount(2)"
              ></v-text-field>
            </div>

            <v-btn
              class="btn mobile-btn"
              style="width: 350px!important; height: 50px!important; margin-top: 15px;"
              @click="submitForm"
            >Swap
            </v-btn>

            <!-- <div class="center mt-4 mb-4">
              <a href="" class="atag">Add Splatter To Wallet</a>
              <div class="div-linea"></div>
            </div> -->
        </v-card>

        <!-- right -->
        <v-card v-if="false" ref="target_swap_chart" class="right card">
          <AppChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></AppChartsSwapChart>
        </v-card>

        <!-- <v-btn
        class="showmobile connect-btn bold"
        @click="!isLogged ? $store.dispatch('modalConnect') : ''"
        >
        <template v-if="isLogged">
          {{user.accountId}}
        </template>

        <template v-else>Connect wallet</template>
        </v-btn> -->
      </div>
      </v-form>

      <!-- <div class="img-container">
        <img src="~/assets/sources/images/circleBottom.png" alt="Circle" class="circle-bottom">
      </div> -->
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
import scrollSepoliaTokens from '~/static/tokens/scroll_alpha_tokens.json'
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
      token0: undefined,
      token1: undefined,
      midPrice1: 0,
      midPrice2: 0,
      tokens: undefined,
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
      return this.tokens?.filter(item => item !== this.selectedItem2 ?? '')
    },
    items2Filtered() {
      return this.tokens?.filter(item => item !== this.selectedItem1 ?? '')
    }
  },
  async mounted() {
    await this.$metamask.checkConnection()
    this.styles()

    routerV2Address = this.$protocolAddresses.getRouterAddress(this.$metamask.userCurrentChainId)
    factoryV2Address = this.$protocolAddresses.getFactoryAddress(this.$metamask.userCurrentChainId)
    routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);
    factory = new web3.eth.Contract(factoryABI, factoryV2Address);

    if(this.$metamask.userCurrentChainId === '0x8274f'){
      this.tokens = scrollSepoliaTokens
    } else {
      this.tokens = scrollTokens
    }
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
      this.tokenAmountIn = (Math.round(this.tokenInAmountUser * 100) / 100).toFixed(2)
      this.getPricing()
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
      this.getPricing()
      this.calculateTokenAmount(1)
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
      this.getPricing()
    },

    // we have problems using uniSDK have to about think about some ways of getting an oracle working
    // so we have amountOut in order to use a direct contract call

    async approve(tokenAddres, amount) {
      const tokenInContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      await tokenInContract.methods.approve(routerV2Address, amount).send({ from: this.$metamask.userAccount })
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
    async getTokenData(tokenAddress) {
      const token = {}
      const tokenContract = new web3.eth.Contract(ERC20ABI,tokenAddress)
      token.address = tokenAddress
      const [name, symbol, decimals] = await Promise.all([
        tokenContract.methods.name().call(),
        tokenContract.methods.symbol().call(),
        tokenContract.methods.decimals().call()])
      token.name = name
      token.symbol = symbol
      token.decimals = decimals
      return token
    },

    async getReserves(tokenInAddress, tokenOutAddress) {

      const pairAddress = await this.getPair(tokenInAddress, tokenOutAddress)
      const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pairAddress)
      const res = await pairContract.methods.getReserves().call()
      return res
    },

    async getPricing() {
      if(this.selectedItem1 != null && this.selectedItem2 != null) {
        const pairAddress = await factory.methods.getPair(this.selectedItem1.address, this.selectedItem2.address).call()
        const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pairAddress)
        const [token0Address, token1Address] = await Promise.all([
          pairContract.methods.token0().call(),
          pairContract.methods.token1().call()])

        const [token0, token1] = await Promise.all([
          this.getTokenData(token0Address),
          this.getTokenData(token1Address)
        ])


        try {
          const reserves = await this.getReserves(token0.address, token1.address)

          const midPrice1 = await (routerV2.methods.getAmountOut((1 * 10 ** token0.decimals).toString(), reserves.reserve0, reserves.reserve1).call())
          const midPrice2 = await (routerV2.methods.getAmountOut((1 * 10 ** token1.decimals).toString(), reserves.reserve1, reserves.reserve0).call())
          if(this.selectedItem1.symbol === token0.symbol){
            this.midPrice1 = midPrice1 / 10 ** token1.decimals
            this.midPrice2 = midPrice2 / 10 ** token0.decimals
            this.token0 = token0
            this.token1 = token1
          }else {
            this.midPrice1 = midPrice2 / 10 ** token0.decimals
            this.midPrice2 = midPrice1 / 10 ** token1.decimals
            this.token0 = token1
            this.token1 = token0
          }
        } catch  {

          this.$alert('cancel', 'Insuficient liquidity unable to swap ' + token0.symbol + "" + token1.symbol)
          this.midPrice1 = 0
          this.midPrice2 = 0
          this.token0 =  {}
          this.token1 =  {}
        }
      }
    },

    calculateTokenAmount(key) {
      let amount = 0
      switch (key) {
        case 1:
          amount = this.tokenAmountIn * this.midPrice2
          if(amount >= 0) {
            this.tokenAmountOut = (Math.round(amount * 10000) / 10000).toFixed(2)
          }
        break;

        case 2:
          amount = this.tokenAmountOut * this.midPrice1
          if(amount >= 0) {
            this.tokenAmountIn = (Math.round(amount * 100) / 100).toFixed(2)
          }
        break;
      }
    },

    async swapTokensForTokens(tokenIn, tokenOut) {
      const amountIn = this.tokenAmountIn.toFixed(tokenIn.decimals)
      const amountOut = this.tokenAmountOut.toFixed(tokenOut.decimals)

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      await this.approve(tokenIn.address, BigInt((amountIn * 10 ** tokenIn.decimals)).toString().replace(/[.,]/g, ''))
      const path = [tokenIn.address, tokenOut.address]
      const myMethod =routerV2.methods.swapExactTokensForTokens(
        BigInt((amountIn * 10 ** tokenIn.decimals)).toString(),
        BigInt((amountOut - (amountOut* 0.015)) * 10 ** tokenOut.decimals).toString(),
        path,
        this.$metamask.userAccount,
        deadline
      )
      const gasLimit = await myMethod.estimateGas({ from: this.$metamask.userAccount }) + 5000
      await myMethod.send({from: this.$metamask.userAccount, gasLimit})
    },

    swapETHForTokens() {},
    swapTokensForETH() {},
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
