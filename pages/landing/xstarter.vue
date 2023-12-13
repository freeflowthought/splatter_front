<template>
  <div id="xstarter">
    <section id="hero">
      <div>
        <h1>
          Raise Right, Start Right.
        </h1>

        <p class="mb-14">Launch your project any way you want on Splatter Protocol. </p>

        <v-btn href="https://yexlabs.vercel.app/launching">XStarter Beta Testing</v-btn>
      </div>

      <template v-for="n in 3">
        <img
          :key="n"
          src="@/assets/sources/images/bg-xstarter.svg"
          :class="`decoration-corner-${n}`">
        <img
          :key="n"
          src="@/assets/sources/images/polygonal-icon.svg"
          :class="`decoration-middle-${n}`">
        <img
          :key="n"
          src="@/assets/sources/images/polygonal-icon.svg"
          :class="`decoration-last-${n}`">
      </template>
    </section>


    <section id="content">
      <h6 class="text-gradient">FEATURES & BENIFITS</h6>
      <h3 style="max-width: 719px;">We offer promising  projects a fast and secure platform for decentralized fundraising.</h3>

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
  name: "Xstarter",
  layout:'landing',
  data() {
    return {
      dataFeatures: [
        {
          img: require("@/assets/sources/icons/send-icon.svg"),
          title: "Fair token launch",
          desc: "We invented FTO (fair token offering) algorithm for Xstarter to ensure fair and transparent token launching",
        },
        {
          img: require("@/assets/sources/icons/language-icon.svg"),
          title: "Go Beyond Launchpad",
          desc: "FTO algorithm and remove & Burn mechanism sustain token price, after token launching,  it can be directly traded on XSwap liquidity pool",
          linkText: "Test Prototype",
          link: "https://yexlabs.vercel.app/launching"
        },
        {
          img: require("@/assets/sources/icons/parts-icon.svg"),
          title: "Social Fi",
          desc: "Influencers, KOL, and special-role community members can launch their tokens easily with us. Your followers & friends have no barrier to entry. We greatly extended our user base by turning twitter into an abstract account wallet. ",
        },
        {
          img: require("@/assets/sources/icons/pencil-icon.svg"),
          title: "Flexible mechanism",
          desc: "The custom hook and multiple facade contracts provide maximum flexibility to support various scenarios including multi-round launching model,  launching & financing.",
        },
        {
          img: require("@/assets/sources/icons/comunity-icon.svg"),
          title: "Community-driven",
          desc: "Fully integrated with XDAO, the community has the power to pause the token launching when they find suspicious activities during the launching phase",
        },
      ],
    }
  },
  head() {
    const title = 'xstarter';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/xstarter.scss" lang="scss" />
