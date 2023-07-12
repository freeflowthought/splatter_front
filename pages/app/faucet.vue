<template>
  <div id="faucet">
    <section class="center divcol fwrap">
      <div class="divcol center" style="padding-inline: 15px; margin-bottom: 30px;">
        <h1 class="faucet-title">Faucet</h1>
        <p class="sub-title maxw">
          With testnet Faucet you can get free assets to test the Splatter protocol
        </p>
      </div>

      <div class="card-container">
        <div class="titles-container">
          <span class="sub-title">
            Assets
          </span>

          <span class="sub-title">
            Balance
          </span>

          <span style="color:transparent;">
            .
          </span>
        </div>

        <v-card v-for="(item,index) in dataFaucet" :key="index" class="card-faucet">
          <div class="divrow center" style="gap: 5px;">
            <img :src="require(`~/assets/sources/tokens/${item.icon}.svg`)" alt="Icon">
            <span class="token-name">
              {{ item.name }}
            </span>
          </div>

          <span class="amount">
            {{ item.amount }}
          </span>

          <v-btn class="bold btn-faucet" @click="claimFaucet">
            Faucet
          </v-btn>
        </v-card>
      </div>

      <div class="img-container">
        <img src="~/assets/sources/images/circleBottom.png" alt="Circle" class="circle-bottom">
      </div>
    </section>
  </div>
</template>

<script>
// import dataFaucet from '~/static/tokens/scroll_alpah_tokens.json'
const Web3 = require('web3')
const web3 = new Web3(window.web3.currentProvider);
// const rpcProvider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')

const faucetAbi = [{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"faucet","inputs":[]}]
export default {
  name: "FaucetPage",
  data() {
    return {
      dataFaucet:[
        {
          icon:"elipse",
          name:"Dai Stable coin",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Dai Stable coin",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Dai Stable coin",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Dai Stable coin",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Dai Stable coin",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Dai Stable coin",
          amount:"0.00",
        },
      ]     
    }
  },
  head() {
    const title = 'Faucet';
    return {
      title,
    }
  },
  mounted() {
  },
  methods: {
    getWallets(){
      web3.eth.getAccounts().then(console.log)
    },

    async claimFaucet() {

        const tokenContract = new web3.eth.Contract(faucetAbi, "0xc6D9F9903Ad46ee23CF30acF2505aBAFcE65b6c0");
        const tx = await tokenContract.methods.faucet().send;
        console.log(tx)

    },

    async getTokenBalance(contracAddress, decimals) {
      const tokenContract = new Web3.eth.Contract(contracAddress, faucetAbi)
      const tokenBalance = await tokenContract.balanceOf.call(this.$metamask.userAccount);
      // tokenBalance = ethers.utils.formatUnits(tokenBalance, decimals);
      return tokenBalance;
    }
  }
};
</script>

<style src="~/assets/styles/pages/faucet.scss" lang="scss" />
