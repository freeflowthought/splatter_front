<template>
  <div id="home">
    <img src="~/assets/sources/images/left-circle.svg" alt="circle" class="circle">
    <img src="~/assets/sources/images/right-circle.svg" alt="circle" class="circle2">

    <section class="section1-landing">
      <img src="~/assets/sources/logos/logo_black.svg" alt="Logo" class="logo">

      <h1 class="tcenter font1">Local Innovative <br> <span>Dex On</span> 📜 <span>Scroll</span></h1>

      <div class="divrow wrap container-btns center">
        <v-btn v-for="(item,index) in dataBtns" :key="index" @click="item.name == 'Launch App' ? $router.push(basePath2(item.to)) : ''">
          <img v-if="item.img" :src="item.img" :alt="item.alt" class="mr-1"> {{ item.name }}
        </v-btn>
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
      dataBtns: [
        {
          name: "Launch App",
          to: "/swap"
        },
        {
          img: require("~/assets/sources/icons/twitter.svg"),
          alt: "Twitter logo",
          name: "Twitter",
        },
        {
          img: require("~/assets/sources/icons/discord.svg"),
          alt: "Discord logo",
          name: "Discord",
        },
        {
          img: require("~/assets/sources/icons/medium.svg"),
          alt: "Medium logo",
          name: "Medium",
        },
        {
          img: require("~/assets/sources/icons/gitbook.png"),
          alt: "Gitbook logo",
          name: "Gitbook",
        },
      ]
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

<style src="~/assets/styles/pages/landing-page.scss" lang="scss" />
