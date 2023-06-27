<template>
  <v-footer color="white" absolute>
    <div class="divcol astart" style="gap: 30px;">
      <img src="~/assets/sources/logos/splatter-footer.png" alt="Splatter Footer">

      <div class="divrow" style="gap: 30px;">
        <div class="divcol" style="gap: 10px;">
          <span class="title-media">
            Telegram
          </span>
          <a target="_blank" href="https://web.telegram.org/">
            <span class="user-media">
              @splatterprotocol 
            </span>
          </a>
        </div>

        <div class="divcol" style="gap: 10px;">
          <span class="title-media">
            Email
          </span>
          <span class="user-media">
            @splatter@gmail.com  
          </span>
        </div>

        <div class="divcol" style="gap: 10px;">
          <span class="title-media">
            Discord
          </span>
          <a target="_blank" href="https://discord.gg/SDGJx8g5z4">
            <span class="user-media">
              @Click here to go Discord 
            </span>
          </a>
        </div>
      </div>
    </div>

    <div class="divrow" style="gap:30px;">
      <span class="title-media">
        White Paper
      </span>

      <span class="title-media">
        Github
      </span>

      <span class="title-media">
        Launch App
      </span>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
     
    }
  },
  methods: {
    
  }
}
</script>

<style src="~/assets/styles/components/footer.scss" lang="scss" />
