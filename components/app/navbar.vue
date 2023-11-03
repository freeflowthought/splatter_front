<template>
  <div>
    <AppMenuNavbar ref="menu"></AppMenuNavbar>

    <v-app-bar id="navbar" color="transparent" absolute class="isolate">
      <!-- desktop -->
      <nuxt-link class="deletemobile" :to="basePath('/')">
        <img src="~/assets/sources/logos/logo_black.svg" alt="logo" style="--w: 120px">
      </nuxt-link>
      <!-- mobile -->
      <nuxt-link class="showmobile" :to="basePath('/')">
        <img src="~/assets/sources/logos/logo_black.svg" alt="logo" style="--w: 80px">
      </nuxt-link>

      <!-- desktop -->
      <aside class="middle tcap deletemobile">
        <a
          v-for="(item, i) in dataNavbar" :key="i"
          :class="{active: $route.path.includes(item.to)}"
          @click="item.name !== 'portfolio' ? $router.push(basePath2(item.to)) : ''">
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
              class="btn-nav"
              style="min-width:125px!important;"
              v-bind="isLogged ? attrs : ''"
              v-on="isLogged ? on : ''"
              @click="isLogged ? $store.dispatch('modalConnect') : ''"
              >
              <template v-if="isLogged">
                <span>Connect Wallet</span>
              </template>

              <template v-else>{{ truncatedWallet }} ...</template>
            </v-btn>
          </template>
        </v-menu>

        <v-select
        v-model="itemSelected"
        append-icon="mdi-chevron-down"
        hide-details
        :items="itemsBlockchain"
        class="btn-nav"
        @change="$metamask.switchToChain(itemSelected.id)"
        >
        <template #item="{ item }">
          <span style="margin-left: 10px;">{{ item.name }}</span>
        </template>
        <template #selection="{ item }">
          <span v-if="item" style="margin-left: 10px;">{{ item.name }}</span>
        </template>
        </v-select>
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
      itemsBlockchain: [{name: 'Mainnet', id: '0x82750'}, {name: 'Testnet', id: '0x8274f'}],
      itemSelected: undefined,
      dataNavbar: [
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
        {
          name: "Liquidity",
          to: "/liquidity"
        },
      ],
      wallet: "Login",
      isLogged: true,

    };
  },
  computed: {
    truncatedWallet() {
      return this.wallet.substring(1, 20);
    }
  },
  created() {

    
  },
  async mounted() {
    await this.$metamask.checkConnection()
    if(this.$metamask.userAccount !== undefined) {
      this.wallet = this.$metamask.userAccount
      this.isLogged = false
    }
    this.itemSelected = this.$metamask.userCurrentChainId === '0x82750'
      ? this.itemsBlockchain[0]
      : this.itemsBlockchain[1]
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
