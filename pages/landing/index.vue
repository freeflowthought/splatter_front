<template>
  <div>
    <section class="section1-landing">
      <img src="~/assets/sources/images/Circulos.png" alt="circle" class="circle">

      <div class="divcol astart div-title">
        <h1 class="title">
          Number One Dex On Scroll
        </h1>
        <p class="poppins">
          Lorem ipsum dolor sit amet consectetur. Viverra quis nec quis hendrerit.
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
              v-model="selectedItem"
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
            <v-icon>mdi-swap-vertical</v-icon>
            <span class="dm-light">ETH > SPTL = 1290.03 UDC </span>
          </div>

          <span class="dm-400">
            To
          </span>

          <div class="swap-container">
            <v-select
              v-model="selectedItem"
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
            Fork-less upgrades
          </p>
          <p class="description-card">
            Lorem ipsum dolor sit amet consectetur. Viverra quis nec quis hendrerit.
          </p>
        </v-card>

        <v-card class="card-check margin-bottom">
          <img src="~/assets/sources/images/check_blue.png" alt="Blue Check" class="chechk-img">
          <p class="title-card">
            Fork-less upgrades
          </p>
          <p class="description-card">
            Lorem ipsum dolor sit amet consectetur. Viverra quis nec quis hendrerit.
          </p>
        </v-card>

        <v-card class="card-check">
          <img src="~/assets/sources/images/check_green.png" alt="Green Check" class="chechk-img">
          <p class="title-card">
            Fork-less upgrades
          </p>
          <p class="description-card">
            Lorem ipsum dolor sit amet consectetur. Viverra quis nec quis hendrerit.
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
      <img src="~/assets/sources/images/circles2.png" alt="circle" class="circle2">
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  layout:'landing',
  data() {
    return {
      selectedItem: null,
      inputNumber: 1,
      items: [
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
  methods: {
    setMaxValue() {
      this.inputNumber = 9999;
    },
  }
};
</script>

<style src="~/assets/styles/pages/landing.scss" lang="scss" />
