<template>
  <div class="modals">
    <!-- modal settings -->
    <v-dialog v-model="modalSettings" content-class="modalSettings" width="400px">
      <section class="modalSettings-header space">
        <h3 class="p" style="--fw: 700">Exchange Settings</h3>
        <v-btn icon style="top: -10px" @click="modalSettings = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </section>

      <div class="divcol" style="gap: 5px">
        <label class="plain">Slippage Tolerance
          <v-tooltip bottom max-width="174px" color="#574F42">
            <template #activator="{on, attrs}">
              <img src="~/assets/sources/icons/info.svg" alt="info" v-bind="attrs" v-on="on">
            </template>
            
            <span>your transaction will revert if the price changes unfavourably by more than it’s percentage</span>
          </v-tooltip>
        </label>
        
        <div class="space wrap" style="gap: 10px 0">
          <v-btn
            v-for="item in dataSlippage" :key="item" plain class="btn2"
            :class="{active: item === slippageSelection}" @click="slippageSelection = item"
          >{{item}}%</v-btn>
        </div>
      </div>

      <div class="divcol" style="gap: 5px">
        <label class="plain">Transaction Deadline</label>
        
        <div class="acenter" style="gap: inherit">
          <v-text-field
            v-model="deadlineSelection"
            type="number"
            placeholder="-"
            solo
            class="btn2"
          ></v-text-field>
          <span>Min</span>
        </div>
      </div>
    </v-dialog>


    <!-- modal chart -->
    <v-dialog v-model="modalChart" width="496px" content-class="modalChart">
      <ChartsSwapChart ref="chart" height="400px" closable @model="modalChart = false"></ChartsSwapChart>
    </v-dialog>
  </div>
</template>

<script>
const { ethers } = require("ethers")
const UNISWAP = require("@uniswap/sdk")
const fs = require('fs');
const { Token, WETH, Fetcher, Route, Trade, TokenAmount, TradeType, Percent} = require("@uniswap/sdk");
const { getAddress } = require("ethers/lib/utils");

//! establecer qué provider utilizar para las transacciones  
let provider = new ethers.providers.getDefaultProvider(QUICKNODE_HTTP_ENDPOINT);

const UNISWAP_ROUTER_ADDRESS_MATIC = "0x2ef225538c9FcE4641e038Fd6FA64cA5519cF971"
const UNISWAP_ROUTER_ABI = fs.readFileSync("./static/abis/routerv2.json").toString();
const UNISWAP_ROUTER_CONTRACT = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, provider);

//! reemplazar por la private key desde la sesión de metamask
const privateKey = fs.readFileSync(".secret").toString().trim()
const wallet = new ethers.Wallet(privateKey, provider)



export default {
  name: "ModalsSwapComponent",
  data() {
    return {
      // modal settings
      modalSettings: false,
      dataSlippage: [0.5, 1, 2, 3.5],
      slippageSelection: 0.5,
      deadlineSelection: undefined,
      // modal chart
      modalChart: false,
    };
  },
  computed: {
    filterDataTokens() {
      return this.$store.getters.filters({
        items: this.dataTokens, search: this.searchToken
      })
    },
  },
  watch: {
    modalSettings(current) {
      if (current) {
        this.$targetTooltip('.modalSettings img[alt="info"]')
        window.addEventListener("resize", () => this.$targetTooltip('.modalSettings img[alt="info"]', 13))
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$targetTooltip)
  },
  methods: {
    
    async swapExactETHTokens(token1, token2, amount, slippage = "50") {
      try {
        const pair = await Fetcher.fetchPairData(token1, token2, provider); //creating instances of a pair
        const route = await new Route([pair], token2); // a fully specified path from input token to output token
        let amountIn = ethers.utils.parseEther(amount.toString()); //helper function to convert ETH to Wei
        amountIn = amountIn.toString()
        
        const slippageTolerance = new Percent(slippage, "10000"); // 50 bips, or 0.50% - Slippage tolerance
    
        const trade = new Trade( //information necessary to create a swap transaction.
                route,
                new TokenAmount(token2, amountIn),
                TradeType.EXACT_INPUT
        );

        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
        const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
        const path = [token2.address, token1.address]; //An array of token addresses
        const to = wallet.address; // should be a checksummed recipient address
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
        const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
        const valueHex = await ethers.BigNumber.from(value.toString()).toHexString(); //convert to hex string
    
        //Return a copy of transactionRequest, The default implementation calls checkTransaction and resolves to if it is an ENS name, adds gasPrice, nonce, gasLimit and chainId based on the related operations on Signer.
        const rawTxn = await UNISWAP_ROUTER_CONTRACT.populateTransaction.swapExactETHForTokens(amountOutMinHex, path, to, deadline, {
            value: valueHex
        })
    
        //Returns a Promise which resolves to the transaction.
        let sendTxn = (await wallet).sendTransaction(rawTxn)
        

        //Resolves to the TransactionReceipt once the transaction has been included in the chain for x confirms blocks.
        let reciept = (await sendTxn).wait()

        //Logs the information about the transaction it has been mined.
        if (reciept) {
            console.log(" - Transaction is mined - " + '\n' 
            + "Transaction Hash:", (await sendTxn).hash
            + '\n' + "Block Number: " 
            + (await reciept).blockNumber + '\n' 
            + "Navigate to https://rinkeby.etherscan.io/txn/" 
            + (await sendTxn).hash, "to see your transaction")
        } else {
            console.log("Error submitting transaction")
        }

      } catch(e) {
        console.log(e)
      }
    },

    async swapExactTokensforTokens() {
      try {
        const pair = await Fetcher.fetchPairData(token1, token2, provider); //creating instances of a pair
        const route = await new Route([pair], token2); // a fully specified path from input token to output token
        let amountIn = ethers.utils.parseEther(amount.toString()); //helper function to convert ETH to Wei
        amountIn = amountIn.toString()
        
        const slippageTolerance = new Percent(slippage, "10000"); // 50 bips, or 0.50% - Slippage tolerance
    
        const trade = new Trade( //information necessary to create a swap transaction.
                route,
                new TokenAmount(token2, amountIn),
                TradeType.EXACT_INPUT
        );

        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
        const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
        const path = [token2.address, token1.address]; //An array of token addresses
        const to = wallet.address; // should be a checksummed recipient address
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
        const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
        const valueHex = await ethers.BigNumber.from(value.toString()).toHexString(); //convert to hex string
    
        //Return a copy of transactionRequest, The default implementation calls checkTransaction and resolves to if it is an ENS name, adds gasPrice, nonce, gasLimit and chainId based on the related operations on Signer.
        const rawTxn = await UNISWAP_ROUTER_CONTRACT.populateTransaction.swapExactTokensForTokens(amountOutMinHex, path, to, deadline, {
            value: valueHex
        })
    
        //Returns a Promise which resolves to the transaction.
        let sendTxn = (await wallet).sendTransaction(rawTxn)
        

        //Resolves to the TransactionReceipt once the transaction has been included in the chain for x confirms blocks.
        let reciept = (await sendTxn).wait()

        //Logs the information about the transaction it has been mined.
        if (reciept) {
            console.log(" - Transaction is mined - " + '\n' 
            + "Transaction Hash:", (await sendTxn).hash
            + '\n' + "Block Number: " 
            + (await reciept).blockNumber + '\n' 
            + "Navigate to https://rinkeby.etherscan.io/txn/" 
            + (await sendTxn).hash, "to see your transaction")
        } else {
            console.log("Error submitting transaction")
        }

      } catch(e) {
        console.log(e)
      }
    },
    
    swapExactTokensforEth() {},
    
    aprove(){},
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
