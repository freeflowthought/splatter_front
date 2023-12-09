<template>
  <div>
    <LandingMenuNavbar ref="menu"></LandingMenuNavbar>
    
    <v-app-bar id="navbar" color="transparent" absolute class="isolate">
      <nuxt-link to="/">
        <img src="~/assets/sources/logos/logo-new.svg" alt="logo">
      </nuxt-link>

      <!-- desktop -->
      <aside class="middle tcap deletemobile">
        <a
          v-for="(item, i) in dataNavbar" :key="i"
          :class="{active: $route.path.includes(item.to)}">
          {{item.name}}
          <v-icon size="16">mdi-chevron-down</v-icon>
        </a>
      </aside>

      <!-- desktop -->
      <aside class="right deletemobile" :class="isLogged ? 'font2' : 'font1'">
        <v-btn class="btn" style="min-width:125px!important;">
          Discord
        </v-btn>

        <!-- connect button -->
        <!-- <v-menu bottom offset-y nudge-bottom="10px">
          <template #activator="{ on, attrs }">
            <v-btn
              class="btn2"
              style="min-width:125px!important;"
              v-bind="isLogged ? attrs : ''"
              v-on="isLogged ? on : ''"
              @click="!isLogged ? $store.dispatch('modalConnect') : ''">
              <template v-if="isLogged">
                <span>{{user.accountId}}</span>
                <v-icon>mdi-chevron-down</v-icon>
              </template>
              
              <template v-else>Login</template>
            </v-btn>
          </template>

          <v-list class="font2" color="var(--secondary)" style="--c:#fff">
            <v-list-item-group active-class="activeClass">
              <v-list-item
                v-for="(item,i) in dataMenuLogin" :key="i"
                @click="item.key==='logout' ? $store.commit('signOut') : $router.push(basePath(key))">
                <v-list-item-title>{{item.name}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu> -->
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
        // {
        //   name: "swap",
        //   to: "app/swap"
        // },
        // {
        //   name: "earn",
        //   to: "app/farm-details"
        // },
        // {
        //   name: "placeholder",
        // },
        // {
        //   name: "placeholder",
        // },
        {
          name: "Dapps",
        },
        {
          name: "Community",
        },
        {
          name: "Developers",
        },
      ],
    };
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.commit("switchTheme", theme);
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   else {this.themeButton = false}
  // },
  methods: {
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
