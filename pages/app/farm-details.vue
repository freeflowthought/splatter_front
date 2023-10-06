<template>
  <div id="farm-details">
    <!-- if not logged -->
    <div v-if="!userConnected" class="divcol center tcenter align font1 nopevents maxsize_w">
      <img src="~/assets/sources/icons/wallet-empty.png" alt="empty icon" style="--w: 13.4375em">
      <span class="h9_em bold mt-5 mb-2">You haven't connected your wallet.</span>
      <span class="hspan" style="--fs: max(13px, 1em)">Connect to view eligible farms.</span>
      <v-btn
        class="btn mt-3 pevents font2" style="--w: 10.3125em; --h: 3.25em; --stroke: .4px"
        @click="$store.dispatch('modalConnect')">
        Connect Wallet
      </v-btn>
    </div>

    <template v-else>
      <h1 class="bold" style="font-family:var(--font1);">Earn</h1>
      <!-- layoutcell 1 -->
      <section id="farm-details-content" class="gridauto">
        <v-card
          v-for="(item, i) in cardsInfo" :key="i"
          class="card divcol relative"
          style=" --w: 100%; gap: 20px">
          <v-btn class="right-absolute btn bold" style="width: 60px!important;height:35px!important; min-height: 35px!important; border-radius: 5px!important;">
            New
          </v-btn>

          <aside class="divcol align" style="gap: 10px">
            <v-sheet class="dual-tokens" color="transparent">
              <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect" style="--p:0px; --w:35px; margin-left: 22px;">
              <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect" style="--p:0px; --w:35px; margin-right: 22px;">
            </v-sheet>

            <h3 class="p tup" style="--fm:var(--font2); font-weight:700!important;">{{item.tokenA}}-{{item.tokenB}}</h3>
          </aside>

          <aside class="jspace divcol" style="gap: 10px">
            <div class="divrow jspace" style="gap: 5px; padding-inline: 20px;">
              <label style="--fm:var(--font2); --c: #767A89; font-weight:700!important; --fs:16px;">APR</label>
              <h3 class="gradient-text">{{`${item.apr}%`}}</h3>
            </div>

            <div class="divrow jspace acenter" style="gap: 5px; padding-inline: 20px;">
              <label style="--fm:var(--font2); --c: #767A89; font-weight:700!important; --fs:16px;">Rewards</label>
              <div class="divrow">
                <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect" style="--p:0px; --w:35px; margin-right: -10px;z-index: 99;">
                <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect" style="--p:0px; --w:35px; margin-right: 0px;">
              </div>
            </div>

            <div class="divrow jspace" style="gap: 5px; padding-inline: 20px;">
              <label style="--fm:var(--font2); --c: #767A89; font-weight:700!important; --fs:16px;">TVL</label>
              <h3 style="font-family:var(--font1)!important; font-weight:500!important" class="p">{{`$${item.tvl.formatter(true)}`}}</h3>
            </div>
          </aside>

          <aside class="fwrap space bold" style="gap: 10px; --max-w-child: 110px;">
            <v-btn class="btn" style="border:1px solid #000000;">Deposit</v-btn>
          </aside>
        </v-card>
      </section>



      <!-- layoutcell 2 -->


      <div style="margin-top:50px;">
        <div class="jspace acenter mobile-fields deletemobile">
          <v-btn-toggle mandatory class="tooggle">
            <v-btn class="btn-toggle">Pairs</v-btn>
            <v-btn class="btn-toggle">Pools</v-btn>
          </v-btn-toggle>

          <div class="divrow center" style="gap:5px;">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              placeholder="Search"
              hide-details
              class="input-data-table"
            ></v-text-field>

            <v-btn class="btn bold" style="--w:150px; border:solid 1px #000; --h: 55px; border-radius: 10px!important;">
              Create Pool
            </v-btn>
          </div>
        </div>

        <v-data-table
          :headers="tableHeaders"
          :items="dataTable"
          :search="search"
          hide-default-footer
          mobile-breakpoint="840"
          class="deletemobile"
        >
          <template #[`item.poolName`]="{ item }">
            <div class="acenter font2" style="gap: 10px">
              <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px">
                <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect" style="--p:0px; --w:35px;">
                <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect" style="--p:0px; --w:35px; margin-right: 28px;">
              </v-sheet>

              <span class="bold tup">{{item.poolName}}</span>
            </div>
          </template>

          <template #[`item.rewards`]="{ item }">
            <div class="center font2" style="gap: 10px">
              <v-sheet class="dual-tokens center" color="transparent" style="--h-sheet: 40px">
                <img :src="require(`~/assets/sources/tokens/${item.rewardA}.svg`)" :alt="`${item.rewardA} token`" class="aspect" style="--p:0px; --w:35px; margin-left: 12px;">
                <img :src="require(`~/assets/sources/tokens/${item.rewardB}.svg`)" :alt="`${item.rewardB} token`" class="aspect" style="--p:0px; --w:35px; margin-right: 12px;">
              </v-sheet>
            </div>
          </template>

          <template #[`item.actions`]>
            <div class="end">
              <v-btn class="btn" style="--fs: 1em; --stroke: .4px; --br: 10px; --b:1px solid #000;">
                Deposit
              </v-btn>
            </div>
          </template>
        </v-data-table>

        <div class="showmobile mobile-table">
          <div class="title-grid" style="padding-inline: 10px;">
            <span class="light-text element1">Pair</span>

            <span class="light-text element2">APR</span>

            <span class="light-text element3">TVL</span>

            <span class="light-text element4">Volume</span>
          </div>

          <v-card v-for="(item,index) in dataTable" :key="index" class="card-mobile">
            <div class="title-grid">
              <div class="element1 divrow center">
                <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px">
                  <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect" style="--p:0px; --w:25px;">
                  <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect" style="--p:0px; --w:25px; margin-right: 40px;">
                </v-sheet>

                <span class="bold tup pool-text" style="margin-left: -30px;">{{item.poolName}}</span>
              </div>

              <div class="element2">
                <span class="light-text">
                  {{ item.apr }}
                </span>
              </div>

              <div class="element3">
                <span class="light-text">
                  {{ item.tvl }}
                </span>
              </div>

              <div class="element4">
                <span class="light-text">
                  {{ item.vol }}
                </span>
              </div>
            </div>

            <div>
              <v-btn class="btn bold" :class="{ 'custom-button': index === 1 }">
                {{item.btn_text}}
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'
import routerV2ABI from '~/static/abis/routerv2.json'
import factoryABI from '~/static/abis/factory.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
const routerAddress = "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"
const factoryAddress = "0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545"

