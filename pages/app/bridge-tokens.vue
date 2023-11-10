<template>
  <div id="swap">
    <!-- does this even work?
    <ModalsSwap ref="modal"></ModalsSwap>
    <ModalsTokens ref="tokens" :from="swapFrom" :to="swapTo"></ModalsTokens> -->

    <section id="swap-content" class="fwrap center divcol">
      <h1 class="swap-title">Bridge Tokens</h1>
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
                v-model="chainFrom"
                :items="chainsFromFiltered"
                :rules="[rules[0]]"
                style="width: 80px;"
                >
                <template #item="{ item }">
                  <v-img :src="item.chainIconURI" style="max-width: 20px;"></v-img>
                  <span style="margin-left: 10px;">{{ item.axelarChainName }}</span>
                </template>

                <template #selection="{ item }">
                  <v-img v-if="item" :src="item.chainIconURI" style="max-width: 20px;"></v-img>
                </template>
              </v-select>

              <v-select
                ref="select1"
                v-model="selectedItem1"
                no-data-text="Please select a blockchain first"
                :items="items1Filtered"
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
                v-model="tokenAmountIn"
                :rules="rules"
                class="input-number"
                :value="0"
                placeholder="0.00"
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
                v-model="chainTo"
                :items="chainsToFiltered"
                :rules="[rules[0]]"
                style="width: 80px;"
                >
                <template #item="{ item }">
                  <v-img :src="item.chainIconURI" style="max-width: 20px;"></v-img>
                  <span style="margin-left: 10px;">{{ item.axelarChainName }}</span>
                </template>

                <template #selection="{ item }">
                  <v-img v-if="item" :src="item.chainIconURI" style="max-width: 20px;"></v-img>
                </template>
              </v-select>

              <v-select
                ref="select2"
                v-model="selectedItem2"
                no-data-text="Please select a blockchain first"
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
                v-model="tokenAmountOut" :rules="[rules[1]]" class="input-number" :value="0" placeholder="0.00" :disabled="true"
              ></v-text-field>
            </div>

            <v-btn
              class="btn mobile-btn"
              style="width: 350px!important; height: 60px!important; margin-top: 15px;"
              @click="submitForm"
            >Swap
            </v-btn>
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
import { numericFormat } from '@vuejs-community/vue-filter-numeric-format'
import ERC20ABI from '~/static/abis/erc20.json'
const ethers = require("ethers")
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);

export default {
  name: "SwapPage",
  data() {
    return {
      chains: undefined,
      selectedItem1: null,
      selectedItem2: null,
      tokenInAmountUser: 0,
      tokenAmountIn: 0,
      tokenAmountOut: 0,
      tokens: undefined,
      chainFrom: undefined,
      chainTo: undefined,
      tokensFrom: undefined,
      tokensTo: undefined,
      route: undefined,
      requestId: undefined,
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
      return this.tokens?.filter(item => item.chainId === this.chainFrom?.chainId ?? '')
    },
    items2Filtered() {
      return this.tokens?.filter(item => item.chainId === this.chainTo?.chainId ?? '')
    },
    chainsFromFiltered() {
      return this.chains?.filter(item => item !== this.chainTo ?? '')
    },
    chainsToFiltered() {
      return this.chains?.filter(item => item !== this.chainFrom ?? '')
    }
  },
  async mounted() {
    await this.$metamask.checkConnection()
    await this.getSquidInfo()
    window.addEventListener("resize", this.styles)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.styles)
  },
  methods: {

    async rightChain() {
      const chainFromHex = "0x" + Number(this.chainFrom.chainId).toString(16)
      const currentChain = await window.ethereum.request({
        "method": "eth_chainId",
        "params": []
      });
      if (currentChain !== chainFromHex) {
        await this.$metamask.switchToChainBySquidParams(this.chainFrom)
      }

      return currentChain === chainFromHex
    },

    async getSquidInfo() {
      const [Squidchains, SquidTokens] = await Promise.all([
        this.$squidAxelar.getChains(this),
        this.$squidAxelar.getTokens(this)
      ])
      this.chains = Squidchains.chains
      this.tokens = SquidTokens.tokens
    },

    async getRoute() {
      const routeResult = await this.$squidAxelar.getRoute(
        this,
        {
          fromChain: this.chainFrom.chainId,
          toChain: this.chainTo.chainId,
          fromToken: this.selectedItem1.address,
          toToken: this.selectedItem2.address,
          fromAmount: BigInt((this.tokenAmountIn * 10 ** this.selectedItem1.decimals)).toString().replace(/[.,]/g, ''),
          fromAddress: this.$metamask.userAccount,
          toAddress: this.$metamask.userAccount,
          slippageConfig: {
            autoMode: 1
          }
        }
        )
        this.route = routeResult.data.route;
        this.requestId = routeResult.requestId;
        /* const requestId = routeResult.requestId;
        console.log("Calculated route:", route);
        console.log("requestId:", requestId); */
      console.log("getroute squid")
      console.log(routeResult)
      console.log("------------")

      return routeResult
    },

    async submitForm() {
      if (this.$refs.form.validate()){
        await this.swapTokens()
      }
    },

    setMaxValue() {
      this.tokenAmountIn = this.tokenInAmountUser | numericFormat(this.numericFormatConfig);
      this.calculateMidPrice()
    },

    switchTokens() {
      const temp = this.selectedItem1
      this.selectedItem1 = this.selectedItem2
      this.selectedItem2 = temp
    },

    swapValues() {
      const temp = this.$refs.select1.internalValue;
      this.$refs.select1.internalValue = this.$refs.select2.internalValue;
      this.$refs.select2.internalValue = temp;
    },

    /* async approve(tokenAddres, amount, chainId) {
      const tokenInContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      await tokenInContract.methods.approve(routerV2Address, amount).send({ from: this.$metamask.userAccount })
    }, */

    async balanceOf(token) {
      if(this.rightChain()) {
        const tokenContract = new web3.eth.Contract(ERC20ABI, token.address);
        const balance = await tokenContract.methods.balanceOf(this.$metamask.userAccount).call()
        this.tokenInAmountUser = balance / 10 ** token.decimals
      }
    },

    /* async getPair(addressA, addressB){
      const pairAddress = await factory.methods.getPair(addressA,addressB).call()
      const pairExist = pairAddress !== '0x0000000000000000000000000000000000000000'
      if (pairExist) {
        return pairAddress
      } else {
        this.$alert('cancel', 'Pair does not exist')
      }
    }, */


    async swapTokens() {
      if(this.rightChain()) {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        await this.getRoute()
        const transactionRequest = this.route.transactionRequest;
        console.log(transactionRequest)
        // Execute the swap transaction
        const contract = new ethers.Contract(
          transactionRequest.target,
          [],
          signer
        );
        /* console.log("--------")
        console.log(contract)
        console.log("--------") */
        const tx = await contract.send(transactionRequest.data, {
          value: transactionRequest.value,
          gasPrice: await provider.getGasPrice(),
          gasLimit: transactionRequest.gasLimit,
        });
        const txReceipt = await tx.wait();
        console.log(txReceipt)
      } else {
        this.$alert('cancel', 'Please switch to' + this.chainFrom.network + "network")
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
