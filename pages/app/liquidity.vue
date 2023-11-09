<template>
	<div id="liquidity">
    <h1 class="bold tcenter mb-10">Liquidty</h1>

		<v-row class="center">
      <!-- <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <AppChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></AppChartsSwapChart>
        </v-card>
      </v-col> -->

      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <v-tabs background-color="transparent">
            <v-tab :value="1" @click="windowStep = 1">Add</v-tab>
            <v-tab :value="2" @click="windowStep = 2">Remove</v-tab>
          </v-tabs>

          <v-window v-model="windowStep" class="mt-6">
            <v-window-item :value="1">
              <label class="light-span" for="amount">Enter Amount</label>
              <v-form ref="form">
                <div class="jspace mt-2 container-select">
                  <v-autocomplete
                    v-model="selectedItem1"
                    :items="items1Filtered"
                    :rules="[requiredRule]"
                    append-icon="mdi-chevron-down"
                    class="input-auto"
                    @change="getUserBalance(1),getPricing()"
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

                  <div class="divcol">
                    <v-text-field
                    v-model="amountToken1"
                    solo
                    class="input"
                    placeholder="-.--"
                    ></v-text-field>
                    <p class="p light-span">Balance: {{balanceToken1 | numericFormat(numericFormatConfig)}}</p>
                  </div>
                </div>

                <div class="jspace acenter mt-4 mb-4">
                  <!-- <span class="light-span">1 ETH ≈ 0.00</span> -->
                  <v-icon @click="swapValues()">mdi-swap-vertical</v-icon>
                  <v-icon color="#9E9DA3">mdi-plus</v-icon>
                </div>

                <label class="light-span" for="amount">Enter Amount</label>
                <div class="jspace mt-2 container-select">
                  <v-autocomplete
                    v-model="selectedItem2"
                    :items="items2Filtered"
                    :rules="[requiredRule]"
                    item-value="value"
                    class="input-auto"
                    append-icon="mdi-chevron-down"
                    @change="getUserBalance(2), getPricing()"
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

                  <div class="divcol">
                    <v-text-field
                    v-model="amountToken2"
                    solo
                    class="input"
                    placeholder="-.--"
                    ></v-text-field>
                    <p class="p light-span">Balance: {{balanceToken2 | numericFormat(numericFormatConfig)}}</p>
                  </div>
                </div>
              </v-form>

              <div v-if="selectedItem1 && selectedItem2" class="container-select mt-4 mb-4 divrow jspace">
                <div  class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">{{ midPrice1 | numericFormat(numericFormatConfig) }}</span>
                  <span class="font13">{{ selectedItem1.symbol }} per {{ selectedItem2.symbol }}</span>
                </div>
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">{{ midPrice2 | numericFormat(numericFormatConfig) }}</span>
                  <span class="font13">{{ selectedItem2.symbol }} per {{ selectedItem1.symbol }}</span>
                </div>
                <!-- <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">0%</span>
                  <span class="font13">Share</span>
                </div> -->
              </div>

              <v-btn class="btn btn-add mb-4 mt-4" @click="submitForm">Add</v-btn>
            </v-window-item>

            <v-window-item :value="2" class="window-2 divcol acenter">
              <h2 class="bold mb-6">{{ percent * 100 }}%</h2>

              <div>
                <v-tabs background-color="transparent d-flex center"  scrollable  :mobile-breakpoint="9999">
                <v-tab :value="1" @click="setPercent(0.25)">25%</v-tab>
                <v-tab :value="2" @click="setPercent(0.5)">50%</v-tab>
                <v-tab :value="3" @click="setPercent(0.75)">75%</v-tab>
                <v-tab :value="4" @click="setPercent(1)">100%</v-tab>
              </v-tabs>
              </div>

              <div v-if="selectedItemRemove1 && selectedItemRemove2" class="mt-4 mb-4 container-select" style="width: 100%;">
                <div class="jspace mt-2 mb-4">
                  <div class="divrow acenter" style="gap: 10px;">
                    <img src="~/assets/sources/tokens/usdc.svg" alt="Btc" style="width: 25px;">
                    <span class="bold-title">{{ selectedItemRemove1.symbol }}</span>
                  </div>
                  <!-- <span>0.029021</span> -->
                </div>
                <div class="jspace mb-2">
                  <div class="divrow acenter" style="gap: 10px;">
                    <img src="~/assets/sources/tokens/btc.svg" alt="Btc" style="width: 25px;">
                    <span class="bold-title">{{ selectedItemRemove2.symbol }}</span>
                  </div>
                  <!-- <span>0.029021</span> -->
                </div>
              </div>

              <v-btn class="mb-4 mt-4 btn btn-add" @click="removeLiquidity(selectedItemRemove1, selectedItemRemove2)">Remove</v-btn>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card no-overflow">
          <p class="p bold-title mb-6">Currently LPs</p>

          <hr class="hr">

          <!-- <div v-for="(item, index) in dataCurrentlyLps" :key="index" class="jspace mb-14">
            <div class="divrow center" style="gap: 10px;">
              <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px; width: 40px!important;">
                <img :src="require(`~/assets/sources/tokens/${item.img_left}.svg`)" :alt="`elipse token`" class="aspect" style="--p:0px; --w:25px;">
                <img :src="require(`~/assets/sources/tokens/${item.img_right}.svg`)" :alt="`elipse-clara token`" class="aspect" style="--p:0px; --w:25px;">
              </v-sheet>
              <p class="p bold-title">{{ item.pairName }}</p>
            </div>

            <div class="divcol center">
              <span v-if="item.fiat" class="bold-title mb-2">{{ item.fiat }}</span>
              <span class="light-span">{{ item.crypto_balance }}</span>
            </div>
          </div> -->

          <div v-if="lengthPairs < 1" class="divcol center" style="gap: 15px;">
            <p class="p bold mt-3">You dont have any LP’s</p>
            <img src="~/assets/sources/images/not-lps.svg" alt="Not Lps">
            <v-btn class="btn mt-2" style="min-width: 100%!important;">Swap Tokens</v-btn>
          </div>

          <div v-for="(item, index) in allPairs" :key="index" class="jspace mb-7  mt-7 hoverable border-bottom">
            <div class="divrow center" style="gap: 10px;" @click="selectPair(item)">
              <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px; width: 40px!important;">
                <img :src="require(`~/assets/sources/tokens/btc.svg`)" :alt="`elipse token`" class="aspect" style="--p:0px; --w:25px;">
                <img :src="require(`~/assets/sources/tokens/usdc.svg`)" :alt="`elipse-clara token`" class="aspect" style="--p:0px; --w:25px;">
              </v-sheet>
              <p class="p bold-title">{{ item.poolName }}</p>
            </div>

            <div class="divcol center">
              <span v-if="item.fiat" class="bold-title mb-2">{{ item.fiat }}</span>
              <span class="light-span">{{ item.crypto_balance }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="img-container">
      <img
        src="~/assets/sources/images/circleBottom.png"
        alt="Circle"
        class="circle-bottom"
      />
    </div>
	</div>
</template>

<script>
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import routerV2ABI from '~/static/abis/routerv2.json'
import factoryABI from '~/static/abis/factory.json'
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
  name: "LiquidityPage",
  data() {
    return {
      lengthPairs: null,
      windowStep: 1,
      tokens: undefined,
      items1: this.tokens,
      items2: this.tokens,
      amountToken1: undefined,
      amountToken2: undefined,
      balanceToken1: 0,
      balanceToken2: 0,
      selectedItem1: null,
      selectedItem2: null,
      selectedItemRemove1: null,
      selectedItemRemove2: null,
      percent: 0.25,
      midPrice1: 0,
      midPrice2: 0,
      dataCurrentlyLps:[
        {
          img_left: 'btc',
          img_right: 'usdc',
          pairName: 'USDC - ETH',
          crypto_balance: '1,103.00 USDC'
        },
        {
          img_left: 'btc',
          img_right: 'usdc',
          pairName: 'USDC - ETH',
          crypto_balance: '1,103.00 USDC'
        },
        {
          img_left: 'btc',
          img_right: 'usdc',
          pairName: 'USDC - ETH',
          fiat: '$1,103.00',
          crypto_balance: '1,103.00 USDC'
        },
        {
          img_left: 'btc',
          img_right: 'usdc',
          pairName: 'USDC - ETH',
          fiat: '$1,103.00',
          crypto_balance: '1,103.00 USDC'
        },
      ],
      allPairs: undefined,
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
    const title = 'Liquidity';
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
    this.userConnected = this.$metamask.userConnected
    routerV2Address = this.$protocolAddresses.getRouterAddress(this.$metamask.userCurrentChainId)
    factoryV2Address = this.$protocolAddresses.getFactoryAddress(this.$metamask.userCurrentChainId)
    routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);
    factory = new web3.eth.Contract(factoryABI, factoryV2Address);
    if(this.$metamask.userCurrentChainId === '0x8274f'){
      this.tokens = scrollSepoliaTokens
    } else {
      this.tokens = scrollTokens
    }
    this.allPairs = await this.getAllPairs()
    this.lengthPairs = this.allPairs.length
  },
  methods: {
    requiredRule(value) {
      return !!value || 'This field is required';
    },
    selectPair(pair) {
      this.selectedItemRemove1 = pair.token0
      this.selectedItemRemove2 = pair.token1
    },

    setPercent(value) {
      this.percent = value
    },

    submitForm() {
     if (this.$refs.form.validate()){
      this.addLiquidity(
        this.selectedItem1,
        this.selectedItem2,
        this.amountToken1,
        this.amountToken2
      )
     }
    },

    swapValues() {
      const temp = this.selectedItem1;
      this.selectedItem1 = this.selectedItem2;
      this.selectedItem2 = temp;
      this.getPricing()
      this.getUserBalance(1)
      this.getUserBalance(2)
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
    // we can not get user pools but we can findout in wich pool our user has LPTokens

    async getAllPairs() {
      const allPairs = []
      const pairsCreated = await factory.methods.allPairsLength().call()


      for(let i = 0; i < pairsCreated; i++) {
        const fetch = this.fetchPair(i);
        const pair = await fetch;
        if (pair.poolName != null){
          allPairs.push(pair)
        }
      }

      return allPairs
    },

    async fetchPair(index) {
      const pair = {}
      pair.address = await factory.methods.allPairs(index).call()
      const balance = await this.balanceOf(pair.address)
        const userHasBalance = balance > 0
        if(userHasBalance) {

          const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pair.address);
          const [token0Address, token1Address] = await Promise.all([
          pairContract.methods.token0().call(),
          pairContract.methods.token1().call()])

          const [token0, token1] = await Promise.all([
            this.getTokenData(token0Address),
            this.getTokenData(token1Address)
          ])
          pair.token0 = token0
          pair.token1 = token1
          pair.poolName = pair.token0.symbol + "-" + pair.token1.symbol
      }
      return pair
    },

    approve(tokenAddres, amount, batch) {
      const tokenInContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      batch.add(tokenInContract.methods.approve(routerV2Address, amount).send.request({ from: this.$metamask.userAccount }, (err) => {
          if (err) {
            throw err
          }
      }))
    },

    async getReserves(tokenInAddress, tokenOutAddress) {
      const pairAddress = await factory.methods.getPair(tokenInAddress, tokenOutAddress).call()
      const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pairAddress)
      const res = await pairContract.methods.getReserves().call()
      return res
      },

      async getPricing() {
      if(this.selectedItem1 != null && this.selectedItem2 != null) {
        const reserves = await this.getReserves(this.selectedItem1.address, this.selectedItem2.address)
        const midPrice1 = await (routerV2.methods.getAmountOut((1 * 10 ** this.selectedItem1.decimals).toString(), reserves.reserve0, reserves.reserve1).call())
        const midPrice2 = await (routerV2.methods.getAmountOut((1 * 10 ** this.selectedItem2.decimals).toString(), reserves.reserve1, reserves.reserve0).call())
        this.midPrice1 = midPrice1 / 10 ** this.selectedItem2.decimals
        this.midPrice2 = midPrice2 / 10 ** this.selectedItem1.decimals


      }
    },

    async balanceOf(tokenAddres) {
      const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      const balance = await tokenContract.methods.balanceOf(this.$metamask.userAccount).call()
      return balance
    },

    async getUserBalance(key) {
      switch (key) {
        case 1:
          {
            const balance1 = await this.balanceOf(this.selectedItem1.address)
            this.balanceToken1 = balance1 / 10 ** this.selectedItem1.decimals
          }
          break;

        case 2:
          {
            const balance2 = await this.balanceOf(this.selectedItem2.address)
            this.balanceToken2 = balance2 / 10 ** this.selectedItem2.decimals
          }
          break;
      }
    },

    addLiquidity(tokenA, tokenB, amountADesired, amountBDesired,) {
      console.log(tokenA.decimals, tokenB.decimals)
      const batch = new web3.BatchRequest();
      this.approve(tokenA.address, BigInt((amountADesired * 10 ** tokenA.decimals)).toString().replace(/[.,]/g, ''), batch)
      this.approve(tokenB.address, BigInt((amountBDesired * 10 ** tokenB.decimals)).toString().replace(/[.,]/g, ''), batch)
      const to = this.$metamask.userAccount
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      batch.add(
        routerV2.methods.addLiquidity(
          tokenA.address,
          tokenB.address,
          BigInt((amountADesired * 10 ** tokenA.decimals)).toString().replace(/[.,]/g, ''),
          BigInt((amountBDesired * 10 ** tokenB.decimals)).toString().replace(/[.,]/g, ''),
          (0 * 10 ** tokenA.decimals).toString(),
          (0 * 10 ** tokenB.decimals).toString(),
          to,
          deadline
        ).send.request({from: this.$metamask.userAccount}, (err, res) => {
          if (err) {
            this.$alert('cancel', 'Something went wrong')

          }
          if (res) {
            this.$alert('success', "Liquidity added successfully")
          }

        })
      )
      batch.execute()
    },

    async removeLiquidity(tokenA, tokenB) {
      const batch = new web3.BatchRequest();
      const pairAddress = await factory.methods.getPair(tokenA.address, tokenB.address).call();
      const amountAMin = 1
      const amountBMin = 1
      const percent = this.percent
      const totalLiquidity = await this.balanceOf(pairAddress)
      let liquidity = totalLiquidity
      if(this.percent < 1){
        liquidity = (totalLiquidity * percent).toString().replace(/[.,]/g, '')
      }
      if(liquidity){
        this.approve(pairAddress, liquidity, batch)
        const to = this.$metamask.userAccount
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
        batch.add(
          routerV2.methods.removeLiquidity(
            tokenA.address,
            tokenB.address,
            liquidity,
            BigInt((amountAMin * 10 ** tokenA.decimals)).toString().replace(/[.,]/g, ''),
            BigInt((amountBMin * 10 ** tokenB.decimals)).toString().replace(/[.,]/g, ''),
            to,
            deadline
            ).send.request({from: this.$metamask.userAccount}, (err, res) => {
              if (err) {
                this.$alert('cancel', 'Something went wrong')
              }
              if (res) {
                this.$alert('success', 'Liquidity removed successfully')
              }
            }
          )
        )
        batch.execute()
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/liquidity.scss" lang="scss" />
