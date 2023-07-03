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

          <v-btn class="bold btn-faucet" @click="claimFaucet()">
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
import { configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

export default {
  name: "FaucetPage",
  data() {
    
    return {
      dataFaucet:[
        {
          icon:"elipse",
          name:"WETH L2",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Binance USD",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Tether USD",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Aave - Aave",
          amount:"0.00",
        },
        {
          icon:"elipse",
          name:"Curve DAO Token - CRV",
          amount:"0.00",
        }
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
    async claimFaucet() {
      await this.$provider.claimFaucet("0xb7931C72aE6f65ac8A83BE3bd3D38DD14Ea93279");
    }
    //  posibly to get data?
    //  get amount
  }
};
</script>

<style src="~/assets/styles/pages/faucet.scss" lang="scss" />
