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
      <modalLiquidity ref="modalLiquidity" :pair='pairSelected' ></modalLiquidity>
      <modalCreatePair ref="modalCreatePair">
      </modalCreatePair>
      <!-- layoutcell 1 -->
      <!-- <h1 class="bold" style="font-family:var(--font1);">Earn</h1>
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
      </section> -->



      <!-- layoutcell 2 -->


      <div style="margin-top:50px;">
        <div class="jspace acenter mobile-fields deletemobile">
          <v-btn-toggle mandatory class="tooggle">
            <v-btn class="btn-toggle">Pairs</v-btn>
          </v-btn-toggle>

          <div class="divrow center" style="gap:5px;">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              placeholder="Search"
              hide-details
              class="input-data-table"
            ></v-text-field>

            <v-btn class="btn bold" style="--w:150px; border:solid 1px #000; --h: 55px; border-radius: 10px!important;" @click="showModalCreatePair">
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
          <template #[`item.poolName`] ="{ item }">
            <div class="acenter font2" style="gap: 10px">
              <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px">
                <img :src="require(`~/assets/sources/tokens/elipse.svg`)" :alt="`elipse token`" class="aspect" style="--p:0px; --w:35px;">
                <img :src="require(`~/assets/sources/tokens/elipse-clara.svg`)" :alt="`elipse-clara token`" class="aspect" style="--p:0px; --w:35px; margin-right: 28px;">
              </v-sheet>

              <span class="bold tup">{{item.poolName}}</span>
            </div>
          </template>

          <template #[`item.rewards`]>
            <div class="center font2" style="gap: 10px">
              <v-sheet class="dual-tokens center" color="transparent" style="--h-sheet: 40px">
                <img :src="require(`~/assets/sources/tokens/elipse.svg`)" :alt="`elipse token`" class="aspect" style="--p:0px; --w:35px; margin-left: 12px;">
                <img :src="require(`~/assets/sources/tokens/elipse-clara.svg`)" :alt="`elipse-clara token`" class="aspect" style="--p:0px; --w:35px; margin-right: 12px;">
              </v-sheet>
            </div>
          </template>

          <template #[`item.actions`] ="{ item }">
            <div class="end">
              <!-- <v-btn
              class="btn mr-3" style="--fs: 1em; --stroke: .4px; --br: 10px; --b:1px solid #000;"
              >
                Withdraw
              </v-btn> -->
              <v-btn
              class="btn" style="--fs: 1em; --stroke: .4px; --br: 10px; --b:1px solid #000;"
              @click="showModal(item)">
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
                  <img :src="require(`~/assets/sources/tokens/elipse.svg`)" :alt="`elipse token`" class="aspect" style="--p:0px; --w:25px;">
                  <img :src="require(`~/assets/sources/tokens/elipse-clara.svg`)" :alt="`elipse-clara token`" class="aspect" style="--p:0px; --w:25px; margin-right: 40px;">
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
              <v-btn class="btn bold" :class="{ 'custom-button': index === 1 }" @click="showModal(item)">
                Deposit
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import modalLiquidity from '~/components/modals/provide-remove-liquidity.vue'
import modalCreatePair from '~/components/modals/create-pair.vue'
import computeds from '~/mixins/computeds'
import routerV2ABI from '~/static/abis/routerv2.json'
import factoryABI from '~/static/abis/factory.json'
import ERC20ABI from '~/static/abis/erc20.json'
const Web3 = require('web3')
const web3 = new Web3(window.ethereum);
let routerV2Address = "0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C"
let factoryV2Address = "0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545"
let routerV2;
let factory;

