<template>
  <div id="menuNavbar">
    <!--////////////// drawers //////////////-->
    <AppCustomeDrawer :model="drawer" @update="drawer = $event">
      <template #header>
        <a class="center" @click="$router.push(basePath('/')); $scrollTo('home')">
          <img src="~/assets/sources/logos/mobile_gradient_logo.svg" alt="logo" style="--w: 90%">
        </a>
        
        <!-- connect button -->
        <!-- <v-menu bottom offset-y nudge-bottom="10px">
          <template #activator="{ on, attrs }">
            <v-btn
              :class="$parent.isLogged ? 'btn2' : 'btn'"
              :style="$parent.isLogged ? '--bg: var(--accent)' : '--w: 75%; --min-h: 30px; --p: .5em 2em'"
              v-bind="$parent.isLogged ? attrs : ''"
              v-on="$parent.isLogged ? on : ''"
              @click="!$parent.isLogged ? $store.dispatch('modalConnect') : ''">
              <template v-if="$parent.isLogged">
                <span>{{$parent.user.accountId}}</span>
                <v-icon>mdi-chevron-down</v-icon>
              </template>
              
              <template v-else>Connect</template>
            </v-btn>
          </template>

          <v-list color="var(--accent)" style="--c:#fff">
            <v-list-item
              v-for="(item,i) in $parent.dataMenuLogin" :key="i"
              @click="item.key==='logout' ? $store.commit('signOut') : $router.push(basePath(key))">
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
      </template>


      <template #content>
            <v-btn
              class="btn2"
              style="position: absolute; width: 80%; margin-left: 10%; margin-top: 160px;"
              v-bind="isLogged ? attrs : ''"
              v-on="isLogged ? on : ''"
              @click="isLogged ? $store.dispatch('modalConnect') : ''"
              >
              <template v-if="isLogged">
                <span>Login</span>
              </template>
              
              <template v-else>{{ wallet.substring(1, 20) }} ...</template>
            </v-btn>
        <v-expansion-panels focusable accordion class="anim_moveleft">
          <v-expansion-panel
            v-for="(item, i) in $parent.dataNavbar" :key="i"
            @click="$router.push(basePath2(item.to))"
          >
            <v-expansion-panel-header class="h10_em" expand-icon="mdi-menu-down" :hide-actions="item.to ? true : false">
              {{ item.name }}
            </v-expansion-panel-header>

            <v-expansion-panel-content v-if="!item.to">
              <v-list>
                <v-list-item
                  v-for="(item2,i2) in item.selection" :key="i2" :ripple="false"
                  :to="basePath(item2.to)" @click="drawer = false"
                >
                  <v-list-item-title class="center h10_em">
                    <span>{{ item2.name}}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>


      <template #footer>
        <span class="h10_em clr_inv">Join us on:</span>

        <div class="center">
          <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.url" target="_blank" class="ml-1 mr-1">
            <img :src="require(`~/assets/sources/icons/${item.icon}.png`)" alt="social red">
          </v-btn>
        </div>
      </template>
    </AppCustomeDrawer>
  </div>
</template>

<script>
export default {
  name: "NavbarMenuComponent",
  data() {
    return {
      drawer: false,
      dataSocial: [
        // { icon:"discord", url:"#" },
        { icon:"twitter", url:"#" },
        { icon:"telegram", url:"#" }
      ],
      wallet: this.$metamask.userAccount === null ? "Login": this.$metamask.userAccount,
      isLogged: true,
    };
  },
  mounted() {
    if (localStorage.getItem("wallet") !== null) {
      this.$metamask.updateWallet();
      this.isLogged = false;
    }
  },
  methods: {
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
