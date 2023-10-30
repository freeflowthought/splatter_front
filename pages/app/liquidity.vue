<template>
	<div id="liquidity">
		<v-row>
      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <AppChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></AppChartsSwapChart>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <v-tabs background-color="transparent">
            <v-tab :value="1" @click="windowStep = 1">Add</v-tab>
            <v-tab :value="2" @click="windowStep = 2">Remove</v-tab>
          </v-tabs>

          <v-window v-model="windowStep" class="mt-6">
            <v-window-item :value="1">
              <label class="light-span" for="amount">Enter Amount</label>
              <div class="jspace mt-2 container-select">
                <v-select
                placeholder="Select Token"
                hide-details
                append-icon="mdi-chevron-down"
                ></v-select>

                <div class="divcol">
                  <p class="p bold-title">-.--</p>
                  <p class="p light-span">Balance: 0.00</p>
                </div>
              </div>

              <div class="jspace acenter mt-4 mb-4">
                <span class="light-span">1 ETH ≈ 0.00</span>
                <v-icon color="#9E9DA3">mdi-plus</v-icon>
              </div>

              <label class="light-span" for="amount">Enter Amount</label>
              <div class="jspace mt-2 container-select">
                <v-select
                placeholder="Select Token"
                hide-details
                append-icon="mdi-chevron-down"
                ></v-select>

                <div class="divcol">
                  <p class="p bold-title">-.--</p>
                  <p class="p light-span">Balance: 0.00</p>
                </div>
              </div>

              <div class="container-select mt-4 mb-4 divrow jspace">
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">1306.67</span>
                  <span class="font13">USDC per SPLT</span>
                </div>
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">1306.67</span>
                  <span class="font13">USDC per SPLT</span>
                </div>
                <div class="divcol astart" style="gap: 5px;">
                  <span class="bold font13">0%</span>
                  <span class="font13">Share</span>
                </div>
              </div>

              <v-btn class="btn btn-add mb-4 mt-4">Add</v-btn>
            </v-window-item>

            <v-window-item :value="2" class="window-2 divcol acenter">
              <h2 class="white-title mb-6">50%</h2>
              
              <v-tabs background-color="transparent" :mobile-breakpoint="9999">
                <v-tab :value="1">25%</v-tab>
                <v-tab :value="2">50%</v-tab>
                <v-tab :value="3">75%</v-tab>
                <v-tab :value="4">100%</v-tab>
              </v-tabs>

              <div class="mt-4 mb-4 container-select" style="width: 100%;">
                <div class="jspace mt-2 mb-4">
                  <div class="divrow acenter" style="gap: 10px;">
                    <img src="~/assets/sources/tokens/usdc.svg" alt="Btc" style="width: 25px;">
                    <span class="bold-title">USDC</span>
                  </div>
                  <span>0.029021</span>
                </div>
                <div class="jspace mb-2">
                  <div class="divrow acenter" style="gap: 10px;">
                    <img src="~/assets/sources/tokens/btc.svg" alt="Btc" style="width: 25px;">
                    <span class="bold-title">BTC</span>
                  </div>
                  <span>0.029021</span>
                </div>
              </div>

              <v-btn class="mb-4 mt-4 btn btn-add">Remove</v-btn>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <v-card class="card">
          <p class="p bold-title mb-6">Currently LPs</p>

          <div v-for="(item, index) in dataCurrentlyLps" :key="index" class="jspace mb-14">
            <div class="divrow center" style="gap: 10px;">
              <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px; width: 40px!important;">
                <img :src="require(`~/assets/sources/tokens/${item.img_left}.svg`)" :alt="`elipse token`" class="aspect" style="--p:0px; --w:25px;">
                <img :src="require(`~/assets/sources/tokens/${item.img_right}.svg`)" :alt="`elipse-clara token`" class="aspect" style="--p:0px; --w:25px;">
              </v-sheet>
              <p class="p bold-title">{{ item.pair_left }} - {{ item.pair_right }}</p>
            </div>

            <div class="divcol center">
              <span v-if="item.fiat" class="bold-title mb-2">{{ item.fiat }}</span>
              <span class="light-span">{{ item.crypto_balance }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="img-container">
      <img
        src="~/assets/sources/images/circleBottom.png"
        alt="Circle"
        class="circle-bottom"
      />
    </div>
	</div>
</template>

<script>
export default {
  name: "LiquidityPage",
  data() {
    return {
      windowStep: 1,
      dataCurrentlyLps:[
        {
          img_left: 'btc',
          img_right: 'usdc',
          pair_left: 'USDC',
          pair_right: 'ETH',
          crypto_balance: '1,103.00 USDC'
        },
        {
          img_left: 'btc',
          img_right: 'usdc',
          pair_left: 'USDC',
          pair_right: 'ETH',
          crypto_balance: '1,103.00 USDC'
        },
        {
          img_left: 'btc',
          img_right: 'usdc',
          pair_left: 'USDC',
          pair_right: 'ETH',
          fiat: '$1,103.00',
          crypto_balance: '1,103.00 USDC'
        },
        {
          img_left: 'btc',
          img_right: 'usdc',
          pair_left: 'USDC',
          pair_right: 'ETH',
          fiat: '$1,103.00',
          crypto_balance: '1,103.00 USDC'
        },
      ]
    }
  },
  head() {
    const title = 'Liquidity';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/liquidity.scss" lang="scss" />
