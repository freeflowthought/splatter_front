<template>
	<div id="faucet">
		<section class="center divcol fwrap">
			<div
				class="divcol center"
				style="padding-inline: 15px; margin-bottom: 0px"
			>
				<h1 class="faucet-title">Faucet</h1>
				<p class="sub-title maxw">
					With testnet Faucet you can get free assets to test the Splatter
					protocol
				</p>
			</div>

			<div class="card-container">
				<v-data-table
					:headers="headerFaucet"
					:items="dataFaucet"
					:no-data-text="'No available data'"
					:no-results-text="'Data not found'"
					hide-default-footer
					mobile-breakpoint="-1"
					class="data-table-faucet"
					style=""
				>
					<template #[`item.name`]="{ item }">
						<div class="jstart mobile-gap" style="gap: 10px">
							<!-- <img :src="require(`~/assets/sources/tokens/${item.icon}.svg`)" alt="Icon">  -->
							<span class="bold span-coin-name">{{ item.name }}</span>
						</div>
					</template>

					<template #[`item.balance`]="{ index, item }">
						<span class="span-amount">{{
							getTableBalance(index, item.decimals)
								| numericFormat(numericFormatConfig)
						}}</span>
					</template>

					<template #[`item.actions`]="{ item }">
						<v-btn
							class="btn-faucet"
							:disabled="disabled"
							:loading="loading"
							@click="claimFaucet(item)"
						>
							<span> Faucet </span>
						</v-btn>
					</template>
				</v-data-table>
			</div>

			<div class="img-container">
				<img
					src="~/assets/sources/images/circleBottom.png"
					alt="Circle"
					class="circle-bottom"
				/>
			</div>
		</section>
	</div>
</template>

<script>
import dataFaucet from '~/static/tokens/scroll_alpha_tokens.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
const faucetAbi = [{ "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "faucet", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }]

export default {
  name: "FaucetPage",
  data() {
    return {
      headerFaucet: [
        { value: "name", text: "Assets", align: "start", sortable: false },
        { value: "balance", text: "Balance", align: "center", sortable: false },
        { text: '', value: 'actions', sortable: false, align: 'end' },
      ],
      dataFaucet,
      databalance: [],
      numericFormatConfig: {
        decimalSeparator: ".",
        fractionDigitsMax: 2,
        fractionDigitsMin: 2,
        fractionDigitsSeparator: "",
        thousandsDigitsSeparator: ","
      },
      disabled: false,
      loading: false,

    }
  },
  head() {
    const title = 'Faucet';
    return {
      title,
    }
  },
  mounted() {
    this.checkConnection()
    this.fetch();
  },
  methods: {
    async checkConnection(){
      await this.$metamask.checkConnection()
    },
    async claimFaucet(item) {
      if (window.ethereum.networkVersion !== "534351") {
        this.$metamask.changeUserCurrentChain()
      } else {
        this.disabled = true;
        this.loading = true;

        const tokenContract = new web3.eth.Contract(faucetAbi, item.address);
        try {
          await tokenContract.methods.faucet().send({ from: this.$metamask.userAccount }).then(() => {
            this.$alert("success", 'Transaction approved for ' + item.name, { persistent: true })
            this.disabled = false;
            this.loading = false;
            setTimeout(() => {
              this.databalance = [];
              this.fetch();
              this.$forceUpdate();
            }, 500);
          })
          //
        } catch (error) {
          this.disabled = false;
          this.loading = false;
          this.$alert("cancel", "Wait at least 24 hours to claim again " + item.name + " faucet", { persistent: true })
        }
      }

    },

    async getTokenBalance(contracAddress, decimals) {
      const tokenContract = new web3.eth.Contract(faucetAbi, contracAddress);
      const tokenBalance = await tokenContract.methods.balanceOf(this.$metamask.userAccount).call();
      return Number(tokenBalance/Math.pow(10, decimals));
    },

    async fetch() {
      if(this.$metamask.userAccount !== null){
        for (let i = 0; i < dataFaucet.length; i++) {
          try {
            const tokenContract = new web3.eth.Contract(faucetAbi, dataFaucet[i].address);
            const tokenBalance = await tokenContract.methods.balanceOf(this.$metamask.userAccount).call();
            this.databalance.push(tokenBalance);
          } catch (error) {
            console.log(error)
          }
        }
      }
    },

    getTableBalance(pos, decimals) {
      return isNaN(this.databalance[pos]) ? 0.00 : this.databalance[pos] / Math.pow(10, decimals);
    },

  }
};
</script>

<style src="~/assets/styles/pages/faucet.scss" lang="scss" />
