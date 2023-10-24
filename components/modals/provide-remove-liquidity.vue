<template>
  <v-dialog v-model="modalLiquidity" content-class="modal-connect divcol relative isolate">
    <aside class="space">
      <span class="h8_em">Deposit {{ pair.poolName }}</span>

      <v-btn style="background: hsl(0 0% 0% / .2)!important;" icon @click="modalLiquidity = false">
        <v-icon size="1.5em">mdi-close</v-icon>
      </v-btn>
    </aside>

    <!-- <v-sheet class="grid" color="transparent">
      <v-btn plain @click="connectMetamask(), $store.commit('signIn')">
        <img src="~/assets/sources/logos/metamask-icon.svg" alt="metamask logo">

        <div class="divcol astart" style="gap: 5px">
          <span class="h12_em bold">metamask</span>
          <span class="h13_em">metamask.org</span>
        </div>
      </v-btn>

       <v-btn plain @click="$store.commit('signIn')">
        <img src="~/assets/sources/logos/sender-icon.svg" alt="near">

        <div class="divcol astart" style="gap: 5px">
          <span class="h12_em bold">connect</span>
          <span class="h13_em">connect.org</span>
        </div>
      </v-btn>
    </v-sheet> -->
    <v-form>
      <v-text-field
      class="input"
      :label="`Amount ${ pair.token0.symbol } desired`"
      ></v-text-field>

      <v-text-field
      class="input"
      :label="`Amount ${ pair.token1.symbol } desired`"
      ></v-text-field>

      <v-text-field
      class="input"
      :label="`Amount ${ pair.token0.symbol } minimun`"
      ></v-text-field>

      <v-text-field
      class="input"
      :label="`Amount ${ pair.token1.symbol } minimun`"
      ></v-text-field>

      <v-btn
      class="btn bold"
      >
        Add liquidity
      </v-btn>
    </v-form>
  </v-dialog>
</template>

<script>
import routerV2ABI from '~/static/abis/routerv2.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
const routerV2Address = "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"
const routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);

export default {
  name: "ModalLiquidity",
  props: {
    pair: {
      type: Object,
      default () {
        return {
          address: "",
          poolName: "",
          token0: {
            name:"",
            symbol:"",
          },
          token1: {
            name:"",
            symbol:"",
          },
        }
      }
    }
  },
  data() {
    return {
      modalLiquidity: true,
    };
  },
  mounted() {
  },
  methods: {
    async addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin) {
      await this.approve(tokenA.address, (amountADesired * 10 ** tokenA.decimals).toString())
      await this.approve(tokenB.address, (amountBDesired * 10 ** tokenB.decimals).toString())
      const to = this.$metamask.userAccount
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      await routerV2.methods.addLiquidity(
        tokenA.address,
        tokenB.address,
        (amountADesired * 10 ** tokenA.decimals).toString(),
        (amountBDesired * 10 ** tokenB.decimals).toString(),
        amountAMin,
        amountBMin,
        to,
        deadline
      ).send({from: this.$metamask.userAccount}).then(
        function (value) {
          this.$alert("success", 'Liquidity provided succesfully')
        },
        function (reason) {
          console.log(reason, "<------- addliquidity")
        },
      );
    },
  }
};
</script>

<style lang="scss">
.modal-connect {
  @include card;
  --min-w: 330px;
  --w: max-content;
  --br: 30px;
  --bg: var(--card);
  --p: 30px;
  --tt: capitalize;
  gap: 20px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background-clip: content-box, border-box;
    background-image: linear-gradient(var(--bg),var(--bg)),
      linear-gradient(135deg, rgba($primary,.2), rgba($accent,.2));
    z-index: -1;
  }

  i {color: #000000 !important;}

  .input{
    background-color: var(--card);
    border-radius: 10px;
    border: 1px solid #000;
    max-width: 250px;
    padding-inline: 10px;
    padding-block: 10px;
    height: 55px;
    margin-bottom: 10px;

    ::placeholder{
      font-family: var(--font3);
      font-weight: 500;
      color: #767A89;
    }

    i{
      color: #767A89;
    }
  }

  .v-sheet.grid {
    @include media(min, 500px) {--gtc: 1fr 1fr}
    gap: 20px;
    .v-btn {
      --fs: 20px;
      width: 100%;
      min-height: 70px;
      border-radius: 10px;
      background-color: hsl(0 0% 0% / .2);
      transition: .2s $ease-return;
      &:hover {
        background-color: hsl(0 0% 0% / .4);
        transform: translateY(-5px) !important;
      }
      &__content {
        justify-content: flex-start;
        gap: 10px;
        img {
          --w: 40px;
          --of: cover;
        }
        span + span {
          --c: #0000000;
          font-weight:700!important;
        }
      }
    }
  }
}
</style>

