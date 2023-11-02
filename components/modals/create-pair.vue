<template>
  <v-dialog v-model="modalCreatePair" content-class="modal-connect divcol relative isolate">
    <aside class="space">
      <span class="h8_em">Create pair</span>

      <v-btn style="background: hsl(0 0% 0% / .2)!important;" icon @click="modalCreatePair = false">
        <v-icon size="1.5em">mdi-close</v-icon>
      </v-btn>
    </aside>

    <v-form ref="form" class="flex-column center">

      <div class="swap-container">
        <v-select
          ref="select1"
          v-model="selectedItem1"
          :items="items1Filtered"
          :rules="[requiredRule]"
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
      </div>

      <v-select
        ref="select1"
        v-model="selectedItem2"
        :items="items2Filtered"
        :rules="[requiredRule]"
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

      <v-btn
        class="btn bold"
        :disabled="formValid"
        @click="submitForm"
      >
        Create Pair
      </v-btn>
    </v-form>
  </v-dialog>
</template>

<script>
import scrollTokens from '~/static/tokens/scroll_tokens.json'
import scrollSepoliaTokens from '~/static/tokens/scroll_alpha_tokens.json'
import factoryABI  from '~/static/abis/factory.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
let factoryAddress = "0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545"


export default {
  name: "ModalCreatePair",
  /* props: {
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
  }, */
  data() {
    return {
      modalCreatePair: false,
      tokens: undefined,
      selectedItem1: null,
      selectedItem2: null,
    };
  },
  computed: {
    items1Filtered() {
      return this.tokens?.filter(item => item !== this.selectedItem2 ?? '')
    },
    items2Filtered() {
      return this.tokens?.filter(item => item !== this.selectedItem1 ?? '')
    }
  },
  async mounted() {
    await this.$metamask.checkConnection()
    this.userConnected = this.$metamask.userConnected
    factoryAddress = this.$protocolAddresses.getFactoryAddress(this.$metamask.userCurrentChainId)
    if(this.$metamask.userCurrentChainId === '0x8274f'){
      this.tokens = scrollSepoliaTokens
    } else {
      this.tokens = scrollTokens
    }
  },

  methods: {
    requiredRule(value) {
      return !!value || 'This field is required';
    },

    async submitForm() {
      if (this.$refs.form.validate()) {
        const pairExist = await this.getPair(this.selectedItem1.address, this.selectedItem2.address)
        if(!pairExist) {

          await this.createPair(
            this.selectedItem1.address,
            this.selectedItem2.address,
          )
        }
      }
    },
    async getPair(addressA, addressB){
      const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress)
      const pairAddress = await factoryContract.methods.getPair(addressA,addressB).call()
      const pairExist = pairAddress !== '0x0000000000000000000000000000000000000000'
      if (pairExist) {
        this.$alert('cancel', 'Pair already exist')
      }
      return pairExist
    },

    async createPair(addressA, addressB){
      const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress)
      await factoryContract.methods.createPair(addressA,addressB).send( {from: this.$metamask.userAccount})
      .then( () => {
        this.$alert('success', 'Pair created successfully')
        this.modalCreatePair = false
      })
      .catch((error) => {
        this.$alert('cancel', 'Something went wrong')
        console.log(error)
      }
      )

    }
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

  .input-auto{
    background-color: var(--card);
    border-radius: 10px;
    border: 1px solid #000;
    max-width: 250px;
    padding-inline: 10px;
    padding-block: 10px;
    height: 45px;
    margin-bottom: 10px;

    .v-select__slot{
      margin-top: -5px;
    }

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

  .swap-container {
    @include media(max, 630px) {
      width: max-content;
      margin-inline: auto;
    }
    @include media(max, 500px) {width: 100% !important}
    > div.space {
      center {
        transform: translateY(calc(62px / 2));
        margin-inline: clamp(5px, .6vw, 20px);
      }
      @include media(max, 630px) {
        flex-direction: column !important;
        center {
          transform: translateY(calc(3.875em / 3));
          img {--t: rotate(90deg)}
        }
      }
    }
    aside:has(> .container-options) {
      --size: 208px;
      @include media(max, 500px) {--size: 100%}
      width: var(--size) !important;
      max-width: var(--size) !important;
      min-width: var(--size) !important;
      // @include media(min, 630px) {min-height: 282px !important}
      justify-content: space-between;
      position: relative;
      .v-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        @include media(max, 500px) {
          * {text-align: center !important}
        }
        > label {
          margin-top: 10px;
          padding-inline: 12px;
        }
      }
    }
    .v-chip {--tt: uppercase !important}
  }

}

</style>

