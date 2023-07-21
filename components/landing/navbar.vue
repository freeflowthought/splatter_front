<template>
  <div>
    <LandingMenuNavbar ref="menu"></LandingMenuNavbar>
    
    <v-app-bar id="navbar" color="transparent" absolute class="isolate">
      <!-- desktop -->
      <nuxt-link class="deletemobile" :to="basePath('/')">
        <img src="~/assets/sources/logos/logo_black.svg" alt="logo" style="--w: 148px">
      </nuxt-link>
      <!-- mobile -->
      <nuxt-link class="showmobile" :to="basePath('/')">
        <img src="~/assets/sources/logos/logo_black.svg" alt="logo" style="--w: 120px">
      </nuxt-link>

      <!-- desktop -->
      <aside class="middle tcap deletemobile">
        <a
          v-for="(item, i) in dataNavbar" :key="i"
          :class="{active: $route.path.includes(item.to)}"
          @click="$router.push(item.to)">
          {{item.name}}
        </a>
      </aside>

      <!-- desktop -->
      <aside class="right deletemobile" :class="isLogged ? 'font2' : 'font1'">
        <!-- <v-btn class="btn2">
          <img src="~/assets/sources/logos/honeypot.svg" alt="token" class="aspect" style="--w: 1.533125em">
          <span>${{user.balance}}</span>
        </v-btn> -->

        <!-- connect button -->
        <v-menu bottom offset-y nudge-bottom="10px">
          <template #activator="{ on, attrs }">
            <v-btn
              class="btn2"
              style="min-width:125px!important;"
              v-bind="isLogged ? attrs : ''"
              v-on="isLogged ? on : ''"
              @click="isLogged ? $store.dispatch('modalConnect') : disconect()"
              >
              <template v-if="isLogged">
                <span>Login</span>
              </template>
              
              <template v-else>{{ wallet.substring(1, 20) }} ...</template>
            </v-btn>
          </template>
        </v-menu>
      </aside>

      <!-- mobile -->
      <v-btn icon class="showmobile" @click="$refs.menu.drawer = true">
        <v-icon large>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'
import menuLogin from '~/mixins/menuLogin'

export default {
  name: "NavbarComponent",
  mixins: [computeds, menuLogin],
  data() {
    return {
      dataNavbar: [
        {
          name: "Cwap",
          to: "app/swap"
        },
        {
          name: "Earn",
          to: "app/farm-details"
        },
        {
          name: "Claim faucet",
          to: "app/faucet"
        },
      ],

      dataNavbarMobile: [
        {
          name: "Swap",
          to: "/swap"
        },
        {
          name: "Earn",
          to: "/farm-details"
        },
        {
          name: "Claim faucet",
          to: "/faucet"
        },
      ],
      wallet: localStorage.getItem("wallet") === null ? "Login": localStorage.getItem("wallet"),
      isLogged: true,
    };
  },
  created() {
    this.$metamask.updateWallet();
    if (localStorage.getItem("wallet") !== null) {
      this.isLogged = false;
    }
  },
  methods: {
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
    disconect() {
      console.log('disconect')
      this.$metamask.disconnect();
      this.$forceUpdate();
    },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
