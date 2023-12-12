<template>
  <div id="xswap">
    <section id="hero">
      <div>
        <h1>
          Swapping Simplified: Make Transactions with Ease
        </h1>

        <p class="mb-14">Seamless transactions & liquidity management at your fingertips</p>

        <v-btn @click="$router.push(basePath2('/swap'))">Test Prototype</v-btn>
      </div>

      <img src="@/assets/sources/images/bg-xswap.svg">
      <img src="@/assets/sources/images/bg-xswap.svg">
    </section>


    <section id="content">
      <h6 class="text-gradient">FEATURES & BENIFITS</h6>
      <h3 style="max-width: 719px;">Trade, earn, and own crypto on the all-in-one  DEX.</h3>

      <div class="grid">
        <v-card v-for="(item, i) in dataFeatures" :key="i" style="gap: 8px;">
          <img :src="item.img" class="mb-4">
          <h6 class="mb-0">{{ item.title }}</h6>
          <p class="mb-0">{{ item.desc }}</p>

          <a class="text-gradient" :href="item.link">{{ item.linkText }}</a>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Xswap",
  layout:'app',
  data() {
    return {
      dataFeatures: [
        {
          img: require("@/assets/sources/icons/medal-icon.svg"),
          title: "Easy To Use",
          desc: "Users able to use free faucet token on scroll sepolia to test all XSWap feature. This largely lowered the cost for using the platform's",
        },
        {
          img: require("@/assets/sources/icons/ticket-icon.svg"),
          title: "Single-side liquidity support (coming soon)",
          desc: "Users would be able to add single-side liquidity since V2, this is the feature that we have to combat the impermanent losses. ",
          linkText: "Test Prototype",
          link: "https://yexlabs.vercel.app/swap"
        },
        {
          img: require("@/assets/sources/icons/ball-icon.svg"),
          title: "Low Slippage, Zero Sandwich Attach Batch-A2MM ",
          desc: "We care about your trading experience, and give you the most fair price for trading. The Batch-A2MMprotocol will be released on V3.",
        },
      ],
    }
  },
  head() {
    const title = 'Xswap';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/xswap.scss" lang="scss" />
