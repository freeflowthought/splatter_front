<template>
  <div>
    <LandingMenuNavbar ref="menu"></LandingMenuNavbar>

    <v-app-bar id="navbar-landing" color="transparent" absolute class="isolate">
      <nuxt-link to="/">
        <img src="~/assets/sources/logos/logo-new.svg" alt="logo">
      </nuxt-link>

      <aside class="middle tcap deletemobile">
        <v-menu
          v-for="(item, i) in dataNavbar"
          :key="i"
          bottom
          offset-y
          content-class="landing-menu"
          nudge-bottom="10px">
          <template #activator="{ on, attrs }">
            <a
              :class="{active: $route.path.includes(item.to)}"
              v-bind="attrs"
              v-on="on">
              {{item.name}}
              <v-icon size="16">mdi-chevron-down</v-icon>
            </a>
          </template>

          <v-list>
            <v-list-item
              v-for="(item2, i2) in item.children"
              :key="i2"
              :to="item2.to"
              :href="item2.href"
              :target="item2.href ? '_blank' : '_self'"
              @click="action(item2)"
            >
              <img
                v-if="item2.icon"
                :src="item2.icon"
                :alt="`${item2.name} icon`"
                :style="`width: ${item2.iconSize} !important; margin-right: 6px`"
              >

              <div class="d-flex flex-column" style="gap: 4px;">
                <h6>{{ item2.name }}</h6>
                <p v-if="item2.desc">{{ item2.desc }}</p>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </aside>

      <aside class="right deletemobile" :class="isLogged ? 'font2' : 'font1'">
        <v-btn href="https://discord.com/invite/dDC8rYTFju" target="_blank" class="btn" style="min-width:125px!important;">
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
              @click="isLogged ? $store.dispatch('modalConnect') : ''"
              >
              <template v-if="isLogged">
                <span>Login</span>
              </template>

              <template v-else>{{ truncatedWallet }} ...</template>
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
      itemsBlockchain: [{name: 'Mainnet', id: '0x82750'}, {name: 'Testnet', id: '0x8274f'}],
      itemSelected: undefined,
      dataNavbar: [
        {
          name: "Dapps",
          children: [
            {
              name: "XStarter",
              // desc: "Description of product",
              icon: require("@/assets/sources/icons/ball-icon.svg"),
              iconSize: "20px",
              to: "/landing/xstarter",
            },
            {
              name: "XDao",
              // desc: "Description of product",
              icon: require("@/assets/sources/icons/comunity-icon.svg"),
              iconSize: "22px",
              commingSoon: true,
            },
            {
              name: "XSwap",
              // desc: "Description of product",
              icon: require("@/assets/sources/icons/ticket-icon.svg"),
              iconSize: "18px",
              to: "/app/xswap",
            },
            {
              name: "XGasplan",
              // desc: "Description of product",
              icon: require("@/assets/sources/icons/location-icon.svg"),
              iconSize: "14px",
              to: "/landing/gasfi",
            }
          ]
        },
        {
          name: "Community",
          children: [
            {
              name: "Discord",
              icon: require("@/assets/sources/logos/discord-logo.svg"),
              iconSize: "20px",
              href: "https://discord.com/invite/dDC8rYTFju",
            },
            {
              name: "Twitter",
              icon: require("@/assets/sources/logos/twitter-logo.svg"),
              iconSize: "19px",
              href: "https://twitter.com/Splatter_Proto",
            },
            {
              name: "Medium",
              icon: require("@/assets/sources/logos/medium-logo.svg"),
              iconSize: "24px",
              href: "https://medium.com/@splatterproto",
            },
          ]
        },
        {
          name: "Developers",
          children: [
            {
              name: "Gitbook",
              href: "https://yexlabs.gitbook.io/splatterprotocol/",
            },
            {
              name: "Whitepaper",
              href: "https://www.dropbox.com/scl/fi/2mg84oe4218rpnw0oo5qo/Batch_A2MM.pdf?rlkey=i4my4orx6rssy0v5fpwitsxov&dl=0",
            },
            {
              name: "Github"
            },
          ]
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
    this.itemSelected = this.$metamask.userCurrentChainId === '0x82750'
      ? this.itemsBlockchain[0]
      : this.itemsBlockchain[1]
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
  methods: {
    action(item) {
      if (!item.commingSoon) return

      this.$alert('warning', "comming soon")
    }
  }
};
</script>

<style src="~/assets/styles/components/landing/navbar.scss" lang="scss" />
