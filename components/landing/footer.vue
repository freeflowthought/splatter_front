<template>
  <v-footer id="footer" color="white" absolute class="font2">
    
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      dataRedes: [
        { icon: "discord", to: "/" },
        { icon: "twitter", to: "/" },
        { icon: "youtube", to: "/" },
        { icon: "instagram", to: "/" },
      ],
    }
  },
  methods: {
    
  }
}
</script>

<style src="~/assets/styles/components/footer.scss" lang="scss" />
