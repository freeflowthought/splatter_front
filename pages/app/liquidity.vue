<template>
	<div id="liquidity">
		<v-row>
      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <AppChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></AppChartsSwapChart>
        </v-card>
      </v-col>

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
                  <v-select
                    v-model="selectedItem1"
                    :items="items1Filtered"
                    placeholder="Select Token"
                    hide-details
                    append-icon="mdi-chevron-down"
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

                  <div class="divcol">
                    <p class="p bold-title">-.--</p>
                    <p class="p light-span">Balance: 0.00</p>
                  </div>
                </div>

                <div class="jspace acenter mt-4 mb-4">
                  <span class="light-span">1 ETH ≈ 0.00</span>
                  <v-icon @click="swapValues()">mdi-swap-vertical</v-icon>
                  <v-icon color="#9E9DA3">mdi-plus</v-icon>
                </div>

                <label class="light-span" for="amount">Enter Amount</label>
                <div class="jspace mt-2 container-select">
                  <v-select
                    v-model="selectedItem2"
                    :items="items2Filtered"
                    placeholder="Select Token"
                    item-value="value"
                    class="input-auto"
                    hide-details
                    append-icon="mdi-chevron-down"
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

                  <div class="divcol">
                    <p class="p bold-title">-.--</p>
                    <p class="p light-span">Balance: 0.00</p>
                  </div>
                </div>
              </v-form>

              <div class="container-select mt-4 mb-4 divrow jspace">
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">1306.67</span>
                  <span class="font13">USDC per SPLT</span>
                </div>
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">1306.67</span>
                  <span class="font13">USDC per SPLT</span>
                </div>
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">0%</span>
                  <span class="font13">Share</span>
                </div>
              </div>

              <v-btn class="btn btn-add mb-4 mt-4" @click="submitForm">Add</v-btn>
            </v-window-item>

            <v-window-item :value="2" class="window-2 divcol acenter">
              <h2 class="white-title mb-6">50%</h2>

              <v-tabs background-color="transparent" :mobile-breakpoint="9999">
                <v-tab :value="1">25%</v-tab>
                <v-tab :value="2">50%</v-tab>
                <v-tab :value="3">75%</v-tab>
                <v-tab :value="4">100%</v-tab>
              </v-tabs>

              <div class="mt-4 mb-4 container-select" style="width: 100%;">
                <div class="jspace mt-2 mb-4">
                  <div class="divrow acenter" style="gap: 10px;">
                    <img src="~/assets/sources/tokens/usdc.svg" alt="Btc" style="width: 25px;">
                    <span class="bold-title">USDC</span>
                  </div>
                  <span>0.029021</span>
                </div>
                <div class="jspace mb-2">
                  <div class="divrow acenter" style="gap: 10px;">
                    <img src="~/assets/sources/tokens/btc.svg" alt="Btc" style="width: 25px;">
                    <span class="bold-title">BTC</span>
                  </div>
                  <span>0.029021</span>
                </div>
              </div>

              <v-btn class="mb-4 mt-4 btn btn-add">Remove</v-btn>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <p class="p bold-title mb-6">Currently LPs</p>

          <div v-for="(item, index) in dataCurrentlyLps" :key="index" class="jspace mb-14">
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
          </div>

          <!-- <div v-for="(item, index) in allPairs" :key="index" class="jspace mb-14">
            <div class="divrow center" style="gap: 10px;">
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
          </div> -->

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
import scrollTokens from '~/static/tokens/scroll_alpha_tokens.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
const routerV2Address = "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"
const factoryAddress = "0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545"
const routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);
const factory = new web3.eth.Contract(factoryABI, factoryAddress);

export default {
  name: "LiquidityPage",
  data() {
    return {
      windowStep: 1,
      items1: scrollTokens,
      items2: scrollTokens,
      selectedItem1: null,
      selectedItem2: null,
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
        v => v >= 0 || 'Value must be positive',
      ],
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
      return scrollTokens.filter(item => item !== this.selectedItem2 ?? '')
    },
    items2Filtered() {
      return scrollTokens.filter(item => item !== this.selectedItem1 ?? '')
    }
  },
  async mounted() {
    await this.$metamask.checkConnection()
    this.userConnected = this.$metamask.userConnected
    this.allPairs = await this.getAllPairs()
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

    swapValues() {
      const temp = this.selectedItem1;
      this.selectedItem1 = this.selectedItem2;
      this.selectedItem2 = temp;
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
        const pair = {}
        pair.address = await factory.methods.allPairs(i).call()
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
        allPairs.push(pair)
      }
      return allPairs
    },
    approve(tokenAddres, amount, batch) {
      const tokenInContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      batch.add(tokenInContract.methods.approve(routerV2Address, amount).send.request({ from: this.$metamask.userAccount }, (err) => {
          if (err) {
            throw err
          }
      }))
    },
    async removeLiquidity(tokenA, tokenB, amountAMin, amountBMin ) {
      const batch = new web3.BatchRequest();
      const pairAddress = factory.methods.getPair(tokenA.decimals, tokenB.decimals);
      const liquidity = await this.balanceOf(pairAddress)
      this.approve(pairAddress, liquidity, batch)
      const to = this.$metamask.userAccount
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      batch.add(
        routerV2.methods.removeLiquidity(
          tokenA.address,
          tokenB.address,
          liquidity,
          (amountAMin * 10 ** tokenA.decimals).toString(),
          (amountBMin * 10 ** tokenB.decimals).toString(),
          to,
          deadline
          ).send.request({from: this.$metamask.userAccount}, (err, res) => {
            if (err) {
              console.log(err)
            }
            if (res) {
              this.$alert('success', 'Liquidity removed successfully')
            }
          }
        )
      )
      batch.execute()
    },
  }
};
</script>

<style src="~/assets/styles/pages/liquidity.scss" lang="scss" />
