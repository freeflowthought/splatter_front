<template>
  <div id="faucet">
    <section class="center divcol fwrap">
      <div class="divcol center" style="padding-inline: 15px; margin-bottom: 0px;">
        <h1 class="faucet-title">Faucet</h1>
        <p class="sub-title maxw">
          With testnet Faucet you can get free assets to test the Splatter protocol
        </p>
      </div>

      <div class="card-container">
        <v-data-table
        :headers="headerFaucet"
        :items="dataFaucet"
        :no-data-text="'No hay datos disponibles'"
        :no-results-text="'No se encontraron resultados'"
        hide-default-footer
        mobile-breakpoint="-1"
        class="data-table-faucet"
        style=""
        >
          <template #[`item.name`]="{ item }">
            <div class="jstart mobile-gap" style="gap: 10px;">
              <!-- <img :src="require(`~/assets/sources/tokens/${item.icon}.svg`)" alt="Icon">  -->
              <span class="bold span-coin-name">{{ item.name }}</span>
            </div>
          </template>

          <template #[`item.balance`]="{ index }">
            <span class="span-amount">{{ getTableBalance(index) }}</span>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn class="btn-faucet" @click="claimFaucet(item)">
              <span>
                Faucet
              </span>
            </v-btn>
          </template>
        </v-data-table>
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
const faucetAbi = [{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"faucet","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]}]

export default {
  name: "FaucetPage",
  data() {
    return {
      headerFaucet: [
        { value: "name", text: "Assets", align: "start", sortable: false },
        { value: "balance", text: "Balance", align: "center", sortable: false },
        { text: '', value: 'actions', sortable: false, align:'end' },
      ],
      /* dataFaucet:[
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
      ],  */    
      dataFaucet,
      databalance: []
    }
  },
  head() {
    const title = 'Faucet';
    return {
      title,
    }
  },
  async mounted() {
    // console.log('dataFaucet', dataFaucet)
    for(let i= 0; i< dataFaucet.length; i ++) {
      try {
        const tokenContract = new web3.eth.Contract(faucetAbi, dataFaucet[i].address);
        const tokenBalance = await tokenContract.methods.balanceOf(localStorage.getItem("wallet")).call();
        this.databalance.push(Number(tokenBalance/Math.pow(10, i.decimals)));
      } catch (error) {
        console.log(error)
      }
    }
    // console.log('databalance', this.databalance)
  },
  methods: {
    openAlert(item){
      return this.$alert("success", 'Transaction approved ')
    },

    async claimFaucet(item) {
      if (window.ethereum.networkVersion !== "534353") {
        this.$metamask.changeUserCurrentChain()
      }else {
        const tokenContract = new web3.eth.Contract(faucetAbi, item.address);
        try {
          await tokenContract.methods.faucet().send({from: localStorage.getItem("wallet")}).then(() => {
            this.$alert("success", 'Transaction approved for ' + item.name , { persistent: true })
            this.$forceUpdate()
          })
          //
        } catch (error) {
          this.$alert("fatal", error , { persistent: true })
          // modal with error message
          
        }}
        
    },

    // async getTokenBalance(contracAddress, decimals) {
    //   const tokenContract = new web3.eth.Contract(faucetAbi, contracAddress);
    //   const tokenBalance = await tokenContract.methods.balanceOf(localStorage.getItem("wallet")).call();
    //   console.log('tokenBalance', tokenBalance)
    //   return Number(tokenBalance/Math.pow(10, decimals));
    // },

    getTableBalance(pos) {
      return isNaN(this.databalance[pos]) ? 0.00 : this.databalance[pos]; 
    },

  }
};
</script>

<style src="~/assets/styles/pages/faucet.scss" lang="scss" />