export default {
  name: "FarmDetailsPage",
  components: {
    modalLiquidity,
    modalCreatePair
  },
  mixins: [computeds],
  data() {
    return {
      pairSelected: {
        address: "",
        poolName: "",
        token0: {
          name:"",
          symbol:"",
        },
        token1: {
          name:"",
          symbol:"",
        }
      },
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
        /* { value: "apr", text: "APR", align: "center", sortable: false },
        { value: "tvl", text: "TVL", align: "center", sortable: false },
        { value: "vol", text: "Volume (24h)", align: "center", sortable: false }, */
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

      dataTable: undefined,
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
    routerV2Address = this.$protocolAddresses.getRouterAddress(this.$metamask.userCurrentChainId)
    factoryV2Address = this.$protocolAddresses.getFactoryAddress(this.$metamask.userCurrentChainId)
    routerV2 = new web3.eth.Contract(routerV2ABI, routerV2Address);
    factory = new web3.eth.Contract(factoryABI, factoryV2Address);
    this.dataTable = await this.getAllPairs()

  },
  methods: {
    // TO-DO
    showModal(item){
      this.pairSelected = item
      this.$refs.modalLiquidity.modalLiquidity = true
    },
    showModalCreatePair(){
      this.$refs.modalCreatePair.modalCreatePair = true
    },
    hideModal(){},
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

    // Pairs

    // TO-DO
    calculateTLV() {
      // https://droomdroom.com/total-value-locked-explained/#:~:text=The%20TVL%20formula%20is%20simple,circulating%20supply%20of%20the%20token.
    },

    async balanceOf(tokenAddres) {
      const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      await tokenContract.methods.balanceOf(this.$metamask.userAccount).call().then(
        function (value) {
          return value
        },
        function (reason) {

        },
      );
    },

    approve(tokenAddres, amount, batch) {
      const tokenInContract = new web3.eth.Contract(ERC20ABI, tokenAddres);
      batch.add(tokenInContract.methods.approve(routerV2Address, amount).send.request({ from: this.$metamask.userAccount }, (err) => {
          if (err) {
            throw err
          }
      }))
    },

    async getTokenData(tokenAddress) {
      const token = {}
      const tokenContract = new web3.eth.Contract(ERC20ABI,tokenAddress)
      token.address = tokenAddress
      const [name, symbol, decimals] = await Promise.all([
        tokenContract.methods.name().call(),
        tokenContract.methods.symbol().call(),
        tokenContract.methods.decimals().call()])
      token.name = name
      token.symbol = symbol
      token.decimals = decimals
      return token
    },

    async getAllPairs() {
      const pairsCreated = await factory.methods.allPairsLength().call()

      const allFetch = []

      for(let i = 0; i < pairsCreated; i++) {
        const fetch = this.fetchPair(i);
        allFetch.push(fetch);
      }
      
      return Promise.all(allFetch)
    },

    async fetchPair(index) {
      const pair = {}
      pair.address = await factory.methods.allPairs(index).call()
      const pairContract = new web3.eth.Contract(IUniswapV2Pair.abi, pair.address);
      const [token0Address, token1Address] = await Promise.all([
        pairContract.methods.token0().call(),
        pairContract.methods.token1().call()])

      const [token0, token1] = await Promise.all([
        this.getTokenData(token0Address),
        this.getTokenData(token1Address)
      ])
      pair.token0 = token0
      pair.token1 = token1
      pair.poolName = pair.token0.symbol + "-" + pair.token1.symbol
      return pair
    },

    async removeLiquidity(tokenA, tokenB, amountAMin, amountBMin ) {
      const batch = new web3.BatchRequest();
      const pairAddress = factory.methods.getPair(tokenA.decimals, tokenB.decimals);
      const liquidity = await this.balanceOf(pairAddress)
      this.approve(pairAddress, liquidity, batch)
      const to = this.$metamask.userAccount
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      batch.add(
        routerV2.methods.removeLiquidity(
          tokenA.address,
          tokenB.address,
          liquidity,
          (amountAMin * 10 ** tokenA.decimals).toString(),
          (amountBMin * 10 ** tokenB.decimals).toString(),
          to,
          deadline
          ).send.request({from: this.$metamask.userAccount}, (err, res) => {
            if (err) {
              console.log(err)
            }
            if (res) {
              this.$alert('success', 'Liquidity removed successfully')
            }
          }
        )
      )
      batch.execute()
    },
    async addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin){
      // const to = this.$metamask.userAccount
      // const batch = new web3.BatchRequest();
      await routerV2.methods.removeLiquidity(
        token.address,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
      ).send({from: this.$metamask.userAccount}).then(
        function (value) {
          this.$alert("success", 'Liquidity removed succesfully')
        },
        function (reason) {
          console.log(reason, "<------- removeliquidity")
        },
      );
    },
  }
};
</script>

<style src="~/assets/styles/pages/farm-details.scss" lang="scss" />
