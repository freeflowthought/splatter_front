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

        <v-card v-for="(item,index) in dataFaucet2" :key="index" class="card-faucet">
          <div class="divrow center" style="gap: 5px;">
            
            <span class="token-name">
              {{ item.name }}
            </span>
          </div>

          <span class="amount">
            {{ "0.00" }}
          </span>

          <v-btn class="bold btn-faucet" @click="claimFaucet(item)">
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
import dataFaucet from '~/static/tokens/scroll_alpah_tokens.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
const faucetAbi = [{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"faucet","inputs":[]}, {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]}]

export default {
  name: "FaucetPage",
  data() {
    return {
      dataFaucet2: dataFaucet
    }
  },
  head() {
    const title = 'Faucet';
    return {
      title,
    }
  },
  mounted() {
    dataFaucet.forEach(async element =>  {
      await this.getTokenBalance(element.contracAddress, element.decimals)
    });
  },
  methods: {

    async claimFaucet(item) {
        const tokenContract = new web3.eth.Contract(faucetAbi, item.address);
        try {
          await tokenContract.methods.faucet().send({from: this.$metamask.userAccount})
          
          //
        } catch (error) {

          // modal with error message

        }
        
    },

    async getTokenBalance(contracAddress, decimals) {
      const tokenContract = new Web3.eth.Contract(faucetAbi,contracAddress)
      const tokenBalance = await tokenContract.balanceOf.call(this.$metamask.userAccount);
      // tokenBalance = ethers.utils.formatUnits(tokenBalance, decimals);
      return tokenBalance;
    }
  }
};
</script>

<style src="~/assets/styles/pages/faucet.scss" lang="scss" />
