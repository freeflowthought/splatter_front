<template>
  <div id="landing-new">
    <section id="hero">
      <div v-for="n in 4" :key="n" :class="`decoration-${n}`" />

      <div>
        <h1>
          The next Generation<br>
          <span>Dapps Infrastructure.</span>
        </h1>

        <p>a community driven Dapps’s Hub On Scroll.  Featuring SocialFi, DeFi, GasFi & more.</p>

        <aside class="d-flex flex-wrap justify-center align-center mt-14" style="gap: 16px;">
          <v-btn href="https://yexlabs.vercel.app/launching" target="_blank">
            XStarter Beta Testing
          </v-btn>

          <a href="https://yexlabs.gitbook.io/splatterprotocol/">
            Explore Docs
            <v-icon size="16">mdi-chevron-right</v-icon>
          </a>
        </aside>
      </div>
    </section>


    <section id="content">

      <aside id="prom-bar">
        <h6>TRUSTED BY</h6>

        <div class="d-flex justify-space-between scrollx" style="gap: 30px;">
          <img v-for="(item, i) in promLogos" :key="i" :src="item.img" :alt="item.alt">
        </div>
      </aside>


      <h6 class="text-gradient text-center">UNLIMITED POSSIBILITIES</h6>
      <h3 class="text-center" style="margin-bottom: 73px;">
        Explore Dapps that support developers, founders, and communities.
      </h3>

      <div class="grid" style="row-gap: 30px; column-gap: 40px;">
        <v-card v-for="(item, i) in dataExplore" :key="i">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <a class="text-gradient">Learn More</a>

          <img :src="item.img" :alt="`${item.title} icon`">
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  layout:'landing',
  data() {
    return {
      promLogos: [
        {
          img: require("@/assets/sources/logos/omnikingdoms.svg"),
          alt: "omnikingdoms logo",
        },
        {
          img: require("@/assets/sources/logos/axelar.svg"),
          alt: "axelar logo",
        },
        {
          img: require("@/assets/sources/logos/prom-logo.svg"),
          alt: "logo",
        },
        {
          img: require("@/assets/sources/logos/chainlink.svg"),
          alt: "chainlink logo",
        },
        {
          img: require("@/assets/sources/logos/rhino.svg"),
          alt: "rhino logo",
        },
      ],
      dataExplore: [
        {
          title: "XSwap",
          desc: "Our DEX provides seamless trading with efficient liquidity management, empowering users to engage in decentralized exchanges effortlessly.",
          img: require("@/assets/sources/images/bg-xswap.svg"),
          to: "",
        },
        {
          title: "XStarter",
          desc: "Launching your Individual Sovereign Tokens with splatter protocol.",
          img: require("@/assets/sources/images/bg-xstarter.svg"),
          to: "",
        },
        {
          title: "XDAO",
          desc: "A Community-run DAO with built-in trust layer to improve Ethereum Scalability.",
          img: require("@/assets/sources/images/bg-xdao.svg"),
          to: "",
        },
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
  }
};
</script>

<style src="~/assets/styles/pages/landing-new.scss" lang="scss" />
