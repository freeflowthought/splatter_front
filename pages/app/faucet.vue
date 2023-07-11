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

          <v-btn class="bold btn-faucet">
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
// import isMobile from '~/mixins/isMobile'
// const metaMaskProvider = new ethers.providers.Web3Provider(this.$metamask.$ethereum)
// const rpcProvider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')
// const signer = metaMaskProvider.getSigner();
// const faucetAbi =[{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"faucet","inputs":[]}]
const Web3 = require('web3')
 
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
  
  methods: {
    /* async claimFaucet(contracAddress) {
        const tokenContract = new ethers.Contract(contracAddress, faucetAbi, signer)
        const tx = await tokenContract.faucet;
        const receipt = await tx.wait();
    },
    async getTokenBalance(decimals) {
      let usdcBalance = await usdcContract.balanceOf(this.$metamask.userAccount);
      usdcBalance = ethers.utils.formatUnits(usdcBalance, decimals);
      return usdcBalance;
    } */
  }
};
</script>

<style src="~/assets/styles/pages/faucet.scss" lang="scss" />
