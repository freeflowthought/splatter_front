<template>
  <div id="gasfi">
    <section id="hero">
      <div>
        <h1>
          GasFi
        </h1>

        <p class="mb-14">Lorem Impusl. </p>

        <v-btn>Lorem Impus</v-btn>
      </div>

      <template v-for="n in 3">
        <img
          :key="n"
          src="@/assets/sources/images/bg-xdao.svg"
          :class="`decoration-corner-${n}`">
        <img
          :key="n"
          src="@/assets/sources/images/polygonal-cube-icon.png"
          :class="`decoration-${n}`">
      </template>
    </section>


    <section id="content">
      <h6 class="text-gradient">FEATURES & BENIFITS</h6>
      <h3 style="max-width: 719px;">Latest News</h3>

      <div class="grid">
        <v-card v-for="(item, i) in dataFeatures" :key="i" style="gap: 8px;">
          <img :src="item.img" class="mb-4">
          <h6 class="mb-0">{{ item.title }}</h6>
          <p class="mb-0">{{ item.desc }}</p>

          <a class="text-gradient">{{ item.linkText }}</a>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "GasFi",
  layout:'landing',
  data() {
    return {
      dataFeatures: [
        {
          img: require("@/assets/sources/icons/send-icon.svg"),
          title: "Gas Problem",
          desc: "Layer 2 solutions on Ethereum, such as zkrollup, like Scroll, have substantially mitigated gas prices. However, it's essential to note that the presence of gas spikes in Layer 2 is not entirely eliminated.",
        },
        {
          img: require("@/assets/sources/icons/language-icon.svg"),
          title: "Gas Solution",
          desc: "X'Gasplans is an subscribable Gas Plans hedge against fluctuating gas prices with our real-time pricing models, fortified by external oracles and ZK proofs   allowing users to access the Blockchain as easily as using their mobile phone number. ",
        },
      ],
    }
  },
  head() {
    const title = 'gasfi';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/gasfi.scss" lang="scss" />