export default {
  name: "FarmDetailsPage",
  mixins: [computeds],
  data() {
    return {
      userConnected: false,
      search:'',
      hideProfits: false,
      profits: {
        deposit: 20.009,
        rewards: 283,
        apy_monthly: 30,
        apy_daily: 20,
      },
      dataFilterFarms: ["all farms", "my farms"],
      dataFilter: ["featured", "stablecoin"],
      dataSort: ["tvl", "apr"],
      layoutCells: true,
      filters: {
        farms: "all farms",
        filter: "featured",
        search: undefined,
        sort: "tvl",
      },
      tabsFarms_model: 0,
      tabsFilter_model: 0,

      tableHeaders: [
        { value: "poolName", text: "Pair",  sortable: false },
        { value: "apr", text: "APR", align: "center", sortable: false },
        { value: "tvl", text: "TVL", align: "center", sortable: false },
        { value: "vol", text: "Volume (24h)", align: "center", sortable: false },
        { value: "rewards", text: "Rewards", align: "center", sortable: false },
        { value: "actions", align: "center", sortable: false },
      ],

      cardsInfo:[
      {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 32,
          vol: 20000,
          tvl: 32000000,
          claim: 29.7,
          staked: 1000,
          wallet: 10000,
        },
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 50,
          vol: 20000,
          tvl: 12000000,
          claim: 29.7,
          staked: 1000,
          wallet: 10000,
        },
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 12,
          vol: 20000,
          tvl: 22000000,
          claim: 29.7,
          staked: 1000,
          wallet: 10000,
        },
      ],

      dataTable: [
        {
          poolName: "ETH-SPT",
          tokenA: "elipse",
          tokenB: "elipse-clara",
          apr: "304%",
          tvl: "1.4m",
          vol: "$21k",
          rewardA: "btc",
          rewardB: "usdc",
          btn_text:"Deposit"
        },
        {
          poolName: "ETH-SPT",
          tokenA: "elipse",
          tokenB: "elipse-clara",
          apr: "304%",
          tvl: "1.4m",
          vol: "$21k",
          rewardA: "btc",
          rewardB: "usdc",
          btn_text:"Claim $23.38"
        },
        {
          poolName: "ETH-SPT",
          tokenA: "elipse",
          tokenB: "elipse-clara",
          apr: "304%",
          tvl: "1.4m",
          vol: "$21k",
          rewardA: "btc",
          rewardB: "usdc",
          btn_text:"Deposit"

        },
        {
          poolName: "ETH-SPT",
          tokenA: "elipse",
          tokenB: "elipse-clara",
          apr: "304%",
          tvl: "1.4m",
          vol: "$21k",
          rewardA: "btc",
          rewardB: "usdc",
          btn_text:"Deposit"
        },
        {
          poolName: "ETH-SPT",
          tokenA: "elipse",
          tokenB: "elipse-clara",
          apr: "304%",
          tvl: "1.4m",
          vol: "$21k",
          rewardA: "btc",
          rewardB: "usdc",
          btn_text:"Deposit"
        },
      ],
    }
  },
  head() {
    const title = 'All Farms';
    return {
      title,
    }
  },
  computed: {
    filterDataFarms() {
      // filters
      let filters = this.dataFarms;
      // filter A
      if (this.filters.farms === 'my farms') filters = filters.filter(data => data.mine)
      // // filter B
      // if (this.filters.filter === 'featured') filters = filters.filter(data => data.featured)
      // else if (this.filters.filter === 'stablecoin')  filters = filters.filter(data => data.stablecoin)
      // filter C
      if (this.filters.sort === 'tvl') filters.sort((a, b) => b.tvl - a.tvl)
      else if (this.filters.sort === 'apr') filters.sort((a, b) => b.apr - a.apr)
      // search
      if (this.filters.search) filters = filters.filter(data => `${data.tokenA}-${data.tokenB}`.includes(this.filters.search))

      return filters
    }
  },
  async mounted() {
    await this.$metamask.checkConnection()
    this.userConnected = this.$metamask.userConnected
  },
  methods: {
    changeLayoutCells() {
      if (this.layoutCells) {
        this.dataFilterFarms = ["view all", "farms", "my farms"]
        this.filters.farms = this.dataFilterFarms[0]
        this.dataFilter.push("bluechip")
        this.filters.filter = this.dataFilter[0]
        this.layoutCells = false
      } else {
        this.dataFilterFarms = ["all farms", "my farms"]
        this.filters.farms = this.dataFilterFarms[0]
        this.dataFilter.pop()
        this.filters.filter = this.dataFilter[0]
        this.layoutCells = true
      }
      setTimeout(() => {
        this.tabsFarms_model = 1
        this.tabsFilter_model = 0
      }, 100);
    },
    // create pool
    async addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline,
    ){
      const routerContract = new web3.eth.Contract(routerV2ABI, routerAddress);
      await routerContract.methods.methodName(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline,
      ).call({ from: this.$metamask.userAccount })
    },
    addLiquidityETH(){

    },
    getAvailablePairs() {

    },
    createNewPair() {

    },
    async createNewPool() {
      const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
      await factoryContract.methods.methodName().send({ from: this.$metamask.userAccount })
    },

  }
};
</script>

<style src="~/assets/styles/pages/farm-details.scss" lang="scss" />
