<template>
  <v-footer id="footer-landing" absolute class="font2">
    <div class="d-flex flex-column align-center mb-16">
      <h2>Stay up to date with Splatter Protocol</h2>
      <v-btn href="https://discord.com/channels/@me/1105813905701355531/1183785111326568469" target="_blank">Join Discord</v-btn>
    </div>

    <div class="d-flex flex-column mb-14">
      <h5 class="mb-8">Explore Splatter Protocol.</h5>

      <section>
        <v-chip
          v-for="(item, i) in data"
          :key="i"
          :href="item.href"
          :target="item.href? '_blank' : '_self'"
          :to="item.to"
          @click="action(item)"
        >
          <img v-if="item.icon" :src="item.icon" :alt="`${item.name} icon`">
          {{ item.name }}
        </v-chip>
      </section>
    </div>

    <aside class="d-flex justify-space-between align-center">
      <router-link to="/">
        <img src="~/assets/sources/logos/logo-new.svg" alt="logo">
      </router-link>

      <span>2023 Splatter Protocol</span>
    </aside>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      data: [
        {
          name: "XSwap",
          to: "/landing/xswap",
        },
        {
          name: "XStarter",
          to: "/landing/xstarter",
        },
        {
          name: "XDao",
          commingSoon: true,
        },
        {
          name: "XGasplan",
          to: "/landing/gasfi",
        },
        {
          name: "Gitbook",
          href: "https://yexlabs.gitbook.io/splatterprotocol/",
        },
        {
          name: "Medium",
          href: "https://medium.com/@splatterproto",
        },
        {
          name: "Whitepaper",
          href: "https://www.dropbox.com/scl/fi/2mg84oe4218rpnw0oo5qo/Batch_A2MM.pdf?rlkey=i4my4orx6rssy0v5fpwitsxov&dl=0",
        },
        {
          name: "Twitter",
          icon: require("@/assets/sources/logos/twitter-icon.svg"),
          href: "https://twitter.com/Splatter_Proto",
        },
        {
          name: "Discord",
          icon: require("@/assets/sources/logos/discord-icon.svg"),
          href: "https://discord.com/channels/@me/1105813905701355531/1183785111326568469",
        },
      ],
    }
  },
  methods: {
    action(item) {
      if (!item.commingSoon) return

      this.$alert('warning', "comming soon")
    }
  }
}
</script>

<style src="~/assets/styles/components/landing/footer.scss" lang="scss" />
