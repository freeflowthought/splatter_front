<template>
  <div>
    <img src="~/assets/sources/images/Circulos.png" alt="circle" class="circle">

    <section class="section1-landing">

      <div class="divcol astart div-title">
        <h1 class="title">
          Local Innovative Dex On Scroll
        </h1>
        <p class="poppins">
          The next generation Dex incorporated with the fully on-chain DAO to bring product continuous evolution towards the perfection.
        </p>
        <v-btn class="btn-black">
          Launch App <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <div class="div-swap-card">

        <v-card class="grey-card"></v-card>
        <img src="~/assets/sources/images/blur.png" alt="Blur" class="blur-img">

        <v-card class="swap-card divcol center jspace">
          <span class="swap-text">
            Swap
          </span>
          <span class="dm-400">
            From
          </span>
          <div class="swap-container">
            <v-select
              ref="select1"
              :items="items"
              item-text="text"
              item-value="value"
              class="input-auto"
              :position="'fixed'"
            >
            <template #item="{ item }">
              <v-img :src="item.icon" style="max-width: 20px;"></v-img>
              <span style="margin-left: 10px;">{{ item.text }}</span>
            </template>
            <template #selection="{ item }">
              <v-img v-if="item" :src="item.icon" style="max-width: 20px;"></v-img>
              <span v-if="item" style="margin-left: 10px;">{{ item.text }}</span>
            </template>
            </v-select>

            <v-text-field class="input-number" :value="inputNumber" placeholder="0.00"
            ></v-text-field>

            <v-btn class="btn-max" @click="setMaxValue">max</v-btn>
          </div>

          <div class="divrow center jspace mobile-btn" style="width:350px;">
            <v-icon @click="swapValues()">mdi-swap-vertical</v-icon>
            <span class="dm-light">ETH > SPTL = 1290.03 UDC </span>
          </div>

          <span class="dm-400">
            To
          </span>

          <div class="swap-container">
            <v-select
              ref="select2"
              :items="items"
              item-text="text"
              item-value="value"
              class="input-auto"
            >
            <template #item="{ item }">
              <v-img :src="item.icon" style="max-width: 20px;"></v-img>
              <span style="margin-left: 10px;">{{ item.text }}</span>
            </template>
            <template #selection="{ item }">
              <v-img v-if="item" :src="item.icon" style="max-width: 20px;"></v-img>
              <span v-if="item" style="margin-left: 10px;">{{ item.text }}</span>
            </template>
            </v-select>

            <v-text-field class="input-number" :value="inputNumber" placeholder="0.00"
            ></v-text-field>

            <v-btn class="btn-max" @click="setMaxValue">max</v-btn>
          </div>

          <v-btn class="btn mobile-btn" style="width: 350px!important; height: 60px!important; margin-top: 15px;">Swap</v-btn>
        </v-card>
      </div>
    </section>

    <section class="section2-landing">
      <div>
        <h1 class="title">
          Creating a new experience
        </h1>
      </div>

      <div class="container-cards">
        <v-card class="card-check" style="position: relative;">
          <img src="~/assets/sources/images/check_purple.png" alt="Purple Check" class="chechk-img">
          <p class="title-card">
            Forkless upgrade
          </p>
          <p class="description-card">
            Safe and transparent smart contract upgrades to make our product unique and competitive.
          </p>
        </v-card>

        <v-card class="card-check margin-bottom">
          <img src="~/assets/sources/images/check_blue.png" alt="Blue Check" class="chechk-img">
          <p class="title-card">
            Community Governance
          </p>
          <p class="description-card">
            The first 100% on-chain DAO in web3.
          </p>
        </v-card>

        <v-card class="card-check">
          <img src="~/assets/sources/images/check_green.png" alt="Green Check" class="chechk-img">
          <p class="title-card">
            Variable mechanism
          </p>
          <p class="description-card">
            Variable tokenomics, incentives and other critical features.
          </p>
        </v-card>
      </div>
    </section>

    <section class="section3-landing">
      <h1 class="title">
        See an overview of all your assets
      </h1>
      <div class="preview-container">
        <img src="~/assets/sources/images/preview.png" alt="preview" class="preview-img">
      </div>
      <v-btn class="btn btn-launch">
        Launch App <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </section>
    <img src="~/assets/sources/images/circles2.png" alt="circle" class="circle2">
  </div>
</template>

<script>
export default {
  name: "HomePage",
  layout:'landing',
  data() {
    return {
      selectedItem: null,
      selectedItem2: null,
      inputNumber: 1,
      items: [
        { text: 'Ethereum', value: 1, icon: require('~/assets/sources/icons/Ellipse.svg') },
        { text: 'Splatter', value: 2, icon: require('~/assets/sources/icons/Ellipse.svg') },
      ],
      items2: [
        { text: 'Ethereum', value: 1, icon: require('~/assets/sources/icons/Ellipse.svg') },
        { text: 'Splatter', value: 2, icon: require('~/assets/sources/icons/Ellipse.svg') },
      ],
    }
  },
  head() {
    const title = 'Home';
    return {
      title,
    }
  },
  mounted() {
    this.$metamask.checkConnection()
    this.$metamask.detectMetamask()
  },
  methods: {
    setMaxValue() {
      this.inputNumber = 9999;
    },

    swapValues() {
      const temp = this.$refs.select1.internalValue;
      this.$refs.select1.internalValue = this.$refs.select2.internalValue;
      this.$refs.select2.internalValue = temp;
    },
  }
};
</script>

<style src="~/assets/styles/pages/landing.scss" lang="scss" />
